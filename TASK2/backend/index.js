const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { Pool } = require('pg');
const { createClient } = require('@supabase/supabase-js');
const jwt = require('jsonwebtoken'); // Still needed for JWT verification
require('dotenv').config();

const app = express();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false // Use SSL if DATABASE_URL is present
});

// Initialize Supabase Client with error handling
let supabase = null;
if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
  supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY // Use service role key for backend operations
  );
  console.log('Supabase client initialized successfully');
} else {
  console.warn('⚠️  Supabase environment variables not found. User authentication features will be limited.');
  console.warn('   Please add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to your .env file.');
}

// Simple session store (in production, use Redis or database)


// Middleware to protect routes using session-based auth
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication token required' });
  }

  if (!supabase) {
    return res.status(503).json({ 
      error: 'Authentication service unavailable', 
      message: 'Supabase configuration is missing.' 
    });
  }

  try {
    const { data, error } = await supabase.auth.getUser(token);

    if (error) {
      console.error('Supabase auth error:', error.message);
      return res.status(403).json({ message: 'Invalid or expired token', error: error.message });
    }

    req.user = data.user;
    next();
  } catch (error) {
    console.error('Error in authentication middleware:', error);
    // Check if the error is specifically from Supabase auth
    if (error.message && (error.message.includes('invalid jwt') || error.message.includes('expired jwt') || error.message.includes('invalid claims'))) {
      return res.status(403).json({ message: 'Invalid or expired token', error: error.message });
    }
    res.status(500).json({ message: 'Internal server error during authentication', error: error.message });
  }
};

// CORS configuration - Allow all origins in development
const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? ['https://project-flow-je8bqj9iy-dev-harshhh18s-projects.vercel.app', 'https://projectflow-cvcv.onrender.com']
    : '*', // Allow all origins in development for easier local testing
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

app.use(cors(corsOptions));

// Increase header size limit significantly for large JWT tokens
app.use(express.json({ 
  limit: '50mb',
  parameterLimit: 1000000,
  extended: true
}));
app.use(express.urlencoded({ 
  extended: true, 
  limit: '50mb',
  parameterLimit: 1000000
}));

// Health check endpoints
app.get('/', (req, res) => {
  res.json({ 
    message: 'TaskFlow API is running',
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

app.get('/api/health', async (req, res) => {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    checks: {}
  };
  
  // Check database connection
  try {
    await pool.query('SELECT 1');
    health.checks.database = { status: 'healthy', message: 'Connected' };
  } catch (error) {
    health.checks.database = { status: 'unhealthy', message: error.message };
    health.status = 'unhealthy';
  }
  
  // Check Supabase connection
  if (supabase) {
    try {
      const { data, error } = await supabase.from('projects').select('count').limit(1);
      health.checks.supabase = { status: 'healthy', message: 'Connected' };
    } catch (error) {
      health.checks.supabase = { status: 'unhealthy', message: error.message };
    }
  } else {
    health.checks.supabase = { status: 'disabled', message: 'Supabase not configured' };
  }
  
  // Check memory usage
  const memUsage = process.memoryUsage();
  health.checks.memory = {
    status: 'healthy',
    usage: {
      rss: Math.round(memUsage.rss / 1024 / 1024) + ' MB',
      heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024) + ' MB',
      heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024) + ' MB'
    }
  };
  
  const statusCode = health.status === 'healthy' ? 200 : 503;
  res.status(statusCode).json(health);
});

// Connection test endpoint (no auth required)
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Backend connection successful!', 
    timestamp: new Date().toISOString(),
    cors: 'enabled'
  });
});

// User Registration with Supabase Auth
app.post('/api/register', async (req, res) => {
  const { email, password, name } = req.body;
  
  if (!supabase) {
    return res.status(503).json({ 
      error: 'Authentication service unavailable', 
      message: 'Supabase configuration is missing. Please contact support.' 
    });
  }
  
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name: name || '' }, // Store name in user metadata
      },
    });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    // Optionally, create a record in your public.users table if you need more user data
    // beyond what Supabase Auth provides by default.
    // This assumes you have a 'users' table in your public schema.
    // const { data: newUser, error: userError } = await supabase
    //   .from('users')
    //   .insert([{ id: data.user.id, email: data.user.email, name: name || '' }])
    //   .select();

    // if (userError) {
    //   console.error('Error creating user record:', userError);
    //   // Handle this error appropriately, maybe delete the Supabase auth user
    // }

    res.status(201).json({ message: 'User registered successfully. Check your email for verification if enabled.', user: data.user });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

// User Login with Supabase Auth - Creates a session
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  
  if (!supabase) {
    return res.status(503).json({ 
      error: 'Authentication service unavailable', 
      message: 'Supabase configuration is missing. Please contact support.' 
    });
  }
  
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    console.log('Supabase access token received:', data.session.access_token);
    res.status(200).json({ 
      message: 'Login successful', 
      user: data.user,
      access_token: data.session.access_token, // Return Supabase access token
      expires_in: data.session.expires_in,
      token_type: data.session.token_type
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Failed to login user' });
  }
});

// User Logout endpoint - Destroys session
app.post('/api/logout', authenticateToken, async (req, res) => {
  try {
    if (!supabase) {
      return res.status(503).json({ 
        error: 'Authentication service unavailable', 
        message: 'Supabase configuration is missing.' 
      });
    }
    
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Supabase logout error:', error.message);
      return res.status(500).json({ message: 'Failed to logout', error: error.message });
    }

    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ 
      message: 'An unexpected error occurred during logout',
      debug: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Delete Account endpoint - Permanently deletes user account and associated data
app.delete('/api/account', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    
    console.log(`[ACCOUNT_DELETE] Request received for user: ${req.user.email} (${userId})`);
    
    // Start database transaction to ensure data consistency
    console.log(`[ACCOUNT_DELETE] Attempting database connection...`);
    const client = await pool.connect();
    console.log(`[ACCOUNT_DELETE] Database connection successful`);
    
    try {
      await client.query('BEGIN');
      
      // Check if user_id column exists in projects table for user-specific deletion
      const checkColumn = await client.query(`
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name = 'projects' AND column_name = 'user_id'
      `);
      
      if (checkColumn.rows.length > 0) {
        // Delete user's tasks associated with their projects
        const userProjects = await client.query('SELECT id FROM projects WHERE user_id = $1', [userId]);
        const projectIds = userProjects.rows.map(p => p.id);
        
        if (projectIds.length > 0) {
          await client.query('DELETE FROM tasks WHERE project_id = ANY($1)', [projectIds]);
          console.log(`Deleted tasks for ${projectIds.length} projects`);
        }
        
        // Delete user's projects
        const deletedProjects = await client.query('DELETE FROM projects WHERE user_id = $1', [userId]);
        console.log(`Deleted ${deletedProjects.rowCount} projects for user ${userId}`);
      } else {
        console.log('user_id column not found in projects table - skipping project/task cleanup');
      }
      
      // Delete from any other user-related tables you might have
      // Example: await client.query('DELETE FROM user_preferences WHERE user_id = $1', [userId]);
      
      await client.query('COMMIT');
      console.log('Database cleanup completed successfully');
      
    } catch (dbError) {
      await client.query('ROLLBACK');
      console.error('Database cleanup failed, rolling back:', dbError);
      throw dbError;
    } finally {
      client.release();
    }
    
    // Delete user from Supabase Auth (this will permanently delete the user account)
    try {
      if (!supabase) {
        return res.status(503).json({ 
          error: 'Authentication service unavailable', 
          message: 'Supabase configuration is missing.' 
        });
      }
      const { error: deleteError } = await supabase.auth.admin.deleteUser(userId);
      
      if (deleteError) {
        console.error('Supabase user deletion error:', deleteError);
        // Continue - user data is already cleaned up from our database
      } else {
        console.log(`Successfully deleted user ${userId} from Supabase Auth`);
      }
    } catch (supabaseError) {
      console.error('Supabase deletion error:', supabaseError);
      // Continue - user data is already cleaned up from our database
    }
    
    res.status(200).json({ 
      message: 'Account deleted successfully',
      details: 'User account and all associated data have been permanently removed'
    });
    
  } catch (error) {
    console.error('[ACCOUNT_DELETE] Error occurred:', error);
    console.error('[ACCOUNT_DELETE] Error stack:', error.stack);
    console.error('[ACCOUNT_DELETE] Error name:', error.name);
    console.error('[ACCOUNT_DELETE] Error message:', error.message);
    
    res.status(500).json({ 
      error: 'Failed to delete account',
      message: 'An error occurred while deleting your account. Please try again or contact support.',
      debug: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});


// API Routes (Protected)
app.get('/api/projects', authenticateToken, async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      console.error('Authentication failed: req.user or req.user.id is missing.');
      return res.status(401).json({ message: 'Authentication required or failed' });
    }
    const userId = req.user.id; // Get user ID from authenticated token
    console.log('Fetching projects for user:', userId);
    
    // First, check if user_id column exists, if not, return all projects (backward compatibility)
    const checkColumn = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'projects' AND column_name = 'user_id'
    `);
    
    let projectsResult;
    if (checkColumn.rows.length > 0) {
      // user_id column exists, filter by user
      projectsResult = await pool.query('SELECT * FROM projects WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
    } else {
      // user_id column doesn't exist, return all projects (backward compatibility)
      console.log('user_id column not found, returning all projects');
      projectsResult = await pool.query('SELECT * FROM projects ORDER BY created_at DESC');
    }
    
    const projects = projectsResult.rows;
    
    for (let project of projects) {
      const tasksResult = await pool.query('SELECT * FROM tasks WHERE project_id = $1 ORDER BY created_at DESC', [project.id]);
      project.tasks = tasksResult.rows;
    }
    
    console.log(`Found ${projects.length} projects for user ${userId}`);
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error.message);
    console.error('Error details:', error);
    res.status(500).json({ error: 'Failed to fetch projects', details: error.message });
  }
});

app.get('/api/projects/:id/export/:format', authenticateToken, async (req, res) => {
  const { id, format } = req.params;
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `project_${id}_${timestamp}`;

  try {
    const projectResult = await pool.query('SELECT * FROM projects WHERE id = $1', [id]);
    if (projectResult.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }
    const project = projectResult.rows[0];
    const tasksResult = await pool.query('SELECT * FROM tasks WHERE project_id = $1 ORDER BY created_at DESC', [id]);
    project.tasks = tasksResult.rows;

    if (format === 'csv') {
      const { createObjectCsvWriter } = require('csv-writer');
      const csvFilePath = path.join(__dirname, `${filename}.csv`);
      
      const exportData = [
        {
          type: 'PROJECT',
          id: project.id,
          name: project.name,
          description: project.description || '',
          status: project.status || 'active',
          priority: project.priority || 'medium',
          estimated_hours: project.estimated_hours || 0,
          deadline: project.deadline ? new Date(project.deadline).toISOString() : '',
          created_at: project.created_at ? new Date(project.created_at).toISOString() : ''
        },
        ...project.tasks.map(task => ({
          type: 'TASK',
          id: task.id,
          name: task.title,
          description: task.description || '',
          status: task.status,
          priority: task.priority,
          estimated_hours: task.estimated_hours || 0,
          assigned_to: task.assigned_to || '', 
          deadline: task.deadline ? new Date(task.deadline).toISOString() : '',
          created_at: task.created_at ? new Date(task.created_at).toISOString() : ''
        }))
      ];

      const csvWriter = createObjectCsvWriter({
        path: csvFilePath,
        header: [
          { id: 'type', title: 'TYPE' },
          { id: 'id', title: 'ID' },
          { id: 'name', title: 'NAME' },
          { id: 'description', title: 'DESCRIPTION' },
          { id: 'status', title: 'STATUS' },
          { id: 'priority', title: 'PRIORITY' },
          { id: 'estimated_hours', title: 'ESTIMATED_HOURS' },
          { id: 'assigned_to', title: 'ASSIGNED_TO' },
          { id: 'deadline', title: 'DEADLINE' },
          { id: 'created_at', title: 'CREATED_AT' }
        ]
      });

      await csvWriter.writeRecords(exportData);
      
      res.download(csvFilePath, `${filename}.csv`, (err) => {
        if (err) console.error('Download error:', err);
        fs.unlink(csvFilePath, (unlinkErr) => {
          if (unlinkErr) console.error('File cleanup error:', unlinkErr);
        });
      });
      
    } else if (format === 'pdf') {
      const puppeteer = require('puppeteer');
      const pdfFilePath = path.join(__dirname, `${filename}.pdf`);

      const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      const page = await browser.newPage();

      const formatDate = (dateString) => {
        if (!dateString) return 'Not set';
        return new Date(dateString).toLocaleDateString();
      };

      const totalTasks = project.tasks.length;
      const completedTasks = project.tasks.filter(t => t.status === 'completed').length;
      const inProgressTasks = project.tasks.filter(t => t.status === 'in_progress').length;
      const todoTasks = project.tasks.filter(t => t.status === 'todo').length;
      const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; color: #333; }
            .header { border-bottom: 2px solid #007bff; padding-bottom: 10px; margin-bottom: 20px; }
            .project-title { color: #007bff; margin-bottom: 5px; }
            .section { margin-bottom: 25px; }
            .section h3 { color: #495057; border-bottom: 1px solid #dee2e6; padding-bottom: 5px; }
            .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
            .info-item { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px dotted #ccc; }
            .info-label { font-weight: bold; }
            .task-item { background: #f8f9fa; padding: 15px; margin-bottom: 10px; border-left: 4px solid #007bff; }
            .task-title { font-weight: bold; margin-bottom: 5px; }
            .task-meta { font-size: 0.9em; color: #6c757d; }
            .status-completed { color: #28a745; }
            .status-in-progress { color: #ffc107; }
            .status-todo { color: #6c757d; }
            .priority-urgent { color: #dc3545; font-weight: bold; }
            .priority-high { color: #fd7e14; }
            .priority-medium { color: #ffc107; }
            .priority-low { color: #28a745; }
            .progress-bar { background: #e9ecef; height: 20px; border-radius: 10px; overflow: hidden; }
            .progress-fill { background: #007bff; height: 100%; transition: width 0.3s; }
            .export-date { text-align: right; color: #6c757d; font-size: 0.9em; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 class="project-title">${project.name}</h1>
            <p>Project Export Report</p>
          </div>

          <div class="section">
            <h3>Project Overview</h3>
            <div class="info-grid">
              <div class="info-item">
                <span class="info-label">Status:</span>
                <span class="status-${project.status}">${(project.status || 'active').toUpperCase()}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Priority:</span>
                <span class="priority-${project.priority}">${(project.priority || 'medium').toUpperCase()}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Deadline:</span>
                <span>${formatDate(project.deadline)}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Estimated Hours:</span>
                <span>${project.estimated_hours || 0}h</span>
              </div>
            </div>
            ${project.description ? `<p><strong>Description:</strong> ${project.description}</p>` : ''}
          </div>

          <div class="section">
            <h3>Project Statistics</h3>
            <div class="info-grid">
              <div class="info-item">
                <span class="info-label">Total Tasks:</span>
                <span>${totalTasks}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Completed:</span>
                <span class="status-completed">${completedTasks}</span>
              </div>
              <div class="info-item">
                <span class="info-label">In Progress:</span>
                <span class="status-in-progress">${inProgressTasks}</span>
              </div>
              <div class="info-item">
                <span class="info-label">To Do:</span>
                <span class="status-todo">${todoTasks}</span>
              </div>
            </div>
            <div>
              <strong>Overall Progress:</strong>
              <div class="progress-bar">
                <div class="progress-fill" style="width: ${progressPercentage}%"></div>
              </div>
              <p style="text-align: center; margin: 5px 0;">${progressPercentage}% Complete</p>
            </div>
          </div>

          ${project.tasks.length > 0 ? `
            <div class="section">
              <h3>Tasks (${project.tasks.length})</h3>
              ${project.tasks.map(task => `
                <div class="task-item">
                  <div class="task-title">${task.title}</div>
                  ${task.description ? `<p>${task.description}</p>` : ''}
                  <div class="task-meta">
                    Status: <span class="status-${task.status}">${task.status.toUpperCase()}</span> | 
                    Priority: <span class="priority-${task.priority}">${task.priority.toUpperCase()}</span>
                    ${task.assigned_to ? ` | Assigned to: ${task.assigned_to}` : ''}
                    ${task.deadline ? ` | Due: ${formatDate(task.deadline)}` : ''}
                    ${task.estimated_hours ? ` | Est: ${task.estimated_hours}h` : ''}
                  </div>
                </div>
              `).join('')}
            </div>
          ` : '<div class="section"><h3>Tasks</h3><p>No tasks in this project.</p></div>'}

          <div class="export-date">
            Report generated on: ${new Date().toLocaleString()}
          </div>
        </body>
        </html>
      `;

      await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
      await page.pdf({ 
        path: pdfFilePath, 
        format: 'A4', 
        printBackground: true,
        margin: {
          top: '20px',
          right: '20px',
          bottom: '20px',
          left: '20px'
        }
      });

      await browser.close();
      
      res.download(csvFilePath, `${filename}.csv`, (err) => {
        if (err) console.error('Download error:', err);
        fs.unlink(csvFilePath, (unlinkErr) => {
          if (unlinkErr) console.error('File cleanup error:', unlinkErr);
        });
      });
      
    } else {
      res.status(400).json({ error: 'Invalid format. Supported formats: csv, pdf' });
    }
  } catch (error) {
    console.error('Error exporting project:', error);
    res.status(500).json({ error: 'Failed to export project' });
  }
});

app.post('/api/projects', authenticateToken, async (req, res) => {
  const { name, description, deadline, priority, estimated_hours } = req.body;
  const userId = req.user.id; // Get user ID from authenticated token
  
  try {
    // Check if user_id column exists in projects table
    const checkColumn = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'projects' AND column_name = 'user_id'
    `);
    
    let result;
    if (checkColumn.rows.length > 0) {
      // user_id column exists, include it in the insert
      result = await pool.query(
        'INSERT INTO projects (name, description, deadline, priority, estimated_hours, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING * ',
        [name, description, deadline ? new Date(deadline) : null, priority || 'medium', estimated_hours || 0, userId]
      );
    } else {
      // user_id column doesn't exist, insert without it (backward compatibility)
      console.log('user_id column not found, creating project without user association');
      result = await pool.query(
        'INSERT INTO projects (name, description, deadline, priority, estimated_hours) VALUES ($1, $2, $3, $4, $5) RETURNING * ',
        [name, description, deadline ? new Date(deadline) : null, priority || 'medium', estimated_hours || 0]
      );
    }
    
    console.log(`Created project for user ${userId}:`, result.rows[0]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

app.put('/api/projects/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { name, description, deadline, priority, estimated_hours, status } = req.body;
  const userId = req.user.id;
  
  try {
    // Check if user_id column exists in projects table
    const checkColumn = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'projects' AND column_name = 'user_id'
    `);
    
    let result;
    if (checkColumn.rows.length > 0) {
      // user_id column exists, filter by user_id to ensure user can only update their own projects
      result = await pool.query(
        'UPDATE projects SET name = $1, description = $2, deadline = $3, priority = $4, estimated_hours = $5, status = $6, updated_at = NOW() WHERE id = $7 AND user_id = $8 RETURNING * ',
        [name, description, deadline ? new Date(deadline) : null, priority, estimated_hours, status, id, userId]
      );
    } else {
      // user_id column doesn't exist, update without user filtering (backward compatibility)
      console.log('user_id column not found, updating project without user filtering');
      result = await pool.query(
        'UPDATE projects SET name = $1, description = $2, deadline = $3, priority = $4, estimated_hours = $5, status = $6, updated_at = NOW() WHERE id = $7 RETURNING * ',
        [name, description, deadline ? new Date(deadline) : null, priority, estimated_hours, status, id]
      );
    }
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found or you do not have permission to update it' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

app.delete('/api/projects/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  
  try {
    // Check if user_id column exists in projects table
    const checkColumn = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'projects' AND column_name = 'user_id'
    `);
    
    let result;
    if (checkColumn.rows.length > 0) {
      // user_id column exists, filter by user_id to ensure user can only delete their own projects
      // First delete associated tasks
      await pool.query('DELETE FROM tasks WHERE project_id = $1', [id]);
      result = await pool.query('DELETE FROM projects WHERE id = $1 AND user_id = $2 RETURNING * ', [id, userId]);
    } else {
      // user_id column doesn't exist, delete without user filtering (backward compatibility)
      console.log('user_id column not found, deleting project without user filtering');
      await pool.query('DELETE FROM tasks WHERE project_id = $1', [id]);
      result = await pool.query('DELETE FROM projects WHERE id = $1 RETURNING * ', [id]);
    }
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found or you do not have permission to delete it' });
    }
    res.json({ message: 'Project and associated tasks deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

app.get('/api/projects/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  console.log('Project ID received:', id, 'Type:', typeof id);
  
  // Validate that id is not undefined, null, or empty
  if (!id || id === 'undefined' || id === 'null') {
    console.error('Invalid project ID received:', id);
    return res.status(400).json({ error: 'Invalid project ID' });
  }
  
  try {
    // Check if user_id column exists in projects table
    const checkColumn = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'projects' AND column_name = 'user_id'
    `);
    
    let projectResult;
    if (checkColumn.rows.length > 0) {
      // user_id column exists, filter by user_id to ensure user can only view their own projects
      projectResult = await pool.query('SELECT * FROM projects WHERE id = $1 AND user_id = $2', [id, userId]);
    } else {
      // user_id column doesn't exist, fetch without user filtering (backward compatibility)
      console.log('user_id column not found, fetching project without user filtering');
      projectResult = await pool.query('SELECT * FROM projects WHERE id = $1', [id]);
    }
    
    if (projectResult.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found or you do not have permission to view it' });
    }
    
    const project = projectResult.rows[0];
    const tasksResult = await pool.query('SELECT * FROM tasks WHERE project_id = $1 ORDER BY created_at DESC', [id]);
    project.tasks = tasksResult.rows;
    
    res.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

app.post('/api/tasks', authenticateToken, async (req, res) => {
  const { title, description, deadline, status, projectId, priority, estimated_hours, assigned_to } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO tasks (title, description, deadline, status, project_id, priority, estimated_hours, assigned_to) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING * ',
      [title, description, deadline ? new Date(deadline) : null, status || 'todo', projectId, priority || 'medium', estimated_hours || 0, assigned_to]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

app.put('/api/tasks/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { title, description, deadline, status, priority, estimated_hours, assigned_to, time_spent } = req.body;
  try {
    const currentTaskResult = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
    const current = currentTaskResult.rows[0];

    const result = await pool.query(
      'UPDATE tasks SET title = $1, description = $2, deadline = $3, status = $4, priority = $5, estimated_hours = $6, assigned_to = $7, time_spent = $8, updated_at = NOW() WHERE id = $9 RETURNING * ',
      [
        title || current.title,
        description !== undefined ? description : current.description,
        deadline ? new Date(deadline) : current.deadline,
        status || current.status,
        priority || current.priority,
        estimated_hours !== undefined ? estimated_hours : current.estimated_hours,
        assigned_to !== undefined ? assigned_to : current.assigned_to,
        time_spent !== undefined ? time_spent : current.time_spent,
        id
      ]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

app.delete('/api/tasks/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING * ', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

app.get('/api/projects/:id/stats', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const statsResult = await pool.query(`
      SELECT 
        COUNT(*) as total_tasks,
        COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_tasks,
        COUNT(CASE WHEN status = 'in_progress' THEN 1 END) as in_progress_tasks,
        COUNT(CASE WHEN status = 'todo' THEN 1 END) as todo_tasks,
        SUM(estimated_hours) as total_estimated_hours,
        SUM(time_spent) as total_time_spent
      FROM tasks 
      WHERE project_id = $1
    `, [id]);
    
    const stats = statsResult.rows[0];
    const progress = stats.total_tasks > 0 ? Math.round((stats.completed_tasks / stats.total_tasks) * 100) : 0;
    
    res.json({
      ...stats,
      progress_percentage: progress
    });
  } catch (error) {
    console.error('Error fetching project stats:', error);
    res.status(500).json({ error: 'Failed to fetch project statistics' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();

const pool = new Pool({
  user: 'projectm',
  host: 'localhost',
  database: 'projectmdb',
  password: 'projectm',
  port: 5432,
});

app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.send('API is running');
});

// Get all projects (with tasks)
app.get('/api/projects', async (req, res) => {
  try {
    const projectsResult = await pool.query('SELECT * FROM "Project"');
    const projects = projectsResult.rows;
    for (const project of projects) {
      const tasksResult = await pool.query('SELECT * FROM "Task" WHERE "projectId" = $1', [project.id]);
      project.tasks = tasksResult.rows;
    }
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// Create a new project
app.post('/api/projects', async (req, res) => {
  const { name, description, deadline } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO "Project" (name, description, deadline) VALUES ($1, $2, $3) RETURNING *',
      [name, description, deadline]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// Get a single project (with tasks)
app.get('/api/projects/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const projectResult = await pool.query('SELECT * FROM "Project" WHERE id = $1', [id]);
    if (projectResult.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }
    const project = projectResult.rows[0];
    const tasksResult = await pool.query('SELECT * FROM "Task" WHERE "projectId" = $1', [id]);
    project.tasks = tasksResult.rows;
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

// Create a new task
app.post('/api/tasks', async (req, res) => {
  const { title, description, deadline, status, projectId, assignedToId } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO "Task" (title, description, deadline, status, "projectId", "assignedToId") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [title, description, deadline, status || 'todo', projectId, assignedToId]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// Update a task
app.put('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, deadline, status, assignedToId } = req.body;
  try {
    const result = await pool.query(
      'UPDATE "Task" SET title = COALESCE($1, title), description = COALESCE($2, description), deadline = COALESCE($3, deadline), status = COALESCE($4, status), "assignedToId" = COALESCE($5, "assignedToId") WHERE id = $6 RETURNING *',
      [title, description, deadline, status, assignedToId, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// Delete a task
app.delete('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM "Task" WHERE id = $1', [id]);
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 
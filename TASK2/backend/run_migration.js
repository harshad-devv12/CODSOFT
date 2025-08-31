const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

async function runMigration() {
  try {
    console.log('Running database migration...');
    
    // Check if user_id column already exists
    const checkColumn = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'projects' AND column_name = 'user_id'
    `);
    
    if (checkColumn.rows.length > 0) {
      console.log('user_id column already exists in projects table');
      return;
    }
    
    // Add user_id column to projects table
    await pool.query('ALTER TABLE projects ADD COLUMN user_id UUID');
    console.log('✓ Added user_id column to projects table');
    
    // Add index on user_id for better query performance
    await pool.query('CREATE INDEX idx_projects_user_id ON projects(user_id)');
    console.log('✓ Created index on user_id column');
    
    // Add comment to document the purpose
    await pool.query("COMMENT ON COLUMN projects.user_id IS 'References the Supabase Auth user ID who owns this project'");
    console.log('✓ Added comment to user_id column');
    
    console.log('\nMigration completed successfully!');
    console.log('Note: Existing projects will have NULL user_id values.');
    console.log('You may need to assign them to users or clean them up based on your requirements.');
    
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await pool.end();
  }
}

runMigration();

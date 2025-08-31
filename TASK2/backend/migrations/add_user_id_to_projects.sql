-- Migration: Add user_id column to projects table for user data isolation
-- This enables each user to only see and manage their own projects

-- Add user_id column to projects table
ALTER TABLE projects ADD COLUMN IF NOT EXISTS user_id UUID;

-- Add index on user_id for better query performance
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);

-- Optionally, you can also add a comment to document the purpose
COMMENT ON COLUMN projects.user_id IS 'References the Supabase Auth user ID who owns this project';

-- Note: After running this migration, existing projects will have NULL user_id values
-- You may need to manually assign them or clean them up based on your requirements

-- Example to assign existing projects to a specific user (replace 'your-user-id' with actual user ID):
-- UPDATE projects SET user_id = 'your-user-id' WHERE user_id IS NULL;

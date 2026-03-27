-- Cognito Job Mela Registration Database Schema
-- This SQL code defines the structure for storing registration data.

CREATE TABLE registrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    father_name TEXT NOT NULL,
    date_of_birth DATE NOT NULL,
    gender TEXT NOT NULL,
    mobile TEXT NOT NULL,
    email TEXT NOT NULL,
    aadhaar TEXT NOT NULL,
    qualification TEXT NOT NULL,
    specialization TEXT NOT NULL,
    year_of_passing INTEGER NOT NULL,
    percentage TEXT NOT NULL,
    applying_for TEXT NOT NULL,
    experience_level TEXT NOT NULL,
    skills TEXT NOT NULL,
    preferred_location TEXT NOT NULL,
    job_mela_city TEXT,
    resume_filename TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Example Insert Query
-- INSERT INTO registrations (full_name, father_name, email, mobile, ...) 
-- VALUES ('John Doe', 'Richard Doe', 'john@example.com', '9876543210', ...);

-- Example Select Query
-- SELECT * FROM registrations ORDER BY created_at DESC;

# Database Migrations

This directory contains Supabase database migrations for the Cleftix application.

## Applied Migrations

### create_initial_schema
Creates the foundational database schema for the application.

**Tables Created:**

1. **predictions** - Stores cleft lip prediction results
   - id (uuid, primary key)
   - image_data (text) - Base64 encoded image
   - prediction (text) - Prediction result
   - confidence (decimal) - Confidence score
   - details (text) - Analysis details
   - created_at (timestamptz)

2. **appointments** - Stores appointment/callback requests
   - id (uuid, primary key)
   - name (text)
   - phone (text)
   - city (text)
   - preferred_time (text)
   - status (text) - Default: 'pending'
   - created_at (timestamptz)

3. **chat_sessions** - Stores AI chatbot conversations
   - id (uuid, primary key)
   - messages (jsonb) - Array of chat messages
   - created_at (timestamptz)
   - updated_at (timestamptz)

**Security:**
- Row Level Security (RLS) enabled on all tables
- Public access policies configured for anonymous users
- Production deployments should restrict policies based on authentication

## Viewing Data

You can query the tables using the Supabase dashboard or the execute_sql tool:

```sql
-- View all predictions
SELECT * FROM predictions ORDER BY created_at DESC;

-- View all appointments
SELECT * FROM appointments ORDER BY created_at DESC;

-- View chat sessions
SELECT * FROM chat_sessions ORDER BY created_at DESC;
```

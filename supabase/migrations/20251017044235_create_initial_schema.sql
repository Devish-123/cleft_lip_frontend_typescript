/*
  # Initial Schema for Cleftix Application

  ## Overview
  This migration creates the foundational tables for the Cleftix medical application which helps with cleft lip diagnosis and consultation booking.

  ## New Tables Created
  
  ### 1. `predictions`
  Stores cleft lip prediction results from ultrasound image analysis
  - `id` (uuid, primary key) - Unique identifier for each prediction
  - `image_data` (text) - Base64 encoded ultrasound image
  - `prediction` (text) - Prediction result (e.g., "Cleft Lip Detected" or "No Cleft Lip Detected")
  - `confidence` (decimal) - Confidence score of the prediction (0-100)
  - `details` (text) - Additional analysis details
  - `created_at` (timestamptz) - Timestamp when prediction was made
  
  ### 2. `appointments`
  Stores appointment/callback requests from users seeking expert consultation
  - `id` (uuid, primary key) - Unique identifier for each appointment
  - `name` (text) - Patient/user name
  - `phone` (text) - Contact phone number
  - `city` (text) - Selected city for consultation
  - `preferred_time` (text) - Preferred callback time slot
  - `status` (text) - Appointment status (pending, contacted, completed)
  - `created_at` (timestamptz) - Timestamp when appointment was requested

  ### 3. `chat_sessions`
  Stores AI chatbot conversation sessions for tracking and analytics
  - `id` (uuid, primary key) - Unique identifier for each chat session
  - `messages` (jsonb) - Array of chat messages with role and text
  - `created_at` (timestamptz) - Session start timestamp
  - `updated_at` (timestamptz) - Last message timestamp

  ## Security Configuration
  
  ### Row Level Security (RLS)
  - All tables have RLS enabled for data protection
  - Public read/write policies are created as the app doesn't require authentication
  - In production, these policies should be restricted based on authentication

  ## Important Notes
  - Default values are set for timestamps and status fields
  - UUID generation uses gen_random_uuid() for unique identifiers
  - JSONB is used for flexible message storage in chat sessions
*/

-- Create predictions table
CREATE TABLE IF NOT EXISTS predictions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_data text,
  prediction text NOT NULL,
  confidence decimal(5,2) NOT NULL,
  details text,
  created_at timestamptz DEFAULT now()
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  city text NOT NULL,
  preferred_time text NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Create chat_sessions table
CREATE TABLE IF NOT EXISTS chat_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  messages jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (adjust for production)
CREATE POLICY "Allow public to insert predictions"
  ON predictions FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public to read predictions"
  ON predictions FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public to insert appointments"
  ON appointments FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public to read appointments"
  ON appointments FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public to insert chat sessions"
  ON chat_sessions FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public to read chat sessions"
  ON chat_sessions FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public to update chat sessions"
  ON chat_sessions FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

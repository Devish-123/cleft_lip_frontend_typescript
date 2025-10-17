# Cleftix - Cleft Lip Detection & Information Platform

A medical application that helps detect cleft lip from ultrasound images and provides comprehensive information about the condition through an AI-powered chatbot.

## Project Structure

```
cleftix/
├── frontend/          # React + Vite frontend application
│   ├── components/    # React components
│   ├── .env          # Environment variables (Supabase config)
│   └── package.json
├── backend/           # Supabase backend
│   ├── supabase/
│   │   ├── functions/    # Edge Functions (API endpoints)
│   │   └── migrations/   # Database migrations
│   └── package.json
└── README.md
```

## Features

1. **Cleft Lip Prediction** - Upload ultrasound images and get AI-powered analysis using Google Gemini
2. **AI Chatbot** - Ask questions about Cleft Lip Syndrome and get informed answers
3. **Expert Consultation** - Book appointments and request callbacks from medical professionals
4. **Emergency Resources** - Access emergency contact information and nearby hospitals
5. **Educational Content** - Learn about causes, treatment, and outcomes

## Technology Stack

### Frontend
- React 19
- Vite
- TailwindCSS
- TypeScript

### Backend
- Supabase (Database + Edge Functions)
- PostgreSQL
- Google Gemini AI
- Deno (Edge Functions runtime)

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Supabase account
- Google Gemini API key

### Installation

1. **Install frontend dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Configure environment variables:**

   The `.env` file in the `frontend` directory contains:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Set up Gemini API Key:**

   The `GEMINI_API_KEY` environment variable is automatically configured in Supabase Edge Functions.

### Running the Application

**Development:**
```bash
cd frontend
npm run dev
```

The app will be available at `http://localhost:5173`

**Production Build:**
```bash
cd frontend
npm run build
```

## Backend Setup

The backend uses Supabase and is already configured with:

1. **Database Tables:**
   - `predictions` - Stores ultrasound analysis results
   - `appointments` - Stores consultation booking requests
   - `chat_sessions` - Stores chatbot conversation history

2. **Edge Functions:**
   - `/functions/v1/predict` - Analyzes ultrasound images
   - `/functions/v1/chat` - AI chatbot with streaming responses

All edge functions are deployed and accessible via the Supabase URL.

## API Endpoints

### Prediction API
```
POST {SUPABASE_URL}/functions/v1/predict
Authorization: Bearer {SUPABASE_ANON_KEY}

Body:
{
  "image": "base64_encoded_image",
  "mimeType": "image/jpeg"
}
```

### Chat API
```
POST {SUPABASE_URL}/functions/v1/chat
Authorization: Bearer {SUPABASE_ANON_KEY}

Body:
{
  "message": "Your question here",
  "history": []
}
```

## Database Schema

See `backend/supabase/migrations/README.md` for detailed schema documentation.

## Security

- Row Level Security (RLS) enabled on all database tables
- Anonymous access policies configured for public features
- API keys managed through Supabase environment variables
- CORS properly configured on all Edge Functions

## Contributing

This is a medical application. Any contributions should be reviewed by medical professionals before deployment.

## License

This project is for educational and demonstration purposes.

# Cleftix Edge Functions

This directory contains Supabase Edge Functions for the Cleftix application.

## Available Functions

### 1. predict
**Endpoint:** `{SUPABASE_URL}/functions/v1/predict`

Analyzes ultrasound images for cleft lip detection using Google Gemini AI.

**Request:**
```json
{
  "image": "base64_encoded_image",
  "mimeType": "image/jpeg"
}
```

**Response:**
```json
{
  "prediction": "Cleft Lip Detected" | "No Cleft Lip Detected",
  "confidence": 85.5,
  "details": "Detailed analysis of the ultrasound image..."
}
```

### 2. chat
**Endpoint:** `{SUPABASE_URL}/functions/v1/chat`

AI chatbot for answering questions about Cleft Lip Syndrome using Google Gemini AI with streaming responses.

**Request:**
```json
{
  "message": "What is Cleft Lip?",
  "history": [
    { "role": "user", "text": "previous message" },
    { "role": "model", "text": "previous response" }
  ]
}
```

**Response:**
Streaming text response with medical information about cleft lip.

## Environment Variables

Both functions require the following environment variable:
- `GEMINI_API_KEY` - Your Google Gemini API key (automatically configured)

The functions also use these Supabase environment variables (automatically available):
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

## CORS Configuration

All functions are configured with CORS headers to allow cross-origin requests:
- Access-Control-Allow-Origin: *
- Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
- Access-Control-Allow-Headers: Content-Type, Authorization, X-Client-Info, Apikey

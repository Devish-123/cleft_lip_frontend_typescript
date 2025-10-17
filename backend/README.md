# Cleftix Backend

This backend uses Supabase for:
- Database (PostgreSQL)
- Edge Functions (serverless functions)
- Authentication
- Storage

## Structure

```
backend/
├── supabase/
│   ├── functions/        # Edge Functions
│   └── migrations/       # Database migrations
└── README.md
```

## Supabase Configuration

The backend connects to Supabase using environment variables defined in the frontend `.env` file:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## Edge Functions

Edge functions are deployed using the Supabase deployment tools and are stored in `supabase/functions/`.

## Database

Database schema and migrations are managed through Supabase migrations in `supabase/migrations/`.

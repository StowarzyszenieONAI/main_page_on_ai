# Contact Form Setup Instructions

This contact form integrates with both email sending (via Resend) and Google Sheets for data storage.

## Required Environment Variables

### Supabase (Already configured)
- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key

### Email Service (Resend)
- `RESEND_API_KEY` - Your Resend API key

### Google Sheets Integration
- `GOOGLE_SHEETS_API_KEY` - Google Cloud API key
- `GOOGLE_SHEETS_SPREADSHEET_ID` - ID of your Google Sheets spreadsheet

## Setup Instructions

### 1. Email Service (Resend)
1. Go to [resend.com](https://resend.com) and create an account
2. Verify your domain `on-ai.pl` in the Resend dashboard
3. Generate an API key
4. Add the API key to your Supabase Edge Function environment variables as `RESEND_API_KEY`

### 2. Google Sheets Setup
1. Create a Google Cloud Project at [console.cloud.google.com](https://console.cloud.google.com)
2. Enable the Google Sheets API
3. Create an API key (restrict it to Google Sheets API for security)
4. Create a new Google Sheets spreadsheet
5. Name the spreadsheet: "Messages from the ON.AI website"
6. Add the following headers in row 1:
   - A1: Date
   - B1: Name
   - C1: Email
   - D1: Subject
   - E1: Message
7. Make the spreadsheet publicly accessible:
   - Click "Share" → "Change to anyone with the link"
   - Set permission to "Editor"
8. Copy the spreadsheet ID from the URL (the long string between `/d/` and `/edit`)
9. Add both `GOOGLE_SHEETS_API_KEY` and `GOOGLE_SHEETS_SPREADSHEET_ID` to your Supabase Edge Function environment variables

### 3. Supabase Edge Function Environment Variables
Add these environment variables in your Supabase dashboard:
- Go to Project Settings → Edge Functions
- Add the environment variables:
  - `RESEND_API_KEY`
  - `GOOGLE_SHEETS_API_KEY`
  - `GOOGLE_SHEETS_SPREADSHEET_ID`

## Features

### Email Functionality
- Sends formatted HTML emails to `biuro@on-ai.pl`
- Includes sender's contact information
- Professional styling matching ON.AI brand
- Reply-to field set to sender's email
- XSS protection through input sanitization

### Google Sheets Integration
- Automatically saves form submissions to spreadsheet
- Includes timestamp, name, email, subject, and message
- Handles API errors gracefully

### Security Features
- Input validation and sanitization
- CORS protection
- Rate limiting (inherent in Supabase Edge Functions)
- Email format validation
- XSS prevention

### User Experience
- Real-time form validation
- Character limits on inputs
- Loading states during submission
- Success/error messages in Polish
- Responsive design
- Accessibility features

## Error Handling

The system is designed to be resilient:
- If email fails but Google Sheets succeeds: Shows success message
- If Google Sheets fails but email succeeds: Shows success message
- If both fail: Shows error message asking user to try again
- All errors are logged for debugging

## Testing

To test the contact form:
1. Fill out all required fields
2. Submit the form
3. Check that:
   - Email arrives at `biuro@on-ai.pl`
   - New row appears in Google Sheets
   - Success message displays on website

## Maintenance

- Monitor Resend dashboard for email delivery statistics
- Check Google Sheets for form submissions
- Review Supabase Edge Function logs for any errors
- Update API keys as needed (they don't expire but can be rotated for security)
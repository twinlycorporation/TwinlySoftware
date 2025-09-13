# Email Setup Instructions

## Overview
The "Talk to Sales" popup is now implemented and ready to use! Here's how to set up email functionality.

## Current Status
✅ Popup form created with all required fields
✅ Form validation implemented
✅ API endpoint created
✅ Integration with pricing page complete

## Email Setup Options

### Option 1: SendGrid (Recommended)
1. Sign up for SendGrid account
2. Get your API key
3. Create `.env.local` file in the frontend directory:
```env
SENDGRID_API_KEY=your_sendgrid_api_key_here
SALES_EMAIL=sales@twinly.com
FROM_EMAIL=noreply@twinly.com
```
4. Install SendGrid: `npm install @sendgrid/mail`
5. Uncomment the SendGrid code in `/src/app/api/sales-inquiry/route.ts`

### Option 2: Resend (Modern & Easy)
1. Sign up for Resend account
2. Get your API key
3. Create `.env.local` file:
```env
RESEND_API_KEY=your_resend_api_key_here
SALES_EMAIL=sales@twinly.com
FROM_EMAIL=noreply@twinly.com
```
4. Install Resend: `npm install resend`
5. Use the Resend function in the API route

### Option 3: SMTP (Gmail/Outlook)
1. Create `.env.local` file:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
SALES_EMAIL=sales@twinly.com
FROM_EMAIL=noreply@twinly.com
```
2. Install Nodemailer: `npm install nodemailer`
3. Use the Nodemailer function in the API route

### Option 4: CSV File (Simple)
1. The CSV saving function is already implemented
2. Data will be saved to `sales-inquiries.csv` in your project root
3. No additional setup required

## Form Fields Collected
- ✅ Full Name (required)
- ✅ Email Address (required, validated)
- ✅ Phone Number (required)
- ✅ Company Name (required)
- ✅ Company Size (required, dropdown)

## Testing
1. Start your development server: `npm run dev`
2. Go to http://localhost:3000/pricing
3. Click "Talk to sales" button
4. Fill out the form and submit
5. Check your email or CSV file for the data

## Next Steps
1. Choose an email service and set up the environment variables
2. Uncomment the appropriate email sending code in the API route
3. Test the complete flow
4. Deploy to production

## Production Considerations
- Set up proper email templates
- Add rate limiting to prevent spam
- Consider adding a database to store inquiries
- Set up email notifications for your sales team
- Add analytics to track conversion rates

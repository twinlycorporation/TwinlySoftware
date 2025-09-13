# Gmail Email Setup for Sales Inquiries

## Quick Setup Instructions

### Step 1: Create Environment File
Create a file called `.env.local` in your `frontend` folder with this content:

```env
GMAIL_APP_PASSWORD=your_app_password_here
```

### Step 2: Generate Gmail App Password

1. **Go to your Google Account**: https://myaccount.google.com/
2. **Click on Security** (left sidebar)
3. **Enable 2-Factor Authentication** if not already enabled
4. **Go to App Passwords**:
   - Click on "2-Step Verification"
   - Scroll down to "App passwords"
   - Click "App passwords"
5. **Generate App Password**:
   - Select "Mail" as the app
   - Select "Other" as the device
   - Enter "Twinly Sales Form" as the name
   - Click "Generate"
6. **Copy the 16-character password** (it will look like: `abcd efgh ijkl mnop`)

### Step 3: Update Environment File
Replace `your_app_password_here` in `.env.local` with the generated password:

```env
GMAIL_APP_PASSWORD=abcd efgh ijkl mnop
```

### Step 4: Restart Your Server
```bash
npm run dev
```

## Testing

1. Go to `http://localhost:3000/pricing`
2. Click "Talk to sales"
3. Fill out the form
4. Submit
5. Check `mohid2007zk@gmail.com` for the email!

## Email Content

The email will contain:
- **Subject**: "New Sales Inquiry - Twinly"
- **From**: mohid2007zk@gmail.com
- **To**: mohid2007zk@gmail.com
- **Content**: All form data in a nice HTML format

## Troubleshooting

### If emails don't send:
1. Check the console for error messages
2. Verify the App Password is correct
3. Make sure 2-Factor Authentication is enabled
4. Check that the `.env.local` file is in the `frontend` folder

### Alternative: Use a different email service
If Gmail doesn't work, you can use:
- **SendGrid** (recommended for production)
- **Mailgun**
- **AWS SES**
- **Resend**

## Current Status
✅ Nodemailer installed
✅ Email code implemented
✅ CSV backup still works
⏳ Need to set up Gmail App Password

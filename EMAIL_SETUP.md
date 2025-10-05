# Email Setup Guide

This guide will help you configure email functionality for the contact form.

## Required Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM_NAME=Samara H&H

# Admin email to receive contact form notifications
ADMIN_EMAIL=chetkuba@gmail.com
```

## Gmail Setup (Recommended)

### 1. Enable 2-Factor Authentication
- Go to your Google Account settings
- Enable 2-Factor Authentication

### 2. Generate App Password
- Go to Google Account → Security → 2-Step Verification
- Scroll down to "App passwords"
- Generate a new app password for "Mail"
- Use this password as `SMTP_PASS`

### 3. Configure Environment Variables
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-16-character-app-password
SMTP_FROM_NAME=Samara H&H
ADMIN_EMAIL=chetkuba@gmail.com
```

## Alternative Email Providers

### Outlook/Hotmail
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-password
```

### Yahoo Mail
```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@yahoo.com
SMTP_PASS=your-app-password
```

### Custom SMTP Server
```env
SMTP_HOST=your-smtp-server.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@yourdomain.com
SMTP_PASS=your-password
```

## Testing Email Functionality

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Go to the contact page and submit a test form

3. Check your email inbox for:
   - Admin notification email (sent to `ADMIN_EMAIL`)
   - Customer confirmation email (sent to the form submitter)

## Troubleshooting

### Common Issues

1. **Authentication Failed**
   - Verify your email and password
   - For Gmail, ensure you're using an App Password, not your regular password
   - Check if 2FA is enabled

2. **Connection Timeout**
   - Verify the SMTP host and port
   - Check your firewall settings
   - Try different ports (465 for SSL, 587 for TLS)

3. **Emails Not Sending**
   - Check the server logs for error messages
   - Verify all environment variables are set correctly
   - Test with a different email provider

### Debug Mode

To enable detailed logging, add this to your `.env.local`:
```env
NODE_ENV=development
```

## Production Deployment

For production deployment, set these environment variables in your hosting platform:

- **Vercel**: Add environment variables in the Vercel dashboard
- **Netlify**: Add environment variables in Site settings
- **Railway**: Add environment variables in the Railway dashboard

## Security Notes

- Never commit your `.env.local` file to version control
- Use strong, unique passwords for email accounts
- Consider using a dedicated email service (SendGrid, Mailgun) for production
- Regularly rotate your app passwords

## Email Templates

The system includes two email templates:

1. **Admin Notification**: Sent to the admin when a form is submitted
2. **Customer Confirmation**: Sent to the customer as confirmation

Both templates are HTML-formatted and include:
- Professional styling
- Company branding
- Contact information
- Clear messaging

## Support

If you encounter issues:
1. Check the server logs for error messages
2. Verify all environment variables are correctly set
3. Test with a different email provider
4. Ensure your hosting platform supports SMTP connections

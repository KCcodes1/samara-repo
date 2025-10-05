# GitHub OAuth Setup Guide for Decap CMS

This guide will help you set up GitHub OAuth authentication for the Decap CMS integration.

## Step 1: Create GitHub OAuth App

1. Go to [GitHub Settings > Developer settings > OAuth Apps](https://github.com/settings/applications/new)
2. Click "New OAuth App"
3. Fill in the details:
   - **Application name**: `Samara House & Homes CMS`
   - **Homepage URL**: `http://localhost:3000` (for development)
   - **Authorization callback URL**: `http://localhost:3000/api/decap/callback`
4. Click "Register application"
5. Copy the **Client ID** and generate a **Client Secret**

## Step 2: Set Up Environment Variables

Create a `.env.local` file in the root directory with the following content:

```bash
# GitHub OAuth Configuration
GITHUB_CLIENT_ID=your_github_oauth_app_client_id
GITHUB_CLIENT_SECRET=your_github_oauth_app_client_secret

# Site URL - Update this for production
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Replace `your_github_oauth_app_client_id` and `your_github_oauth_app_client_secret` with the values from Step 1.

## Step 3: Update Repository Configuration

In `app/api/decap/config/route.ts`, update the repository name:

```typescript
repo: "your-username/your-repo-name", // Replace with your actual GitHub repo
```

## Step 4: Test the Setup

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000/admin`

3. Click "Login with GitHub"

4. Authorize the application

5. You should be redirected back to the CMS interface

## Troubleshooting

### Common Issues

1. **"Missing GITHUB_CLIENT_ID" error**
   - Make sure `.env.local` exists and has the correct values
   - Restart the development server after creating `.env.local`

2. **OAuth popup doesn't close or redirects to login page**
   - Check browser console for errors
   - Verify the callback URL in GitHub OAuth App settings matches exactly
   - Ensure `NEXT_PUBLIC_SITE_URL` is set correctly

3. **"Invalid state" error**
   - Clear browser cookies and try again
   - Check that the OAuth flow is not being interrupted

4. **CMS doesn't load after authentication**
   - Check browser console for JavaScript errors
   - Verify the dynamic config endpoint is working: `http://localhost:3000/api/decap/config`

### Debug Steps

1. Open browser developer tools
2. Check the Console tab for error messages
3. Check the Network tab to see if API calls are successful
4. Verify environment variables are loaded: `http://localhost:3000/api/decap/auth` should not show "Missing GITHUB_CLIENT_ID"

## Production Deployment

For production:

1. Update GitHub OAuth App settings:
   - **Homepage URL**: `https://yourdomain.com`
   - **Authorization callback URL**: `https://yourdomain.com/api/decap/callback`

2. Set environment variables in your hosting platform:
   - `GITHUB_CLIENT_ID`
   - `GITHUB_CLIENT_SECRET`
   - `NEXT_PUBLIC_SITE_URL=https://yourdomain.com`

3. Update the repository name in `app/api/decap/config/route.ts` if needed

## Security Notes

- Never commit `.env.local` to version control
- Use strong, unique Client Secrets
- Regularly rotate OAuth credentials
- Ensure HTTPS in production

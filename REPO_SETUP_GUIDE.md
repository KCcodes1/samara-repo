# GitHub Repository Setup Guide for Decap CMS

This guide will help you create the necessary folder structure in your GitHub repository for the Decap CMS to work properly.

## Prerequisites

- GitHub account
- Access to create repositories or the `KCcodes1/samara-repo` repository

## Step 1: Access Your Repository

1. Go to [GitHub](https://github.com)
2. Navigate to `https://github.com/KCcodes1/samara-repo`
3. If the repository doesn't exist, create it:
   - Click "New repository"
   - Name: `samara-repo`
   - Make it **Public** (required for OAuth)
   - Initialize with README

## Step 2: Create Folder Structure

You need to create the following folder structure in your repository:

```
content/
├── categories/
├── pages/
├── products/
└── projects/
```

### Method A: Using GitHub Web Interface

1. **Create the main content folder**:
   - Click "Add file" → "Create new file"
   - Type `content/README.md`
   - Add content: `# Content Folder\nThis folder contains all CMS content.`
   - Commit with message: "Add content folder structure"

2. **Create subfolders**:
   - Navigate to the `content` folder
   - Create each subfolder by adding a file:
     - `content/categories/README.md`
     - `content/pages/README.md`
     - `content/products/README.md`
     - `content/projects/README.md`

### Method B: Using Git Commands (Advanced)

```bash
# Clone the repository
git clone https://github.com/KCcodes1/samara-repo.git
cd samara-repo

# Create folder structure
mkdir -p content/{categories,pages,products,projects}

# Create placeholder files
touch content/categories/README.md
touch content/pages/README.md
touch content/products/README.md
touch content/projects/README.md

# Commit and push
git add .
git commit -m "Add content folder structure"
git push origin main
```

## Step 3: Upload Existing Content Files

Upload these files from your local project to the corresponding folders:

### Categories
- Upload: `content/categories/categories.json`

### Pages
- Upload: `content/pages/home.md`
- Upload: `content/pages/about.md`
- Upload: `content/pages/services.md`

### Products
- Upload: `content/products/linen-sheer-curtain.md`
- Upload: `content/products/rattan-armchair.md`

### Projects
- Upload: `content/projects/scandi-living-room.md`

## Step 4: Verify Repository Structure

Your repository should now have this structure:

```
samara-repo/
├── README.md
└── content/
    ├── categories/
    │   └── categories.json
    ├── pages/
    │   ├── about.md
    │   ├── home.md
    │   └── services.md
    ├── products/
    │   ├── linen-sheer-curtain.md
    │   └── rattan-armchair.md
    └── projects/
        └── scandi-living-room.md
```

## Step 5: Update Configuration

1. **Update `public/config.yml`** (if needed):
   ```yaml
   backend:
     name: github
     repo: KCcodes1/samara-repo  # Make sure this matches your repo
     branch: main
   ```

2. **Create `.env.local`** in your project root:
   ```bash
   GITHUB_CLIENT_ID=your_github_client_id_here
   GITHUB_CLIENT_SECRET=your_github_client_secret_here
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

## Step 6: Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Go to `http://localhost:3000/admin.html`

3. Authenticate with GitHub

4. Try creating a new product to test the setup

## Troubleshooting

### 404 Error on Repository
- Verify the repository name in `config.yml` matches your actual repository
- Ensure the repository is public
- Check that the `content` folder exists in the repository

### Authentication Issues
- Verify your GitHub OAuth app is set up correctly
- Check that the callback URL is `http://localhost:3000/api/decap/callback`
- Ensure your environment variables are set correctly

### File Upload Issues
- The CSP issues should be resolved with the updated `next.config.mjs`
- Check browser console for any remaining errors

## Next Steps

Once the repository structure is set up:

1. Test creating a new product in the CMS
2. Test uploading images
3. Verify that changes are saved to your GitHub repository
4. Set up your production environment variables for deployment

## Support

If you encounter issues:
1. Check the browser console for errors
2. Verify your GitHub repository structure matches the requirements
3. Ensure all environment variables are set correctly
4. Test with a simple text file first before trying complex content

# Decap CMS Integration Test Plan

This document provides a comprehensive test plan to verify the Decap CMS integration with GitHub backend is working correctly end-to-end.

## Prerequisites

Before running tests, ensure you have:

1. ✅ Created a GitHub OAuth App with correct callback URLs
2. ✅ Set up environment variables in `.env.local`
3. ✅ Updated `public/admin/config.yml` with your repository details
4. ✅ All editors have push access to the GitHub repository
5. ✅ Development server running (`npm run dev`)

## Test Plan

### A. OAuth & Authentication

#### Test A1: CMS Access
- [ ] Navigate to `http://localhost:3000/admin`
- [ ] Verify Decap CMS interface loads correctly
- [ ] Check that "Login with GitHub" button is visible
- [ ] Confirm no JavaScript errors in browser console

#### Test A2: GitHub OAuth Flow
- [ ] Click "Login with GitHub" button
- [ ] Verify OAuth popup window opens
- [ ] Confirm popup redirects to GitHub authorization page
- [ ] Authorize the application on GitHub
- [ ] Verify popup closes automatically after authorization
- [ ] Confirm CMS interface shows authenticated state
- [ ] Check that collections (Pages, Categories, Products, Projects) are visible

#### Test A3: Authentication Error Handling
- [ ] Test with invalid GitHub OAuth App credentials
- [ ] Verify appropriate error messages are displayed
- [ ] Test OAuth state validation (CSRF protection)
- [ ] Confirm secure cookie handling

### B. Content Management - Products

#### Test B1: Create New Product
- [ ] Navigate to Products collection in CMS
- [ ] Click "New Product" button
- [ ] Fill in required fields:
  - Title: "Test Product"
  - Slug: "test-product"
  - Price: 1500
- [ ] Add optional fields:
  - Categories: ["test-category"]
  - Tags: ["test", "demo"]
  - Description: "This is a test product"
  - Upload test image(s)
- [ ] Save as Draft
- [ ] Verify success message appears
- [ ] Check GitHub repository for new commit

#### Test B2: Publish Product
- [ ] Open the draft product from Test B1
- [ ] Click "Publish" button
- [ ] Verify publish success message
- [ ] Check GitHub repository for new commit with published content
- [ ] Verify product appears in `/catalogue` page
- [ ] Confirm product detail page loads at `/catalogue/test-product`

#### Test B3: Edit Existing Product
- [ ] Open an existing product in CMS
- [ ] Modify title, price, or description
- [ ] Save changes
- [ ] Verify changes appear on the website after refresh

### C. Content Management - Projects

#### Test C1: Create New Project
- [ ] Navigate to Projects collection in CMS
- [ ] Click "New Project" button
- [ ] Fill in required fields:
  - Title: "Test Project"
  - Slug: "test-project"
- [ ] Add optional fields:
  - Location: "Test Location"
  - Style: "Test Style"
  - Upload cover image
  - Upload gallery images
  - Add project description in markdown
- [ ] Save and publish
- [ ] Verify project appears in `/projects` page
- [ ] Confirm project detail page loads at `/projects/test-project`

### D. Content Management - Pages

#### Test D1: Edit Home Page
- [ ] Navigate to Pages collection
- [ ] Open "Home" page
- [ ] Modify hero title or subtitle
- [ ] Save changes
- [ ] Verify changes appear on homepage

#### Test D2: Edit About Page
- [ ] Open "About" page in CMS
- [ ] Update page content
- [ ] Save and publish
- [ ] Verify changes appear on `/about` page

### E. Media Management

#### Test E1: Image Upload
- [ ] In any collection, upload a new image
- [ ] Verify image appears in CMS preview
- [ ] Check that image file is created in `public/uploads/` directory
- [ ] Confirm image is accessible via direct URL

#### Test E2: Image Deletion
- [ ] Remove an image from content
- [ ] Save changes
- [ ] Verify image file is removed from repository (if applicable)

### F. Editorial Workflow

#### Test F1: Draft System
- [ ] Create content and save as draft
- [ ] Verify draft is not visible on public site
- [ ] Publish the draft
- [ ] Confirm content becomes visible on public site

#### Test F2: Content Validation
- [ ] Test saving content with missing required fields
- [ ] Verify appropriate validation errors are shown
- [ ] Test with invalid data formats

### G. GitHub Integration

#### Test G1: Commit Verification
- [ ] Make changes through CMS
- [ ] Check GitHub repository commits
- [ ] Verify commit messages are descriptive
- [ ] Confirm file changes are correct

#### Test G2: Multiple Editors
- [ ] Have another user with repository access test login
- [ ] Verify they can create and publish content
- [ ] Check for merge conflicts if both users edit simultaneously

### H. Production Deployment

#### Test H1: Environment Configuration
- [ ] Set `NEXT_PUBLIC_SITE_URL` to production domain
- [ ] Update GitHub OAuth App callback URL for production
- [ ] Test OAuth flow on production site

#### Test H2: Build Process
- [ ] Verify `npm run build` completes successfully
- [ ] Check that CMS admin interface is accessible in production
- [ ] Confirm content changes trigger new builds (if using Vercel/Netlify)

### I. Security & Performance

#### Test I1: Security
- [ ] Verify OAuth state parameter prevents CSRF attacks
- [ ] Check that admin interface is not indexed by search engines
- [ ] Confirm secure cookie settings in production

#### Test I2: Performance
- [ ] Test CMS loading speed
- [ ] Verify image uploads don't block interface
- [ ] Check that large content saves successfully

## Troubleshooting Common Issues

### Login Loops or Failures
1. Check browser console for JavaScript errors
2. Verify `.env.local` has correct `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`
3. Confirm GitHub OAuth App callback URL matches exactly
4. Ensure `NEXT_PUBLIC_SITE_URL` is set correctly

### Content Not Appearing on Site
1. Check if content was actually published (not just saved as draft)
2. Verify GitHub repository has new commits
3. If using Vercel/Netlify, check if new build was triggered
4. For local development, run `git pull` to sync changes

### Image Upload Issues
1. Verify `public/uploads` directory exists and is writable
2. Check file permissions on upload directory
3. Confirm image file formats are supported

### Build Failures
1. Run `npm run type-check` to identify TypeScript errors
2. Check `npm run lint` for code quality issues
3. Verify all environment variables are set correctly

## Success Criteria

✅ **All tests pass** when:
- OAuth authentication works seamlessly
- Content can be created, edited, and published through CMS
- Changes appear on the website within expected timeframe
- GitHub repository receives proper commits
- Multiple users can collaborate without conflicts
- Production deployment works correctly
- No security vulnerabilities are introduced

## Rollback Plan

If issues are discovered:
1. Revert to previous commit before CMS integration
2. Remove environment variables from production
3. Update GitHub OAuth App settings if needed
4. Communicate with content editors about temporary manual editing

---

**Note**: This test plan should be executed in a staging environment before deploying to production. Keep this document updated as new features or issues are discovered.

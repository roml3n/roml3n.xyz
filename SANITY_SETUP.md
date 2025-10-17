# Sanity CMS Setup Guide for roml3n.xyz

## Overview
This guide will help you set up Sanity CMS to manage your blog posts and case studies without needing to redeploy your application.

## Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- A Sanity account (free at [sanity.io](https://sanity.io))

## Step 1: Install Dependencies
```bash
npm install @sanity/client @sanity/image-url @portabletext/react next-sanity
```

## Step 2: Create Sanity Project
1. Go to [sanity.io](https://sanity.io) and create an account
2. Create a new project
3. Choose "Clean project with no predefined schemas"
4. Note down your Project ID and Dataset name

## Step 3: Configure Environment Variables
1. Copy `env.example` to `.env.local`
2. Update the values:
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your-actual-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-read-token
```

## Step 4: Initialize Sanity Studio
```bash
npx sanity@latest init --env
```
- Choose "Yes" to create a new project
- Select your project
- Choose "Clean project with no predefined schemas"
- Select "Yes" to use the default dataset configuration

## Step 5: Start Sanity Studio
```bash
npx sanity dev
```
This will start the content management interface at `http://localhost:3333`

## Step 6: Access Studio in Your App
Once deployed, access your studio at: `https://roml3n.xyz/studio`

## Content Types

### Blog Posts
- **Title**: Post title
- **Slug**: URL-friendly version (auto-generated from title)
- **Published At**: Publication date
- **Excerpt**: Short description
- **Featured Image**: Hero image
- **Content**: Rich text content with images and code blocks
- **Tags**: Array of tags
- **Published**: Boolean to control visibility

### Case Studies
- **Title**: Project title
- **Slug**: URL-friendly version
- **Client**: Client name
- **Project Type**: Web app, mobile app, website, etc.
- **Description**: Project overview
- **Challenge**: Problem statement
- **Solution**: How you solved it
- **Tech Stack**: Technologies used
- **Featured Image**: Project hero image
- **Gallery**: Additional project images
- **Live URL**: Link to live project
- **GitHub URL**: Source code link
- **Start/End Date**: Project timeline
- **Featured**: Boolean for highlighting

## Migration from Current Content

### Blog Posts
1. Copy content from your existing MDX files
2. Create new blog posts in Sanity Studio
3. Use the rich text editor for content
3. Set `isPublished` to true when ready

### Case Studies
1. Copy project information from your existing files
2. Create new case studies in Sanity Studio
3. Upload images to the gallery
4. Set `isPublished` to true when ready

## API Usage

### Fetch All Blogs
```typescript
import { getAllBlogs } from '@/lib/sanity'

const blogs = await getAllBlogs()
```

### Fetch Blog by Slug
```typescript
import { getBlogBySlug } from '@/lib/sanity'

const blog = await getBlogBySlug('your-slug')
```

### Fetch All Case Studies
```typescript
import { getAllCaseStudies } from '@/lib/sanity'

const caseStudies = await getAllCaseStudies()
```

### Fetch Case Study by Slug
```typescript
import { getCaseStudyBySlug } from '@/lib/sanity'

const caseStudy = await getCaseStudyBySlug('your-slug')
```

## Image Handling
Use the `urlFor` function to get optimized image URLs:
```typescript
import { urlFor } from '@/lib/sanity'

const imageUrl = urlFor(imageObject).url()
```

## Rich Text Rendering
Use the `PortableText` component to render Sanity's rich text:
```typescript
import PortableText from '@/components/PortableText'

<PortableText value={blog.content} />
```

## Deployment

### Vercel
1. Add environment variables in Vercel dashboard
2. Deploy your app
3. Access studio at `/studio` route

### Other Platforms
1. Set environment variables
2. Deploy your app
3. Access studio at `/studio` route


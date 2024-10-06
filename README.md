# Cloudinary Image Upload and Delete API

This is an Express.js server that allows image uploads and deletions using the Cloudinary API. It includes two main endpoints for uploading images and deleting them based on their public ID.

## Features

- Upload images to Cloudinary using a file upload.
- Delete images from Cloudinary using the public ID.
- JSON responses with status messages for uploads and deletions.
- Handles CORS for cross-origin requests.

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Cloudinary account](https://cloudinary.com/) (for managing images)
- [Git](https://git-scm.com/) (for version control)

## Steps for Usage

1. **Clone the repository.**
2. **Install dependencies using npm.**
3. **Set up environment variables by creating a `.env` file.**
4. **Run the server locally on your machine.**
5. **Deploy to Vercel if needed.**

Let me know if you need further adjustments!

## Environment Setup

Create a `.env` file in the root directory and add the following variables:

```bash
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=8080

# ImageFlux Backend — Cloudinary Image Upload & Delete API

This Express.js backend handles secure and scalable image uploads and deletions via the Cloudinary API. It provides RESTful endpoints for managing image assets, designed for real-time, high-performance applications.

## Key Features

- Upload images to Cloudinary with file handling and validation.
- Delete images securely using Cloudinary public IDs.
- JSON-based RESTful API responses with status and error handling.
- CORS enabled for cross-origin access from web and mobile clients.
- Rate limit for api calls.

## Technology Stack & Tools
- Backend: Node.js, Express.js, RESTful APIs
- Cloud: Cloudinary for media storage & management
- Security: Input validation, CORS handling
- Version Control: Git, GitHub

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Cloudinary account](https://cloudinary.com/) (for managing images)
- [Appwrite](https://appwrite.io/) (for authentication)
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
```

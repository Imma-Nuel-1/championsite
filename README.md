# 🏛️ RCCG City of Champions Website

A modern, full-stack church website built with React, TypeScript, Node.js, and MongoDB. Features a beautiful responsive design with admin management capabilities.

## ✨ Features

### 🎨 Frontend

- **Modern React App** with TypeScript and Vite
- **Responsive Design** with Tailwind CSS
- **Dark/Light Theme** toggle
- **Smooth Animations** with Framer Motion
- **Live Streaming** integration
- **Blog System** with rich content
- **Event Management** and calendar
- **Photo Gallery** with Cloudinary integration
- **Testimonials** section
- **Prayer Request** system
- **Online Giving** integration
- **Contact Forms** with validation

### ⚙️ Backend

- **Node.js** with Express and TypeScript
- **MongoDB** with Mongoose ODM
- **JWT Authentication** for admin access
- **Admin Dashboard** for content management
- **RESTful API** design
- **File Upload** handling
- **Email Integration** for notifications
- **Security** middleware and validation

### 🔐 Admin Features

- Secure admin login system
- Content management for sermons, events, blog posts
- Gallery management with image uploads
- Testimonial moderation
- Prayer request management
- User management system

## 🚀 Technology Stack

### Frontend

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Router** for navigation
- **React Hook Form** for form handling
- **Axios** for API calls
- **React Icons** for iconography

### Backend

- **Node.js** with Express.js
- **TypeScript** for type safety
- **MongoDB** with Mongoose
- **JWT** for authentication
- **Bcrypt** for password hashing
- **Multer** for file uploads
- **Nodemailer** for email functionality
- **Express Validator** for input validation

### Tools & Services

- **Cloudinary** for image management
- **MongoDB Atlas** for cloud database
- **Git** for version control
- **ESLint** and **Prettier** for code quality

## 📦 Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/championsite.git
cd championsite
```

### 2. Backend Setup

```bash
cd backend
npm install

# Create environment file
cp .env.example .env
# Edit .env with your configuration
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

### 4. Environment Variables

#### Backend (.env)

```env
# Database
MONGODB_URI=mongodb://localhost:27017/championsite
# or MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/championsite

# JWT
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# Server
PORT=5000
NODE_ENV=development

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email (optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

#### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
```

## 🏃‍♂️ Running the Application

### Development Mode

```bash
# Start backend (from backend directory)
npm run dev

# Start frontend (from frontend directory)
npm run dev
```

### Production Build

```bash
# Build frontend
cd frontend
npm run build

# Build backend
cd ../backend
npm run build

# Start production server
npm start
```

## 🗂️ Project Structure

```
championsite/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── models/          # Database models
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Custom middleware
│   │   ├── config/          # Configuration files
│   │   ├── utils/           # Utility functions
│   │   └── types/           # TypeScript type definitions
│   ├── scripts/             # Database scripts
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── contexts/        # React contexts
│   │   ├── providers/       # Context providers
│   │   ├── utils/           # Utility functions
│   │   ├── assets/          # Static assets
│   │   └── layout/          # Layout components
│   └── package.json
├── .gitignore
└── README.md
```

## 🔧 API Endpoints

### Authentication

- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout
- `GET /api/auth/verify` - Verify JWT token

### Content Management

- `GET /api/sermons` - Get all sermons
- `POST /api/sermons` - Create sermon (Admin)
- `GET /api/events` - Get all events
- `POST /api/events` - Create event (Admin)
- `GET /api/blog` - Get blog posts
- `POST /api/blog` - Create blog post (Admin)
- `GET /api/gallery` - Get gallery items
- `POST /api/gallery` - Upload gallery item (Admin)

### User Features

- `POST /api/prayer-requests` - Submit prayer request
- `GET /api/testimonials` - Get approved testimonials
- `POST /api/testimonials` - Submit testimonial
- `POST /api/contact` - Send contact message

## 👤 Admin Setup

Create your first admin user:

```bash
cd backend
npm run create-admin
```

Follow the prompts to set up your admin credentials.

## 🎨 Customization

### Colors & Branding

The website uses a orange and blue color scheme defined in:

- `frontend/tailwind.config.js` - Tailwind color configuration
- `frontend/src/index.css` - CSS custom properties

### Content

- Update church information in components
- Replace logo in `public/` directory
- Modify about page content
- Update contact information

## 🚀 Deployment

### Frontend (Vercel/Netlify)

1. Build the frontend: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Set environment variables in your hosting dashboard

### Backend (Railway/Heroku/DigitalOcean)

1. Set up MongoDB Atlas
2. Configure environment variables
3. Deploy backend code
4. Update frontend API URL

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:

- Create an issue on GitHub
- Contact: [your-email@example.com]

## 🙏 Acknowledgments

- Built with love for RCCG City of Champions
- Thanks to the open-source community
- Special thanks to all contributors

---

**Growing Together in Faith** 🙏

Made with ❤️ by [Your Name]

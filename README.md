# 🏕️ CampScout

A modern, full-stack web application for discovering and sharing campgrounds. Built with Node.js, Express, MongoDB, and featuring a clean and responsive design.

<div align="center">
  <img src="images/home.png" alt="Home Page" width="400">
  <img src="images/view.png" alt="View Campground Page" width="400">
</div>

## ✨ Features

### 🗺️ **Interactive Campground Discovery**
- Browse campgrounds with an interactive cluster map
- View detailed campground information with image carousels
- Search and filter campgrounds by location
- Responsive grid layout for optimal viewing on all devices

### 👤 **User Authentication & Profiles**
- Secure user registration and login system
- Personalized user profiles with bio and profile pictures
- Activity tracking (campgrounds posted, reviews written)
- Profile image upload with Cloudinary integration

### 🏕️ **Campground Management**
- Add new campgrounds with multiple image uploads
- Edit and delete your own campgrounds
- Rich campground details including amenities, pricing, and descriptions
- Location-based mapping with MapTiler integration

### ⭐ **Review System**
- Star-based rating system (1-5 stars)
- Write detailed reviews for campgrounds
- View all reviews in a clean, organized layout
- Delete your own reviews

### 🎨 **Modern Design**
- Clean, minimalist interface inspired by modern web apps
- Fully responsive design (mobile-first approach)
- Professional color scheme with nature-inspired accents
- Smooth animations and hover effects
- Consistent typography and spacing throughout

### 🔒 **Security & Performance**
- Input validation and sanitization
- Authentication middleware protection
- Helmet.js for security headers
- Session management with MongoDB store
- Image optimization and cloud storage

## 🛠️ Tech Stack

### **Backend**
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### **Authentication**
- **Passport.js** - Authentication middleware
- **Passport Local** - Local authentication strategy
- **Express Session** - Session management

### **Frontend**
- **EJS** - Templating engine
- **Bootstrap 5** - CSS framework (customized)
- **Custom CSS** - Modern, responsive styling
- **Vanilla JavaScript** - Client-side interactions

### **File Upload & Storage**
- **Multer** - File upload handling
- **Cloudinary** - Cloud-based image storage and optimization

### **Maps & Location**
- **MapTiler** - Interactive maps and geocoding
- **Cluster mapping** - Efficient display of multiple locations

### **Security & Validation**
- **Helmet.js** - Security headers
- **Joi** - Data validation
- **Sanitize HTML** - XSS protection
- **Connect Flash** - Flash messaging

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Cloudinary account
- MapTiler API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/hnedim/campscout.git
   cd campscout
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   DB_URL=mongodb://localhost:27017/campscout
   # OR for MongoDB Atlas:
   # DB_URL=mongodb+srv://username:password@cluster.mongodb.net/campscout
   
   SECRET=your-session-secret-key
   
   CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
   CLOUDINARY_KEY=your-cloudinary-api-key
   CLOUDINARY_SECRET=your-cloudinary-api-secret
   
   MAPTILER_API_KEY=your-maptiler-api-key
   ```

4. **Start the application**
   ```bash
   node app.js
   ```

5. **Visit the application**
   Open your browser and navigate to `http://localhost:3000`

## 🙏 Acknowledgments

- **Colt Steele** - Original YelpCamp concept from The Web Developer Bootcamp
- **Bootstrap** - CSS framework foundation
- **Cloudinary** - Image storage and optimization
- **MapTiler** - Maps and geocoding services
- **MongoDB** - Database platform

## 📧 Contact

**Your Name** - [nhodzic098@gmail.com](mailto:nhodzic098@gmail.com)

**Project Link** - [https://github.com/hnedim/camp-scout](https://github.com/hnedim/camp-scout)

**Live Demo** - [https://camp-scout-unbl.onrender.com/](https://camp-scout-unbl.onrender.com/)

---

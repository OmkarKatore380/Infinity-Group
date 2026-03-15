# Infinity Group - Mobile Responsive Website

A modern, responsive construction company website built with React, Vite, and Tailwind CSS.

## 📱 Mobile-First Responsive Design

This website has been optimized for mobile devices with the following key features:

### **Core Responsive Strategy**
- **Single Column Layout**: All multi-column layouts convert to single column on mobile devices
- **Typography Scaling**: Text sizes automatically adjust for optimal mobile readability
- **Touch-Friendly Interface**: All interactive elements properly sized for mobile interaction
- **Responsive Grids**: Flexible grid systems that adapt to any screen size

### **Key Mobile Optimizations**

#### **Navigation & Layout**
- Responsive header with mobile-friendly navigation
- Single column content flow eliminates horizontal scrolling
- Optimized spacing and margins for touch interaction

#### **Media & Visuals**
- Hero video with `object-cover` for proper mobile display
- Responsive image scaling and optimized dimensions
- Mobile-friendly video and image layouts

#### **Forms & Interaction**
- Mobile-optimized form layouts with proper spacing
- Touch-friendly buttons and interactive elements
- Responsive form fields with appropriate sizing

#### **Content Sections**
- **Founder Vision**: Converts from horizontal dock to vertical stack
- **Testimonials**: Responsive slider with mobile-friendly navigation
- **Projects**: Single column layout with optimized project cards
- **Services**: Mobile-friendly service listings
- **Process**: Responsive workflow display

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS with custom configurations
- **Routing**: React Router DOM
- **Backend**: Node.js/Express API server
- **Database**: JSON files (for development/demo)
- **Build Tool**: Vite with optimized production builds

## 📦 Installation

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd infinity-group
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```
   VITE_API_BASE_URL=http://localhost:5000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Start the backend server**
   ```bash
   cd server
   npm install
   npm start
   ```

6. **Open your browser**
   Visit `http://localhost:5173` to view the website

## 🚀 Features

### **Responsive Design Features**
- ✅ Mobile-first design approach
- ✅ Single column layout on mobile devices
- ✅ Responsive navigation menu
- ✅ Touch-friendly interface elements
- ✅ Optimized typography for all screen sizes
- ✅ Flexible grid systems
- ✅ Responsive images and media

### **Website Sections**
- **Home**: Hero section with video background, featured projects, and company overview
- **Projects**: Portfolio showcase with filtering and detailed project pages
- **Services**: Service offerings with detailed descriptions
- **About**: Company information and team details
- **Contact**: Contact form with company information
- **Testimonials**: Customer reviews and feedback
- **Admin**: Admin dashboard for content management

### **Admin Features**
- Project management (CRUD operations)
- Process workflow management
- Statistics and metrics editing
- Image upload and gallery management
- Responsive admin interface

## 📱 Responsive Breakpoints

The website uses the following responsive breakpoints:

- **Mobile**: `< 768px` - Single column layout, optimized touch interface
- **Tablet**: `768px - 1024px` - Adapted layouts for medium screens
- **Desktop**: `> 1024px` - Full multi-column layouts with advanced features

## 🎨 Design System

### **Color Palette**
- Primary: Navy Blue (`#0B2149`)
- Secondary: Slate Gray (`#64748B`)
- Accent: Blue (`#3B82F6`)
- Background: Light Gray (`#F8FAFC`)

### **Typography**
- **Headings**: Inter font with responsive scaling
- **Body Text**: System font stack for optimal readability
- **Mobile Scaling**: Text sizes automatically adjust for mobile devices

### **Components**
- **Buttons**: Multiple styles with hover effects and mobile optimization
- **Cards**: Shadow effects with responsive layouts
- **Forms**: Clean design with proper spacing and validation
- **Navigation**: Sticky header with mobile dropdown menu

## 🔧 Development

### **Project Structure**
```
infinity-group/
├── src/                    # Frontend source code
│   ├── components/         # Reusable React components
│   ├── pages/             # Page components
│   ├── admin/             # Admin dashboard components
│   ├── data/              # Static data files
│   └── services/          # API service functions
├── server/                # Backend API server
│   ├── routes/            # API route handlers
│   ├── data/              # JSON data files
│   └── uploads/           # File upload directory
├── public/                # Static assets
└── styles/               # CSS and styling files
```

### **Available Scripts**

#### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

#### Backend
```bash
cd server
npm start           # Start backend server
npm run dev         # Start with nodemon (auto-restart)
```

## 🌐 Deployment

### **Frontend Deployment**
The frontend is built with Vite and can be deployed to any static hosting service:

- **Vercel**: `npm run build && vercel`
- **Netlify**: Connect repository and use build command `npm run build`
- **GitHub Pages**: Use GitHub Actions or manual deployment

### **Backend Deployment**
The backend can be deployed to:

- **Heroku**: Use the provided Procfile
- **Railway**: Connect repository and deploy
- **DigitalOcean App Platform**: Connect repository and deploy

### **Environment Variables**
Required environment variables for deployment:
```
VITE_API_BASE_URL=https://your-backend-url.com
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 📞 Contact

- **Company**: Infinity Group
- **Location**: Nagpur, Maharashtra, India
- **Phone**: +91 8805647199
- **Email**: [contact@infinitygroup.com](mailto:contact@infinitygroup.com)
- **Website**: [www.infinitygroup.com](http://www.infinitygroup.com)

---

<<<<<<< HEAD
**Note**: This website is optimized for modern browsers with JavaScript enabled. For the best experience, please use the latest version of Chrome, Firefox, Safari, or Edge.
=======
**Note**: This website is optimized for modern browsers with JavaScript enabled. For the best experience, please use the latest version of Chrome, Firefox, Safari, or Edge.
>>>>>>> ba87757d (second commit)

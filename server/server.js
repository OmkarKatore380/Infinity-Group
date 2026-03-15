import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create Express app
const app = express();
const PORT = 5000;

// Paths
const STATS_FILE = path.join(__dirname, "data", "stats.json");
const PROJECTS_FILE = path.join(__dirname, "data", "projects.json");
const UPLOADS_DIR = path.join(__dirname, "..", "uploads", "projects");

// Ensure upload directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ---------- Helper: Create Default Stats ----------
function createDefaultStats() {
  const defaultStats = [
    {
      "icon": "Building",
      "value": 120,
      "label": "Premium Residences Delivered"
    },
    {
      "icon": "Users",
      "value": 85,
      "label": "Happy Homeowners"
    },
    {
      "icon": "Calendar",
      "value": 10,
      "label": "Years of Construction Expertise"
    },
    {
      "icon": "Hammer",
      "value": 5,
      "label": "Active Residential Developments"
    }
  ];
  
  try {
    // Ensure data directory exists
    const dataDir = path.dirname(STATS_FILE);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    fs.writeFileSync(STATS_FILE, JSON.stringify(defaultStats, null, 2));
    console.log("Created default stats.json file");
    return defaultStats;
  } catch (error) {
    console.error("Error creating default stats:", error);
    return [];
  }
}

// ---------- Helper: Read Stats ----------
function readStats() {
  try {
    if (!fs.existsSync(STATS_FILE)) {
      console.log("Stats file not found, creating default stats.json");
      return createDefaultStats();
    }
    const data = fs.readFileSync(STATS_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading stats:", error);
    console.log("Falling back to default stats");
    return createDefaultStats();
  }
}

// ---------- Helper: Write Stats ----------
function writeStats(stats) {
  try {
    // Ensure data directory exists
    const dataDir = path.dirname(STATS_FILE);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    fs.writeFileSync(STATS_FILE, JSON.stringify(stats, null, 2));
    return true;
  } catch (error) {
    console.error("Error writing stats:", error);
    return false;
  }
}

// ---------- Helper: Normalize Project ----------
function normalizeProject(project) {
  return {
    ...project,
    id: project.id || Date.now().toString(),
    name: project.name || project.title || "",
    location: project.location || "",
    status: project.status || "Ongoing",
    coverImage: project.coverImage || "",
    gallery: Array.isArray(project.gallery) ? project.gallery : [],
    amenities: Array.isArray(project.amenities) ? project.amenities : [],
    description: project.description || "",
    fullDescription: project.fullDescription || "",
    primaryImage: project.primaryImage || project.image || "",
    secondaryImages: Array.isArray(project.secondaryImages) ? project.secondaryImages : []
  };
}

// ---------- Helper: Create Default Projects ----------
function createDefaultProjects() {
  const defaultProjects = [
    {
      "id": "narendra-nagar-elite",
      "name": "Narendra Nagar Elite",
      "location": "Narendra Nagar, Nagpur",
      "possession": "Dec 2026",
      "status": "Ongoing",
      "coverImage": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop",
      "gallery": [
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop"
      ],
      "amenities": ["Parking", "CCTV", "Gym"],
      "description": "Premium 2 & 3 BHK residences designed for mid-segment families with robust construction standards."
    },
    {
      "id": "bajaj-nagar-habitat",
      "name": "Bajaj Nagar Habitat",
      "location": "Bajaj Nagar, Nagpur",
      "possession": "Aug 2025",
      "status": "Completed",
      "coverImage": "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop",
      "gallery": [
        "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop"
      ],
      "amenities": ["Parking", "CCTV"],
      "description": "Well-connected residential community with high-efficiency layouts and certified safety standards."
    },
    {
      "id": "lakadganj-residences",
      "name": "Lakadganj Residences",
      "location": "Lakadganj, Nagpur",
      "possession": "Mar 2027",
      "status": "Ongoing",
      "coverImage": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop",
      "gallery": [],
      "amenities": ["Parking", "Gym"],
      "description": "Smartly designed apartments with reliable construction and modern amenities."
    }
  ];
  
  try {
    // Ensure data directory exists
    const dataDir = path.dirname(PROJECTS_FILE);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    // Normalize default projects before saving
    const normalizedProjects = defaultProjects.map(normalizeProject);
    
    fs.writeFileSync(PROJECTS_FILE, JSON.stringify(normalizedProjects, null, 2));
    console.log("Created default projects.json file");
    return normalizedProjects;
  } catch (error) {
    console.error("Error creating default projects:", error);
    return [];
  }
}

// ---------- Helper: Read Projects ----------
function readProjects() {
  try {
    console.log("PROJECT FILE PATH:", PROJECTS_FILE);
    
    if (!fs.existsSync(PROJECTS_FILE)) {
      console.log("Projects file not found, creating default projects.json");
      return createDefaultProjects();
    }
    
    const data = fs.readFileSync(PROJECTS_FILE, "utf8");
    
    if (!data || data.trim() === "") {
      console.log("Projects file is empty, returning empty array");
      return [];
    }
    
    const parsed = JSON.parse(data);
    
    if (!Array.isArray(parsed)) {
      console.log("Projects file contains invalid data, returning empty array");
      return [];
    }
    
    return parsed.map(normalizeProject);
  } catch (error) {
    console.error("READ PROJECTS ERROR:", error);
    console.error("Stack:", error.stack);
    return [];
  }
}

// ---------- Helper: Write Projects ----------
function writeProjects(projects) {
  try {
    // Ensure data directory exists
    const dataDir = path.dirname(PROJECTS_FILE);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    // Ensure projects is always an array and normalize
    const safeProjects = (Array.isArray(projects) ? projects : []).map(normalizeProject);
    
    fs.writeFileSync(PROJECTS_FILE, JSON.stringify(safeProjects, null, 2), "utf8");
    
    console.log("WRITE PROJECTS SUCCESS: Saved", safeProjects.length, "projects");
    return true;
  } catch (error) {
    console.error("WRITE PROJECTS ERROR:", error);
    console.error("Stack:", error.stack);
    return false;
  }
}

// ---------- Helper: Ensure Uploads Directory ----------
function ensureUploadsDir() {
  try {
    if (!fs.existsSync(UPLOADS_DIR)) {
      fs.mkdirSync(UPLOADS_DIR, { recursive: true });
    }
    return true;
  } catch (error) {
    console.error("Error creating uploads directory:", error);
    return false;
  }
}

// ---------- Multer Configuration ----------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR)
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9)
    const extension = path.extname(file.originalname)
    cb(null, uniqueName + extension)
  }
})

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/webp"
  ]
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error("Only image files allowed"), false)
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024,
    files: 20
  }
})

// Accept any field name (prevents "Unexpected field" error)
const projectUpload = upload.any()

// ---------- API ROUTES ----------

// Get stats
app.get("/api/stats", (req, res) => {
  const stats = readStats();
  const projects = readProjects();
  
  // Calculate dynamic stats
  const completedProjects = projects.filter(p => p.status.toLowerCase() === 'completed').length;
  const ongoingProjects = projects.filter(p => p.status.toLowerCase() === 'ongoing').length;
  
  // Update dynamic stats in the array
  const updatedStats = stats.map(stat => {
    if (stat.label === "Premium Residences Delivered") {
      return { ...stat, value: completedProjects };
    } else if (stat.label === "Active Residential Developments") {
      return { ...stat, value: ongoingProjects };
    }
    return stat;
  });
  
  res.json(updatedStats);
});

// Update stats
app.post("/api/stats", (req, res) => {
  const stats = req.body;

  // Validate that stats is an array
  if (!Array.isArray(stats)) {
    return res.status(400).json({
      success: false,
      message: "Stats must be an array"
    });
  }

  const success = writeStats(stats);

  if (success) {
    res.json({
      success: true,
      message: "Stats updated successfully"
    });
  } else {
    res.status(500).json({
      success: false,
      message: "Failed to update stats"
    });
  }
});

// Get all projects
app.get("/api/projects", (req, res) => {
  try {
    const projects = readProjects();
    
    // Normalize projects using the normalizeProject function
    const normalizedProjects = projects.map(normalizeProject);
    
    // Handle limit parameter
    const limit = parseInt(req.query.limit);
    if (!isNaN(limit) && limit > 0) {
      res.json(normalizedProjects.slice(0, limit));
      return;
    }
    
    // Handle status filter
    const status = req.query.status;
    if (status) {
      const filteredProjects = normalizedProjects.filter(p => 
        p.status.toLowerCase() === status.toLowerCase()
      );
      res.json(filteredProjects);
      return;
    }
    
    res.json(normalizedProjects);
  } catch (error) {
    console.error("PROJECTS READ ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to read projects",
      error: error.message
    });
  }
});

// Get project by ID
app.get("/api/projects/:id", (req, res) => {
  const projects = readProjects();
  const project = projects.find(p => p.id === req.params.id);
  
  if (!project) {
    return res.status(404).json({
      success: false,
      message: "Project not found"
    });
  }
  
  res.json(project);
});

// Create new project
app.post("/api/projects", projectUpload, (req, res) => {
  try {
    console.log("PROJECT CREATE START")
    console.log("FILES RECEIVED:", req.files)

    let primaryImage = null
    let secondaryImages = []

    if (req.files && req.files.length > 0) {
      req.files.forEach(file => {
        if (file.fieldname === "primaryImage") {
          primaryImage = file.filename
        }
        if (file.fieldname === "secondaryImages") {
          secondaryImages.push(file.filename)
        }
      })
    }

    const newProject = {
      ...req.body,
      primaryImage,
      secondaryImages
    }

    let projects = readProjects()
    projects.push(newProject)
    writeProjects(projects)

    res.json({
      success: true,
      project: newProject
    })

  } catch (error) {
    console.error("PROJECT CREATE ERROR:", error)
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
});

// Update project
app.put("/api/projects/:id", upload.single('image'), (req, res) => {
  const projects = readProjects();
  const projectId = req.params.id;
  const projectIndex = projects.findIndex(p => p.id === projectId);
  
  if (projectIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Project not found"
    });
  }
  
  const { title, location, status, shortDescription, fullDescription } = req.body;
  
  // Validate status if provided
  if (status) {
    const validStatuses = ['completed', 'ongoing'];
    if (!validStatuses.includes(status.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Must be 'completed' or 'ongoing'"
      });
    }
  }
  
  // Handle image
  let imagePath = projects[projectIndex].coverImage;
  if (req.file) {
    imagePath = `/uploads/projects/${req.file.filename}`;
  } else if (req.body.image) {
    // If image URL is provided in body
    imagePath = req.body.image;
  }
  
  // Update project
  projects[projectIndex] = {
    ...projects[projectIndex],
    name: title || projects[projectIndex].name,
    location: location || projects[projectIndex].location,
    status: status ? status.charAt(0).toUpperCase() + status.slice(1) : projects[projectIndex].status,
    coverImage: imagePath,
    description: shortDescription || projects[projectIndex].description,
    fullDescription: fullDescription || projects[projectIndex].fullDescription
  };
  
  if (writeProjects(projects)) {
    res.json({
      success: true,
      message: "Project updated successfully",
      project: projects[projectIndex]
    });
  } else {
    res.status(500).json({
      success: false,
      message: "Failed to update project"
    });
  }
});

// Delete project
app.delete("/api/projects/:id", (req, res) => {
  const projects = readProjects();
  const projectId = req.params.id;
  const projectIndex = projects.findIndex(p => p.id === projectId);
  
  if (projectIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Project not found"
    });
  }
  
  // Remove project
  projects.splice(projectIndex, 1);
  
  if (writeProjects(projects)) {
    res.json({
      success: true,
      message: "Project deleted successfully"
    });
  } else {
    res.status(500).json({
      success: false,
      message: "Failed to delete project"
    });
  }
});

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Import and use process routes
import processRoutes from './routes/processRoutes.js';
app.use('/api/process', processRoutes);

// ---------- START SERVER ----------

// Global error handler to prevent HTML error responses
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    console.error("MULTER ERROR:", err)
    return res.status(400).json({
      success: false,
      message: err.message
    })
  }

  if (err) {
    console.error("SERVER ERROR:", err)
    return res.status(500).json({
      success: false,
      message: err.message
    })
  }

  next()
});

app.listen(PORT, () => {
  console.log("Server running on port 5000")
});

import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();
const PROCESS_FILE = path.join(process.cwd(), "server", "data", "process.json");

// Helper: Read process steps
function readProcessSteps() {
  try {
    if (!fs.existsSync(PROCESS_FILE)) {
      return [];
    }
    const data = fs.readFileSync(PROCESS_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading process steps:", error);
    return [];
  }
}

// Helper: Write process steps
function writeProcessSteps(steps) {
  try {
    const dataDir = path.dirname(PROCESS_FILE);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(PROCESS_FILE, JSON.stringify(steps, null, 2));
    return true;
  } catch (error) {
    console.error("Error writing process steps:", error);
    return false;
  }
}

// GET all process steps
router.get("/", (req, res) => {
  try {
    const steps = readProcessSteps();
    res.json(steps);
  } catch (error) {
    console.error("GET process steps error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch process steps"
    });
  }
});

// POST new process step
router.post("/", (req, res) => {
  try {
    const steps = readProcessSteps();
    const newStep = {
      id: Date.now(),
      stepNumber: req.body.stepNumber || steps.length + 1,
      title: req.body.title || "",
      description: req.body.description || "",
      icon: req.body.icon || ""
    };

    steps.push(newStep);

    if (writeProcessSteps(steps)) {
      res.json({
        success: true,
        message: "Process step added successfully",
        step: newStep
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Failed to add process step"
      });
    }
  } catch (error) {
    console.error("POST process step error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add process step"
    });
  }
});

// PUT update process step
router.put("/:id", (req, res) => {
  try {
    const steps = readProcessSteps();
    const stepId = parseInt(req.params.id);
    const stepIndex = steps.findIndex(step => step.id === stepId);

    if (stepIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Process step not found"
      });
    }

    steps[stepIndex] = {
      ...steps[stepIndex],
      stepNumber: req.body.stepNumber || steps[stepIndex].stepNumber,
      title: req.body.title || steps[stepIndex].title,
      description: req.body.description || steps[stepIndex].description,
      icon: req.body.icon || steps[stepIndex].icon
    };

    if (writeProcessSteps(steps)) {
      res.json({
        success: true,
        message: "Process step updated successfully",
        step: steps[stepIndex]
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Failed to update process step"
      });
    }
  } catch (error) {
    console.error("PUT process step error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update process step"
    });
  }
});

// DELETE process step
router.delete("/:id", (req, res) => {
  try {
    const steps = readProcessSteps();
    const stepId = parseInt(req.params.id);
    const stepIndex = steps.findIndex(step => step.id === stepId);

    if (stepIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Process step not found"
      });
    }

    steps.splice(stepIndex, 1);

    if (writeProcessSteps(steps)) {
      res.json({
        success: true,
        message: "Process step deleted successfully"
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Failed to delete process step"
      });
    }
  } catch (error) {
    console.error("DELETE process step error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete process step"
    });
  }
});

export default router;
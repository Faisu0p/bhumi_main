import { addProjectWithPhasesAndUnits, getAllProjects, verifyProjectById, getProjects } from '../models/projectModel.js';

// Controller to handle project creation request
export const createProject = async (req, res) => {
  try {
    const projectData = req.body; // Assuming the data is sent in the request body

    // Call the function to add project, phases, units, and unit details
    const result = await addProjectWithPhasesAndUnits(projectData);

    // Return success response
    return res.status(201).json({
      success: true,
      projectId: result.projectId,
      message: result.message,
    });
  } catch (error) {
    // Handle errors and return an error response
    console.error('Error in createProject controller:', error.message);
    return res.status(500).json({
      success: false,
      message: error.message || 'An error occurred while creating the project.',
    });
  }
};


// Controller to fetch all property details
 export const fetchAllProjects = async (req, res) => {
   try {
     const result = await getAllProjects();

     if (result.success) {
       return res.status(200).json(result);
     } else {
       return res.status(404).json(result);
     }
   } catch (error) {
     console.error('Error fetching all projects:', error);
     return res.status(500).json({ success: false, message: 'Server error' });
   }
 };


 // Controller to verify a project by its ID
export const verifyProject = async (req, res) => {
  const { projectId } = req.body;

  if (!projectId) {
    return res.status(400).json({ message: 'Project ID is required' });
  }

  try {
    const isVerified = await verifyProjectById(projectId);

    if (isVerified) {
      return res.status(200).json({ message: 'Project verified successfully.' });
    } else {
      return res.status(404).json({ message: 'Project not found or already verified.' });
    }
  } catch (err) {
    console.error('Error verifying project by ID:', err.message);
    return res.status(500).json({ message: 'An error occurred while verifying the project by ID', error: err.message });
  }
};

// Controller to fetch Project IDs and Names
export const fetchProjects = async (req, res) => {
  try {
    const projects = await getProjects();

    if (!projects || projects.length === 0) {
      return res.status(404).json({ message: 'No projects found.' });
    }

    return res.status(200).json({
      message: 'Projects fetched successfully.',
      data: projects,
    });
  } catch (err) {
    console.error('Error fetching projects:', err.message);
    return res.status(500).json({
      message: 'An error occurred while fetching projects.',
      error: err.message,
    });
  }
};



// agent_routes.js
import express from 'express';
import { handleAgentRequest } from '../controllers/agentController.js'; // Adjust path if necessary
const router = express.Router();
import { protect, admin } from "../middleware/authMiddleware.js";

// router.post('/', handleAgentRequest);
// console.log("yeah");
router.route("/").post(handleAgentRequest);

export default router;

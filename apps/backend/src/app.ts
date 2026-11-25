import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import collectedBugRoutes from './collectedBug/collectedBugRoutes.js';

dotenv.config();
const app = express();

// T.4 CORS requirement (only accept requests from the frontend)
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.use('/api/collected-bugs', collectedBugRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
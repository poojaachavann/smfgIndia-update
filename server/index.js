import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/smfgRoutes.js';
import connectDB from "./db/index.db.js";
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3001;
dotenv.config();

app.use(express.json({ limit: '100mb' }));
app.use(cors());

app.use('/api', router);

connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/static', express.static('public'));


const buildpath = path.join(__dirname, "../dist");
app.use(express.static(buildpath));

const uploadsDir = path.join(__dirname);
app.use('/api', express.static(uploadsDir));
console.log('uploadsDir', uploadsDir)


app.get("/*", (req, res) => {
    res.sendFile(path.join(buildpath, 'index.html'), (err) => {
        if (err) {
            res.status(500).send(err);
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

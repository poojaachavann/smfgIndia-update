import fs from 'fs';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.join(__dirname, 'smfgDocumentUpdate');

if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);

        setTimeout(() => {
            const filePath = path.join(uploadsDir, fileName);
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error(`Error deleting file: ${err}`);
                } else {
                    console.log(`File deleted: ${filePath}`);
                }
            });
        }, 432000000);
    }
});

export const uploadImagePath = multer({
    storage,
    limits: { fileSize: 100 * 1024 * 1024 }
}).fields([
    { name: 'idProofFile', maxCount: 1 },
    { name: 'bankStatementFile', maxCount: 1 },
    { name: 'creditBureauFile', maxCount: 1 }
]);



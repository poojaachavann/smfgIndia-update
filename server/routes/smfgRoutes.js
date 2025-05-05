import express from 'express';
import { login } from '../controllers/login.controllers.js';
import { uploadImagePath } from '../controllers/uploadImagePath.js';
import { updatefilePath } from '../controllers/uploadImagePathById.js';
import { startLoanForm } from '../controllers/startLoanForm.js';
import { uploadDataFetch } from '../controllers/uploadDataFetch.js';


const router = express.Router();

router.post('/login', login);
router.post('/updateFilepath', uploadImagePath, updatefilePath);
router.post('/startLoanForm', startLoanForm);
router.get('/uploadDataFetch', uploadDataFetch);



export default router;

// import React, { useEffect, useState } from 'react';
// import Sidebar from '../../Component/Sidebar';
// import {
//   Box,
//   Button,
//   LinearProgress,
//   Stack,
//   Typography
// } from '@mui/material';
// import idProofImg from '../../assets/uploadDoc.png';
// import pdficon from '../../assets/pdf.png';
// // import crdebureauImg from '../../assets/creditBureau.png';
// // import bankStatementImg from '../../assets/bankStatement.png';
// import { color, motion } from 'framer-motion';
// // import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
// import './UploadDouments.css'
// // import checkIicon from '../../assets/checkicon.png'
// // import warningicon from '../../assets/warningicon.png'
// import axios from 'axios';
// import API from '../../Component/BaseURL';
// import PropTypes from 'prop-types';
// import { useNavigate } from 'react-router-dom';




// function LinearProgressWithLabel(props) {
//   return (
//     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//       <Box sx={{ width: '100%', mr: 1 }}>
//         <LinearProgress variant="determinate" {...props} />
//       </Box>
//       <Box sx={{ minWidth: 35 }}>
//         <Typography variant="body2" sx={{ color: '#676767', fontWeight: '600' }}>
//           {`${Math.round(props.value)}%`}
//         </Typography>
//       </Box>
//     </Box>
//   );
// }

// LinearProgressWithLabel.propTypes = {
//   value: PropTypes.number.isRequired,
// };


// function UploadDocuments({ domainPath, userLoginData, analizeDocument }) {

//   const steps = [
//     { label: 'ID Proof', key: 'idProof' },
//     { label: 'Bank Statement', key: 'bankStatement' },
//     { label: 'Credit Bureau Report', key: 'creditReport' },
//   ];

//   const [completed, setCompleted] = useState({
//     idProof: false,
//     bankStatement: false,
//     creditReport: false,
//   });

//   const handleComplete = (key) => {
//     setCompleted((prev) => ({ ...prev, [key]: true }));
//   };
// const navigate = useNavigate()


//   const [progress, setProgress] = React.useState(10);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
//     }, 800);
//     return () => {
//       clearInterval(timer);
//     };
//   }, []);


//   const [error, setError] = useState(null);
// const [isLoading, setIsLoading] = useState(false)

// const [step, setStep] = useState(1);
// const [idProofFile, setIdProofFile] = useState(null);
// const [bankStatementFile, setBankStatementFile] = useState(null);
// const [creditBureauFile, setCreditBureauFile] = useState(null);
// const [progressMap, setProgressMap] = useState({});


//   const validateFile = (file) => {
//     const maxFileSize = 10 * 1024 * 1024;
//     const allowedExtensions = ['.pdf'];
//     const unsupportedExtensions = ['.docx', '.gif', '.svg', '.txt', '.csv', '.xlsx', '.xls', '.png', '.jpg', '.jpeg', '.webp',];

//     const fileNameLower = file.name.toLowerCase();
//     const fileExtension = fileNameLower.slice(fileNameLower.lastIndexOf('.'));

//     if (unsupportedExtensions.includes(fileExtension)) {
//       return `File type not supported: ${fileExtension}`;
//     }
//     if (!allowedExtensions.includes(fileExtension)) {
//       return 'Supported file types are: pdf.';
//     }
//     if (file.size > maxFileSize) {
//       return 'File size should not exceed 10MB.';
//     }
//     return null;
//   };

//   const handleFileChange = (e, docType) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const validationError = validateFile(file);
//     if (validationError) {
//       setError(validationError);
//       return;
//     }

//     setError('');

//     if (docType === 'id') {
//       setIdProofFile(file);
//       setStep(2);
//     } else if (docType === 'bank') {
//       setBankStatementFile(file);
//       setStep(3);
//     } else if (docType === 'credit') {
//       setCreditBureauFile(file);
//     }

//     let progress = 0;
//     const interval = setInterval(() => {
//       progress += 10;
//       setProgressMap(prev => ({
//         ...prev,
//         [docType]: progress
//       }));
//       if (progress >= 100) clearInterval(interval);
//     }, 100);
//   };

//   const handleRemoveFile = (docType) => {
//     if (docType === 'id') {
//       setIdProofFile(null);
//       setStep(1);
//     } else if (docType === 'bank') {
//       setBankStatementFile(null);
//       setStep(2);
//     } else if (docType === 'credit') {
//       setCreditBureauFile(null);
//       setStep(3);
//     }

//     setProgressMap(prev => {
//       const newMap = { ...prev };
//       delete newMap[docType];
//       return newMap;
//     });
//   };

// const imageRespose = async () => {
//   try {
//     setIsLoading(true);

//     const formData = new FormData();

//     if (idProofFile) formData.append('idProofFile', idProofFile);
//     if (bankStatementFile) formData.append('bankStatementFile', bankStatementFile);
//     if (creditBureauFile) formData.append('creditBureauFile', creditBureauFile);

//     formData.append('id', userLoginData?._id);

//     const response = await axios.post(API.fileUploadByid, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });

//     console.log('Uploaded file paths:', response.data?.updatedData?.file_path);
//     setTimeout(() => {
//       navigate(`/uploadDocument/${userLoginData?._id}`)
//     }, 1000);
//     await analizeDocument(response.data?.updatedData?.file_path)


//   } catch (error) {
//     console.error('Upload failed:', error);
//   } finally {
//     setIsLoading(false);
//   }
// };


//   const renderFileCard = (file, label, docType, progress) => (
//     <motion.div
//       key={file.name}
//       initial={{ opacity: 0, x: 10 }}
//       animate={{ opacity: 1, x: 0 }}
//       transition={{ duration: 0.3 }}
//     >
//       <Box
//         sx={{
//           bgcolor: "#f0f0f4",
//           p: 1,
//           borderRadius: "10px",
//           boxShadow: "md",
//           ml: '10px',
//           mr: '10px',
//           mt: '10px',
//         }}
//       >
//         <Box
//           sx={{
//             cursor: 'pointer',
//             display: 'flex',
//             justifyContent: 'flex-end'
//           }}
//           onClick={() => handleRemoveFile(docType)}
//         >
//           <CancelOutlinedIcon sx={{ color: 'red', fontSize: '20px' }} />
//         </Box>

//         <Stack direction={"row"} justifyContent={'space-between'} alignItems="center" spacing={1}>
//           <Stack direction={'row'} spacing={2}>
//             <img
//               src={pdficon}
//               alt="Uploaded file"
//               style={{
//                 width: "30px",
//                 height: "30px",
//                 cursor: "pointer",
//                 mixBlendMode: "darken",
//               }}
//             />
//             <Box>
//               <Typography
//                 sx={{
//                   color: "#676767",
//                   fontSize: "14px",
//                   fontWeight: "600",
//                   mb: "5px",
//                 }}
//               >
//                 {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
//               </Typography>
//               <Typography
//                 sx={{
//                   color: "#999",
//                   fontSize: "13px",
//                   fontStyle: "italic",
//                 }}
//               >
//                 {label}
//               </Typography>
//               <Box sx={{ width: '100%' }}>
//                 <LinearProgressWithLabel value={progress} />
//               </Box>
//             </Box>
//           </Stack>

//         </Stack>
//       </Box>
//     </motion.div>
//   );


//   return (
//     <Sidebar title={"Upload Documents"}>
//       <div style={{ maxWidth: '100%', padding: '20px', fontFamily: 'Arial' }}>
//         <h2 style={{ fontSize: '24px', marginBottom: '30px' }}>Document Submission</h2>

//         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '50px' }}>
//           {steps.map((step, index) => (
//             <div key={step.key} style={{ flex: 1, textAlign: 'center', position: 'relative' }}>
//               <div
//                 style={{
//                   width: '30px',
//                   height: '30px',
//                   borderRadius: '50%',
//                   backgroundColor: completed[step.key] ? 'green' : 'gray',
//                   color: 'white',
//                   lineHeight: '30px',
//                   margin: '0 auto',
//                   fontWeight: 'bold',
//                 }}
//               >
//                 {index + 1}
//               </div>
//               <div style={{ marginTop: '8px', fontSize: '14px', fontWeight: completed[step.key] ? 'bold' : 'normal', color: completed[step.key] ? 'green' : 'black' }}>
//                 {step.label}
//               </div>
//               {index < steps.length - 1 && (
//                 <div
//                   style={{
//                     position: 'absolute',
//                     top: '15px',
//                     right: '-50%',
//                     height: '4px',
//                     width: '100%',
//                     backgroundColor: completed[step.key] ? 'green' : '#ccc',
//                     zIndex: -1,
//                   }}
//                 />
//               )}
//             </div>
//           ))}
//         </div>

//         <div>
//           {steps.map((step) => (
//             <div
//               key={step.key}
//               style={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 border: '1px solid #ccc',
//                 padding: '15px 20px',
//                 borderRadius: '6px',
//                 marginBottom: '20px',
//               }}
//             >
//               <span style={{ fontSize: '16px' }}>{step.label} Form</span>
//               {!completed[step.key] ? (
//                 <button
//                   onClick={() => handleComplete(step.key)}
//                   style={{
//                     backgroundColor: '#007bff',
//                     color: '#fff',
//                     padding: '8px 16px',
//                     border: 'none',
//                     borderRadius: '4px',
//                     cursor: 'pointer',
//                   }}
//                 >
//                   Complete
//                 </button>
//               ) : (
//                 <span style={{ color: 'green', fontWeight: 'bold' }}>Completed</span>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       <Box sx={{ display: "flex", justifyContent: 'center' }}>
//         <Box
//           sx={{ bgcolor: '#fff', width: '45%', p: 2, borderRadius: '20px', boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;' }}
//         >
//           <Box
//             sx={{
//               mb: '10px',
//             }}
//           >
//             <Typography
//               style={{
//                 fontSize: '20px',
//                 fontWeight: '600',
//                 color: '#000',
//                 textAlign: 'center',
//               }}
//             >
//               Upload and attach{' '}
//               {idProofFile === null
//                 ? 'ID Proof'
//                 : bankStatementFile === null
//                   ? 'Bank Statement'
//                   : creditBureauFile === null
//                     ? 'Credit Bureau Report'
//                     : 'All Documents Uploaded'}.
//             </Typography>

//             <Typography
//               style={{
//                 fontSize: '14px',
//                 fontWeight: '500',
//                 color: '#aaa',
//                 textAlign: 'center',
//               }}
//             >
//               Attachments will be a part of this project.
//             </Typography>
//           </Box>

//           <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//             <Box
//               sx={{ width: '100%' }}
//             >
//               <Box
//                 sx={{ border: "2px dashed #aaa", p: 2, borderRadius: '20px', bgcolor: '#fff' }}
//               >
//                 <Box display={'flex'} justifyContent={'center'}>
//                   <Box>
//                     <Box
//                       sx={{
//                         display: 'flex',
//                         justifyContent: 'center'
//                       }}
//                     >
//                       <img
//                         src={idProofImg}
//                         alt="ID Proof"
//                         style={{
//                           width: '100px',
//                           height: '100px',

//                           mixBlendMode: 'darken',
//                           cursor: 'pointer',
//                         }}
//                       />

//                     </Box>

//                     {idProofFile !== null ? '' :
//                       <Box>
//                         <Typography sx={{ fontSize: '14px', fontWeight: '600', color: '#656565', mb: '5px' }}>Id Proof <span style={{ color: 'red' }}>*</span></Typography>
//                         <input
//                           type="file"
//                           onChange={(e) => handleFileChange(e, 'id')}
//                           style={{
//                             color: '#000',
//                             border: '1px solid #000',
//                             padding: 10,
//                             borderRadius: '5px',
//                             width: '350px',
//                           }}
//                           disabled={idProofFile !== null}
//                           accept='application/pdf'
//                         />
//                       </Box>}


//                     {bankStatementFile !== null ? '' :
//                       <Box>
//                         {step >= 2 && (
//                           <Box>
//                             <Typography sx={{ fontSize: '14px', fontWeight: '600', color: '#656565', mb: '5px' }}>Bank Statement <span style={{ color: 'red' }}>*</span></Typography>
//                             <input
//                               type="file"
//                               onChange={(e) => handleFileChange(e, 'bank')}
//                               style={{
//                                 color: '#000',
//                                 border: '1px solid #000',
//                                 padding: 10,
//                                 borderRadius: '5px',
//                                 width: '350px',
//                               }}
//                               disabled={bankStatementFile !== null}
//                               accept='application/pdf'

//                             />
//                           </Box>
//                         )}
//                       </Box>}

//                     <Box>
//                       {step >= 3 && (
//                         <Box>
//                           <Typography sx={{ fontSize: '14px', fontWeight: '600', color: '#656565', mb: '5px' }}>Credit Burea Report <span style={{ color: 'red' }}>*</span></Typography>
//                           <input
//                             type="file"
//                             onChange={(e) => handleFileChange(e, 'credit')}
//                             style={{
//                               color: '#000',
//                               border: '1px solid #000',
//                               padding: 10,
//                               borderRadius: '5px',
//                               width: '350px',
//                             }}
//                             disabled={creditBureauFile !== null}
//                             accept='application/pdf'

//                           />
//                         </Box>
//                       )}
//                     </Box>

//                   </Box>
//                 </Box>

//                 <Box sx={{ display: 'flex', justifyContent: 'center', mt: '10px' }}>
//                   <Box sx={{ mt: '8px', mb: '10px' }}>
//                     <Typography style={{ fontSize: '14px', fontWeight: '600', color: '#000', textAlign: 'center' }}>
//                       Support (.pdf) here to import
//                     </Typography>
//                     <Typography style={{ fontSize: '14px', fontWeight: '600', color: '#676767', textAlign: 'center' }}>
//                       or, click to browse (10MB per file).
//                     </Typography>

//                   </Box>
//                 </Box>

//                 {error && (
//                   <Typography sx={{ textAlign: 'center', fontSize: '14px', color: 'red', fontWeight: '600' }}>{error}</Typography>
//                 )}
//               </Box>

//               <Box
//                 sx={{
//                   mt: '10px',
//                 }}
//               >
//                 {idProofFile || bankStatementFile || creditBureauFile ? (
//                   <>
//                     <Box>
//                       <Typography
//                         sx={{
//                           textAlign: 'start',
//                           fontSize: '14px',
//                           color: '#656565',
//                           fontWeight: '600',
//                         }}
//                       >
//                         {[
//                           idProofFile,
//                           bankStatementFile,
//                           creditBureauFile
//                         ].filter(Boolean).length} File Uploaded...
//                       </Typography>
//                     </Box>

//                     <Box sx={{ overflowX: 'auto' }}>
//                       <Stack
//                         direction={'column'}
//                         sx={{
//                           width: '100%',
//                           gap: 1,
//                           overflowY: 'auto',
//                           height: idProofFile || bankStatementFile ? 'auto' : '40vh',
//                           scrollbarWidth: 'none'
//                         }}
//                       >
//                         {idProofFile && renderFileCard(idProofFile, "ID Proof", "id", progressMap['id'] || 0)}
//                         {bankStatementFile && renderFileCard(bankStatementFile, "Bank Statement", "bank", progressMap['bank'] || 0)}
//                         {creditBureauFile && renderFileCard(creditBureauFile, "Credit Bureau", "credit", progressMap['credit'] || 0)}
//                       </Stack>
//                     </Box>


//                   </>
//                 ) : null}
//               </Box>
//             </Box>
//           </Box>

//           <Stack direction={'row'} justifyContent={'center'} spacing={2}>

// <Box
//   sx={{
//     borderRadius: "20px",
//   }}
// >

//   <Box sx={{ display: "flex", justifyContent: "center", mt: '20px' }}>

//     <Button
//       disabled={!idProofFile || !bankStatementFile || !creditBureauFile}
//       sx={{
//         fontSize: '14px',
//         fontWeight: 600,
//         color: '#fff',
//         cursor: 'pointer',
//         textTransform: 'none',
//         bgcolor: '#c3d600',
//         width: '250px',
//         height: '40px',
//         borderRadius: '8px',
//         boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//         transition: 'all 0.3s ease-in-out',
//         '&:hover': {
//           bgcolor: 'darkorange',
//           transform: 'translateY(-2px) scale(1.05)',
//           boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
//         },
//         '&:active': {
//           transform: 'scale(0.98)',
//         },
//       }}

//       onClick={imageRespose}
//     >
//       Submit
//     </Button>



//   </Box>

// </Box>



//           </Stack>
//         </Box>
//       </Box>

//     </Sidebar >
//   );
// }

// export default UploadDocuments;



import React, { useState } from 'react';
import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  Typography,
  Paper,
  Stack,
  Divider,
} from '@mui/material';
import Sidebar from '../../Component/Sidebar';
import Check from '@mui/icons-material/Check';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API from '../../Component/BaseURL';
import pdficon from '../../assets/pdf.png';

const ColorlibStepIconRoot = styled('div')(({ ownerState }) => ({
  backgroundColor: ownerState.completed
    ? '#4caf50'
    : ownerState.error
    ? '#f44336'
    : '#e0e0e0',
  zIndex: 1,
  color: '#fff',
  width: 35,
  height: 35,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  fontWeight: 600,
  fontFamily:"sans-serif",
  ...(ownerState.active && {
    boxShadow: '0 0 0 4px #a5d6a7',
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className, icon, error } = props;
  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active, error }}
      className={className}
    >
      {completed ? <Check /> : icon}
    </ColorlibStepIconRoot>
  );
}

const steps = ['ID Proof', 'Bank Statement', 'Credit Bureau Report'];

export default function UploadDocuments({ domainPath, userLoginData, analizeDocument }) {
  const [isLoading, setIsLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState({
    id: null,
    bank: null,
    credit: null,
  });

  const navigate = useNavigate();

  const handleFileChange = (e, key) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadedFiles(prev => ({
      ...prev,
      [key]: file,
    }));
  };

  const handleDeleteFile = (key) => {
    setUploadedFiles(prev => ({
      ...prev,
      [key]: null,
    }));
  };

  const isStepComplete = index => {
    if (index === 0) return !!uploadedFiles.id;
    if (index === 1) return !!uploadedFiles.bank;
    if (index === 2) return !!uploadedFiles.credit;
    return false;
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(prev => prev - 1);
    }
  };

  const currentKey = activeStep === 0 ? 'id' : activeStep === 1 ? 'bank' : 'credit';

  const imageRespose = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      if (uploadedFiles.id) formData.append('idProofFile', uploadedFiles.id);
      if (uploadedFiles.bank) formData.append('bankStatementFile', uploadedFiles.bank);
      if (uploadedFiles.credit) formData.append('creditBureauFile', uploadedFiles.credit);
      formData.append('id', userLoginData?._id);

      const response = await axios.post(API.fileUploadByid, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Uploaded file paths:', response.data?.updatedData?.file_path);

      setTimeout(() => {
        navigate(`/uploadDocument/${userLoginData?._id}`);
      }, 1000);

      await analizeDocument(response.data?.updatedData?.file_path);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sidebar title="Upload Documents">
      <Box sx={{ width: '100%', pt: 0.5 }}>
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{
            '& .MuiStepConnector-line': { borderColor: '#4caf50' },
            '& .MuiStepLabel-label.Mui-completed, & .MuiStepLabel-label.Mui-active': {
              color: '#4caf50 !important',
              fontWeight: 600,
            },
          }}
        >
          {steps.map((label, index) => {
            const completed = isStepComplete(index);
            const error = !completed && index !== activeStep;

            return (
              <Step key={label} completed={completed}>
                <StepLabel
                  StepIconComponent={(props) =>
                    <ColorlibStepIcon {...props} completed={completed} error={error} icon={index + 1} />
                  }
                >
                  {label}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ width: '100%', maxWidth: 600 }}>
            <Paper elevation={5} sx={{ borderRadius: 4, p: 1.5, mt: 1.5 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Upload {steps[activeStep]}
              </Typography>

              <Divider sx={{ mb: 2 }} />

              <Box sx={{ mb: 3 }}>
                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<UploadFileIcon />}
                  fullWidth
                  sx={{
                    textTransform: 'none',
                    py: 1.5,
                    borderStyle: 'dashed',
                    borderColor: '#90caf9',
                    color: '#1976d2',
                  }}
                >
                  {isStepComplete(activeStep) ? 'Replace File (PDF)' : 'Click to Upload PDF'}
                  <input
                    type="file"
                    accept="application/pdf"
                    hidden
                    onChange={e => handleFileChange(e, currentKey)}
                  />
                </Button>
              </Box>

              <Box>
                <Typography variant="subtitle2" gutterBottom>Uploaded Files:</Typography>
                <Stack spacing={1}>
                  {uploadedFiles.id && (
                    <FileItem
                      label="ID Proof"
                      file={uploadedFiles.id}
                      bgColor="#e3f2fd"
                      color="#1976d2"
                      isActive={activeStep === 0}
                      onDelete={() => handleDeleteFile('id')}
                    />
                  )}
                  {uploadedFiles.bank && (
                    <FileItem
                      label="Bank Statement"
                      file={uploadedFiles.bank}
                      bgColor="#e3f2fd"
                      color="#1976d2"
                      isActive={activeStep === 1}
                      onDelete={() => handleDeleteFile('bank')}
                    />
                  )}
                  {uploadedFiles.credit && (
                    <FileItem
                      label="Credit Bureau Report"
                      file={uploadedFiles.credit}
                      bgColor="#e3f2fd"
                      color="#1976d2"
                      isActive={activeStep === 2}
                      onDelete={() => handleDeleteFile('credit')}
                    />
                  )}
                </Stack>
              </Box>
            </Paper>
          </Box>

          <Box
            sx={{
              position: 'fixed',
              bottom: 24,
              right: 24,
              zIndex: 10,
            }}
          >
            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                onClick={handleBack}
                disabled={activeStep === 0}
                sx={{ textTransform: 'capitalize', width: 120 }}
              >
                Back
              </Button>

              {activeStep < steps.length - 1 ? (
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleNext}
                  disabled={!isStepComplete(activeStep)}
                  sx={{ textTransform: 'capitalize', width: 120 }}
                >
                  Next
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="success"
                  onClick={imageRespose}
                  disabled={!uploadedFiles.id || !uploadedFiles.bank || !uploadedFiles.credit}
                  sx={{ textTransform: 'capitalize', width: 120 }}
                >
                  Submit
                </Button>
              )}
            </Stack>
          </Box>
        </Box>
      </Box>
    </Sidebar>
  );
}

function FileItem({ label, file, bgColor, color, isActive, onDelete }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 1.5,
        borderRadius: 2,
        backgroundColor: bgColor,
        boxShadow: isActive ? 4 : 1,
        border: isActive ? `2px solid ${color}` : '1px solid transparent',
        transition: 'all 0.3s ease',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <img
          src={pdficon}
          alt="PDF Icon"
          style={{
            width: '20px',
            height: '20px',
            mixBlendMode: 'darken',
          }}
        />
        <Typography variant="body2" noWrap sx={{ color }}>
          <strong>{label}:</strong> {file.name}
        </Typography>
      </Box>
      <CloseIcon
        onClick={onDelete}
        sx={{
          cursor: 'pointer',
          color: 'red',
          '&:hover': { opacity: 0.7 },
        }}
      />
    </Box>
  );
}








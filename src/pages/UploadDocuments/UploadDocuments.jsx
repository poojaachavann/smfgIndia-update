
import React, { useEffect, useRef, useState } from 'react'
import Sidebar from '../../Component/Sidebar'
import { Box, Button, LinearProgress, Stack, Typography } from '@mui/material'
import idProof from '../../assets/idProof.png'
import pdficon from '../../assets/pdf.png'
import crdebureau from '../../assets/creditBureau.png'
import bankStatement from '../../assets/bankStatement.png'
import { motion } from 'framer-motion';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function UploadDocuments() {

  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [fileName, setFileName] = useState('')

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const fileInputRef = useRef(null);

  const [validFiles, setValidFiles] = useState([]);

  const processFile = async (files) => {
    const maxFileSize = 30 * 1024 * 1024;
    const allowedExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.pdf'];
    const unsupportedExtensions = ['.docx', '.gif', '.svg', '.txt', '.csv', '.xlsx', '.xls',];

    const validFiles = [];
    const errors = [];

    for (let file of files) {
      const fileNameLower = file.name.toLowerCase();
      const fileExtension = fileNameLower.slice(fileNameLower.lastIndexOf('.'));

      if (unsupportedExtensions.includes(fileExtension)) {
        errors.push(`File type not supported: ${fileExtension}.`);
      } else if (!allowedExtensions.includes(fileExtension)) {
        errors.push('Supported file types are: png, jpg, jpeg, webp, pdf.');
      } else if (file.size > maxFileSize) {
        errors.push('File size should not exceed 20MB.');
      } else {
        validFiles.push(file);
      }
    }

    if (errors.length > 0) {
      setError(errors.join(' '));
      setFileName('');
    } else {
      setError('');
      setFileName(validFiles.map(file => file.name).join(', '));
      setValidFiles(validFiles);

      const reader = new FileReader();
      reader.onloadend = () => {
        // Handle preview if needed
      };
      reader.readAsDataURL(validFiles[0]);
    }

    return validFiles;
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    processFile(files).then(validFiles => {
      if (validFiles.length > 0) {
        setValidFiles(validFiles);
      }
    });
  };
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <Sidebar title={"Upload Documents"}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", position: 'absolute', top: '10%' }}>

          <Box
            sx={{
              bgcolor: "#fff",
              p: 2,
              borderRadius: "20px",
              width: "100%",
              boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
            }}
          >
            <Box display={'flex'} justifyContent={'center'}>
              <Box>
                <Box
                  sx={{
                    position: 'relative',
                    width: '300px',
                    height: '200px',
                    margin: 'auto',
                  }}
                >
                  <img
                    src={idProof}
                    alt="ID Proof"
                    style={{
                      width: '120px',
                      height: '120px',
                      position: 'absolute',
                      top: '60%',
                      left: '20%',
                      transform: 'translate(-50%, -50%) rotate(-20deg)',
                      mixBlendMode: 'darken',
                      cursor: 'pointer',
                    }}
                  />
                  <img
                    src={crdebureau}
                    alt="Credit Bureau"
                    style={{
                      width: '120px',
                      height: '120px',
                      position: 'absolute',
                      top: '0%',
                      left: '50%',
                      transform: 'translate(-50%, 0%)',
                      mixBlendMode: 'darken',
                      cursor: 'pointer',
                    }}
                  />
                  <img
                    src={bankStatement}
                    alt="Bank Statement"
                    style={{
                      width: '120px',
                      height: '120px',
                      position: 'absolute',
                      top: '60%',
                      left: '80%',
                      transform: 'translate(-50%, -50%) rotate(20deg)',
                      mixBlendMode: 'darken',
                      cursor: 'pointer',
                    }}
                  />
                </Box>

                <input
                  type="file"
                  style={{
                    color: '#000',
                    border: '1px solid #000',
                    padding: 10,
                    borderRadius: '5px',
                    width: '350px',
                    display: 'none'
                  }}
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  name="file_path"
                  multiple
                />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: '10px' }}>
              <Box sx={{ mt: '8px', mb: '10px' }}>
                <Typography style={{ fontSize: '14px', fontWeight: '600', color: '#000', textAlign: 'center' }}>
                  Drag pdf, jpeg, png here to import
                </Typography>
                <Typography style={{ fontSize: '14px', fontWeight: '600', color: '#676767', textAlign: 'center' }}>
                  or, click to browse (30MB per file).
                </Typography>
                <Typography sx={{ fontSize: '13px', fontWeight: '600', color: 'red', textAlign: 'start', mt: 2 }}>
                  Note: Fast-track your process! Upload ID Proof, Bank Statement & Credit Bureau report.
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="text"
                sx={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'blue',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  textTransform: 'none',
                  '&:hover': {
                    color: 'darkblue',
                    transform: 'scale(1.1)',
                    transition: 'transform 0.3s ease-in-out',
                  },
                }}
                onClick={handleImageClick}
              >
                Select file
              </Button>
            </Box>
            <Typography sx={{ textAlign: 'center', fontSize: '14px', color: 'red', fontWeight: '600' }}>{error}</Typography>

          </Box>


          <Box sx={{ width: "100%", mt: 0.5 }}>
            {validFiles.map((file, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Box
                  sx={{
                    mb: 1,
                    bgcolor: "#fff",
                    p: 2,
                    borderRadius: "10px",
                    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                  }}
                >
                  <Stack direction={"row"} alignItems="center" spacing={1}>
                    <img
                      src={pdficon}
                      alt="Uploaded file"
                      style={{
                        width: "30px",
                        height: "30px",
                        cursor: "pointer",
                        mixBlendMode: "darken",
                      }}
                    />
                    <Box width={"100%"} sx={{ pl: "10px" }}>
                      <Typography
                        sx={{
                          color: "#676767",
                          fontSize: "14px",
                          fontWeight: "600",
                          mb: "3px",
                        }}
                      >
                        {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={progress}
                        sx={{ width: "100%" }}
                        color="success"
                      />
                    </Box>

                    <Box>
                      <CheckCircleIcon sx={{ color: 'green' }} />
                    </Box>


                  </Stack>
                </Box>
              </motion.div>
            ))}

          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ width: "100%", mt: 0.5 }}>
              <Button
                sx={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#fff',
                  cursor: 'pointer',
                  textTransform: 'none',
                  bgcolor: 'orange',
                  width: '120px',
                  height: '40px',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    bgcolor: 'darkorange',
                    transform: 'translateY(-2px) scale(1.05)',
                    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
                  },
                  '&:active': {
                    transform: 'scale(0.98)',
                  },
                }}
              >
                Submit
              </Button>

            </Box>
          </Box>

        </Box>
      </Box>
    </Sidebar>
  )
}

export default UploadDocuments

import React, { useState } from 'react';
import Sidebar from '../../Component/Sidebar';
import {
  Box,
  Button,
  Modal,
  Stack,
  Typography
} from '@mui/material';
import idProofImg from '../../assets/idProof.png';
import pdficon from '../../assets/pdf.png';
import crdebureauImg from '../../assets/creditBureau.png';
import bankStatementImg from '../../assets/bankStatement.png';
import { motion } from 'framer-motion';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import './UploadDouments.css'
import checkIicon from '../../assets/checkicon.png'
import warningicon from '../../assets/warningicon.png'

function UploadDocuments() {
  const [error, setError] = useState(null);

  const [step, setStep] = useState(1);
  const [idProofFile, setIdProofFile] = useState(null);
  const [bankStatementFile, setBankStatementFile] = useState(null);
  const [creditBureauFile, setCreditBureauFile] = useState(null);


  const validateFile = (file) => {
    const maxFileSize = 10 * 1024 * 1024;
    const allowedExtensions = ['.pdf'];
    const unsupportedExtensions = ['.docx', '.gif', '.svg', '.txt', '.csv', '.xlsx', '.xls', '.png', '.jpg', '.jpeg', '.webp',];

    const fileNameLower = file.name.toLowerCase();
    const fileExtension = fileNameLower.slice(fileNameLower.lastIndexOf('.'));

    if (unsupportedExtensions.includes(fileExtension)) {
      return `File type not supported: ${fileExtension}`;
    }
    if (!allowedExtensions.includes(fileExtension)) {
      return 'Supported file types are: pdf.';
    }
    if (file.size > maxFileSize) {
      return 'File size should not exceed 10MB.';
    }
    return null;
  };

  const handleFileChange = (e, docType) => {
    const file = e.target.files[0];
    if (!file) return;

    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');

    if (docType === 'id') {
      setIdProofFile(file);
      setStep(2);
    } else if (docType === 'bank') {
      setBankStatementFile(file);
      setStep(3);
    } else if (docType === 'credit') {
      setCreditBureauFile(file);
    }
  };

  const handleRemoveFile = (docType) => {
    if (docType === 'id') {
      setIdProofFile(null);
      setStep(1);
    } else if (docType === 'bank') {
      setBankStatementFile(null);
      setStep(2);
    } else if (docType === 'credit') {
      setCreditBureauFile(null);
      setStep(3);
    }
  };


  const [open1, setOpen1] = useState(false);

  const handleOpen1 = () => {
    setOpen1(true);
  };

  const handleModalClose1 = () => {
    setOpen1(false);
  };



  const renderFileCard = (file, label, docType) => (
    <motion.div
      key={file.name}
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Box
        sx={{
          position: 'relative',
          mb: 2,
          bgcolor: "#fff",
          p: 3,
          borderRadius: "10px",
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -9,
            right: -3,
            cursor: 'pointer',
          }}
          onClick={() => handleRemoveFile(docType)}
        >
          <CancelOutlinedIcon sx={{ color: 'red' }} />
        </Box>

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
                mb: "5px",
              }}
            >
              {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
            </Typography>
            <Typography
              sx={{
                color: "#999",
                fontSize: "13px",
                fontStyle: "italic",
              }}
            >
              {label}
            </Typography>
            {/* <LinearProgress
              variant="determinate"
              value={progress}
              sx={{ width: "100%" }}
              color="success"
            /> */}
          </Box>

          <Box>
            <img src={checkIicon} style={{ width: '40px' }} />
          </Box>
        </Stack>
      </Box>
    </motion.div>
  );



  return (
    <Sidebar title={"Upload Documents"}>
      <Stack direction={'row'} justifyContent={'center'} spacing={2}>
        <Box
          sx={{
            bgcolor: "#fff",
            p: 2,
            borderRadius: "20px",
            width: "80%",
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
                  src={idProofImg}
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
                  src={crdebureauImg}
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
                  src={bankStatementImg}
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

              {idProofFile !== null ? '' :
                <Box>
                  <Typography sx={{ fontSize: '14px', fontWeight: '600', color: '#656565', mb: '7px' }}>Id Proof <span style={{ color: 'red' }}>*</span></Typography>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, 'id')}
                    style={{
                      color: '#000',
                      border: '1px solid #000',
                      padding: 10,
                      borderRadius: '5px',
                      width: '350px',
                    }}
                    disabled={idProofFile !== null}
                    accept='application/pdf'
                  />
                </Box>}


              {bankStatementFile !== null ? '' :
                <Box>
                  {step >= 2 && (
                    <Box>
                      <Typography sx={{ fontSize: '14px', fontWeight: '600', color: '#656565', mb: '7px' }}>Bank Statement <span style={{ color: 'red' }}>*</span></Typography>
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(e, 'bank')}
                        style={{
                          color: '#000',
                          border: '1px solid #000',
                          padding: 10,
                          borderRadius: '5px',
                          width: '350px',
                        }}
                        disabled={bankStatementFile !== null}
                        accept='application/pdf'

                      />
                    </Box>
                  )}
                </Box>}

              <Box>
                {step >= 3 && (
                  <Box>
                    <Typography sx={{ fontSize: '14px', fontWeight: '600', color: '#656565', mb: '7px' }}>Credit Burea Report <span style={{ color: 'red' }}>*</span></Typography>
                    <input
                      type="file"
                      onChange={(e) => handleFileChange(e, 'credit')}
                      style={{
                        color: '#000',
                        border: '1px solid #000',
                        padding: 10,
                        borderRadius: '5px',
                        width: '350px',
                      }}
                      disabled={creditBureauFile !== null}
                      accept='application/pdf'

                    />
                  </Box>
                )}
              </Box>

            </Box>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: '10px' }}>
            <Box sx={{ mt: '8px', mb: '10px' }}>
              <Typography style={{ fontSize: '14px', fontWeight: '600', color: '#000', textAlign: 'center' }}>
                Support pdf here to import
              </Typography>
              <Typography style={{ fontSize: '14px', fontWeight: '600', color: '#676767', textAlign: 'center' }}>
                or, click to browse (10MB per file).
              </Typography>
              <Typography sx={{ fontSize: '13px', fontWeight: '600', color: 'red', textAlign: 'start', mt: 2 }}>
                Note: Fast-track your process! Upload ID Proof, Bank Statement & Credit Bureau report.
              </Typography>
            </Box>
          </Box>

          {error && (
            <Typography sx={{ textAlign: 'center', fontSize: '14px', color: 'red', fontWeight: '600' }}>{error}</Typography>
          )}
        </Box>
        {idProofFile || bankStatementFile || creditBureauFile ? (
          <Box sx={{ width: "80%" }}>
            {idProofFile && renderFileCard(idProofFile, "ID Proof", "id")}
            {bankStatementFile && renderFileCard(bankStatementFile, "Bank Statement", "bank")}
            {creditBureauFile && renderFileCard(creditBureauFile, "Credit Bureau", "credit")}
          </Box>
        ) : null}

      </Stack>


      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>

        <Button
          disabled={!idProofFile || !bankStatementFile || !creditBureauFile}
          sx={{
            fontSize: '14px',
            fontWeight: 600,
            color: '#fff',
            cursor: 'pointer',
            textTransform: 'none',
            bgcolor: '#c3d600',
            width: '15%',
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

          onClick={handleOpen1}
        >
          Submit
        </Button>

        <Modal open={open1}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "auto",
              bgcolor: "background.paper",
              boxShadow: 2,
              borderRadius: 2,
              p: 2,
            }}
          >

            <Typography sx={{ fontSize: '15px', fontWeight: '600', color: '#686868', mb: '10px', textAlign: 'center' }}>Please wait processing...</Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', mb: '30px' }}>
              <span class="loader"></span>
            </Box>

            <Box>
              <Stack direction={'row'} alignItems={'center'} gap={3}>
                <Typography sx={{ fontSize: '14px', fontWeight: '600', color: '#676767' }}>Demography Report Analysis</Typography>
                <img src={checkIicon} style={{ width: '30px' }} />
                {/* <span class="loader1"></span> */}
              </Stack>
              <Stack direction={'row'} alignItems={'center'} gap={3}>
                <Typography sx={{ fontSize: '14px', fontWeight: '600', color: '#676767' }}>Regularity and quantum of income flow</Typography>
                <img src={warningicon} style={{ width: '30px' }} />
                {/* <span class="loader1"></span> */}
              </Stack>
              <Stack direction={'row'} alignItems={'center'} gap={3}>
                <Typography sx={{ fontSize: '14px', fontWeight: '600', color: '#676767' }}>Balance build-up over period</Typography>
                <img src={checkIicon} style={{ width: '30px' }} />
                {/* <span class="loader1"></span> */}
              </Stack>
              <Stack direction={'row'} alignItems={'center'} gap={3}>
                <Typography sx={{ fontSize: '14px', fontWeight: '600', color: '#676767' }}>Spend pattern</Typography>
                <img src={warningicon} style={{ width: '30px' }} />
                {/* <span class="loader1"></span> */}
              </Stack>
            </Box>

          </Box>
        </Modal>


      </Box>




    </Sidebar>
  );
}

export default UploadDocuments;


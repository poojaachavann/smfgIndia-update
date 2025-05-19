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
      ? '#009688'
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
  fontFamily: "sans-serif",
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

    e.target.value = '';
  };

  const handleDeleteFile = (key) => {
    setUploadedFiles(prev => {
      const updatedFiles = { ...prev, [key]: null };
      if (key === 'id') {
        setActiveStep(0);
      } else if (key === 'bank') {
        setActiveStep(1);
      } else if (key === 'credit') {
        setActiveStep(2);
      }
      return updatedFiles;
    });
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
          color: '#607d8b',
          '&:hover': { opacity: 0.7 },
        }}
      />
    </Box>
  );
}










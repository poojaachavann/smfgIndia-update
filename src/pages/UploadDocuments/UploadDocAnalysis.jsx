import React, { useEffect, useState } from 'react'
import Sidebar from '../../Component/Sidebar'
import {
    Avatar,
    // Accordion,
    // AccordionDetails,
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    Pagination,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    // Table,
    // TableBody,
    // TableCell,
    // TableContainer,
    // TableHead,
    // TableRow,
    Tooltip,
    Typography
} from '@mui/material';

import pdficon from '../../assets/pdf.png';
import './UploadDouments.css'
import axios from 'axios';
import API from '../../Component/BaseURL';
import checkIicon from '../../assets/checkicon.png'
// import greenTik from '../../assets/greenTik.png'
// import redAlert from '../../assets/redAlert.png'
// import warningIcon from '../../assets/warningIcon.png'

import personalInfo from '../../assets/personalInfo.png'
import addressInfo from '../../assets/addressInfo.png'
// import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
// import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import Markdown from 'markdown-to-jsx';
import AccordionCSV from './AccordionCSV';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './UploadDouments.css'
import InfoIcon from '@mui/icons-material/Info';

export default function UploadDocAnalysis({ domainPath, userLoginData, isLoadingIdProof, isLoadingBankStatement, isLoadingcreditbuero, apiResIdProof, apiResBankStatement, apiResCreditBurea }) {

    const [uploadedData, setUploadedData] = useState('')
    console.log("AssetData", uploadedData[0])
    const [currentPage_1, setCurrentPage_1] = useState(1);
    const itemsPerPage = 1;

    const [currentPage_2, setCurrentPage_2] = useState(1);
    const itemsPerPage2 = 1;

    const uploadDocumentData = async () => {
        try {
            const response = await axios.get(API.uploadDataFetch)
            setUploadedData(response.data?.uploadedData.filter((data) => data._id === userLoginData?._id))
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        uploadDocumentData()
    }, [userLoginData])


    const pages = apiResBankStatement?.extraction?.pages?.length
        ? apiResBankStatement.extraction.pages
        : uploadedData[0]?.file_response?.bankStatement?.at(-1)?.extraction?.pages;

    const paginatedData = pages?.slice(
        (currentPage_1 - 1) * itemsPerPage,
        currentPage_1 * itemsPerPage
    );

    const totalPages_1 = Math.ceil(pages?.length / itemsPerPage);

    const handlePageChange = (event, value, pageType) => {
        if (pageType === 'page_1') {
            setCurrentPage_1(value);
        }
    };

    const components = uploadedData[0]?.file_response?.creditBureau?.at(-1)?.validation_result?.components?.length
        ? uploadedData[0]?.file_response?.creditBureau?.at(-1)?.validation_result?.components
        : apiResCreditBurea?.validation_result?.components;

    const paginatedData1 = components?.slice(
        (currentPage_2 - 1) * itemsPerPage2,
        currentPage_2 * itemsPerPage2
    );

    const totalPages_2 = Math.ceil(components?.length / itemsPerPage2);

    const handlePageChange1 = (event, value, pageType) => {
        if (pageType === 'page_2') {
            setCurrentPage_2(value);
        }
    };



    const [expandedIdProof, setExpandedIdProof] = useState(false);

    const handleAccordionChangeIdProof = () => {
        setExpandedIdProof(!expandedIdProof);
    };

    const [expandedBankStatement, setExpandedBankStatement] = useState(false);

    const handleAccordionChangeBankStatement = () => {
        setExpandedBankStatement(!expandedBankStatement);
    };

    const [expandedCreditBuore, setExpandedCreditBuore] = useState(false);

    const handleAccordionChangeCreditBuore = () => {
        setExpandedCreditBuore(!expandedCreditBuore);
    };

    console.log('apiResIdProof', apiResIdProof)
    console.log('apiResBankStatement', apiResBankStatement)
    console.log('apiResCreditBurea', apiResCreditBurea)

    const [showUploadedData, setShowUploadedData] = useState(false);
    const [showUploadedData1, setShowUploadedData1] = useState(false);
    const [showUploadedData2, setShowUploadedData2] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowUploadedData(true);
            setShowUploadedData1(true);
            setShowUploadedData2(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);


    // id proof
    const confidence = parseFloat(
        showUploadedData
            ? uploadedData?.[0]?.file_response?.idProof?.at(-1)?.extraction?.overall_confidence
            : apiResIdProof?.extraction?.overall_confidence
    );

    const confidencePercent = (confidence * 100).toFixed(0);

    const getColor = (value) => {
        if (value < 85) return 'red';
        if (value > 95) return '#00c853';
        if (value >= 85 && value <= 95) return '#f0ad4e';
        return '#aaa';
    };


    const reasonInfo = showUploadedData
        ? uploadedData?.[0]?.file_response?.idProof?.at(-1)?.extraction?.reason?.info
        : apiResIdProof?.extraction?.reason?.info;


    const reasonInfoValidation = showUploadedData
        ? uploadedData?.[0]?.file_response?.idProof?.at(-1)?.validation_result?.reason?.info
        : apiResIdProof?.validation_result?.reason?.info;

    const addressStatus = showUploadedData
        ? uploadedData?.[0]?.file_response?.idProof?.at(-1)?.validation_result?.address_status
        : apiResIdProof?.validation_result?.address_status;

    const isAddressPresent = addressStatus === 'present';


    const personalInfoReason = showUploadedData
        ? uploadedData?.[0]?.file_response?.idProof?.at(-1)?.validation_result?.reason?.info
        : apiResIdProof?.validation_result?.reason?.info;

    const personalInfoStatus = showUploadedData
        ? uploadedData?.[0]?.file_response?.idProof?.at(-1)?.validation_result?.personal_info_status
        : apiResIdProof?.validation_result?.personal_info_status;

    const getBorderColor = (status) => {
        if (status === 'present') return '#00c853';
        if (status === 'partial') return '#f0ad4e';
        return 'red';
    };
    // clossed 

    //bank statement

    const confidenceBankStatement = parseFloat(
        showUploadedData1
            ? uploadedData?.[0]?.file_response?.bankStatement?.at(-1)?.extraction?.overall_confidence
            : apiResBankStatement?.extraction?.overall_confidence
    );

    const confidencePercentBankStatement = (confidenceBankStatement * 100).toFixed(0);

    const getColorBankStatement = (value) => {
        if (value < 85) return 'red';
        if (value > 95) return '#00c853';
        if (value >= 85 && value <= 95) return '#f0ad4e';
        return '#aaa';
    };


    const reasonInfoBankStatement = showUploadedData1
        ? uploadedData?.[0]?.file_response?.bankStatement?.at(-1)?.extraction?.reason?.info
        : apiResBankStatement?.extraction?.reason?.info;


    const reasonInfoValidationBankStatement = showUploadedData1
        ? uploadedData?.[0]?.file_response?.bankStatement?.at(-1)?.validation_result?.reason?.info
        : apiResBankStatement?.validation_result?.reason?.info;

    const addressStatusBankStatement = showUploadedData1
        ? uploadedData?.[0]?.file_response?.bankStatement?.at(-1)?.validation_result?.address_status
        : apiResBankStatement?.validation_result?.address_status;

    const isAddressPresentBankStatement = addressStatusBankStatement === 'present';


    const personalInfoReasonBankStatement = showUploadedData1
        ? uploadedData?.[0]?.file_response?.bankStatement?.at(-1)?.validation_result?.reason?.info
        : apiResBankStatement?.validation_result?.reason?.info;

    const personalInfoStatusBankStatement = showUploadedData1
        ? uploadedData?.[0]?.file_response?.bankStatement?.at(-1)?.validation_result?.personal_info_status
        : apiResBankStatement?.validation_result?.personal_info_status;

    const getBorderColorBankStatement = (status) => {
        if (status === 'present') return '#00c853';
        if (status === 'partial') return '#f0ad4e';
        return 'red';
    };

    //closed

    //credit bureo
    const confidenceCreditBureo = parseFloat(
        showUploadedData2
            ? uploadedData?.[0]?.file_response?.creditBureau?.at(-1)?.extraction?.overall_confidence
            : apiResCreditBurea?.extraction?.overall_confidence
    );

    const confidencePercentCreditBureo = (confidenceCreditBureo * 100).toFixed(0);

    const getColorCreditBureo = (value) => {
        if (value < 85) return 'red';
        if (value > 95) return '#00c853';
        if (value >= 85 && value <= 95) return '#f0ad4e';
        return '#aaa';
    };


    const reasonInfoCreditBureo = showUploadedData2
        ? uploadedData?.[0]?.file_response?.creditBureau?.at(-1)?.extraction?.reason?.info
        : apiResCreditBurea?.extraction?.reason?.info;


    const reasonInfoValidationCreditBureo = showUploadedData2
        ? uploadedData?.[0]?.file_response?.creditBureau?.at(-1)?.validation_result?.reason?.info
        : apiResCreditBurea?.validation_result?.reason?.info;

    const addressStatusCreditBureo = showUploadedData2
        ? uploadedData?.[0]?.file_response?.creditBureau?.at(-1)?.validation_result?.address_status
        : apiResCreditBurea?.validation_result?.address_status;

    const isAddressPresentCreditBureo = addressStatusCreditBureo === 'present';


    const personalInfoReasonCreditBureo = showUploadedData2
        ? uploadedData?.[0]?.file_response?.creditBureau?.at(-1)?.validation_result?.reason?.info
        : apiResCreditBurea?.validation_result?.reason?.info;

    const personalInfoStatusCreditBureo = showUploadedData2
        ? uploadedData?.[0]?.file_response?.creditBureau?.at(-1)?.validation_result?.personal_info_status
        : apiResCreditBurea?.validation_result?.personal_info_status;

    const getBorderColorCreditBureo = (status) => {
        if (status === 'present') return '#00c853';
        if (status === 'partial') return '#f0ad4e';
        return 'red';
    };

    //closed


    return (
        <Sidebar title={"Upload Documents"}>

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ width: "80%", p: 2 }}>
                    <Box sx={{
                        mb: 2,
                        bgcolor: "#fff",
                        p: 3,
                        borderRadius: "10px",
                        boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                    }}>
                        <Stack direction={'row'} justifyContent={'space-between'}>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <img
                                    src={pdficon}
                                    alt="Uploaded file"
                                    style={{
                                        width: '50px',
                                        height: '50px',
                                        cursor: 'pointer',
                                        mixBlendMode: 'darken',
                                    }}
                                />
                                <Box>
                                    <Stack direction={'row'} alignItems={'start'} spacing={2}>

                                        <Typography
                                            sx={{
                                                color: '#676767',
                                                fontSize: '18px',
                                                fontWeight: '600',
                                                mb: '5px',
                                            }}
                                        >
                                            {uploadedData[0]?.file_path?.idProof
                                                ?.split(domainPath === 'localhost:5173' ? '\\' : '/')
                                                .pop()
                                                .replace(/^.*?(\d{13}-)/, '')}
                                        </Typography>

                                        <Tooltip title={reasonInfo || 'No info available'} arrow>
                                            <InfoIcon sx={{ color: '#aaa', fontSize: '20px' }} />
                                        </Tooltip>
                                    </Stack>
                                    <Typography
                                        sx={{
                                            color: '#999',
                                            fontSize: '15px',
                                            fontStyle: 'italic',
                                        }}
                                    >
                                        Id Proof
                                    </Typography>
                                </Box>
                            </Stack>
                            <Stack direction={'row'} alignItems={'center'} spacing={2}>
                                <Box>

                                    {isLoadingIdProof ?
                                        ''
                                        :
                                        <Stack direction="row" alignItems="center" gap={0.5}>
                                            <Typography sx={{ fontSize: '16px', fontWeight: '600', color: '#000' }}>
                                                Analaysis Completed
                                            </Typography>
                                            <img src={checkIicon} style={{ width: '20px' }} />
                                        </Stack>
                                    }

                                </Box>

                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    sx={{
                                        backgroundColor: '#3f51b5',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                        transition: 'all 0.3s ease',
                                        ':hover': {
                                            backgroundColor: '#283593',
                                            transform: 'scale(1.05)',
                                            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
                                        },
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        textTransform: "capitalize"
                                    }}
                                    disabled={isLoadingIdProof}

                                    onClick={handleAccordionChangeIdProof}
                                >
                                    Show Report
                                    {expandedIdProof ? <ExpandMoreIcon sx={{ marginLeft: 1 }} /> : <ChevronRightIcon sx={{ marginLeft: 1 }} />
                                    }
                                </Button>

                            </Stack>

                        </Stack>

                        {isLoadingIdProof ?

                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: '20px' }}>
                                <Stack direction="row" alignItems="center" gap={1}>
                                    <Typography sx={{ fontSize: '16px', fontWeight: '500', color: '#676767' }}>
                                        Loading Id Proof...
                                    </Typography>
                                    <span className="loader"></span>

                                </Stack>
                            </Box>
                            :
                            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} mt={'10px'}>
                                <Box>
                                    <Stack direction={'row'} alignItems={'center'} spacing={1}>
                                        <Typography sx={{ fontSize: '16px', fontWeight: '600', color: '#686868' }}>Quality:</Typography>

                                        <Box>
                                            <Typography
                                                sx={{
                                                    fontSize: '16px',
                                                    fontWeight: '600',
                                                    color: getColor(confidencePercent),
                                                }}
                                            >
                                                {confidencePercent} <span style={{ color: '#aaa' }}>/ 100</span>
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </Box>

                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <Stack direction={'row'} alignItems={'center'} gap={1}>

                                        <Tooltip title={reasonInfoValidation || 'No info available'} arrow>
                                            <Box
                                                sx={{
                                                    border: `4px solid ${isAddressPresent ? '#00c853' : 'red'}`,
                                                    borderRadius: '50%',
                                                    padding: '7px',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    background: 'white',
                                                    boxShadow: isAddressPresent
                                                        ? '0 4px 12px rgba(0, 128, 0, 0.3)'
                                                        : '0 4px 12px rgba(255, 0, 0, 0.3)',
                                                    transition: 'transform 0.3s ease-in-out',
                                                    '&:hover': {
                                                        transform: 'scale(1.1)',
                                                        boxShadow: isAddressPresent
                                                            ? '0 6px 18px rgba(0, 128, 0, 0.4)'
                                                            : '0 6px 18px rgba(255, 0, 0, 0.4)',
                                                    },
                                                }}
                                            >
                                                <img
                                                    src={addressInfo}
                                                    style={{
                                                        width: '25px',
                                                        height: '25px',
                                                        borderRadius: '50%',
                                                        objectFit: 'cover',
                                                    }}
                                                    alt="Address Info"
                                                />
                                            </Box>
                                        </Tooltip>
                                    </Stack>
                                    <Stack direction={'row'} alignItems={'center'} gap={1} >
                                        <Tooltip title={personalInfoReason || 'No info available'} arrow>
                                            <Box
                                                sx={{
                                                    border: `4px solid ${getBorderColor(personalInfoStatus)}`,
                                                    borderRadius: '50%',
                                                    padding: '7px',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    background: 'white',
                                                    boxShadow:
                                                        personalInfoStatus === 'present'
                                                            ? '0 4px 12px rgba(0, 128, 0, 0.3)'
                                                            : personalInfoStatus === 'partial'
                                                                ? '0 4px 12px rgba(255, 165, 0, 0.3)'
                                                                : '0 4px 12px rgba(255, 0, 0, 0.3)',
                                                    transition: 'transform 0.3s ease-in-out',
                                                    '&:hover': {
                                                        transform: 'scale(1.1)',
                                                        boxShadow:
                                                            personalInfoStatus === 'present'
                                                                ? '0 6px 18px rgba(0, 128, 0, 0.4)'
                                                                : personalInfoStatus === 'partial'
                                                                    ? '0 6px 18px rgba(255, 165, 0, 0.4)'
                                                                    : '0 6px 18px rgba(255, 0, 0, 0.4)',
                                                    },
                                                }}
                                            >
                                                <img
                                                    src={personalInfo}
                                                    style={{
                                                        width: '25px',
                                                        height: '25px',
                                                        borderRadius: '50%',
                                                        objectFit: 'cover',
                                                    }}
                                                    alt="Personal Info"
                                                />
                                            </Box>
                                        </Tooltip>

                                    </Stack>

                                </Box>
                            </Stack>
                        }


                        {expandedIdProof && (
                            <Box sx={{ mt: 4, width: '100%', display: 'flex', justifyContent: 'center' }}>
                                <Paper
                                    elevation={4}
                                    sx={{
                                        width: '100%',
                                        maxWidth: 900,
                                        p: 4,
                                        borderRadius: 4,
                                        background: 'rgba(255, 255, 255, 0.75)',
                                        backdropFilter: 'blur(12px)',
                                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                                    }}
                                >
                                    <Stack direction="row" spacing={4}>
                                        <Avatar
                                            src={`${API.filePath}${(apiResIdProof?.extraction?.faces[0][0] ||
                                                uploadedData[0]?.file_response?.idProof?.at(-1)?.extraction?.faces[0][0])
                                                ?.replace(/^.*?assets[\\/]/, '')
                                                ?.replace(/\\/g, '/')}`}
                                            alt="Profile"
                                            sx={{
                                                width: 120,
                                                height: 120,
                                                border: '3px solid white',
                                                boxShadow: 3
                                            }}
                                        />

                                        <Grid container spacing={2}>
                                            {(() => {
                                                const components = apiResIdProof
                                                    ? apiResIdProof?.validation_result?.components
                                                    : uploadedData[0]?.file_response?.idProof?.at(-1)?.validation_result?.components || [];

                                                const mid = Math.ceil(components.length / 2);
                                                const firstHalf = components.slice(0, mid);
                                                const secondHalf = components.slice(mid);

                                                return (
                                                    <>
                                                        <Grid item xs={12} sm={6}>
                                                            <Stack spacing={1}>
                                                                {firstHalf.map((data, index) => (
                                                                    <Stack key={`left-${index}`} direction="row" spacing={1} alignItems="center">
                                                                        <Typography variant="body2" sx={{ color: '#777', fontWeight: 600 }}>
                                                                            {data.component}:
                                                                        </Typography>
                                                                        <Typography variant="body2" sx={{ color: '#222', fontWeight: 500 }}>
                                                                            {data.value || '-'}
                                                                        </Typography>
                                                                    </Stack>
                                                                ))}
                                                            </Stack>
                                                        </Grid>

                                                        <Grid item xs={12} sm={6}>
                                                            <Stack spacing={1}>
                                                                {secondHalf.map((data, index) => (
                                                                    <Stack key={`right-${index}`} direction="row" spacing={1} alignItems="center">
                                                                        <Typography variant="body2" sx={{ color: '#777', fontWeight: 600 }}>
                                                                            {data.component}:
                                                                        </Typography>
                                                                        <Typography variant="body2" sx={{ color: '#222', fontWeight: 500 }}>
                                                                            {data.value || '-'}
                                                                        </Typography>
                                                                    </Stack>
                                                                ))}
                                                            </Stack>
                                                        </Grid>
                                                    </>
                                                );
                                            })()}
                                        </Grid>
                                    </Stack>
                                </Paper>
                            </Box>
                        )}

                    </Box>

                    <Box sx={{
                        mb: 2,
                        bgcolor: "#fff",
                        p: 3,
                        borderRadius: "10px",
                        boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                    }}>
                        <Stack direction={'row'} justifyContent={'space-between'}>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <img
                                    src={pdficon}
                                    alt="Uploaded file"
                                    style={{
                                        width: '50px',
                                        height: '50px',
                                        cursor: 'pointer',
                                        mixBlendMode: 'darken',
                                    }}
                                />
                                <Box>
                                    <Stack direction={'row'} alignItems={'start'} spacing={2}>
                                        <Typography
                                            sx={{
                                                color: '#676767',
                                                fontSize: '18px',
                                                fontWeight: '600',
                                                mb: '5px',
                                            }}
                                        >
                                            {uploadedData[0]?.file_path?.bankStatement
                                                ?.split(domainPath === 'localhost:5173' ? '\\' : '/')
                                                .pop()
                                                .replace(/^.*?(\d{13}-)/, '')}
                                        </Typography>

                                        <Tooltip title={reasonInfoBankStatement || 'No info available'} arrow>
                                            <InfoIcon sx={{ color: '#aaa', fontSize: '20px' }} />
                                        </Tooltip>
                                    </Stack>
                                    <Typography
                                        sx={{
                                            color: '#999',
                                            fontSize: '15px',
                                            fontStyle: 'italic',
                                        }}
                                    >
                                        Bank Statement
                                    </Typography>
                                </Box>
                            </Stack>
                            <Stack direction={'row'} alignItems={'center'} spacing={2}>
                                <Box>

                                    {isLoadingBankStatement ?
                                        ''
                                        :
                                        <Stack direction="row" alignItems="center" gap={0.5}>
                                            <Typography sx={{ fontSize: '16px', fontWeight: '600', color: '#000' }}>
                                                Analaysis Completed
                                            </Typography>
                                            <img src={checkIicon} style={{ width: '20px' }} />
                                        </Stack>
                                    }

                                </Box>

                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    sx={{
                                        backgroundColor: '#3f51b5',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                        transition: 'all 0.3s ease',
                                        ':hover': {
                                            backgroundColor: '#283593',
                                            transform: 'scale(1.05)',
                                            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
                                        },
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        textTransform: "capitalize"
                                    }}
                                    disabled={isLoadingBankStatement}

                                    onClick={handleAccordionChangeBankStatement}
                                >
                                    Show Report
                                    {expandedBankStatement ? <ExpandMoreIcon sx={{ marginLeft: 1 }} /> : <ChevronRightIcon sx={{ marginLeft: 1 }} />
                                    }
                                </Button>

                            </Stack>

                        </Stack>

                        {isLoadingBankStatement ?

                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: '20px' }}>
                                <Stack direction="row" alignItems="center" gap={1}>
                                    <Typography sx={{ fontSize: '16px', fontWeight: '500', color: '#676767' }}>
                                        Loading Bank Statement...
                                    </Typography>
                                    <span className="loader"></span>

                                </Stack>
                            </Box>
                            :
                            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} mt={'10px'}>
                                <Box>
                                    <Stack direction={'row'} alignItems={'center'} spacing={1}>
                                        <Typography sx={{ fontSize: '16px', fontWeight: '600', color: '#686868' }}>Quality:</Typography>

                                        <Box>
                                            <Typography
                                                sx={{
                                                    fontSize: '16px',
                                                    fontWeight: '600',
                                                    color: getColorBankStatement(confidencePercentBankStatement),
                                                }}
                                            >
                                                {confidencePercentBankStatement} <span style={{ color: '#aaa' }}>/ 100</span>
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </Box>


                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <Stack direction={'row'} alignItems={'center'} gap={1}>

                                        <Tooltip title={reasonInfoValidationBankStatement || 'No info available'} arrow>
                                            <Box
                                                sx={{
                                                    border: `4px solid ${isAddressPresentBankStatement ? '#00c853' : 'red'}`,
                                                    borderRadius: '50%',
                                                    padding: '7px',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    background: 'white',
                                                    boxShadow: isAddressPresentBankStatement
                                                        ? '0 4px 12px rgba(0, 128, 0, 0.3)'
                                                        : '0 4px 12px rgba(255, 0, 0, 0.3)',
                                                    transition: 'transform 0.3s ease-in-out',
                                                    '&:hover': {
                                                        transform: 'scale(1.1)',
                                                        boxShadow: isAddressPresentBankStatement
                                                            ? '0 6px 18px rgba(0, 128, 0, 0.4)'
                                                            : '0 6px 18px rgba(255, 0, 0, 0.4)',
                                                    },
                                                }}
                                            >
                                                <img
                                                    src={addressInfo}
                                                    style={{
                                                        width: '25px',
                                                        height: '25px',
                                                        borderRadius: '50%',
                                                        objectFit: 'cover',
                                                    }}
                                                    alt="Address Info"
                                                />
                                            </Box>
                                        </Tooltip>
                                    </Stack>
                                    <Stack direction={'row'} alignItems={'center'} gap={1} >
                                        <Tooltip title={personalInfoReasonBankStatement || 'No info available'} arrow>
                                            <Box
                                                sx={{
                                                    border: `4px solid ${getBorderColorBankStatement(personalInfoStatusBankStatement)}`,
                                                    borderRadius: '50%',
                                                    padding: '7px',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    background: 'white',
                                                    boxShadow:
                                                        personalInfoStatusBankStatement === 'present'
                                                            ? '0 4px 12px rgba(0, 128, 0, 0.3)'
                                                            : personalInfoStatusBankStatement === 'partial'
                                                                ? '0 4px 12px rgba(255, 165, 0, 0.3)'
                                                                : '0 4px 12px rgba(255, 0, 0, 0.3)',
                                                    transition: 'transform 0.3s ease-in-out',
                                                    '&:hover': {
                                                        transform: 'scale(1.1)',
                                                        boxShadow:
                                                            personalInfoStatusBankStatement === 'present'
                                                                ? '0 6px 18px rgba(0, 128, 0, 0.4)'
                                                                : personalInfoStatusBankStatement === 'partial'
                                                                    ? '0 6px 18px rgba(255, 165, 0, 0.4)'
                                                                    : '0 6px 18px rgba(255, 0, 0, 0.4)',
                                                    },
                                                }}
                                            >
                                                <img
                                                    src={personalInfo}
                                                    style={{
                                                        width: '25px',
                                                        height: '25px',
                                                        borderRadius: '50%',
                                                        objectFit: 'cover',
                                                    }}
                                                    alt="Personal Info"
                                                />
                                            </Box>
                                        </Tooltip>

                                    </Stack>

                                </Box>
                            </Stack>
                        }


                        {expandedBankStatement ?
                            <Box sx={{ mt: "30px", width: '100%' }}>

                                <Box>
                                    {paginatedData?.map((item, index) => (
                                        <React.Fragment key={item._id}>
                                            <AccordionCSV
                                                csvUrl={`${API.filePath}${item.csv_path
                                                    .replace(/^.*?assets[\\/]/, '')
                                                    .replace(/\\/g, '/')}`}
                                            />
                                        </React.Fragment>

                                    ))}
                                </Box>

                                <Box>
                                    {paginatedData?.length > 0 && (
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                                            <Pagination
                                                count={totalPages_1}
                                                page={currentPage_1}
                                                onChange={(e, val) => handlePageChange(e, val, 'page_1')}
                                                shape="rounded"
                                                variant="outlined"
                                                sx={{
                                                    '& .MuiPaginationItem-root': {
                                                        fontSize: '14px',
                                                        color: '#424242',
                                                        borderRadius: '20px',
                                                        border: '1px solid #e0e0e0',
                                                        padding: '4px 12px',
                                                        transition: 'all 0.3s',
                                                        '&:hover': {
                                                            backgroundColor: '#1976d2',
                                                            color: '#fff',
                                                            cursor: 'pointer',
                                                        },
                                                    },
                                                    '& .Mui-selected': {
                                                        backgroundColor: '#1976d2',
                                                        color: '#fff',
                                                        border: 'none',
                                                    },
                                                }}
                                            />
                                        </Box>
                                    )}
                                </Box>


                            </Box>

                            : ''}


                    </Box>

                    <Box sx={{
                        mb: 2,
                        bgcolor: "#fff",
                        p: 3,
                        borderRadius: "10px",
                        boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                    }}>
                        <Stack direction={'row'} justifyContent={'space-between'}>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <img
                                    src={pdficon}
                                    alt="Uploaded file"
                                    style={{
                                        width: '50px',
                                        height: '50px',
                                        cursor: 'pointer',
                                        mixBlendMode: 'darken',
                                    }}
                                />
                                <Box>


                                    <Stack direction={'row'} alignItems={'start'} spacing={2}>

                                        <Typography
                                            sx={{
                                                color: '#676767',
                                                fontSize: '18px',
                                                fontWeight: '600',
                                                mb: '5px',
                                            }}
                                        >
                                            {uploadedData[0]?.file_path?.creditBureau
                                                ?.split(domainPath === 'localhost:5173' ? '\\' : '/')
                                                .pop()
                                                .replace(/^.*?(\d{13}-)/, '')}
                                        </Typography>

                                        <Tooltip title={reasonInfoCreditBureo || 'No info available'} arrow>
                                            <InfoIcon sx={{ color: '#aaa', fontSize: '20px' }} />
                                        </Tooltip>
                                    </Stack>
                                    <Typography
                                        sx={{
                                            color: '#999',
                                            fontSize: '15px',
                                            fontStyle: 'italic',
                                        }}
                                    >
                                        Credit Bureo Report
                                    </Typography>
                                </Box>
                            </Stack>
                            <Stack direction={'row'} alignItems={'center'} spacing={2}>
                                <Box>

                                    {isLoadingcreditbuero ?
                                        ''
                                        :
                                        <Stack direction="row" alignItems="center" gap={0.5}>
                                            <Typography sx={{ fontSize: '16px', fontWeight: '600', color: '#000' }}>
                                                Analaysis Completed
                                            </Typography>
                                            <img src={checkIicon} style={{ width: '20px' }} />
                                        </Stack>
                                    }

                                </Box>

                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    sx={{
                                        backgroundColor: '#3f51b5',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                        transition: 'all 0.3s ease',
                                        ':hover': {
                                            backgroundColor: '#283593',
                                            transform: 'scale(1.05)',
                                            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
                                        },
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        textTransform: "capitalize"
                                    }}
                                    disabled={isLoadingcreditbuero}

                                    onClick={handleAccordionChangeCreditBuore}
                                >
                                    Show Report
                                    {expandedCreditBuore ? <ExpandMoreIcon sx={{ marginLeft: 1 }} /> : <ChevronRightIcon sx={{ marginLeft: 1 }} />
                                    }
                                </Button>

                            </Stack>

                        </Stack>

                        {isLoadingcreditbuero ?

                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: '20px' }}>
                                <Stack direction="row" alignItems="center" gap={1}>
                                    <Typography sx={{ fontSize: '16px', fontWeight: '500', color: '#676767' }}>
                                        Loading  Credit Bureo Report...
                                    </Typography>
                                    <span className="loader"></span>

                                </Stack>
                            </Box>
                            :
                            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} mt={'10px'}>
                                <Box>
                                    <Stack direction={'row'} alignItems={'center'} spacing={1}>
                                        <Typography sx={{ fontSize: '16px', fontWeight: '600', color: '#686868' }}>Quality:</Typography>

                                        <Box>
                                            <Typography
                                                sx={{
                                                    fontSize: '16px',
                                                    fontWeight: '600',
                                                    color: getColorCreditBureo(confidencePercentCreditBureo),
                                                }}
                                            >
                                                {confidencePercentCreditBureo} <span style={{ color: '#aaa' }}>/ 100</span>
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </Box>

                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <Stack direction={'row'} alignItems={'center'} gap={1}>

                                        <Tooltip title={reasonInfoValidationCreditBureo || 'No info available'} arrow>
                                            <Box
                                                sx={{
                                                    border: `4px solid ${isAddressPresentCreditBureo ? '#00c853' : 'red'}`,
                                                    borderRadius: '50%',
                                                    padding: '7px',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    background: 'white',
                                                    boxShadow: isAddressPresentCreditBureo
                                                        ? '0 4px 12px rgba(0, 128, 0, 0.3)'
                                                        : '0 4px 12px rgba(255, 0, 0, 0.3)',
                                                    transition: 'transform 0.3s ease-in-out',
                                                    '&:hover': {
                                                        transform: 'scale(1.1)',
                                                        boxShadow: isAddressPresentCreditBureo
                                                            ? '0 6px 18px rgba(0, 128, 0, 0.4)'
                                                            : '0 6px 18px rgba(255, 0, 0, 0.4)',
                                                    },
                                                }}
                                            >
                                                <img
                                                    src={addressInfo}
                                                    style={{
                                                        width: '25px',
                                                        height: '25px',
                                                        borderRadius: '50%',
                                                        objectFit: 'cover',
                                                    }}
                                                    alt="Address Info"
                                                />
                                            </Box>
                                        </Tooltip>
                                    </Stack>
                                    <Stack direction={'row'} alignItems={'center'} gap={1} >
                                        <Tooltip title={personalInfoReasonCreditBureo || 'No info available'} arrow>
                                            <Box
                                                sx={{
                                                    border: `4px solid ${getBorderColorCreditBureo(personalInfoStatusCreditBureo)}`,
                                                    borderRadius: '50%',
                                                    padding: '7px',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    background: 'white',
                                                    boxShadow:
                                                        personalInfoStatusCreditBureo === 'present'
                                                            ? '0 4px 12px rgba(0, 128, 0, 0.3)'
                                                            : personalInfoStatusCreditBureo === 'partial'
                                                                ? '0 4px 12px rgba(255, 165, 0, 0.3)'
                                                                : '0 4px 12px rgba(255, 0, 0, 0.3)',
                                                    transition: 'transform 0.3s ease-in-out',
                                                    '&:hover': {
                                                        transform: 'scale(1.1)',
                                                        boxShadow:
                                                            personalInfoStatusCreditBureo === 'present'
                                                                ? '0 6px 18px rgba(0, 128, 0, 0.4)'
                                                                : personalInfoStatusCreditBureo === 'partial'
                                                                    ? '0 6px 18px rgba(255, 165, 0, 0.4)'
                                                                    : '0 6px 18px rgba(255, 0, 0, 0.4)',
                                                    },
                                                }}
                                            >
                                                <img
                                                    src={personalInfo}
                                                    style={{
                                                        width: '25px',
                                                        height: '25px',
                                                        borderRadius: '50%',
                                                        objectFit: 'cover',
                                                    }}
                                                    alt="Personal Info"
                                                />
                                            </Box>
                                        </Tooltip>

                                    </Stack>

                                </Box>
                            </Stack>
                        }


                        {expandedCreditBuore ?
                            <Box sx={{ mt: "30px", width: '100%' }}>

                                <Box>

                                    <TableContainer
                                        sx={{
                                            overflowY: 'auto',
                                            height: '70vh',
                                            bgcolor: '#fafafa',
                                            borderRadius: 4,
                                            boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
                                            border: '2px solid #e0e0e0',
                                            transition: 'all 0.3s ease-in-out',
                                            '&:hover': {
                                                boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                                            },
                                        }}
                                    >
                                        <Table stickyHeader>
                                            <TableHead>
                                                <TableRow
                                                >
                                                    {paginatedData1?.map((title, index) => (
                                                        <TableCell
                                                            key={index}
                                                            sx={{
                                                                fontSize: '14px',
                                                                fontWeight: 600,
                                                                color: '#676767',
                                                                borderBottom: '2px solid #fff',
                                                                borderRight: '2px solid #fff',
                                                                letterSpacing: '1px',
                                                                padding: '16px 20px',
                                                                transition: 'all 0.2s ease-in-out',
                                                                '&:hover': {
                                                                    transform: 'scale(1.05)',
                                                                    cursor: 'pointer',
                                                                },
                                                                whiteSpace: 'nowrap'
                                                            }}
                                                        >
                                                            {title.component}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>

                                                <React.Fragment>

                                                    <TableRow
                                                        hover
                                                        sx={{
                                                            backgroundColor: '#fff',
                                                            '&:hover': {
                                                                backgroundColor: '#f1f5f8',
                                                                transform: 'scale(1.02)',
                                                                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                                                            },
                                                            borderBottom: '2px solid #e0e0e0',
                                                            borderRadius: '8px',
                                                            transition: 'all 0.3s ease-in-out',
                                                        }}
                                                    >
                                                        {paginatedData1?.map((item, index) => (
                                                            <TableCell sx={{ fontSize: '13px', color: '#333', padding: '12px 20px', borderRight: '2px solid #e0e0e0' }}>
                                                                <Markdown
                                                                    style={{
                                                                        fontSize: '14px',
                                                                        fontFamily: 'Arial, sans-serif',
                                                                        color: '#333',
                                                                    }}
                                                                >
                                                                    {item.value}
                                                                </Markdown>
                                                            </TableCell>
                                                        ))}

                                                    </TableRow>

                                                </React.Fragment>

                                            </TableBody>
                                        </Table>
                                        {paginatedData1?.length > 0 && (
                                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, mb: 2 }}>
                                                <Pagination
                                                    count={totalPages_2}
                                                    page={currentPage_2}
                                                    onChange={(e, val) => handlePageChange1(e, val, 'page_2')}
                                                    shape="rounded"
                                                    variant="outlined"
                                                    sx={{
                                                        '& .MuiPaginationItem-root': {
                                                            fontSize: '14px',
                                                            color: '#424242',
                                                            borderRadius: '20px',
                                                            border: '1px solid #e0e0e0',
                                                            padding: '4px 12px',
                                                            transition: 'all 0.3s',
                                                            '&:hover': {
                                                                backgroundColor: '#1976d2',
                                                                color: '#fff',
                                                                cursor: 'pointer',
                                                            },
                                                        },
                                                        '& .Mui-selected': {
                                                            backgroundColor: '#1976d2',
                                                            color: '#fff',
                                                            border: 'none',
                                                        },
                                                    }}
                                                />
                                            </Box>
                                        )}
                                    </TableContainer>


                                </Box>




                            </Box>

                            : ''}


                    </Box>
                </Box>
            </Box >

        </Sidebar>
    )
}

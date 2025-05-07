import React, { useEffect, useState } from 'react'
import Sidebar from '../../Component/Sidebar'
import {
    // Accordion,
    // AccordionDetails,
    Box,
    Button,
    Pagination,
    Stack,
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
// import Markdown from 'markdown-to-jsx';
import AccordionCSV from './AccordionCSV';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './UploadDouments.css'

export default function UploadDocAnalysis({ domainPath, userLoginData, isLoadingIdProof, isLoadingBankStatement, isLoadingcreditbuero, apiRes }) {

    const [uploadedData, setUploadedData] = useState('')
    const [currentPage_1, setCurrentPage_1] = useState(1);
    const itemsPerPage = 1;

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


    const paginatedData = uploadedData[0]?.file_response?.at(-1)?.extraction?.pages.slice(
        (currentPage_1 - 1) * itemsPerPage,
        currentPage_1 * itemsPerPage
    );

    const totalPages_1 = Math.ceil(uploadedData[0]?.file_response?.at(-1)?.extraction?.pages.length / itemsPerPage);

    const handlePageChange = (event, value, pageType) => {
        if (pageType === 'page_1') {
            setCurrentPage_1(value);
        }
        loanAppFormFillData(value);
    };

    const [expandedRow, setExpandedRow] = useState(null);

    const handleAccordionToggles = (id) => {
        setExpandedRow((prev) => (prev === id ? null : id));
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
                                            {uploadedData[0]?.file_path?.bankStatement
                                                ?.split(domainPath === 'localhost:5173' ? '\\' : '/')
                                                .pop()
                                                .replace(/^.*?(\d{13}-)/, '')}
                                        </Typography>

                                        <Tooltip title={`${uploadedData[0]?.file_response?.at(-1)?.extraction?.reason?.info}`} arrow>
                                            <Box sx={{

                                                width: '10px',
                                                height: '10px',
                                                bgcolor: 'green',
                                                borderRadius: '50%',
                                                animation: 'blinker 1s linear infinite',
                                                '@keyframes blinker': {
                                                    '0%': { opacity: 1 },
                                                    '50%': { opacity: 0.2 },
                                                    '100%': { opacity: 1 },
                                                }
                                            }}
                                            />
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
                                            <Typography sx={{ fontSize: '16px', fontWeight: '600', color: (parseFloat(uploadedData[0]?.file_response?.at(-1)?.extraction?.overall_confidence) * 100)?.toFixed(0) < 85 ? 'red' : (parseFloat(uploadedData[0]?.file_response?.at(-1)?.extraction?.overall_confidence) * 100)?.toFixed(0) > 95 ? '#00c853' : (parseFloat(uploadedData[0]?.file_response?.at(-1)?.extraction?.overall_confidence) * 100)?.toFixed(0) >= 85 && (parseFloat(uploadedData[0]?.file_response?.at(-1)?.extraction?.overall_confidence) * 100)?.toFixed(0) <= 95 ? '#f0ad4e' : '#aaa' }}>{(parseFloat(uploadedData[0]?.file_response?.at(-1)?.extraction?.overall_confidence) * 100)?.toFixed(0)} <span style={{ color: '#aaa' }}>/ 100</span></Typography>
                                        </Box>
                                    </Stack>
                                </Box>

                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <Stack direction={'row'} alignItems={'center'} gap={1}>

                                        <Tooltip title={`${uploadedData[0]?.file_response?.at(-1)?.validation_result?.reason?.info}`} arrow>
                                            <Box
                                                sx={{
                                                    border: `4px solid ${uploadedData[0]?.file_response?.at(-1)?.validation_result?.address_status === 'present' ? '#00c853' : 'red'}`,
                                                    borderColor: 'linear-gradient(45deg, #00c853, #64dd17)',
                                                    borderRadius: '50%',
                                                    padding: '7px',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    background: 'white',
                                                    boxShadow: '0 4px 12px rgba(0, 128, 0, 0.3)',
                                                    transition: 'transform 0.3s ease-in-out',
                                                    '&:hover': {
                                                        transform: 'scale(1.1)',
                                                        boxShadow: '0 6px 18px rgba(0, 128, 0, 0.4)',
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
                                        <Tooltip title={`${uploadedData[0]?.file_response?.at(-1)?.validation_result?.reason?.info}`} arrow>
                                            <Box
                                                sx={{
                                                    border: `4px solid ${uploadedData[0]?.file_response?.at(-1)?.validation_result?.personal_info_status === 'partial' ? '#f0ad4e' : 'red'}`,
                                                    borderRadius: '50%',
                                                    padding: '7px',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    background: 'white',
                                                    boxShadow: '0 4px 12px rgba(0, 128, 0, 0.3)',
                                                    transition: 'transform 0.3s ease-in-out',
                                                    '&:hover': {
                                                        transform: 'scale(1.1)',
                                                        boxShadow: '0 6px 18px rgba(0, 128, 0, 0.4)',
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
                                                    alt="Address Info"
                                                />
                                            </Box>
                                        </Tooltip>

                                    </Stack>

                                </Box>
                            </Stack>
                        }


                        {expanded ?
                            <Box sx={{ mt: "30px", width: '100%' }}>
                                {/* <TableContainer
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
                                                {['Account Info', 'CSV Data', 'Page', 'Page Confidence'].map((title, index) => (
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
                                                        {title}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {paginatedData?.map((item, index) => (
                                                <React.Fragment key={item._id}>
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
                                                        <TableCell sx={{ fontSize: '13px', color: '#333', padding: '12px 20px', borderRight: '2px solid #e0e0e0' }}>
                                                            <Markdown
                                                                style={{
                                                                    fontSize: '14px',
                                                                    fontFamily: 'Arial, sans-serif',
                                                                    color: '#333',
                                                                }}
                                                            >
                                                                {item.account_info}
                                                            </Markdown>
                                                        </TableCell>
                                                        <TableCell
                                                            onClick={() => handleAccordionToggles(item.csv_path)}
                                                            sx={{
                                                                fontSize: '14px',
                                                                cursor: 'pointer',
                                                                color: '#1976d2',
                                                                fontWeight: 600,
                                                                padding: '12px 20px',
                                                                borderRight: '2px solid #e0e0e0',
                                                                transition: 'all 0.2s ease-in-out',
                                                                '&:hover': {
                                                                    color: '#0d47a1',
                                                                },
                                                            }}
                                                        >
                                                            <Stack direction="row" alignItems="center" spacing={1}>
                                                                <Typography>More</Typography>
                                                                {expandedRow === item.csv_path ? (
                                                                    <KeyboardArrowDownOutlinedIcon fontSize="small" sx={{ transition: 'transform 0.3s' }} />
                                                                ) : (
                                                                    <ChevronRightOutlinedIcon fontSize="small" sx={{ transition: 'transform 0.3s' }} />
                                                                )}
                                                            </Stack>
                                                        </TableCell>
                                                        <TableCell sx={{ fontSize: '14px', color: '#555', padding: '12px 20px', borderRight: '2px solid #e0e0e0' }}>
                                                            {item.page}
                                                        </TableCell>
                                                        <TableCell sx={{ fontSize: '14px', color: '#555', padding: '12px 20px' }}>
                                                            {item.page_confidence}
                                                        </TableCell>
                                                    </TableRow>
                                                    {expandedRow === item.csv_path && (
                                                        <TableRow>
                                                            <TableCell colSpan={4} sx={{ p: 0 }}>
                                                                <Accordion expanded elevation={0}>
                                                                    <AccordionDetails sx={{ backgroundColor: '#f9fafb' }}>
                                                                        <AccordionCSV
                                                                            csvUrl={`${API.filePath}${item.csv_path
                                                                                .replace(/^.*?assets[\\/]/, '')
                                                                                .replace(/\\/g, '/')}`}
                                                                        />
                                                                    </AccordionDetails>
                                                                </Accordion>
                                                            </TableCell>
                                                        </TableRow>
                                                    )}
                                                </React.Fragment>
                                            ))}
                                        </TableBody>
                                    </Table>
                                    {paginatedData?.length > 0 && (
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, mb: 2 }}>
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
                                </TableContainer> */}
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
                                            {uploadedData[0]?.file_path?.bankStatement
                                                ?.split(domainPath === 'localhost:5173' ? '\\' : '/')
                                                .pop()
                                                .replace(/^.*?(\d{13}-)/, '')}
                                        </Typography>

                                        <Tooltip title={`${uploadedData[0]?.file_response?.at(-1)?.extraction?.reason?.info}`} arrow>
                                            <Box sx={{

                                                width: '10px',
                                                height: '10px',
                                                bgcolor: 'green',
                                                borderRadius: '50%',
                                                animation: 'blinker 1s linear infinite',
                                                '@keyframes blinker': {
                                                    '0%': { opacity: 1 },
                                                    '50%': { opacity: 0.2 },
                                                    '100%': { opacity: 1 },
                                                }
                                            }}
                                            />
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
                                            <Typography sx={{ fontSize: '16px', fontWeight: '600', color: (parseFloat(uploadedData[0]?.file_response?.at(-1)?.extraction?.overall_confidence) * 100)?.toFixed(0) < 85 ? 'red' : (parseFloat(uploadedData[0]?.file_response?.at(-1)?.extraction?.overall_confidence) * 100)?.toFixed(0) > 95 ? '#00c853' : (parseFloat(uploadedData[0]?.file_response?.at(-1)?.extraction?.overall_confidence) * 100)?.toFixed(0) >= 85 && (parseFloat(uploadedData[0]?.file_response?.at(-1)?.extraction?.overall_confidence) * 100)?.toFixed(0) <= 95 ? '#f0ad4e' : '#aaa' }}>{(parseFloat(uploadedData[0]?.file_response?.at(-1)?.extraction?.overall_confidence) * 100)?.toFixed(0)} <span style={{ color: '#aaa' }}>/ 100</span></Typography>
                                        </Box>
                                    </Stack>
                                </Box>

                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <Stack direction={'row'} alignItems={'center'} gap={1}>

                                        <Tooltip title={`${uploadedData[0]?.file_response?.at(-1)?.validation_result?.reason?.info}`} arrow>
                                            <Box
                                                sx={{
                                                    border: `4px solid ${uploadedData[0]?.file_response?.at(-1)?.validation_result?.address_status === 'present' ? '#00c853' : 'red'}`,
                                                    borderColor: 'linear-gradient(45deg, #00c853, #64dd17)',
                                                    borderRadius: '50%',
                                                    padding: '7px',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    background: 'white',
                                                    boxShadow: '0 4px 12px rgba(0, 128, 0, 0.3)',
                                                    transition: 'transform 0.3s ease-in-out',
                                                    '&:hover': {
                                                        transform: 'scale(1.1)',
                                                        boxShadow: '0 6px 18px rgba(0, 128, 0, 0.4)',
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
                                        <Tooltip title={`${uploadedData[0]?.file_response?.at(-1)?.validation_result?.reason?.info}`} arrow>
                                            <Box
                                                sx={{
                                                    border: `4px solid ${uploadedData[0]?.file_response?.at(-1)?.validation_result?.personal_info_status === 'partial' ? '#f0ad4e' : 'red'}`,
                                                    borderRadius: '50%',
                                                    padding: '7px',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    background: 'white',
                                                    boxShadow: '0 4px 12px rgba(0, 128, 0, 0.3)',
                                                    transition: 'transform 0.3s ease-in-out',
                                                    '&:hover': {
                                                        transform: 'scale(1.1)',
                                                        boxShadow: '0 6px 18px rgba(0, 128, 0, 0.4)',
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
                                                    alt="Address Info"
                                                />
                                            </Box>
                                        </Tooltip>

                                    </Stack>

                                </Box>
                            </Stack>
                        }


                        {expanded ?
                            <Box sx={{ mt: "30px", width: '100%' }}>
                                {/* <TableContainer
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
                                                {['Account Info', 'CSV Data', 'Page', 'Page Confidence'].map((title, index) => (
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
                                                        {title}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {paginatedData?.map((item, index) => (
                                                <React.Fragment key={item._id}>
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
                                                        <TableCell sx={{ fontSize: '13px', color: '#333', padding: '12px 20px', borderRight: '2px solid #e0e0e0' }}>
                                                            <Markdown
                                                                style={{
                                                                    fontSize: '14px',
                                                                    fontFamily: 'Arial, sans-serif',
                                                                    color: '#333',
                                                                }}
                                                            >
                                                                {item.account_info}
                                                            </Markdown>
                                                        </TableCell>
                                                        <TableCell
                                                            onClick={() => handleAccordionToggles(item.csv_path)}
                                                            sx={{
                                                                fontSize: '14px',
                                                                cursor: 'pointer',
                                                                color: '#1976d2',
                                                                fontWeight: 600,
                                                                padding: '12px 20px',
                                                                borderRight: '2px solid #e0e0e0',
                                                                transition: 'all 0.2s ease-in-out',
                                                                '&:hover': {
                                                                    color: '#0d47a1',
                                                                },
                                                            }}
                                                        >
                                                            <Stack direction="row" alignItems="center" spacing={1}>
                                                                <Typography>More</Typography>
                                                                {expandedRow === item.csv_path ? (
                                                                    <KeyboardArrowDownOutlinedIcon fontSize="small" sx={{ transition: 'transform 0.3s' }} />
                                                                ) : (
                                                                    <ChevronRightOutlinedIcon fontSize="small" sx={{ transition: 'transform 0.3s' }} />
                                                                )}
                                                            </Stack>
                                                        </TableCell>
                                                        <TableCell sx={{ fontSize: '14px', color: '#555', padding: '12px 20px', borderRight: '2px solid #e0e0e0' }}>
                                                            {item.page}
                                                        </TableCell>
                                                        <TableCell sx={{ fontSize: '14px', color: '#555', padding: '12px 20px' }}>
                                                            {item.page_confidence}
                                                        </TableCell>
                                                    </TableRow>
                                                    {expandedRow === item.csv_path && (
                                                        <TableRow>
                                                            <TableCell colSpan={4} sx={{ p: 0 }}>
                                                                <Accordion expanded elevation={0}>
                                                                    <AccordionDetails sx={{ backgroundColor: '#f9fafb' }}>
                                                                        <AccordionCSV
                                                                            csvUrl={`${API.filePath}${item.csv_path
                                                                                .replace(/^.*?assets[\\/]/, '')
                                                                                .replace(/\\/g, '/')}`}
                                                                        />
                                                                    </AccordionDetails>
                                                                </Accordion>
                                                            </TableCell>
                                                        </TableRow>
                                                    )}
                                                </React.Fragment>
                                            ))}
                                        </TableBody>
                                    </Table>
                                    {paginatedData?.length > 0 && (
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, mb: 2 }}>
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
                                </TableContainer> */}
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
                                            {uploadedData[0]?.file_path?.bankStatement
                                                ?.split(domainPath === 'localhost:5173' ? '\\' : '/')
                                                .pop()
                                                .replace(/^.*?(\d{13}-)/, '')}
                                        </Typography>

                                        <Tooltip title={`${uploadedData[0]?.file_response?.at(-1)?.extraction?.reason?.info}`} arrow>
                                            <Box sx={{

                                                width: '10px',
                                                height: '10px',
                                                bgcolor: 'green',
                                                borderRadius: '50%',
                                                animation: 'blinker 1s linear infinite',
                                                '@keyframes blinker': {
                                                    '0%': { opacity: 1 },
                                                    '50%': { opacity: 0.2 },
                                                    '100%': { opacity: 1 },
                                                }
                                            }}
                                            />
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
                                    disabled={isLoadingBankStatement}

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
                                            <Typography sx={{ fontSize: '16px', fontWeight: '600', color: (parseFloat(uploadedData[0]?.file_response?.at(-1)?.extraction?.overall_confidence) * 100)?.toFixed(0) < 85 ? 'red' : (parseFloat(uploadedData[0]?.file_response?.at(-1)?.extraction?.overall_confidence) * 100)?.toFixed(0) > 95 ? '#00c853' : (parseFloat(uploadedData[0]?.file_response?.at(-1)?.extraction?.overall_confidence) * 100)?.toFixed(0) >= 85 && (parseFloat(uploadedData[0]?.file_response?.at(-1)?.extraction?.overall_confidence) * 100)?.toFixed(0) <= 95 ? '#f0ad4e' : '#aaa' }}>{(parseFloat(uploadedData[0]?.file_response?.at(-1)?.extraction?.overall_confidence) * 100)?.toFixed(0)} <span style={{ color: '#aaa' }}>/ 100</span></Typography>
                                        </Box>
                                    </Stack>
                                </Box>

                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <Stack direction={'row'} alignItems={'center'} gap={1}>

                                        <Tooltip title={`${uploadedData[0]?.file_response?.at(-1)?.validation_result?.reason?.info}`} arrow>
                                            <Box
                                                sx={{
                                                    border: `4px solid ${uploadedData[0]?.file_response?.at(-1)?.validation_result?.address_status === 'present' ? '#00c853' : 'red'}`,
                                                    borderColor: 'linear-gradient(45deg, #00c853, #64dd17)',
                                                    borderRadius: '50%',
                                                    padding: '7px',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    background: 'white',
                                                    boxShadow: '0 4px 12px rgba(0, 128, 0, 0.3)',
                                                    transition: 'transform 0.3s ease-in-out',
                                                    '&:hover': {
                                                        transform: 'scale(1.1)',
                                                        boxShadow: '0 6px 18px rgba(0, 128, 0, 0.4)',
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
                                        <Tooltip title={`${uploadedData[0]?.file_response?.at(-1)?.validation_result?.reason?.info}`} arrow>
                                            <Box
                                                sx={{
                                                    border: `4px solid ${uploadedData[0]?.file_response?.at(-1)?.validation_result?.personal_info_status === 'partial' ? '#f0ad4e' : 'red'}`,
                                                    borderRadius: '50%',
                                                    padding: '7px',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    background: 'white',
                                                    boxShadow: '0 4px 12px rgba(0, 128, 0, 0.3)',
                                                    transition: 'transform 0.3s ease-in-out',
                                                    '&:hover': {
                                                        transform: 'scale(1.1)',
                                                        boxShadow: '0 6px 18px rgba(0, 128, 0, 0.4)',
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
                                                    alt="Address Info"
                                                />
                                            </Box>
                                        </Tooltip>

                                    </Stack>

                                </Box>
                            </Stack>
                        }


                        {expanded ?
                            <Box sx={{ mt: "30px", width: '100%' }}>
                                {/* <TableContainer
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
                                                {['Account Info', 'CSV Data', 'Page', 'Page Confidence'].map((title, index) => (
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
                                                        {title}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {paginatedData?.map((item, index) => (
                                                <React.Fragment key={item._id}>
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
                                                        <TableCell sx={{ fontSize: '13px', color: '#333', padding: '12px 20px', borderRight: '2px solid #e0e0e0' }}>
                                                            <Markdown
                                                                style={{
                                                                    fontSize: '14px',
                                                                    fontFamily: 'Arial, sans-serif',
                                                                    color: '#333',
                                                                }}
                                                            >
                                                                {item.account_info}
                                                            </Markdown>
                                                        </TableCell>
                                                        <TableCell
                                                            onClick={() => handleAccordionToggles(item.csv_path)}
                                                            sx={{
                                                                fontSize: '14px',
                                                                cursor: 'pointer',
                                                                color: '#1976d2',
                                                                fontWeight: 600,
                                                                padding: '12px 20px',
                                                                borderRight: '2px solid #e0e0e0',
                                                                transition: 'all 0.2s ease-in-out',
                                                                '&:hover': {
                                                                    color: '#0d47a1',
                                                                },
                                                            }}
                                                        >
                                                            <Stack direction="row" alignItems="center" spacing={1}>
                                                                <Typography>More</Typography>
                                                                {expandedRow === item.csv_path ? (
                                                                    <KeyboardArrowDownOutlinedIcon fontSize="small" sx={{ transition: 'transform 0.3s' }} />
                                                                ) : (
                                                                    <ChevronRightOutlinedIcon fontSize="small" sx={{ transition: 'transform 0.3s' }} />
                                                                )}
                                                            </Stack>
                                                        </TableCell>
                                                        <TableCell sx={{ fontSize: '14px', color: '#555', padding: '12px 20px', borderRight: '2px solid #e0e0e0' }}>
                                                            {item.page}
                                                        </TableCell>
                                                        <TableCell sx={{ fontSize: '14px', color: '#555', padding: '12px 20px' }}>
                                                            {item.page_confidence}
                                                        </TableCell>
                                                    </TableRow>
                                                    {expandedRow === item.csv_path && (
                                                        <TableRow>
                                                            <TableCell colSpan={4} sx={{ p: 0 }}>
                                                                <Accordion expanded elevation={0}>
                                                                    <AccordionDetails sx={{ backgroundColor: '#f9fafb' }}>
                                                                        <AccordionCSV
                                                                            csvUrl={`${API.filePath}${item.csv_path
                                                                                .replace(/^.*?assets[\\/]/, '')
                                                                                .replace(/\\/g, '/')}`}
                                                                        />
                                                                    </AccordionDetails>
                                                                </Accordion>
                                                            </TableCell>
                                                        </TableRow>
                                                    )}
                                                </React.Fragment>
                                            ))}
                                        </TableBody>
                                    </Table>
                                    {paginatedData?.length > 0 && (
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, mb: 2 }}>
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
                                </TableContainer> */}
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
                </Box>
            </Box >

        </Sidebar >
    )
}

import React, { useEffect, useState } from 'react'
import Sidebar from '../../Component/Sidebar'
import {
    Accordion,
    AccordionDetails,
    Box,
    Button,
    Pagination,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import pdficon from '../../assets/pdf.png';
import './UploadDouments.css'
import axios from 'axios';
import API from '../../Component/BaseURL';
import checkIicon from '../../assets/checkicon.png'
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import Markdown from 'markdown-to-jsx';
import AccordionCSV from './AccordionCSV';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export default function UploadDocAnalysis({ domainPath, userLoginData }) {



    const [uploadedData, setUploadedData] = useState('')
    const [currentPage_1, setCurrentPage_1] = useState(1);
    const itemsPerPage = 5;

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

    console.log('uploadedData', uploadedData[0]?.file_response.at(-1)?.extraction?.pages)

    const paginatedData = uploadedData[0]?.file_response.at(-1)?.extraction?.pages.slice(
        (currentPage_1 - 1) * itemsPerPage,
        currentPage_1 * itemsPerPage
    );

    const totalPages_1 = Math.ceil(uploadedData[0]?.file_response.at(-1)?.extraction?.pages.length / itemsPerPage);

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

    const [expanded, setExpanded] = useState(false);

    const handleAccordionChange = () => {
        setExpanded(!expanded);
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
                            <Stack direction={'row'} spacing={2} >
                                <img
                                    src={pdficon}
                                    alt="Uploaded file"
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                        cursor: "pointer",
                                        mixBlendMode: "darken",
                                    }}
                                />
                                <Box>
                                    <Typography
                                        sx={{
                                            color: "#676767",
                                            fontSize: "18px",
                                            fontWeight: "600",
                                            mb: "5px",
                                        }}
                                    >
                                        {uploadedData[0]?.file_path?.idProof?.split(domainPath == 'localhost:5173' ? '\\' : '/').pop().replace(/^.*?(\d{13}-)/, '')}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: "#999",
                                            fontSize: "15px",
                                            fontStyle: "italic",
                                        }}
                                    >
                                        Id Proof
                                    </Typography>


                                </Box>
                            </Stack>

                            <Stack direction={'row'} alignItems={'center'} spacing={2}>
                                <Box>

                                    <Stack direction="row" alignItems="center" gap={1}>
                                        <Typography sx={{ fontSize: '16px', fontWeight: '500', color: '#aaa' }}>
                                            disabled Id Proof...
                                        </Typography>
                                        <span className="loader1"></span>
                                    </Stack>

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

                                    onClick={handleAccordionChange}
                                    disabled
                                >
                                    Show Report
                                    {expanded ? <ExpandMoreIcon sx={{ marginLeft: 1 }} /> : <ChevronRightIcon sx={{ marginLeft: 1 }} />
                                    }


                                </Button>
                            </Stack>
                        </Stack>
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

                                    <Stack direction="row" alignItems="center" gap={1}>
                                        <Typography sx={{ fontSize: '16px', fontWeight: '500', color: '#676767' }}>
                                            Loading Bank Statement...
                                        </Typography>
                                        <span className="loader1"></span>
                                    </Stack>

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

                                    onClick={handleAccordionChange}
                                >
                                    Show Report
                                    {expanded ? <ExpandMoreIcon sx={{ marginLeft: 1 }} /> : <ChevronRightIcon sx={{ marginLeft: 1 }} />
                                    }


                                </Button>
                            </Stack>
                        </Stack>

                        {expanded ?
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: "30px", width: '100%' }}>
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
                                </TableContainer>
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
                        <Stack direction={'row'} spacing={2} justifyContent={'space-between'}>

                            <Stack direction={'row'} alignItems={'center'} spacing={2}>
                                <img
                                    src={pdficon}
                                    alt="Uploaded file"
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                        cursor: "pointer",
                                        mixBlendMode: "darken",
                                    }}
                                />
                                <Box>
                                    <Typography
                                        sx={{
                                            color: "#676767",
                                            fontSize: "18px",
                                            fontWeight: "600",
                                            mb: "5px",
                                        }}
                                    >
                                        {uploadedData[0]?.file_path?.creditBureau?.split(domainPath == 'localhost:5173' ? '\\' : '/').pop().replace(/^.*?(\d{13}-)/, '')}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: "#999",
                                            fontSize: "15px",
                                            fontStyle: "italic",
                                        }}
                                    >
                                        Credit Bureau Report
                                    </Typography>

                                </Box>
                            </Stack>

                            <Stack direction={'row'} alignItems={'center'} spacing={2}>
                                <Box>

                                    <Stack direction="row" alignItems="center" gap={1}>
                                        <Typography sx={{ fontSize: '16px', fontWeight: '500', color: '#aaa' }}>
                                            disabled Credit Bureau Report...
                                        </Typography>
                                        <span className="loader1"></span>
                                    </Stack>

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

                                    onClick={handleAccordionChange}
                                    disabled
                                >
                                    Show Report
                                    {expanded ? <ExpandMoreIcon sx={{ marginLeft: 1 }} /> : <ChevronRightIcon sx={{ marginLeft: 1 }} />
                                    }


                                </Button>
                            </Stack>

                        </Stack>
                    </Box>
                </Box>
            </Box>

        </Sidebar>
    )
}

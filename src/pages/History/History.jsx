import React, { useEffect, useState } from 'react';
import Sidebar from '../../Component/Sidebar';
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Checkbox, Box,
    Typography, TextField,
    InputAdornment,
    Stack,
    Tooltip, Button
} from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import pdficon from '../../assets/pdf.png';
import InfoIcon from '@mui/icons-material/Info';
import checkIicon from '../../assets/checkicon.png'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import personalInfo from '../../assets/personalInfo.png'
import addressInfo from '../../assets/addressInfo.png'



function History() {
    const [uploadedData, setUploadedData] = useState('')
    const [isLoadingIdProof, setIsLoadingIdProof] = useState(false)
    const [isLoadingBankStatement, setIsLoadingBankStatement] = useState(false)
    const [isLoadingcreditbuero, setIsLoadingcreditbuero] = useState(false)
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUserIds, setSelectedUserIds] = useState([]);

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


    useEffect(() => {
        const mockUsers = [
            {
                id: 1,
                name: "Pooja",
                aadhar: "Pooja_Adhar.pdf",
                bankStatement: "pooja_bank.pdf",
                creditReport: "pooja_credit.pdf"
            },
            {
                id: 2,
                name: "Yugal",
                aadhar: "Yugal_Adhar.pdff",
                bankStatement: "yugal_bank.pdf",
                creditReport: "yugal_credit.pdf"
            },
            {
                id: 3,
                name: "Sanika",
                aadhar: "Sanika_Adhar.pdf",
                bankStatement: "sanika_bank.pdf",
                creditReport: "sanika_credit.pdf"
            }
        ];
        setUsers(mockUsers);
    }, []);

    const handleCheckboxChange = (id) => {
        setSelectedUserIds(prev =>
            prev.includes(id) ? prev.filter(userId => userId !== id) : [...prev, id]
        );
    };

    const filteredUsers = users.filter(user =>
        [user.name, user.aadhar, user.bankStatement, user.creditReport]
            .some(field => field.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <Sidebar title={"History"}>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
                <Box sx={{ width: "250px" }}>
                    <TextField
                        placeholder="Search user..."
                        variant="outlined"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon color="action" />
                                </InputAdornment>
                            ),
                            sx: {
                                borderRadius: "30px",
                                backgroundColor: "#f5f5f5",
                                boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
                            },
                        }}
                    />
                </Box>
            </Box>

            <TableContainer component={Paper} elevation={3} sx={{ borderRadius: "12px", overflow: "hidden" }}>
                <Table>
                    <TableHead sx={{ backgroundColor: "#1976d2" }}>
                        <TableRow>
                            <TableCell sx={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}>Select</TableCell>
                            <TableCell sx={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}>User</TableCell>
                            <TableCell sx={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}>Aadhar Card</TableCell>
                            <TableCell sx={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}>Bank Statement</TableCell>
                            <TableCell sx={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}>Credit Report</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user, index) => {
                                const isSelected = selectedUserIds.includes(user.id);

                                return (
                                    <React.Fragment key={index}>
                                        <TableRow hover>
                                            <TableCell align="center">
                                                <Checkbox
                                                    checked={isSelected}
                                                    onChange={() => handleCheckboxChange(user.id)}
                                                />
                                            </TableCell>
                                            <TableCell align="center">{user.name}</TableCell>
                                            <TableCell align="center"><Typography>{user.aadhar}</Typography></TableCell>
                                            <TableCell align="center"><Typography>{user.bankStatement}</Typography></TableCell>
                                            <TableCell align="center"><Typography>{user.creditReport}</Typography></TableCell>
                                        </TableRow>

                                        {isSelected && (
                                            <TableRow>
                                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                                    <Box sx={{ width: "100%", p: 2 }}>
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

                                                                            <Tooltip title={`${uploadedData[0]?.file_response?.bankStatement?.at(-1)?.extraction?.reason?.info}`} arrow>
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
                                                                                <Typography sx={{ fontSize: '16px', fontWeight: '600', color: (parseFloat(uploadedData[0]?.file_response?.bankStatement?.at(-1)?.extraction?.overall_confidence) * 100)?.toFixed(0) < 85 ? 'red' : (parseFloat(uploadedData[0]?.file_response?.bankStatement?.at(-1)?.extraction?.overall_confidence) * 100)?.toFixed(0) > 95 ? '#00c853' : (parseFloat(uploadedData[0]?.file_response?.bankStatement?.at(-1)?.extraction?.overall_confidence) * 100)?.toFixed(0) >= 85 && (parseFloat(uploadedData[0]?.file_response?.bankStatement?.at(-1)?.extraction?.overall_confidence) * 100)?.toFixed(0) <= 95 ? '#f0ad4e' : '#aaa' }}>{(parseFloat(uploadedData[0]?.file_response?.bankStatement?.at(-1)?.extraction?.overall_confidence) * 100)?.toFixed(0)} <span style={{ color: '#aaa' }}>/ 100</span></Typography>
                                                                            </Box>
                                                                        </Stack>
                                                                    </Box>

                                                                    <Box sx={{ display: 'flex', gap: 2 }}>
                                                                        <Stack direction={'row'} alignItems={'center'} gap={1}>

                                                                            <Tooltip title={`${uploadedData[0]?.file_response?.bankStatement?.at(-1)?.validation_result?.reason?.info}`} arrow>
                                                                                <Box
                                                                                    sx={{
                                                                                        border: `4px solid ${uploadedData[0]?.file_response?.bankStatement?.at(-1)?.validation_result?.address_status === 'present' ? '#00c853' : 'red'}`,
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
                                                                            <Tooltip title={`${uploadedData[0]?.file_response?.bankStatement?.at(-1)?.validation_result?.reason?.info}`} arrow>
                                                                                <Box
                                                                                    sx={{
                                                                                        border: `4px solid ${uploadedData[0]?.file_response?.bankStatement?.at(-1)?.validation_result?.personal_info_status === 'partial' ? '#f0ad4e' : 'red'}`,
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


                                                            {expandedIdProof ?
                                                                <Box sx={{ mt: 4, width: '100%', display: 'flex', justifyContent: 'center' }}>
                                                                    <Card sx={{ width: '100%', maxWidth: 800, p: 3, borderRadius: 3, boxShadow: 3, bgcolor: "#f0f0f4" }}>
                                                                        <Stack direction="row" spacing={3} alignItems="center">
                                                                            <Avatar
                                                                                src={`${API.filePath}${uploadedData[0]?.file_response?.idProof?.at(-1)?.extraction?.faces[0][0]
                                                                                    .replace(/^.*?assets[\\/]/, '')
                                                                                    .replace(/\\/g, '/')}`}
                                                                                alt="Profile"
                                                                                sx={{ width: 100, height: 100, borderRadius: '50%', boxShadow: 2 }}
                                                                            />
                                                                            <CardContent sx={{ p: 0 }}>
                                                                                {[
                                                                                    {
                                                                                        label: "Full Name", value: 'Muta Ashok'
                                                                                    },
                                                                                    { label: "Date of Birth", value: "15-09-1976" },
                                                                                    { label: "Gender", value: "Male" },
                                                                                    { label: "Adhar Card Number", value: "5385 5385" },
                                                                                    {
                                                                                        label: "Full Address",
                                                                                        value:
                                                                                            "8-234, Subhash Nagar Colony, Ichoda, Adilabad, Andhra Pradesh, 504307, India",
                                                                                    },
                                                                                    { label: "Issue Date", value: "27-07-2011" },
                                                                                    { label: "Expiry Date", value: "22-08-2023" },
                                                                                    {
                                                                                        label: "Issuing Authority",
                                                                                        value: "Unique Identification Authority of India",
                                                                                    },
                                                                                ].map((item) => (
                                                                                    <Typography key={item.label} sx={{ mb: 1 }}>
                                                                                        <strong style={{ color: "#333" }}>{item.label}:</strong>{" "}
                                                                                        <span style={{ color: "#555" }}>{item.value}</span>
                                                                                    </Typography>
                                                                                ))}
                                                                            </CardContent>
                                                                        </Stack>
                                                                    </Card>
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

                                                                            <Tooltip title={`${uploadedData[0]?.file_response?.bankStatement?.at(-1)?.extraction?.reason?.info}`} arrow>
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
                                                                                <Typography sx={{ fontSize: '16px', fontWeight: '600', color: (parseFloat(uploadedData[0]?.file_response?.bankStatement?.at(-1)?.extraction?.overall_confidence) * 100)?.toFixed(0) < 85 ? 'red' : (parseFloat(uploadedData[0]?.file_response?.bankStatement?.at(-1)?.extraction?.overall_confidence) * 100)?.toFixed(0) > 95 ? '#00c853' : (parseFloat(uploadedData[0]?.file_response?.bankStatement?.at(-1)?.extraction?.overall_confidence) * 100)?.toFixed(0) >= 85 && (parseFloat(uploadedData[0]?.file_response?.bankStatement?.at(-1)?.extraction?.overall_confidence) * 100)?.toFixed(0) <= 95 ? '#f0ad4e' : '#aaa' }}>{(parseFloat(uploadedData[0]?.file_response?.bankStatement?.at(-1)?.extraction?.overall_confidence) * 100)?.toFixed(0)} <span style={{ color: '#aaa' }}>/ 100</span></Typography>
                                                                            </Box>
                                                                        </Stack>
                                                                    </Box>

                                                                    <Box sx={{ display: 'flex', gap: 2 }}>
                                                                        <Stack direction={'row'} alignItems={'center'} gap={1}>

                                                                            <Tooltip title={`${uploadedData[0]?.file_response?.bankStatement?.at(-1)?.validation_result?.reason?.info}`} arrow>
                                                                                <Box
                                                                                    sx={{
                                                                                        border: `4px solid ${uploadedData[0]?.file_response?.bankStatement?.at(-1)?.validation_result?.address_status === 'present' ? '#00c853' : 'red'}`,
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
                                                                            <Tooltip title={`${uploadedData[0]?.file_response?.bankStatement?.at(-1)?.validation_result?.reason?.info}`} arrow>
                                                                                <Box
                                                                                    sx={{
                                                                                        border: `4px solid ${uploadedData[0]?.file_response?.bankStatement?.at(-1)?.validation_result?.personal_info_status === 'partial' ? '#f0ad4e' : 'red'}`,
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

                                                                            <Tooltip title={`${uploadedData[0]?.file_response?.creditBureau?.at(-1)?.extraction?.reason?.info}`} arrow>
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
                                                                                <Typography sx={{ fontSize: '16px', fontWeight: '600', color: (parseFloat(uploadedData[0]?.file_response?.creditBureau?.at(-1)?.extraction?.overall_confidence) * 100)?.toFixed(0) < 85 ? 'red' : (parseFloat(uploadedData[0]?.file_response?.creditBureau?.at(-1)?.extraction?.overall_confidence) * 100)?.toFixed(0) > 95 ? '#00c853' : (parseFloat(uploadedData[0]?.file_response?.creditBureau?.at(-1)?.extraction?.overall_confidence) * 100)?.toFixed(0) >= 85 && (parseFloat(uploadedData[0]?.file_response?.creditBureau?.at(-1)?.extraction?.overall_confidence) * 100)?.toFixed(0) <= 95 ? '#f0ad4e' : '#aaa' }}>{(parseFloat(uploadedData[0]?.file_response?.creditBureau?.at(-1)?.extraction?.overall_confidence) * 100)?.toFixed(0)} <span style={{ color: '#aaa' }}>/ 100</span></Typography>
                                                                            </Box>
                                                                        </Stack>
                                                                    </Box>

                                                                    <Box sx={{ display: 'flex', gap: 2 }}>
                                                                        <Stack direction={'row'} alignItems={'center'} gap={1}>

                                                                            <Tooltip title={`${uploadedData[0]?.file_response?.creditBureau?.at(-1)?.validation_result?.reason?.info}`} arrow>
                                                                                <Box
                                                                                    sx={{
                                                                                        border: `4px solid ${uploadedData[0]?.file_response?.creditBureau?.at(-1)?.validation_result?.address_status === 'present' ? '#00c853' : 'red'}`,
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
                                                                            <Tooltip title={`${uploadedData[0]?.file_response?.creditBureau?.at(-1)?.validation_result?.reason?.info}`} arrow>
                                                                                <Box
                                                                                    sx={{
                                                                                        border: `4px solid ${uploadedData[0]?.file_response?.creditBureau?.at(-1)?.validation_result?.personal_info_status === 'partial' ? '#f0ad4e' : uploadedData[0]?.file_response?.creditBureau?.at(-1)?.validation_result?.personal_info_status === 'present' ? '#00c853' : 'red'
                                                                                            }`,
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


                                                            {expandedCreditBuore ?
                                                                <Box sx={{ mt: "30px", width: '100%' }}>

                                                                    <Box>
                                                                        {paginatedData1?.map((item, index) => (
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
                                                                                        {paginatedData1?.map((item, index) => (
                                                                                            <React.Fragment key={index}>
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

                                                                                                    <TableCell sx={{ fontSize: '14px', color: '#555', padding: '12px 20px', borderRight: '2px solid #e0e0e0' }}>
                                                                                                        {item.page}
                                                                                                    </TableCell>
                                                                                                    <TableCell sx={{ fontSize: '14px', color: '#555', padding: '12px 20px' }}>
                                                                                                        {item.page_confidence}
                                                                                                    </TableCell>
                                                                                                </TableRow>

                                                                                            </React.Fragment>
                                                                                        ))}
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

                                                                        ))}
                                                                    </Box>




                                                                </Box>

                                                                : ''}


                                                        </Box>
                                                    </Box>
                                                </Box >
                                            </TableRow>
                                        )}

                                        
                                    </React.Fragment>

                                );

                                
                            })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    <Typography>No results found</Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Sidebar>
    );
}

export default History;

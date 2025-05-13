import React, { useEffect, useState } from 'react';
import Sidebar from '../../Component/Sidebar';
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Checkbox, Box,
    Typography, TextField, InputAdornment, Collapse, IconButton,
    Stack, Button, Card, CardContent, Avatar, Tooltip
} from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import pdficon from '../../assets/pdf.png';

import addressInfo from '../../assets/addressInfo.png'

import personalInfo from '../../assets/personalInfo.png'

import checkIicon from '../../assets/checkicon.png'

function CostAnalysis() {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedUserIds, setExpandedUserIds] = useState([]);
    const [selectedUsersData, setSelectedUsersData] = useState({});

    useEffect(() => {
        const mockUsers = [
            {
                id: 1,
                fullName: "Pooja Chavan",
                dob: "1990-01-15",
                gender: "Female",
                aadharCardNumber: "1234-5678-9012",
                aadhar: "Pooja_Adhar.pdf",
                bankStatement: "pooja_bank.pdf",
                creditReport: "pooja_credit.pdf",


                analysis: {
                    aadhar: {
                        quality: 92,
                        addressMatch: 'present',
                        personalInfoMatch: 'complete',
                        fullName: 'Pooja Chavan',
                        dob: '1990-01-15',
                        gender: 'Female',
                        aadharCardNumber: '1234-5678-9012',
                        address: 'Some Address, Some City',
                        issueDate: '2015-05-10',
                        expiryDate: 'N/A',
                        issuingAuthority: 'UIDAI'
                    },
                    bankStatement: {
                        quality: 88,
                        accountNumberMatch: 'present',
                        transactionCount: 50
                    },
                    creditReport: {
                        score: 750,
                        negativeRemarks: 0
                    }
                }
            },
            {
                id: 2,
                fullName: "Yugal Otari",
                dob: "1988-05-20",
                gender: "Male",
                aadharCardNumber: "2345-6789-0123",
                aadhar: "Yugal_Adhar.pdf",
                bankStatement: "yugal_bank.pdf",
                creditReport: "yugal_credit.pdf",
                analysis: {
                    aadhar: {
                        quality: 78,
                        addressMatch: 'not present',
                        personalInfoMatch: 'partial',
                        fullName: 'Yugal Otari',
                        dob: '1988-05-20',
                        gender: 'Male',
                        aadharCardNumber: '2345-6789-0123',
                        address: 'Another Address',
                        issueDate: '2018-11-22',
                        expiryDate: 'N/A',
                        issuingAuthority: 'UIDAI'
                    },
                    bankStatement: {
                        quality: 95,
                        accountNumberMatch: 'present',
                        transactionCount: 120
                    },
                    creditReport: {
                        score: 680,
                        negativeRemarks: 1
                    }
                }
            },
            {
                id: 3,
                fullName: "Sanika Mahtre",
                dob: "1992-08-10",
                gender: "Female",
                aadharCardNumber: "3456-7890-1234",
                aadhar: "Sanika_Adhar.pdf",
                bankStatement: "sanika_bank.pdf",
                creditReport: "sanika_credit.pdf",
                analysis: {
                    aadhar: {
                        quality: 98,
                        addressMatch: 'present',
                        personalInfoMatch: 'complete',
                        fullName: 'Sanika Mahtre',
                        dob: '1992-08-10',
                        gender: 'Female',
                        aadharCardNumber: '3456-7890-1234',
                        address: 'Yet Another Address, Different City',
                        issueDate: '2020-03-01',
                        expiryDate: 'N/A',
                        issuingAuthority: 'UIDAI'
                    },
                    bankStatement: {
                        quality: 85,
                        accountNumberMatch: 'present',
                        transactionCount: 75
                    },
                    creditReport: {
                        score: 790,
                        negativeRemarks: 0
                    }
                }
            }
        ];
        setUsers(mockUsers);
    }, []);

    const handleCheckboxToggle = (user) => {
        setExpandedUserIds(prev =>
            prev.includes(user.id)
                ? prev.filter(userId => userId !== user.id)
                : [...prev, user.id]
        );

        setSelectedUsersData(prev => ({
            ...prev,
            [user.id]: user
        }));
    };

    const filteredUsers = users.filter(user =>
        [user.fullName, user.dob, user.gender, user.aadharCardNumber]
            .some(field => field.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <Sidebar title={"Consumption Of CostAnalysis"}>
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
                            <TableCell sx={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}>Full Name</TableCell>
                            <TableCell sx={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}>Date Of Birth</TableCell>
                            <TableCell sx={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}>Gender</TableCell>
                            <TableCell sx={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}>Aadhar Card Number</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user, index) => {
                                const isExpanded = expandedUserIds.includes(user.id);

                                return (
                                    <React.Fragment key={user.id}>
                                        <TableRow hover>
                                            <TableCell align="center">
                                                <Checkbox
                                                    checked={isExpanded}
                                                    onChange={() => handleCheckboxToggle(user)}
                                                />
                                            </TableCell>
                                            <TableCell align="center">{user.fullName}</TableCell>
                                            <TableCell align="center">{user.dob}</TableCell>
                                            <TableCell align="center">{user.gender}</TableCell>
                                            <TableCell align="center">{user.aadharCardNumber}</TableCell>
                                        </TableRow>
                                        {isExpanded && selectedUsersData[user.id] && (
                                            <TableRow>
                                                <TableCell colSpan={5} sx={{ padding: 2 }}>
                                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

                                                        <Box sx={{
                                                            bgcolor: "#fff",
                                                            p: 3,
                                                            borderRadius: "10px",
                                                            boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                                                        }}>
                                                            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} mb={2}>
                                                                <Stack direction="row" spacing={2} alignItems="center">
                                                                    <img src={pdficon} alt="Aadhar PDF" style={{ width: '50px', height: '50px', mixBlendMode: 'darken' }} />
                                                                    <Box>
                                                                        <Typography sx={{ color: '#676767', fontSize: '18px', fontWeight: '600', mb: '5px' }}>
                                                                            Aadhar - {selectedUsersData[user.id].aadhar}
                                                                        </Typography>
                                                                        <Typography sx={{ color: '#999', fontSize: '15px', fontStyle: 'italic' }}>
                                                                            ID Proof
                                                                        </Typography>
                                                                    </Box>
                                                                </Stack>
                                                                <Stack direction={'row'} alignItems={'center'} spacing={2}>
                                                                    <Typography sx={{ fontWeight: 'bold' }}>Quality: {selectedUsersData[user.id].analysis?.aadhar?.quality}/100</Typography>
                                                                    <Tooltip title={`Address Match: ${selectedUsersData[user.id].analysis?.aadhar?.addressMatch}`} arrow>
                                                                        {selectedUsersData[user.id].analysis?.aadhar?.addressMatch === 'present' ? <CheckCircleOutlineIcon color="success" /> : <ErrorOutlineIcon color="error" />}
                                                                    </Tooltip>
                                                                    <Tooltip title={`Personal Info Match: ${selectedUsersData[user.id].analysis?.aadhar?.personalInfoMatch}`} arrow>
                                                                        {selectedUsersData[user.id].analysis?.aadhar?.personalInfoMatch === 'complete' ? <CheckCircleOutlineIcon color="success" /> : selectedUsersData[user.id].analysis?.aadhar?.personalInfoMatch === 'partial' ? <WarningAmberOutlinedIcon color="warning" /> : <ErrorOutlineIcon color="error" />}
                                                                    </Tooltip>
                                                                </Stack>
                                                            </Stack>
                                                            <Collapse in={true} timeout="auto" unmountOnExit>
                                                                <Box sx={{ pl: 2 }}>
                                                                    <Typography variant="subtitle1" gutterBottom>Aadhar Details:</Typography>
                                                                    <Typography>Full Name: {selectedUsersData[user.id].analysis?.aadhar?.fullName}</Typography>
                                                                    <Typography>Date of Birth: {selectedUsersData[user.id].analysis?.aadhar?.dob}</Typography>
                                                                    <Typography>Gender: {selectedUsersData[user.id].analysis?.aadhar?.gender}</Typography>
                                                                    <Typography>Aadhar Number: {selectedUsersData[user.id].analysis?.aadhar?.aadharCardNumber}</Typography>
                                                                    <Typography>Address: {selectedUsersData[user.id].analysis?.aadhar?.address}</Typography>
                                                                    <Typography>Issue Date: {selectedUsersData[user.id].analysis?.aadhar?.issueDate}</Typography>
                                                                    <Typography>Expiry Date: {selectedUsersData[user.id].analysis?.aadhar?.expiryDate || 'N/A'}</Typography>
                                                                    <Typography>Issuing Authority: {selectedUsersData[user.id].analysis?.aadhar?.issuingAuthority}</Typography>
                                                                </Box>
                                                            </Collapse>
                                                        </Box>

                                                        <Box sx={{
                                                            bgcolor: "#fff",
                                                            p: 3,
                                                            borderRadius: "10px",
                                                            boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                                                        }}>
                                                            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} mb={2}>
                                                                <Stack direction="row" spacing={2} alignItems="center">
                                                                    <img src={pdficon} alt="Bank Statement PDF" style={{ width: '50px', height: '50px', mixBlendMode: 'darken' }} />
                                                                    <Box>
                                                                        <Typography sx={{ color: '#676767', fontSize: '18px', fontWeight: '600', mb: '5px' }}>
                                                                            Bank Statement - {selectedUsersData[user.id].bankStatement}
                                                                        </Typography>
                                                                        <Typography sx={{ color: '#999', fontSize: '15px', fontStyle: 'italic' }}>
                                                                            Financial Document
                                                                        </Typography>
                                                                    </Box>
                                                                </Stack>
                                                                <Typography sx={{ fontWeight: 'bold' }}>Quality: {selectedUsersData[user.id].analysis?.bankStatement?.quality}/100</Typography>
                                                            </Stack>
                                                            <Collapse in={true} timeout="auto" unmountOnExit>
                                                                <Box sx={{ pl: 2 }}>
                                                                    <Typography variant="subtitle1" gutterBottom>Bank Statement Details:</Typography>
                                                                    <Typography>Account Number Match: {selectedUsersData[user.id].analysis?.bankStatement?.accountNumberMatch}</Typography>
                                                                    <Typography>Transaction Count: {selectedUsersData[user.id].analysis?.bankStatement?.transactionCount}</Typography>

                                                                </Box>
                                                            </Collapse>
                                                        </Box>

                                                        <Box sx={{
                                                            bgcolor: "#fff",
                                                            p: 3,
                                                            borderRadius: "10px",
                                                            boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                                                        }}>
                                                            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} mb={2}>
                                                                <Stack direction="row" spacing={2} alignItems="center">
                                                                    <img src={pdficon} alt="Credit Report PDF" style={{ width: '50px', height: '50px', mixBlendMode: 'darken' }} />
                                                                    <Box>
                                                                        <Typography sx={{ color: '#676767', fontSize: '18px', fontWeight: '600', mb: '5px' }}>
                                                                            Credit Report - {selectedUsersData[user.id].creditReport}
                                                                        </Typography>
                                                                        <Typography sx={{ color: '#999', fontSize: '15px', fontStyle: 'italic' }}>
                                                                            Financial Assessment
                                                                        </Typography>
                                                                    </Box>
                                                                </Stack>
                                                                <Typography sx={{ fontWeight: 'bold' }}>Credit Score: {selectedUsersData[user.id].analysis?.creditReport?.score}</Typography>
                                                            </Stack>
                                                            <Collapse in={true} timeout="auto" unmountOnExit>
                                                                <Box sx={{ pl: 2 }}>
                                                                    <Typography variant="subtitle1" gutterBottom>Credit Report Details:</Typography>
                                                                    <Typography>Negative Remarks: {selectedUsersData[user.id].analysis?.creditReport?.negativeRemarks}</Typography>
                                                                </Box>
                                                            </Collapse>
                                                        </Box>
                                                    </Box>
                                                </TableCell>
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

export default CostAnalysis;
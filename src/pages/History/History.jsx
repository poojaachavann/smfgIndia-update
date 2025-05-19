import React, { useEffect, useState } from 'react';
import Sidebar from '../../Component/Sidebar';
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Box, Typography,
    TextField, InputAdornment
} from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import axios from 'axios';
import API from '../../Component/BaseURL';

function History({ domainPath, userLoginData }) {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const uploadDocumentData = async () => {
        try {
            const response = await axios.get(API.uploadDataFetch);
            const filtered = response.data?.uploadedData.filter(
                (data) => data._id === userLoginData?._id
            );
            setUsers(filtered);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        uploadDocumentData();
    }, [userLoginData]);

    const extractComponentsAsObject = (components = []) => {
        const obj = {};
        components.forEach(item => {
            obj[item.component] = item.value || "-";
        });
        return obj;
    };

    const componentKeys = [
        'full_name',
        'date_of_birth',
        'gender',
        'aadhaar_num',
        'full_address',
        'city_district',
        'state_province',
        'postal_code'
    ];

    const componentLabels = {
        full_name: "Full Name",
        date_of_birth: "Date of Birth",
        gender: "Gender",
        aadhaar_num: "Aadhaar Number",
        full_address: "Full Address",
        city_district: "City / District",
        state_province: "State / Province",
        postal_code: "Postal Code"
    };

    return (
        <Sidebar title={"History"}>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
                <Box sx={{ width: "250px" }}>
                    <TextField
                        placeholder="Search by name or Aadhaar..."
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

            <Box sx={{
                maxHeight: "70vh",
                overflow: "auto",
                borderRadius: "12px",
                boxShadow: 3,
                backgroundColor: "#fff"
            }}>
                <TableContainer component={Paper} sx={{
                    minWidth: "800px",
                    overflow: "auto",
                    borderRadius: "12px"
                }}
                >
                    <Table stickyHeader>
                        <TableHead sx={{ backgroundColor: "#1976d2" }}>
                            <TableRow>
                                {componentKeys.map((key) => (
                                    <TableCell
                                        key={key}
                                        sx={{
                                            color: "#fff",
                                            fontWeight: "bold",
                                            textAlign: "center",
                                            whiteSpace: "nowrap",
                                            backgroundColor: "#1976d2",
                                            position: 'sticky',
                                            top: 0,
                                            zIndex: 1
                                        }}
                                    >
                                        {componentLabels[key]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.length > 0 ? (
                                users
                                    .filter((user) => {
                                        const componentsArray = user?.file_response?.idProof?.[0]?.validation_result?.components || [];
                                        const componentsObj = extractComponentsAsObject(componentsArray);
                                        const searchString = `${componentsObj.full_name || ""} ${componentsObj.aadhaar_num || ""}`.toLowerCase();
                                        return searchString.includes(searchQuery.toLowerCase());
                                    })
                                    .map((user) => {
                                        const componentsArray = user?.file_response?.idProof?.[0]?.validation_result?.components || [];
                                        const componentsObj = extractComponentsAsObject(componentsArray);

                                        return (
                                            <TableRow key={user._id} hover sx={{
                                                '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' },
                                                '&:hover': { backgroundColor: '#e3f2fd' },
                                                cursor: 'pointer'

                                            }}
                                                onClick={() => window.location.href = `/uploadDocument/${user?.file_response?.idProof?.[0]?.process_id
                                                    }`}
                                            >
                                                {componentKeys.map((key) => (
                                                    <TableCell key={key} align="center">
                                                        {componentsObj[key] || "-"}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        );
                                    })
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={componentKeys.length} align="center">
                                        <Typography>No results found</Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Sidebar>
    );
}

export default History;

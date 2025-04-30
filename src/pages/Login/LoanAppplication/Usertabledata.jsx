import { Box, Button, Pagination, Radio, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import axios from 'axios';
import API from '../../../Component/BaseURL';
import Sidebar from '../../../Component/Sidebar';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import React from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

export default function Usertabledata() {

    const url = window.location.href
    const mainUrl = url.split('/')


    const [userLoginData, setUserLoginData] = useState('')
    const userDataOfLogin = localStorage.getItem('userData')
    useEffect(() => {
        if (userDataOfLogin) {
            setUserLoginData(JSON.parse(userDataOfLogin))
        }
    }, [])


    const onChangeApiCallOfForm = async () => {

        const loanFormJson = {
            name: '',
            mobile: '',
            emailId: '',
            gender: '',
            dob: '',
            maritalStatus: '',
            relationshipWithBarrower: '',
            otherRelationship: '',
            employmentStatus: '',
            numberOfDependents: '',
            numberOfLoansEmis: '',
            typeOfResidense: '',
            livingCurrentResidenceSince: '',
            address: ''
        }
        try {
            const response = await axios.post(API.loanformapi, loanFormJson)
            window.location.href = `/loanAppform/${response.data.loanApp._id}`

        } catch (error) {
            console.log(error)

        }
    }


    const [formFillData, setFormFillData] = useState([])
    const [currentPage_1, setCurrentPage_1] = useState(1);
    const itemsPerPage = 5;


    const loanAppFormFillData = async () => {
        try {
            const response = await axios.get(API.loanAppformDataFetch)
            console.log('response', response.data?.loanAppformData);

            const idWiseFilterData = response.data?.loanAppformData.filter((data) => data.user_id === userLoginData._id)

            const filteredData = idWiseFilterData.filter(item => {
                return item.name && item.mobile && item.gender && item.dob;
            });

            setFormFillData(filteredData);

        } catch (error) {
            console.error(error);
        }
    }

    const paginatedData = formFillData.slice(
        (currentPage_1 - 1) * itemsPerPage,
        currentPage_1 * itemsPerPage
    );

    const totalPages_1 = Math.ceil(formFillData.length / itemsPerPage);


    const handlePageChange = (event, value, pageType) => {
        if (pageType === 'page_1') {
            setCurrentPage_1(value);
        }
        loanAppFormFillData(value);
    };

    useEffect(() => {
        loanAppFormFillData();
    }, [userLoginData])

    const [selectedId, setSelectedId] = useState(null)
    const handleRadioChange = (id) => {
        setSelectedId(id)
    };

    return (
        <>

            <Sidebar title={'Loan Applicant Persona Score Card Details'} selectedId={selectedId} >

                <Box display={'flex'} justifyContent={'end'} p={1}>
                    <Button sx={{
                        bgcolor: "transparent",
                        width: "15%",
                        textTransform: "none",
                        border: '1px solid #aaa',

                    }}
                        onClick={onChangeApiCallOfForm}
                    >
                        <Stack direction={'row'} alignItems={'center'} spacing={0.5}>
                            <Typography sx={{ fontSize: '14px', color: '#656565', fontWeight: '600' }}>Add Applicant</Typography>
                            <EditOutlinedIcon sx={{ color: '#000', fontSize: '20px' }} />
                        </Stack>
                    </Button>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: "20px" }}>


                    {paginatedData.length === 0 ?
                        <Box mt={'50px'}>
                            <Typography sx={{ fontSize: '16px', color: 'red', fontWeight: '600', mb: '40px', textAlign: 'center' }}>No data found</Typography>
                        </Box>
                        :
                        <Box sx={{ width: '90%' }}>
                            <TableContainer sx={{ borderRadius: '10px' }}>
                                <Table sx={{ border: '1px solid #ddd' }}>
                                    <TableHead sx={{ bgcolor: '#f0f0f4' }}>
                                        <TableRow>
                                            <TableCell sx={{ textAlign: 'start', fontSize: '14px', fontWeight: '600', color: '#656565', borderRight: '1px solid #ddd' }}></TableCell>
                                            <TableCell sx={{ textAlign: 'start', fontSize: '14px', fontWeight: '600', color: '#656565', borderRight: '1px solid #ddd' }}>Name</TableCell>
                                            <TableCell sx={{ textAlign: 'start', fontSize: '14px', fontWeight: '600', color: '#656565', borderRight: '1px solid #ddd' }}>Mobile Number</TableCell>
                                            <TableCell sx={{ textAlign: 'start', fontSize: '14px', fontWeight: '600', color: '#656565', borderRight: '1px solid #ddd' }}>Gender</TableCell>
                                            <TableCell sx={{ textAlign: 'start', fontSize: '14px', fontWeight: '600', color: '#656565', borderRight: '1px solid #ddd' }}>Date of Birth</TableCell>
                                            <TableCell sx={{ textAlign: 'start', fontSize: '14px', fontWeight: '600', color: '#656565' }}>Bank Statement</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {paginatedData && paginatedData.map((item) => (
                                            <TableRow key={item._id}>
                                                <TableCell sx={{ textAlign: 'start', fontSize: '13px', fontWeight: '500', borderRight: '1px solid #ddd' }}>
                                                    <Radio
                                                        size="small"
                                                        checked={selectedId === item._id}
                                                        onChange={() => handleRadioChange(item._id)}
                                                        sx={{ color: '#000' }}
                                                    />
                                                </TableCell>
                                                <TableCell sx={{ textAlign: 'start', fontSize: '13px', fontWeight: '500', borderRight: '1px solid #ddd' }}>{item.name}</TableCell>
                                                <TableCell sx={{ textAlign: 'start', fontSize: '13px', fontWeight: '500', borderRight: '1px solid #ddd' }}>{item.mobile}</TableCell>
                                                <TableCell sx={{ textAlign: 'start', fontSize: '13px', fontWeight: '500', borderRight: '1px solid #ddd' }}>{item.gender}</TableCell>
                                                <TableCell sx={{ textAlign: 'start', fontSize: '13px', fontWeight: '500', borderRight: '1px solid #ddd' }}>{item.dob}</TableCell>
                                                <TableCell sx={{ fontSize: '13px', color: '#000' }}>

                                                    <TableCell sx={{ fontSize: '13px' }}>

                                                        <Link
                                                            to={API.filePath + item.file_path[0].split(mainUrl[mainUrl.length - 2] === 'localhost:5173' ? '\\' : '/').pop()}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            {item.file_path && item.file_path[0]
                                                                ? item.file_path[0]
                                                                    .split(mainUrl[mainUrl.length - 2] === 'localhost:5173' ? '\\' : '/')
                                                                    .pop()
                                                                    .replace(/^.*?(\d{13}-)/, '')
                                                                : 'No File'}
                                                        </Link>
                                                    </TableCell>
                                                    {console.log(API.filePath + item.file_path[0].split(mainUrl[mainUrl.length - 2] == 'localhost:5173' ? '\\' : '/').pop())}

                                                </TableCell>



                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>

                                {paginatedData.length === 0 ? '' :
                                    <Box sx={{ display: 'flex', justifyContent: 'end', mt: '20px', mb: '12px' }}>
                                        <Pagination
                                            count={totalPages_1}
                                            page={currentPage_1}
                                            onChange={(event, value) => handlePageChange(event, value, 'page_1')}
                                            variant="standard"
                                            shape="rounded"
                                            sx={{
                                                '& .MuiPaginationItem-root': {
                                                    color: '#858585',
                                                    '&.Mui-selected': {
                                                        color: '#000',
                                                    },
                                                },
                                            }}
                                        />
                                    </Box>
                                }
                            </TableContainer>

                        </Box>
                    }


                </Box>
            </Sidebar>



        </>
    )
}

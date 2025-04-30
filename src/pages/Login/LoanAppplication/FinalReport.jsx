import { Box, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@mui/material'
import Sidebar from '../../../Component/Sidebar'
import { useEffect, useState } from 'react'
import axios from 'axios'
import API from '../../../Component/BaseURL'
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import Markdown from 'markdown-to-jsx'
import InfoIcon from '@mui/icons-material/Info';
import React from 'react'


export default function FinalReport() {

    const url = window.location.href
    const mainUrl = url.split('/')

    const [selectedData, setSelectedData] = useState([])
    const loanAppFormFillData = async () => {
        try {
            const response = await axios.get(API.loanAppformDataFetch)
            console.log('response', response.data?.loanAppformData);

            setSelectedData(response.data?.loanAppformData.filter((data) => data._id === mainUrl[mainUrl.length - 1]))

        } catch (error) {

        }
    }

    useEffect(() => {
        loanAppFormFillData()
    }, [])

    // console.log('selectedData', selectedData[0]?.check_history[0]?.text?.demographic_report)
    // console.log('selectedData', selectedData[0]?.check_history[0]?.text?.income_regularity_and_quantum_report)
    // console.log('selectedData', selectedData[0]?.check_history[0]?.text?.spent_pattern_report)
    // console.log('selectedData', selectedData[0]?.check_history[0]?.text?.transaction_pattern_report)
    // console.log('selectedData', selectedData[0]?.check_history[0]?.text?.granularity_report)
    console.log('selectedData', selectedData)

    const [viewMore, setViewMore] = useState(false)

    const tooltipFun = function () {
        return (
            <>

                <Box
                    sx={{
                        bgcolor: '#ffb09c',
                        textTransform: 'none',
                        width: "100%",
                        borderLeft: '5px solid red',
                        borderRadius: '5px',
                        mb: "20px",
                        pt: '10px',
                        pb: '10px'
                    }}

                >
                    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                        <Stack direction={'row'} spacing={1} alignItems={'center'}>
                            <CloseIcon sx={{ color: 'red', fontSize: '20px' }} />
                            <Typography sx={{ fontSize: '13px', fontWeight: '500', color: "#000" }}>
                                Score 1-3: Application Declined.
                            </Typography>
                        </Stack>

                    </Stack>

                </Box>

                <Box
                    sx={{
                        bgcolor: '#ffffe0',
                        textTransform: 'none',
                        width: "100%",
                        borderLeft: '5px solid #f0ad4e',
                        borderRadius: '5px',
                        mb: "20px",
                        pt: '10px',
                        pb: '10px'
                    }}

                >
                    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                        <Stack direction={'row'} spacing={1} alignItems={'center'}>
                            <WarningAmberIcon sx={{ color: '#f0ad4e', fontSize: '20px' }} />
                            <Typography sx={{ fontSize: '13px', fontWeight: '500', color: "#000" }}>
                                Score 4-7: Additional Information is required.
                            </Typography>
                        </Stack>

                    </Stack>


                </Box>

                <Box
                    sx={{
                        bgcolor: '#d1ffbd',
                        textTransform: 'none',
                        width: "100%",
                        borderLeft: '5px solid green',
                        borderRadius: '5px',
                        mb: "20px",
                        pt: '10px',
                        pb: '10px'
                    }}

                >
                    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                        <Stack direction={'row'} spacing={1} alignItems={'center'}>
                            <DoneIcon sx={{ color: 'green', fontSize: '20px' }} />
                            <Typography sx={{ fontSize: '13px', fontWeight: '500', color: "#000" }}>
                                Score 8-10: Application can be Approved.
                            </Typography>
                        </Stack>

                    </Stack>

                </Box>

            </>
        )
    }


    return (
        <>
            <Sidebar title={'Final Report'}>

                {selectedData[0]?.check_history[0]?.text?.final_report?.score >= 4 && selectedData[0]?.check_history[0]?.text?.final_report?.score <= 7 ?
                    <Box sx={{ display: 'flex', justifyContent: 'center', }}>
                        <Box
                            sx={{
                                bgcolor: '#ffffe0',
                                textTransform: 'none',
                                width: "90%",
                                p: 2.3,
                                borderLeft: '5px solid #f0ad4e',
                                borderRadius: '5px'

                            }}

                        >
                            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                                <Stack direction={'row'} spacing={1} alignItems={'center'}>
                                    <WarningAmberIcon sx={{ color: '#f0ad4e', fontSize: '20px' }} />
                                    <Typography sx={{ fontSize: '14px', fontWeight: '500' }}>
                                        Score {selectedData[0]?.check_history[0]?.text?.final_report.score}: Additional Information is required. Because score lies within 4-7
                                    </Typography>
                                </Stack>

                                <Tooltip title={tooltipFun()} arrow>
                                    <InfoIcon sx={{ color: '#000', fontSize: '20px' }} />
                                </Tooltip>
                            </Stack>


                        </Box>
                    </Box>
                    :
                    selectedData[0]?.check_history[0]?.text?.final_report?.score >= 8 && selectedData[0]?.check_history[0]?.text?.final_report?.score <= 10 ?
                        <Box sx={{ display: 'flex', justifyContent: 'center', }}>
                            <Box
                                sx={{
                                    bgcolor: '#d1ffbd',
                                    textTransform: 'none',
                                    width: "90%",
                                    p: 2.3,
                                    borderLeft: '5px solid green',
                                    borderRadius: '5px'
                                }}

                            >
                                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                                    <Stack direction={'row'} spacing={1} alignItems={'center'}>
                                        <DoneIcon sx={{ color: 'green', fontSize: '20px' }} />
                                        <Typography sx={{ fontSize: '14px', fontWeight: '500' }}>
                                            Score {selectedData[0]?.check_history[0]?.text?.final_report.score}: Application can be Approved. Because score lies within 8-10

                                        </Typography>
                                    </Stack>

                                    <Tooltip title={tooltipFun()} arrow>
                                        <InfoIcon sx={{ color: '#000', fontSize: '20px' }} />
                                    </Tooltip>
                                </Stack>

                            </Box>
                        </Box>
                        :
                        selectedData[0]?.check_history[0]?.text?.final_report?.score >= 1 && selectedData[0]?.check_history[0]?.text?.final_report?.score <= 3 ?
                            <Box sx={{ display: 'flex', justifyContent: 'center', }}>
                                <Box
                                    sx={{
                                        bgcolor: '#ffb09c',
                                        textTransform: 'none',
                                        width: "90%",
                                        p: 2.3,
                                        borderLeft: '5px solid red',
                                        borderRadius: '5px'
                                    }}

                                >
                                    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                                        <Stack direction={'row'} spacing={1} alignItems={'center'}>
                                            <CloseIcon sx={{ color: 'red', fontSize: '20px' }} />
                                            <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>
                                                Score {selectedData[0]?.check_history[0]?.text?.final_report.score}: Application Declined. Because score lies within 1-3
                                            </Typography>
                                        </Stack>

                                        <Tooltip title={tooltipFun()} arrow>
                                            <InfoIcon sx={{ color: '#000', fontSize: '20px' }} />
                                        </Tooltip>
                                    </Stack>

                                </Box>
                            </Box>
                            : ''}


                <Box sx={{ display: 'flex', justifyContent: 'center', mt: '20px' }}>
                    <Box sx={{ width: '90%' }}>

                        <Typography sx={{ fontSize: '14px', fontWeight: '600', mb: '10px' }}> Demographic Information</Typography>
                        <TableContainer sx={{ borderRadius: '10px' }}>
                            <Table sx={{ border: '1px solid #ddd' }}>
                                <TableHead sx={{ bgcolor: '#f0f0f4' }}>
                                    <TableRow>

                                        <TableCell sx={{ textAlign: 'start', fontSize: '14px', fontWeight: '600', width: '40%', color: '#656565', borderRight: '1px solid #ddd' }}>Attribute</TableCell>
                                        <TableCell sx={{ textAlign: 'start', fontSize: '14px', fontWeight: '600', width: '40%', color: '#656565', borderRight: '1px solid #ddd' }}>Details</TableCell>
                                        <TableCell sx={{ textAlign: 'start', fontSize: '14px', fontWeight: '600', width: '30%', color: '#656565' }}>Score</TableCell>

                                    </TableRow>
                                </TableHead>
                                {/* <TableBody>
                                    {selectedData[0]?.check_history[0]?.text?.demographic_report &&
                                        Object.keys(selectedData[0]?.check_history[0]?.text?.demographic_report).map((key, index) => {
                                            const data = selectedData[0]?.check_history[0]?.text?.demographic_report[key];

                                            const keyMapping = {
                                                name: 'Name',
                                                mobile: 'Mobile',
                                                email_id: 'Email Id',
                                                gender: 'Gender',
                                                date_of_birth: 'Date of Birth',
                                                marital_status: 'Marital Status',
                                                relationship_with_borrower: 'Relationship with Borrower',
                                                other_relationship: 'Other Relationship',
                                                employment_status: 'Employment Status',
                                                addresses: 'Addresses',
                                                number_of_dependents: 'Number of Dependents',
                                                number_of_loans_or_emis: 'Number of Loans/EMIs',
                                                type_of_residence: 'Type of Residence',
                                                living_at_current_residence_since: 'Living at Current Residence Since',
                                                aadhar_card: 'Aadhar Card',
                                                cibil_score: 'CIBIL Score',
                                                name_of_guarantor: 'Name of Guarantor',
                                                pan_card: 'PAN Card',
                                            };

                                            return (
                                                <TableRow key={index} sx={{ textAlign: 'center' }}>
                                                    <TableCell
                                                        sx={{
                                                            textAlign: 'start',
                                                            fontSize: '13px',
                                                            fontWeight: '500',
                                                            borderRight: '1px solid #ddd',
                                                        }}
                                                    >
                                                        {keyMapping[key] || key}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{
                                                            textAlign: 'start',
                                                            fontSize: '13px',
                                                            fontWeight: '500',
                                                            borderRight: '1px solid #ddd',
                                                        }}
                                                    >
                                                        {data?.reason || '-'}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{
                                                            textAlign: 'start',
                                                            fontSize: '13px',
                                                            fontWeight: '500',
                                                        }}
                                                    >
                                                        {data?.score || '-'}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}



                                </TableBody> */}

                                <TableBody>
                                    {selectedData[0]?.check_history[0]?.text?.demographic_report &&
                                        Object.keys(selectedData[0]?.check_history[0]?.text?.demographic_report).map((key, index) => {
                                            if (key === 'score') return null;

                                            const data = selectedData[0]?.check_history[0]?.text?.demographic_report[key];
                                            const keyMapping = {
                                                name: 'Name',
                                                mobile: 'Mobile',
                                                email_id: 'Email Id',
                                                gender: 'Gender',
                                                date_of_birth: 'Date of Birth',
                                                marital_status: 'Marital Status',
                                                relationship_with_borrower: 'Relationship with Borrower',
                                                other_relationship: 'Other Relationship',
                                                employment_status: 'Employment Status',
                                                addresses: 'Address',
                                                number_of_dependents: 'Number of Dependents',
                                                number_of_loans_or_emis: 'Number of Loans/EMIs',
                                                type_of_residence: 'Type of Residence',
                                                living_at_current_residence_since: 'Living at Current Residence Since',
                                                aadhar_card: 'Aadhar Card',
                                                cibil_score: 'CIBIL Score',
                                                name_of_guarantor: 'Name of Guarantor',
                                                pan_card: 'PAN Card',
                                            };

                                            if (key === 'addresses' && Array.isArray(data)) {
                                                return data.map((addr, addrIndex) => {
                                                    const addressReason = addr?.reason || 'Address details provided.';
                                                    const addressScore = addr?.score || '-';

                                                    const addressFields = ['house_flat_building', 'street_name', 'locality_area', 'landmark', 'city', 'state', 'country', 'pin_code'];
                                                    const formattedAddress = addressFields
                                                        .map(field => {
                                                            const val = addr[field]?.reason?.split("'")[1];
                                                            return val ? val : null;
                                                        })
                                                        .filter(Boolean)
                                                        .join(', ');

                                                    return (
                                                        <TableRow key={`address-${addrIndex}`} sx={{ textAlign: 'center' }}>
                                                            <TableCell
                                                                sx={{
                                                                    textAlign: 'start',
                                                                    fontSize: '13px',
                                                                    fontWeight: '500',
                                                                    borderRight: '1px solid #ddd',
                                                                }}
                                                            >
                                                                Address {addrIndex + 1}
                                                            </TableCell>
                                                            <TableCell
                                                                sx={{
                                                                    textAlign: 'start',
                                                                    fontSize: '13px',
                                                                    fontWeight: '500',
                                                                    borderRight: '1px solid #ddd',
                                                                }}
                                                            >
                                                                {addressReason}
                                                            </TableCell>
                                                            <TableCell
                                                                sx={{
                                                                    textAlign: 'start',
                                                                    fontSize: '13px',
                                                                    fontWeight: '500',
                                                                }}
                                                            >
                                                                {addressScore}
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                });
                                            }

                                            return (
                                                <TableRow key={index} sx={{ textAlign: 'center' }}>
                                                    <TableCell
                                                        sx={{
                                                            textAlign: 'start',
                                                            fontSize: '13px',
                                                            fontWeight: '500',
                                                            borderRight: '1px solid #ddd',
                                                        }}
                                                    >
                                                        {keyMapping[key] || key}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{
                                                            textAlign: 'start',
                                                            fontSize: '13px',
                                                            fontWeight: '500',
                                                            borderRight: '1px solid #ddd',
                                                        }}
                                                    >
                                                        {data?.reason || '-'}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{
                                                            textAlign: 'start',
                                                            fontSize: '13px',
                                                            fontWeight: '500',
                                                        }}
                                                    >
                                                        {data?.score || '-'}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}

                                    <TableRow sx={{ backgroundColor: '#f9f9f9' }}>
                                        <TableCell
                                            colSpan={2}
                                            sx={{
                                                textAlign: 'start',
                                                fontSize: '13px',
                                                fontWeight: '600',
                                                borderRight: '1px solid #ddd',
                                            }}
                                        >
                                            Overall Score
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                textAlign: 'start',
                                                fontSize: '13px',
                                                fontWeight: '600',
                                            }}
                                        >
                                            {selectedData[0]?.check_history[0]?.text?.demographic_report?.score || '-'}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>



                            </Table>
                        </TableContainer>


                    </Box>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: '20px' }}>
                    <Box sx={{ width: '90%' }}>

                        <Typography sx={{ fontSize: '14px', fontWeight: '600', mb: '10px' }}>Regularity and quantum of income flow

                        </Typography>
                        <TableContainer sx={{ borderRadius: '10px' }}>
                            <Table sx={{ border: '1px solid #ddd' }}>
                                <TableHead sx={{ bgcolor: '#f0f0f4' }}>
                                    <TableRow>

                                        <TableCell sx={{ textAlign: 'start', fontSize: '14px', fontWeight: '600', width: '40%', color: '#656565', borderRight: '1px solid #ddd' }}>Attribute</TableCell>
                                        <TableCell sx={{ textAlign: 'start', fontSize: '14px', fontWeight: '600', width: '40%', color: '#656565', borderRight: '1px solid #ddd' }}>Details</TableCell>
                                        <TableCell sx={{ textAlign: 'start', fontSize: '14px', fontWeight: '600', width: '30%', color: '#656565' }}>Score</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {selectedData[0]?.check_history[0]?.text?.income_regularity_and_quantum_report.income_sources &&
                                        Object.keys(selectedData[0]?.check_history[0]?.text?.income_regularity_and_quantum_report.income_sources).map((key, index) => {
                                            const data = selectedData[0]?.check_history[0]?.text?.income_regularity_and_quantum_report.income_sources[key];

                                            return (
                                                <TableRow key={index} sx={{ textAlign: 'center' }}>
                                                    <TableCell
                                                        sx={{
                                                            textAlign: 'start',
                                                            fontSize: '13px',
                                                            fontWeight: '500',
                                                            borderRight: '1px solid #ddd',
                                                        }}
                                                    >
                                                        {data?.source || '-'}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{
                                                            textAlign: 'start',
                                                            fontSize: '13px',
                                                            fontWeight: '500',
                                                            borderRight: '1px solid #ddd',
                                                        }}
                                                    >
                                                        {data?.reason || '-'}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{
                                                            textAlign: 'start',
                                                            fontSize: '13px',
                                                            fontWeight: '500',
                                                        }}
                                                    >
                                                        {data?.score || '-'}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}

                                </TableBody>
                                <TableRow sx={{ backgroundColor: '#f9f9f9' }}>
                                    <TableCell
                                        colSpan={2}
                                        sx={{
                                            textAlign: 'start',
                                            fontSize: '14px',
                                            fontWeight: '600',
                                            borderRight: '1px solid #ddd',
                                        }}
                                    >
                                        Overall Score
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            textAlign: 'start',
                                            fontSize: '14px',
                                            fontWeight: '600',
                                        }}
                                    >
                                        {selectedData[0]?.check_history[0]?.text?.income_regularity_and_quantum_report?.overall_score || '-'}
                                    </TableCell>
                                </TableRow>
                            </Table>
                        </TableContainer>


                    </Box>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: '20px' }}>
                    <Box sx={{ width: '90%' }}>

                        <Typography sx={{ fontSize: '14px', fontWeight: '600', mb: '10px' }}>Spend pattern</Typography>
                        <TableContainer sx={{ borderRadius: '10px' }}>
                            <Table sx={{ border: '1px solid #ddd' }}>
                                <TableHead sx={{ bgcolor: '#f0f0f4' }}>
                                    <TableRow>

                                        <TableCell sx={{ textAlign: 'start', fontSize: '14px', fontWeight: '600', width: '40%', color: '#656565', borderRight: '1px solid #ddd' }}>Attribute</TableCell>
                                        <TableCell sx={{ textAlign: 'start', fontSize: '14px', fontWeight: '600', width: '40%', color: '#656565', borderRight: '1px solid #ddd' }}>Details</TableCell>
                                        <TableCell sx={{ textAlign: 'start', fontSize: '14px', fontWeight: '600', width: '30%', color: '#656565' }}>Score</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {selectedData[0]?.check_history[0]?.text?.spent_pattern_report?.spents &&
                                        Object.keys(selectedData[0]?.check_history[0]?.text?.spent_pattern_report?.spents).map((key, index) => {
                                            const data = selectedData[0]?.check_history[0]?.text?.spent_pattern_report?.spents[key];

                                            return (
                                                <TableRow key={index} sx={{ textAlign: 'center' }}>
                                                    <TableCell
                                                        sx={{
                                                            textAlign: 'start',
                                                            fontSize: '13px',
                                                            fontWeight: '500',
                                                            borderRight: '1px solid #ddd',
                                                        }}
                                                    >
                                                        {data?.spent_category || '-'}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{
                                                            textAlign: 'start',
                                                            fontSize: '13px',
                                                            fontWeight: '500',
                                                            borderRight: '1px solid #ddd',
                                                        }}
                                                    >
                                                        {data?.reason || '-'}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{
                                                            textAlign: 'start',
                                                            fontSize: '13px',
                                                            fontWeight: '500',
                                                        }}
                                                    >
                                                        {data?.score || '-'}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}

                                </TableBody>


                                <TableRow sx={{ backgroundColor: '#f9f9f9' }}>
                                    <TableCell
                                        colSpan={2}
                                        sx={{
                                            textAlign: 'start',
                                            fontSize: '14px',
                                            fontWeight: '600',
                                            borderRight: '1px solid #ddd',
                                        }}
                                    >
                                        Overall Score
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            textAlign: 'start',
                                            fontSize: '14px',
                                            fontWeight: '600',
                                        }}
                                    >
                                        {selectedData[0]?.check_history[0]?.text?.spent_pattern_report?.overall_score || '-'}
                                    </TableCell>
                                </TableRow>

                            </Table>
                        </TableContainer>


                    </Box>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: '20px' }}>
                    <Box sx={{ width: '90%' }}>

                        <Typography sx={{ fontSize: '14px', fontWeight: '600', mb: '10px' }}>Transaction Pattern</Typography>
                        <TableContainer sx={{ borderRadius: '10px' }}>
                            <Table sx={{ border: '1px solid #ddd' }}>
                                <TableHead sx={{ bgcolor: '#f0f0f4' }}>
                                    <TableRow>

                                        <TableCell sx={{ textAlign: 'start', fontSize: '14px', fontWeight: '600', width: '40%', color: '#656565', borderRight: '1px solid #ddd' }}>Attribute</TableCell>
                                        <TableCell sx={{ textAlign: 'start', fontSize: '14px', fontWeight: '600', width: '40%', color: '#656565', borderRight: '1px solid #ddd' }}>Details</TableCell>
                                        <TableCell sx={{ textAlign: 'start', fontSize: '14px', fontWeight: '600', width: '30%', color: '#656565' }}>Score</TableCell>

                                    </TableRow>
                                </TableHead>
                                {/* <TableBody>
                                    {selectedData[0]?.check_history[0]?.text?.transaction_pattern_report.transactions &&
                                        Object.keys(selectedData[0]?.check_history[0]?.text?.transaction_pattern_report.transactions).map((key, index) => {
                                            const data = selectedData[0]?.check_history[0]?.text?.transaction_pattern_report.transactions[key];

                                            return (
                                                <TableRow key={index} sx={{ textAlign: 'center' }}>
                                                    <TableCell
                                                        sx={{
                                                            textAlign: 'start',
                                                            fontSize: '13px',
                                                            fontWeight: '500',
                                                            borderRight: '1px solid #ddd',
                                                        }}
                                                    >
                                                        {data?.transaction_category || '-'}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{
                                                            textAlign: 'start',
                                                            fontSize: '13px',
                                                            fontWeight: '500',
                                                            borderRight: '1px solid #ddd',
                                                        }}
                                                    >
                                                        {data?.reason || '-'}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{
                                                            textAlign: 'start',
                                                            fontSize: '13px',
                                                            fontWeight: '500',
                                                        }}
                                                    >
                                                        {data?.score || '-'}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}



                                </TableBody> */}

                                <TableBody>
                                    {Array.isArray(selectedData[0]?.check_history[0]?.text?.transaction_pattern_report?.transactions) &&
                                        selectedData[0]?.check_history[0]?.text?.transaction_pattern_report.transactions.map((data, index) => (
                                            <TableRow key={index} sx={{ textAlign: 'center' }}>
                                                <TableCell
                                                    sx={{
                                                        textAlign: 'start',
                                                        fontSize: '13px',
                                                        fontWeight: '500',
                                                        borderRight: '1px solid #ddd',
                                                    }}
                                                >
                                                    {data?.transaction_category || '-'}
                                                </TableCell>
                                                <TableCell
                                                    sx={{
                                                        textAlign: 'start',
                                                        fontSize: '13px',
                                                        fontWeight: '500',
                                                        borderRight: '1px solid #ddd',
                                                    }}
                                                >
                                                    {data?.reason || '-'}
                                                </TableCell>
                                                <TableCell
                                                    sx={{
                                                        textAlign: 'start',
                                                        fontSize: '13px',
                                                        fontWeight: '500',
                                                    }}
                                                >
                                                    {data?.score || '-'}
                                                </TableCell>
                                            </TableRow>
                                        ))}

                                    <TableRow sx={{ backgroundColor: '#f9f9f9' }}>
                                        <TableCell
                                            colSpan={2}
                                            sx={{
                                                textAlign: 'start',
                                                fontSize: '13px',
                                                fontWeight: '600',
                                                borderRight: '1px solid #ddd',
                                            }}
                                        >
                                            Overall Score
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                textAlign: 'start',
                                                fontSize: '13px',
                                                fontWeight: '600',
                                            }}
                                        >
                                            {selectedData[0]?.check_history[0]?.text?.transaction_pattern_report?.overall_score || '-'}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>

                            </Table>
                        </TableContainer>


                    </Box>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: '20px' }}>

                    <Box sx={{ width: '90%' }}>

                        <Typography sx={{ fontSize: '14px', fontWeight: '600', mb: '10px' }}>Transaction Frequency And Size Details

                        </Typography>
                        <TableContainer sx={{ borderRadius: '10px' }}>
                            <Table sx={{ border: '1px solid #ddd' }}>
                                <TableHead sx={{ bgcolor: '#f0f0f4' }}>
                                    <TableRow>

                                        <TableCell sx={{ textAlign: 'start', fontSize: '14px', fontWeight: '600', width: '40%', color: '#656565', borderRight: '1px solid #ddd' }}>Attribute</TableCell>
                                        <TableCell sx={{ textAlign: 'start', fontSize: '14px', fontWeight: '600', width: '40%', color: '#656565', borderRight: '1px solid #ddd' }}>Details</TableCell>
                                        <TableCell sx={{ textAlign: 'start', fontSize: '14px', fontWeight: '600', width: '30%', color: '#656565' }}>Score</TableCell>

                                    </TableRow>
                                </TableHead>
                                {/* <TableBody>
                                    {selectedData[0]?.check_history[0]?.text?.granularity_report &&
                                        Object.keys(selectedData[0]?.check_history[0]?.text?.granularity_report).map((key, index) => {
                                            const data = selectedData[0]?.check_history[0]?.text?.granularity_report[key];

                                            return (
                                                <TableRow key={index} sx={{ textAlign: 'center' }}>
                                                    <TableCell
                                                        sx={{
                                                            textAlign: 'start',
                                                            fontSize: '14px',
                                                            fontWeight: '500',
                                                            borderRight: '1px solid #ddd',
                                                        }}
                                                    >
                                                        {key}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{
                                                            textAlign: 'start',
                                                            fontSize: '14px',
                                                            fontWeight: '500',
                                                            borderRight: '1px solid #ddd',
                                                        }}
                                                    >
                                                        {data?.reason || '-'}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{
                                                            textAlign: 'start',
                                                            fontSize: '14px',
                                                            fontWeight: '500',
                                                        }}
                                                    >
                                                        {data?.score || '-'}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}

                                </TableBody> */}

                                <TableBody>
                                    {selectedData[0]?.check_history[0]?.text?.granularity_report &&
                                        Object.keys(selectedData[0]?.check_history[0]?.text?.granularity_report).map((key, index) => {
                                            if (key === 'score') return null;
                                            const data = selectedData[0]?.check_history[0]?.text?.granularity_report[key];

                                            return (
                                                <TableRow key={index} sx={{ textAlign: 'center' }}>
                                                    <TableCell
                                                        sx={{
                                                            textAlign: 'start',
                                                            fontSize: '14px',
                                                            fontWeight: '500',
                                                            borderRight: '1px solid #ddd',
                                                        }}
                                                    >
                                                        {key}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{
                                                            textAlign: 'start',
                                                            fontSize: '14px',
                                                            fontWeight: '500',
                                                            borderRight: '1px solid #ddd',
                                                        }}
                                                    >
                                                        {data?.reason || '-'}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{
                                                            textAlign: 'start',
                                                            fontSize: '14px',
                                                            fontWeight: '500',
                                                        }}
                                                    >
                                                        {data?.score || '-'}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}

                                    <TableRow sx={{ backgroundColor: '#f9f9f9' }}>
                                        <TableCell
                                            colSpan={2}
                                            sx={{
                                                textAlign: 'start',
                                                fontSize: '14px',
                                                fontWeight: '600',
                                                borderRight: '1px solid #ddd',
                                            }}
                                        >
                                            Overall Score
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                textAlign: 'start',
                                                fontSize: '14px',
                                                fontWeight: '600',
                                            }}
                                        >
                                            {selectedData[0]?.check_history[0]?.text?.granularity_report?.score || '-'}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>

                            </Table>
                        </TableContainer>


                    </Box>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: '20px' }}>
                    <Box sx={{ width: '100%' }}>

                        <ul style={{ marginLeft: '40px' }}>

                            <li>
                                {!viewMore ? <Typography sx={{ fontSize: '14px', color: '#000', fontWeight: '500', mb: '10px' }}>{selectedData[0]?.check_history[0]?.text?.final_report.reason} <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => setViewMore(true)}>View more...</span></Typography> : <Typography sx={{ fontSize: '14px', color: '#656565', fontWeight: '500', mb: '10px' }}>{selectedData[0]?.check_history[0]?.text?.final_report.reason} <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => setViewMore(false)}>View less...</span></Typography>}

                            </li>
                        </ul>

                    </Box>

                </Box>
                {viewMore ?
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: '10px' }}>
                        <Box sx={{ width: '90%' }}>

                            <Typography sx={{ fontSize: '15px', color: '#656565', fontWeight: '500', mb: '10px' }}>
                                <Markdown
                                    options={{
                                        overrides: {
                                            ul: {
                                                props: {
                                                    style: {
                                                        paddingLeft: 35
                                                    },
                                                },
                                            },
                                            p: {
                                                props: {
                                                    style: {
                                                        margin: '0.5em 0',
                                                    },
                                                },
                                            },
                                        },
                                    }}
                                    style={{
                                        color: '#656565',
                                        fontSize: '15px',
                                        fontFamily: 'sans-serif',
                                        marginLeft: '10px',
                                    }}
                                >
                                    {selectedData[0]?.check_history[0]?.text?.final_report.report}
                                </Markdown>

                            </Typography>

                        </Box>

                    </Box> : ''}

            </Sidebar >

        </>
    )
}

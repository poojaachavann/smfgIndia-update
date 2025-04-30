import React from 'react'
import Sidebar from '../../../Component/Sidebar'
import { Accordion, Box, Pagination, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import axios from 'axios';
import API from '../../../Component/BaseURL';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';


export default function CostAnalysis() {


    const url = window.location.href
    const mainUrl = url.split('/')


    const [userLoginData, setUserLoginData] = useState('')
    const userDataOfLogin = localStorage.getItem('userData')
    useEffect(() => {
        if (userDataOfLogin) {
            setUserLoginData(JSON.parse(userDataOfLogin))
        }
    }, [])

    const [formFillData, setFormFillData] = useState([])
    const [currentPage_1, setCurrentPage_1] = useState(1);

    const itemsPerPage = 5;


    const loanAppFormFillData = async () => {
        try {
            const response = await axios.get(API.loanAppformDataFetch)
            console.log('response', response.data?.loanAppformData);

            const filteredData = response.data?.loanAppformData.filter(item => {
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


    const [expandedRow, setExpandedRow] = useState(null);

    const handleAccordionToggles = (id) => {
        setExpandedRow((prev) => (prev === id ? null : id));
    };


    return (
        <>
            <Sidebar title={'Consumption Cost Analysis'}>


                {paginatedData.length === 0 ?
                    <Box mt={'50px'}>
                        <Typography sx={{ fontSize: '16px', color: 'red', fontWeight: '600', mb: '40px', textAlign: 'center' }}>No data found</Typography>
                    </Box>
                    :

                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: "20px" }}>
                        <Box sx={{ width: '90%', borderRadius: '8px', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px;' }}>
                            <TableContainer sx={{ overflowY: 'auto', height: '70vh', scrollbarWidth: 'none' }}>
                                <Table>
                                    <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                                        <TableRow>
                                            <TableCell sx={{ textAlign: 'start', fontSize: '14px', fontWeight: '600', color: '#656565', borderRight: '1px solid #ddd' }}>Name</TableCell>
                                            <TableCell sx={{ textAlign: 'start', fontSize: '14px', fontWeight: '600', color: '#656565', borderRight: '1px solid #ddd' }}>Mobile Number</TableCell>
                                            <TableCell sx={{ textAlign: 'start', fontSize: '14px', fontWeight: '600', color: '#656565', borderRight: '1px solid #ddd' }}>Gender</TableCell>
                                            <TableCell sx={{ textAlign: 'start', fontSize: '14px', fontWeight: '600', color: '#656565', borderRight: '1px solid #ddd' }}>Bank Statement</TableCell>
                                            <TableCell sx={{ textAlign: 'start', fontSize: '14px', fontWeight: '600', color: '#656565', borderRight: '1px solid #ddd' }}>OverAll Cost</TableCell>
                                            <TableCell sx={{ fontWeight: '600' }}></TableCell>
                                        </TableRow>
                                    </TableHead>


                                    <TableBody >
                                        <>
                                            {paginatedData &&
                                                paginatedData.map((item, index) => (
                                                    <>
                                                        <TableRow key={item._id}>
                                                            <TableCell sx={{ textAlign: 'start', fontSize: '13px', fontWeight: '500', borderRight: '1px solid #ddd' }}>{item.name}</TableCell>
                                                            <TableCell sx={{ textAlign: 'start', fontSize: '13px', fontWeight: '500', borderRight: '1px solid #ddd' }}>{item.mobile}</TableCell>
                                                            <TableCell sx={{ textAlign: 'start', fontSize: '13px', fontWeight: '500', borderRight: '1px solid #ddd' }}>{item.gender}</TableCell>
                                                            <TableCell sx={{ textAlign: 'start', fontSize: '13px', fontWeight: '500', borderRight: '1px solid #ddd' }}>
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
                                                            <TableCell sx={{ textAlign: 'start', fontSize: '13px', fontWeight: '600', borderRight: '1px solid #ddd', color: "green" }}>$ {
                                                                (
                                                                    (parseFloat(item.check_history[0]?.text?.usage_image_extraction?.usage?.pricing.total_cost) || 0) +
                                                                    (parseFloat(item.check_history[0]?.text?.usage_demographic_report?.usage?.pricing.total_cost) || 0) +
                                                                    (parseFloat(item.check_history[0]?.text?.usage_spent_pattern_report?.usage?.pricing.total_cost) || 0) +
                                                                    (parseFloat(item.check_history[0]?.text?.usage_income_regularity_and_quantum_report?.usage?.pricing.total_cost) || 0) +
                                                                    (parseFloat(item.check_history[0]?.text?.usage_granularity_report?.usage?.pricing.total_cost) || 0) +
                                                                    (parseFloat(item.check_history[0]?.text?.usage_transaction_pattern_report?.usage?.pricing.total_cost) || 0) +
                                                                    (parseFloat(item.check_history[0]?.text?.usage_final_report?.usage?.pricing.total_cost) || 0)
                                                                ).toFixed(3)
                                                            }
                                                            </TableCell>
                                                            <TableCell sx={{ fontSize: '13px', cursor: 'pointer' }} onClick={() => handleAccordionToggles(item._id)}>
                                                                <Stack direction={'row'} justifyContent={'center'}>
                                                                    <Typography sx={{ textAlign: 'start', fontSize: '13px', fontWeight: '500' }}>More</Typography>
                                                                    {expandedRow === item._id ? (
                                                                        <KeyboardArrowDownOutlinedIcon sx={{ fontSize: '20px', color: '#656565' }} />
                                                                    ) : (
                                                                        <ChevronRightOutlinedIcon sx={{ fontSize: '20px', color: '#656565' }} />
                                                                    )}
                                                                </Stack>
                                                            </TableCell>
                                                        </TableRow >

                                                        <TableRow>
                                                            <TableCell colSpan={7} sx={{ padding: '0' }}>
                                                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                                                    {expandedRow === item._id && (
                                                                        <Accordion expanded={expandedRow === item._id} onChange={() => handleAccordionToggles(item._id)} sx={{ width: '100%' }}>
                                                                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                                                                <TableContainer>
                                                                                    <Box sx={{ overflowY: 'auto', height: '57vh', scrollbarWidth: 'none' }}>
                                                                                        <Table>
                                                                                            <TableHead sx={{ bgcolor: 'transparent' }}>
                                                                                                <TableRow>
                                                                                                    <TableCell sx={{ textAlign: 'start', fontSize: '14px', fontWeight: '600', color: '#656565' }}>Task</TableCell>
                                                                                                    <TableCell sx={{ textAlign: 'start', fontSize: '14px', fontWeight: '600', color: '#656565' }}>Input Token</TableCell>
                                                                                                    <TableCell sx={{ textAlign: 'start', fontSize: '14px', fontWeight: '600', color: '#656565' }}>Output Token</TableCell>
                                                                                                    <TableCell sx={{ textAlign: 'start', fontSize: '14px', fontWeight: '600', color: '#656565' }}>Cost</TableCell>
                                                                                                </TableRow>
                                                                                            </TableHead>
                                                                                            <TableBody sx={{ bgcolor: 'transparent' }}>
                                                                                                {item.check_history && item.check_history[0] && (
                                                                                                    <>
                                                                                                        <TableRow>
                                                                                                            <TableCell sx={{ fontSize: '13px', color: "#656565" }}>Image Extraction</TableCell>
                                                                                                            <TableCell sx={{ fontSize: '13px', color: "#656565" }}>{item.check_history[0]?.text?.usage_image_extraction?.usage?.pricing.prompt_tokens}</TableCell>
                                                                                                            <TableCell sx={{ fontSize: '13px', color: "#656565" }}>{item.check_history[0]?.text?.usage_image_extraction?.usage?.pricing.completion_tokens}</TableCell>
                                                                                                            <TableCell sx={{ fontSize: '13px', color: "green" }}>$ {parseFloat(item.check_history[0]?.text?.usage_image_extraction?.usage?.pricing.total_cost).toFixed(3)}</TableCell>
                                                                                                        </TableRow>
                                                                                                        <TableRow>
                                                                                                            <TableCell sx={{ fontSize: '13px', color: "#656565" }}>Demographic Verification</TableCell>
                                                                                                            <TableCell sx={{ fontSize: '13px', color: "#656565" }}>{item.check_history[0]?.text?.usage_demographic_report?.usage?.pricing.prompt_tokens}</TableCell>
                                                                                                            <TableCell sx={{ fontSize: '13px', color: "#656565" }}>{item.check_history[0]?.text?.usage_demographic_report?.usage?.pricing.completion_tokens}</TableCell>
                                                                                                            <TableCell sx={{ fontSize: '13px', color: "green" }}>$ {parseFloat(item.check_history[0]?.text?.usage_demographic_report?.usage?.pricing.total_cost).toFixed(3)}

                                                                                                            </TableCell>

                                                                                                        </TableRow>
                                                                                                        <TableRow >
                                                                                                            <TableCell sx={{ fontSize: '13px', color: "#656565" }}>{'Spent pattern Analysis'}</TableCell>
                                                                                                            <TableCell sx={{ fontSize: '13px', color: "#656565" }}>{item.check_history[0]?.text?.usage_spent_pattern_report?.usage?.pricing.prompt_tokens}</TableCell>
                                                                                                            <TableCell sx={{ fontSize: '13px', color: "#656565" }}>{item.check_history[0]?.text?.usage_spent_pattern_report?.usage?.pricing.completion_tokens}</TableCell>
                                                                                                            <TableCell sx={{ fontSize: '13px', color: "green" }}>$ {parseFloat(item.check_history[0]?.text?.usage_spent_pattern_report?.usage?.pricing.total_cost).toFixed(3)}</TableCell>
                                                                                                        </TableRow>

                                                                                                        <TableRow >
                                                                                                            <TableCell sx={{ fontSize: '13px', color: "#656565" }}>{'Income regularity and quantum analsys'}</TableCell>
                                                                                                            <TableCell sx={{ fontSize: '13px', color: "#656565" }}>{item.check_history[0]?.text?.usage_income_regularity_and_quantum_report?.usage?.pricing.prompt_tokens}</TableCell>
                                                                                                            <TableCell sx={{ fontSize: '13px', color: "#656565" }}>{item.check_history[0]?.text?.usage_income_regularity_and_quantum_report?.usage?.pricing.completion_tokens}</TableCell>
                                                                                                            <TableCell sx={{ fontSize: '13px', color: "green" }}>$ {parseFloat(item.check_history[0]?.text?.usage_income_regularity_and_quantum_report?.usage?.pricing.total_cost).toFixed(3)}</TableCell>
                                                                                                        </TableRow>

                                                                                                        <TableRow >
                                                                                                            <TableCell sx={{ fontSize: '13px', color: "#656565" }}>{'Granuliarty analsis'}</TableCell>
                                                                                                            <TableCell sx={{ fontSize: '13px', color: "#656565" }}>{item.check_history[0]?.text?.usage_granularity_report?.usage?.pricing.prompt_tokens}</TableCell>
                                                                                                            <TableCell sx={{ fontSize: '13px', color: "#656565" }}>{item.check_history[0]?.text?.usage_granularity_report?.usage?.pricing.completion_tokens}</TableCell>
                                                                                                            <TableCell sx={{ fontSize: '13px', color: "green" }}>$ {parseFloat(item.check_history[0]?.text?.usage_granularity_report?.usage?.pricing.total_cost).toFixed(3)}</TableCell>
                                                                                                        </TableRow>

                                                                                                        <TableRow >
                                                                                                            <TableCell sx={{ fontSize: '13px', color: "#656565" }}>{'Transaction Pattern Analysis'}</TableCell>
                                                                                                            <TableCell sx={{ fontSize: '13px', color: "#656565" }}>{item.check_history[0]?.text?.usage_transaction_pattern_report?.usage?.pricing.prompt_tokens}</TableCell>
                                                                                                            <TableCell sx={{ fontSize: '13px', color: "#656565" }}>{item.check_history[0]?.text?.usage_transaction_pattern_report?.usage?.pricing.completion_tokens}</TableCell>
                                                                                                            <TableCell sx={{ fontSize: '13px', color: "green" }}>$ {parseFloat(item.check_history[0]?.text?.usage_transaction_pattern_report?.usage?.pricing.total_cost).toFixed(3)}</TableCell>
                                                                                                        </TableRow>

                                                                                                        <TableRow >
                                                                                                            <TableCell sx={{ fontSize: '13px', color: "#656565" }}>{'Final Report'}</TableCell>
                                                                                                            <TableCell sx={{ fontSize: '13px', color: "#656565" }}>{item.check_history[0]?.text?.usage_final_report?.usage?.pricing.prompt_tokens}</TableCell>
                                                                                                            <TableCell sx={{ fontSize: '13px', color: "#656565" }}>{item.check_history[0]?.text?.usage_final_report?.usage?.pricing.completion_tokens}</TableCell>
                                                                                                            <TableCell sx={{ fontSize: '13px', color: "green" }}>$ {parseFloat(item.check_history[0]?.text?.usage_final_report?.usage?.pricing.total_cost).toFixed(3)}</TableCell>
                                                                                                        </TableRow>
                                                                                                    </>
                                                                                                )}
                                                                                            </TableBody>
                                                                                        </Table>
                                                                                    </Box>
                                                                                </TableContainer>
                                                                            </Box>
                                                                        </Accordion>
                                                                    )}
                                                                </Box>
                                                            </TableCell>
                                                        </TableRow>
                                                    </>
                                                ))}
                                        </>
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
                                                        color: '#fff',
                                                    },
                                                },
                                            }}
                                        />
                                    </Box>
                                }
                            </TableContainer>

                        </Box>
                    </Box>
                }


            </Sidebar >

        </>
    )
}

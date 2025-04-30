import { Box, Typography } from '@mui/material'
import Sidebar from '../../../Component/Sidebar'
import { useEffect, useState } from 'react'
import axios from 'axios'
import API from '../../../Component/BaseURL'
import Markdown from 'react-markdown'
import React from 'react';

export default function Granularityoftransaction() {

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

    console.log('selectedData', selectedData[0]?.check_history[0]?.text?.granularity_report)

    return (
        <>
            <Sidebar title={'Transaction Frequency And Size Details'}>


                <Typography sx={{ fontSize: '14px', color: '#656565', fontWeight: '600', textAlign: 'end', mr: '20px', mt: '20px' }}>Total Score: {selectedData[0]?.check_history[0]?.text?.granularity_report?.score || 0}</Typography>


                <Box sx={{ display: 'flex', justifyContent: 'center', mt: '10px' }}>

                    <Box >
                        <Box sx={{
                            width: '90%', bgcolor: '#fff', borderRadius: '10px', boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px;", p: 2, borderLeft: `7px solid ${selectedData[0]?.check_history[0]?.text?.granularity_report?.credit?.score >= 4 && selectedData[0]?.check_history[0]?.text?.granularity_report?.credit?.score <= 7 ? '#f0ad4e' : selectedData[0]?.check_history[0]?.text?.granularity_report?.credit?.score >= 8 && selectedData[0]?.check_history[0]?.text?.granularity_report?.credit?.score <= 10 ? 'green' : selectedData[0]?.check_history[0]?.text?.granularity_report?.credit?.score >= 1 && selectedData[0]?.check_history[0]?.text?.granularity_report?.credit?.score <= 3 ? 'red' : ''}`,
                            mb: "20px"
                        }}>
                            <Typography sx={{ fontSize: '18px', color: '#000', fontWeight: '600', mb: '20px', ml: "40px" }}>
                                Credit Details
                            </Typography>
                            <ul style={{ marginLeft: '40px' }}>
                                <li>
                                    <Typography sx={{ fontSize: '14px', color: '#000', fontWeight: '500', mb: '10px' }}>
                                        <strong>Transaction Frequency:</strong> {selectedData[0]?.check_history[0]?.text?.granularity_report?.credit?.transaction_frequency}
                                    </Typography>
                                </li>
                                <li>
                                    <Typography sx={{ fontSize: '14px', color: '#000', fontWeight: '500', mb: '10px' }}>
                                        <strong>Size of Transactions:</strong> {selectedData[0]?.check_history[0]?.text?.granularity_report?.credit?.size_of_transactions}
                                    </Typography>
                                </li>
                                <li>
                                    <Typography sx={{ fontSize: '14px', color: '#000', fontWeight: '500', mb: '10px' }}>
                                        <strong>Reason:</strong> <Markdown>{selectedData[0]?.check_history[0]?.text?.granularity_report?.credit?.reason}</Markdown>
                                    </Typography>
                                </li>
                                <li>
                                    <Typography sx={{ fontSize: '14px', color: '#000', fontWeight: '500', mb: '10px' }}>
                                        <strong>Score:</strong> {selectedData[0]?.check_history[0]?.text?.granularity_report?.credit?.score} / 10
                                    </Typography>
                                </li>
                            </ul>
                        </Box>


                        <Box sx={{
                            width: '90%', bgcolor: '#fff', borderRadius: '10px', boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px;", p: 2, borderLeft: `7px solid ${selectedData[0]?.check_history[0]?.text?.granularity_report?.debit
                                ?.score >= 4 && selectedData[0]?.check_history[0]?.text?.granularity_report?.debit
                                    ?.score <= 7 ? '#f0ad4e' : selectedData[0]?.check_history[0]?.text?.granularity_report?.debit
                                        ?.score >= 8 && selectedData[0]?.check_history[0]?.text?.granularity_report?.debit
                                            ?.score <= 10 ? 'green' : selectedData[0]?.check_history[0]?.text?.granularity_report?.debit
                                                ?.score >= 1 && selectedData[0]?.check_history[0]?.text?.granularity_report?.debit
                                                    ?.score <= 3 ? 'red' : ''}`
                        }}>
                            <Typography sx={{ fontSize: '18px', color: '#000', fontWeight: '600', mb: '20px', ml: "40px" }}>
                                Debit Details
                            </Typography>
                            <ul style={{ marginLeft: '40px' }}>
                                <li>
                                    <Typography sx={{ fontSize: '14px', color: '#000', fontWeight: '500', mb: '10px' }}>
                                        <strong>Transaction Frequency:</strong> {selectedData[0]?.check_history[0]?.text?.granularity_report?.debit
                                            ?.transaction_frequency}
                                    </Typography>
                                </li>
                                <li>
                                    <Typography sx={{ fontSize: '14px', color: '#000', fontWeight: '500', mb: '10px' }}>
                                        <strong>Size of Transactions:</strong> {selectedData[0]?.check_history[0]?.text?.granularity_report?.debit
                                            ?.size_of_transactions}
                                    </Typography>
                                </li>
                                <li>
                                    <Typography sx={{ fontSize: '14px', color: '#000', fontWeight: '500', mb: '10px' }}>
                                        <strong>Reason:</strong> <Markdown>{selectedData[0]?.check_history[0]?.text?.granularity_report?.debit
                                            ?.reason}</Markdown>
                                    </Typography>
                                </li>
                                <li>
                                    <Typography sx={{ fontSize: '14px', color: '#000', fontWeight: '500', mb: '10px' }}>
                                        <strong>Score:</strong> {selectedData[0]?.check_history[0]?.text?.granularity_report?.debit
                                            ?.score} / 10
                                    </Typography>
                                </li>
                            </ul>
                        </Box>
                    </Box>
                </Box>

            </Sidebar >
        </>
    )
}

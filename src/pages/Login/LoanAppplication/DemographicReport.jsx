import { Box, Stack, Typography } from '@mui/material'
import Sidebar from '../../../Component/Sidebar'
import { useEffect, useState } from 'react'
import axios from 'axios'
import API from '../../../Component/BaseURL'
import React from 'react';



export default function DemographicReport() {


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

    console.log('selectedData', selectedData[0]?.check_history[0]?.text?.demographic_report)

    return (
        <>
            <Sidebar title={'Demographic Variables Analysis'}>


                <Typography sx={{ fontSize: '14px', color: '#656565', fontWeight: '600', textAlign: 'end', mr: '20px', mt: '20px' }}>Total Score: {selectedData[0]?.check_history[0]?.text?.demographic_report?.score}</Typography>

                <Stack direction={'row'} justifyContent={'space-evenly'} mt={'20px'} spacing={1.5}>

                    <Box sx={{
                        width: '30%', bgcolor: '#fff', borderRadius: '10px', boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px;", p: 2, borderLeft: `7px solid ${selectedData[0]?.check_history[0]?.text?.demographic_report?.name.score >= 4 && selectedData[0]?.check_history[0]?.text?.demographic_report?.name.score <= 7 ? '#f0ad4e' : selectedData[0]?.check_history[0]?.text?.demographic_report?.name.score >= 8 && selectedData[0]?.check_history[0]?.text?.demographic_report?.name.score <= 10 ? 'green' : selectedData[0]?.check_history[0]?.text?.demographic_report?.name.score >= 0 && selectedData[0]?.check_history[0]?.text?.demographic_report?.name.score <= 3 ? 'red' : ''}`
                    }}>
                        <Typography sx={{ fontSize: '18px', color: '#000', fontWeight: '600' }}>
                            Name
                        </Typography>
                        <Box sx={{ border: '1px solid #aaa', mt: '10px' }} />
                        <ul style={{ padding: '10px' }}>
                            <li>
                                <Typography sx={{ fontSize: '14px', color: '#000', fontWeight: '500', mb: '10px' }}>
                                    <strong>Reason: </strong> {selectedData[0]?.check_history[0]?.text?.demographic_report?.name.reason}
                                </Typography>
                            </li>

                            <li>
                                <Typography sx={{ fontSize: '14px', color: '#000', fontWeight: '500' }}>
                                    <strong>score:</strong> {selectedData[0]?.check_history[0]?.text?.demographic_report?.name.score} / 10
                                </Typography>
                            </li>
                        </ul>
                    </Box>

                    <Box sx={{ width: '30%', bgcolor: '#fff', borderRadius: '10px', boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px;", p: 2, borderLeft: `7px solid ${selectedData[0]?.check_history[0]?.text?.demographic_report?.mobile.score >= 4 && selectedData[0]?.check_history[0]?.text?.demographic_report?.mobile.score <= 7 ? '#f0ad4e' : selectedData[0]?.check_history[0]?.text?.demographic_report?.mobile.score >= 8 && selectedData[0]?.check_history[0]?.text?.demographic_report?.mobile.score <= 10 ? 'green' : selectedData[0]?.check_history[0]?.text?.demographic_report?.mobile.score >= 0 && selectedData[0]?.check_history[0]?.text?.demographic_report?.mobile.score <= 3 ? 'red' : ''}` }}>
                        <Typography sx={{ fontSize: '18px', color: '#000', fontWeight: '600' }}>
                            Mobile
                        </Typography>
                        <Box sx={{ border: '1px solid #aaa', mt: '10px' }} />

                        <ul style={{ padding: '10px' }}>

                            <li>
                                <Typography sx={{ fontSize: '14px', color: '#000', fontWeight: '500', mb: '10px' }}>
                                    <strong>Reason: </strong> {selectedData[0]?.check_history[0]?.text?.demographic_report?.mobile.reason}
                                </Typography>
                            </li>

                            <li>
                                <Typography sx={{ fontSize: '14px', color: '#000', fontWeight: '500' }}>
                                    <strong>score:</strong> {selectedData[0]?.check_history[0]?.text?.demographic_report?.mobile.score} / 10
                                </Typography>
                            </li>
                        </ul>
                    </Box>


                    <Box sx={{ width: '30%', bgcolor: '#fff', borderRadius: '10px', boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px;", p: 2, borderLeft: `7px solid ${selectedData[0]?.check_history[0]?.text?.demographic_report?.email_id.score >= 4 && selectedData[0]?.check_history[0]?.text?.demographic_report?.email_id.score <= 7 ? '#f0ad4e' : selectedData[0]?.check_history[0]?.text?.demographic_report?.email_id.score >= 8 && selectedData[0]?.check_history[0]?.text?.demographic_report?.email_id.score <= 10 ? 'green' : selectedData[0]?.check_history[0]?.text?.demographic_report?.email_id.score >= 0 && selectedData[0]?.check_history[0]?.text?.demographic_report?.email_id.score <= 3 ? 'red' : ''}` }}>
                        <Typography sx={{ fontSize: '18px', color: '#000', fontWeight: '600' }}>
                            Email id
                        </Typography>
                        <Box sx={{ border: '1px solid #aaa', mt: '10px' }} />

                        <ul style={{ padding: '10px' }}>

                            <li>
                                <Typography sx={{ fontSize: '14px', color: '#000', fontWeight: '500', mb: '10px' }}>
                                    <strong>Reason: </strong> {selectedData[0]?.check_history[0]?.text?.demographic_report?.email_id.reason}
                                </Typography>
                            </li>

                            <li>
                                <Typography sx={{ fontSize: '14px', color: '#000', fontWeight: '500' }}>
                                    <strong>score:</strong> {selectedData[0]?.check_history[0]?.text?.demographic_report?.email_id.score} / 10
                                </Typography>
                            </li>
                        </ul>
                    </Box>

                </Stack>
                <Stack direction={'row'} justifyContent={'space-evenly'} mt={'20px'} spacing={1.5}>
                    <Box sx={{ width: '30%', bgcolor: '#fff', borderRadius: '10px', boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px;", p: 2, borderLeft: `7px solid ${selectedData[0]?.check_history[0]?.text?.demographic_report?.gender.score >= 4 && selectedData[0]?.check_history[0]?.text?.demographic_report?.gender.score <= 7 ? '#f0ad4e' : selectedData[0]?.check_history[0]?.text?.demographic_report?.gender.score >= 8 && selectedData[0]?.check_history[0]?.text?.demographic_report?.gender.score <= 10 ? 'green' : selectedData[0]?.check_history[0]?.text?.demographic_report?.gender.score >= 0 && selectedData[0]?.check_history[0]?.text?.demographic_report?.gender.score <= 3 ? 'red' : ''}` }}>
                        <Typography sx={{ fontSize: '18px', color: '#000', fontWeight: '600' }}>
                            Gender
                        </Typography>
                        <Box sx={{ border: '1px solid #aaa', mt: '10px' }} />

                        <ul style={{ padding: '10px' }}>

                            <li>
                                <Typography sx={{ fontSize: '14px', color: '#000', fontWeight: '500', mb: '10px' }}>
                                    <strong>Reason: </strong> {selectedData[0]?.check_history[0]?.text?.demographic_report?.gender.reason}
                                </Typography>
                            </li>

                            <li>
                                <Typography sx={{ fontSize: '14px', color: '#000', fontWeight: '500' }}>
                                    <strong>score:</strong> {selectedData[0]?.check_history[0]?.text?.demographic_report?.gender.score} / 10
                                </Typography>
                            </li>
                        </ul>
                    </Box>




                    <Box sx={{ width: '30%', bgcolor: '#fff', borderRadius: '10px', boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px;", p: 2, borderLeft: `7px solid ${selectedData[0]?.check_history[0]?.text?.demographic_report?.date_of_birth.score >= 4 && selectedData[0]?.check_history[0]?.text?.demographic_report?.date_of_birth.score <= 7 ? '#f0ad4e' : selectedData[0]?.check_history[0]?.text?.demographic_report?.date_of_birth.score >= 8 && selectedData[0]?.check_history[0]?.text?.demographic_report?.date_of_birth.score <= 10 ? 'green' : selectedData[0]?.check_history[0]?.text?.demographic_report?.date_of_birth.score >= 0 && selectedData[0]?.check_history[0]?.text?.demographic_report?.date_of_birth.score <= 3 ? 'red' : ''}` }}>
                        <Typography sx={{ fontSize: '18px', color: '#000', fontWeight: '600' }}>
                            Date of Birth
                        </Typography>
                        <Box sx={{ border: '1px solid #aaa', mt: '10px' }} />

                        <ul style={{ padding: '10px' }}>

                            <li>
                                <Typography sx={{ fontSize: '14px', color: '#000', fontWeight: '500', mb: '10px' }}>
                                    <strong>Reason: </strong> {selectedData[0]?.check_history[0]?.text?.demographic_report?.date_of_birth.reason}
                                </Typography>
                            </li>

                            <li>
                                <Typography sx={{ fontSize: '14px', color: '#000', fontWeight: '500' }}>
                                    <strong>score:</strong> {selectedData[0]?.check_history[0]?.text?.demographic_report?.date_of_birth.score} / 10
                                </Typography>
                            </li>
                        </ul>
                    </Box>




                    <Box sx={{ width: '30%', bgcolor: '#fff', borderRadius: '10px', boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px;", p: 2, borderLeft: `7px solid ${selectedData[0]?.check_history[0]?.text?.demographic_report?.marital_status.score >= 4 && selectedData[0]?.check_history[0]?.text?.demographic_report?.marital_status.score <= 7 ? '#f0ad4e' : selectedData[0]?.check_history[0]?.text?.demographic_report?.marital_status.score >= 8 && selectedData[0]?.check_history[0]?.text?.demographic_report?.marital_status.score <= 10 ? 'green' : selectedData[0]?.check_history[0]?.text?.demographic_report?.marital_status.score >= 0 && selectedData[0]?.check_history[0]?.text?.demographic_report?.marital_status.score <= 3 ? 'red' : ''}` }}>
                        <Typography sx={{ fontSize: '18px', color: '#000', fontWeight: '600' }}>
                            Marital Status
                        </Typography>
                        <Box sx={{ border: '1px solid #aaa', mt: '10px' }} />

                        <ul style={{ padding: '10px' }}>

                            <li>
                                <Typography sx={{ fontSize: '14px', color: '#000', fontWeight: '500', mb: '10px' }}>
                                    <strong>Reason: </strong> {selectedData[0]?.check_history[0]?.text?.demographic_report?.marital_status.reason}
                                </Typography>
                            </li>

                            <li>
                                <Typography sx={{ fontSize: '14px', color: '#000', fontWeight: '500' }}>
                                    <strong>score:</strong> {selectedData[0]?.check_history[0]?.text?.demographic_report?.marital_status.score} / 10
                                </Typography>
                            </li>
                        </ul>
                    </Box>

                </Stack>
                <Stack direction={'row'} justifyContent={'space-evenly'} mt={'20px'} spacing={1.5}>
                    <Box sx={{ width: '30%', bgcolor: '#fff', borderRadius: '10px', boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px;", p: 2, borderLeft: `7px solid ${selectedData[0]?.check_history[0]?.text?.demographic_report?.employment_status.score >= 4 && selectedData[0]?.check_history[0]?.text?.demographic_report?.employment_status.score <= 7 ? '#f0ad4e' : selectedData[0]?.check_history[0]?.text?.demographic_report?.employment_status.score >= 8 && selectedData[0]?.check_history[0]?.text?.demographic_report?.employment_status.score <= 10 ? 'green' : selectedData[0]?.check_history[0]?.text?.demographic_report?.employment_status.score >= 0 && selectedData[0]?.check_history[0]?.text?.demographic_report?.employment_status.score <= 3 ? 'red' : ''}` }}>
                        <Typography sx={{ fontSize: '18px', color: '#000', fontWeight: '600' }}>
                            Employment Status
                        </Typography>

                        <Box sx={{ border: '1px solid #aaa', mt: '10px' }} />


                        <ul style={{ padding: '10px' }}>

                            <li>
                                <Typography sx={{ fontSize: '14px', color: '#000', fontWeight: '500', mb: '10px' }}>
                                    <strong>Reason: </strong> {selectedData[0]?.check_history[0]?.text?.demographic_report?.employment_status.reason}
                                </Typography>
                            </li>

                            <li>
                                <Typography sx={{ fontSize: '14px', color: '#000', fontWeight: '500' }}>
                                    <strong>score:</strong> {selectedData[0]?.check_history[0]?.text?.demographic_report?.employment_status.score} / 10
                                </Typography>
                            </li>
                        </ul>
                    </Box>
                    <Box sx={{ width: '30%', bgcolor: '#fff', borderRadius: '10px', boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px;", p: 2, borderLeft: `7px solid ${selectedData[0]?.check_history[0]?.text?.demographic_report?.aadhar_card.score >= 4 && selectedData[0]?.check_history[0]?.text?.demographic_report?.aadhar_card.score <= 7 ? '#f0ad4e' : selectedData[0]?.check_history[0]?.text?.demographic_report?.aadhar_card.score >= 8 && selectedData[0]?.check_history[0]?.text?.demographic_report?.aadhar_card.score <= 10 ? 'green' : selectedData[0]?.check_history[0]?.text?.demographic_report?.aadhar_card.score >= 0 && selectedData[0]?.check_history[0]?.text?.demographic_report?.aadhar_card.score <= 3 ? 'red' : ''}` }}>
                        <Typography sx={{ fontSize: '18px', color: '#000', fontWeight: '600' }}>
                            Aadhar Card
                        </Typography>

                        <Box sx={{ border: '1px solid #aaa', mt: '10px' }} />


                        <ul style={{ padding: '10px' }}>

                            <li>
                                <Typography sx={{ fontSize: '14px', color: '#000', fontWeight: '500', mb: '10px' }}>
                                    <strong>Reason: </strong> {selectedData[0]?.check_history[0]?.text?.demographic_report?.aadhar_card.reason}
                                </Typography>
                            </li>

                            <li>
                                <Typography sx={{ fontSize: '14px', color: '#000', fontWeight: '500' }}>
                                    <strong>score:</strong> {selectedData[0]?.check_history[0]?.text?.demographic_report?.aadhar_card.score} / 10
                                </Typography>
                            </li>
                        </ul>
                    </Box>
                    <Box sx={{ width: '30%', bgcolor: '#fff', borderRadius: '10px', boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px;", p: 2, borderLeft: `7px solid ${selectedData[0]?.check_history[0]?.text?.demographic_report?.pan_card.score >= 4 && selectedData[0]?.check_history[0]?.text?.demographic_report?.pan_card.score <= 7 ? '#f0ad4e' : selectedData[0]?.check_history[0]?.text?.demographic_report?.pan_card.score >= 8 && selectedData[0]?.check_history[0]?.text?.demographic_report?.pan_card.score <= 10 ? 'green' : selectedData[0]?.check_history[0]?.text?.demographic_report?.pan_card.score >= 0 && selectedData[0]?.check_history[0]?.text?.demographic_report?.pan_card.score <= 3 ? 'red' : ''}` }}>
                        <Typography sx={{ fontSize: '18px', color: '#000', fontWeight: '600' }}>
                            PAN Card
                        </Typography>

                        <Box sx={{ border: '1px solid #aaa', mt: '10px' }} />


                        <ul style={{ padding: '10px' }}>

                            <li>
                                <Typography sx={{ fontSize: '14px', color: '#000', fontWeight: '500', mb: '10px' }}>
                                    <strong>Reason: </strong> {selectedData[0]?.check_history[0]?.text?.demographic_report?.pan_card.reason}
                                </Typography>
                            </li>

                            <li>
                                <Typography sx={{ fontSize: '14px', color: '#000', fontWeight: '500' }}>
                                    <strong>score:</strong> {selectedData[0]?.check_history[0]?.text?.demographic_report?.pan_card.score} / 10
                                </Typography>
                            </li>
                        </ul>
                    </Box>




                </Stack>

                <Typography sx={{ fontSize: '18px', color: '#656565', fontWeight: '600', mb: '20px', mt: "20px", textAlign: 'center' }}>Addresses</Typography>

                <Stack direction={'row'} justifyContent={'space-evenly'} mt={'20px'} spacing={1.5}>
                    <Box sx={{ width: '30%', bgcolor: '#fff', borderRadius: '10px', boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px;", p: 2, borderLeft: `7px solid ${selectedData[0]?.check_history[0]?.text?.demographic_report?.addresses[0]?.house_flat_building.score <= 7 ? '#f0ad4e' : selectedData[0]?.check_history[0]?.text?.demographic_report?.addresses[0]?.house_flat_building.score >= 8 && selectedData[0]?.check_history[0]?.text?.demographic_report?.addresses[0]?.house_flat_building.score <= 10 ? 'green' : selectedData[0]?.check_history[0]?.text?.demographic_report?.addresses[0]?.house_flat_building.score >= 0 && selectedData[0]?.check_history[0]?.text?.demographic_report?.addresses[0]?.house_flat_building.score <= 3 ? 'red' : ''}` }}>
                        <Typography sx={{ fontSize: '18px', color: '#000', fontWeight: '600' }}>
                            House / Flat / Building
                        </Typography>

                        <Box sx={{ border: '1px solid #aaa', mt: '10px' }} />

                        <ul style={{ padding: '10px' }}>

                            <li>
                                <Typography sx={{ fontSize: '14px', color: '#000', fontWeight: '500', mb: '10px' }}>
                                    <strong>Reason: </strong> {selectedData[0]?.check_history[0]?.text?.demographic_report?.addresses[0]?.house_flat_building.reason}
                                </Typography>
                            </li>

                            <li>
                                <Typography sx={{ fontSize: '14px', color: '#000', fontWeight: '500' }}>
                                    <strong>score:</strong> {selectedData[0]?.check_history[0]?.text?.demographic_report?.addresses[0]?.house_flat_building.score} / 10
                                </Typography>
                            </li>
                        </ul>
                    </Box>

                    <Box sx={{ width: '30%', bgcolor: '#fff', borderRadius: '10px', boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px;", p: 2, borderLeft: `7px solid ${selectedData[0]?.check_history[0]?.text?.demographic_report?.addresses[0]?.street_name.score >= 4 && selectedData[0]?.check_history[0]?.text?.demographic_report?.addresses[0]?.street_name.score <= 7 ? '#f0ad4e' : selectedData[0]?.check_history[0]?.text?.demographic_report?.addresses[0]?.street_name.score >= 8 && selectedData[0]?.check_history[0]?.text?.demographic_report?.addresses[0]?.street_name.score <= 10 ? 'green' : selectedData[0]?.check_history[0]?.text?.demographic_report?.addresses[0]?.street_name.score >= 1 && selectedData[0]?.check_history[0]?.text?.demographic_report?.addresses[0]?.street_name.score <= 3 ? 'red' : ''}` }}>

                        <Typography sx={{ fontSize: '18px', color: '#000', fontWeight: '600' }}>
                            Street Name
                        </Typography>
                        <Box sx={{ border: '1px solid #aaa', mt: '10px' }} />
                        <ul style={{ padding: '10px' }}>

                            <li>
                                <Typography sx={{ fontSize: '14px', color: '#000', fontWeight: '500', mb: '10px' }}>
                                    <strong>Reason: </strong> {selectedData[0]?.check_history[0]?.text?.demographic_report?.addresses[0]?.street_name.reason}
                                </Typography>
                            </li>

                            <li>
                                <Typography sx={{ fontSize: '14px', color: '#000', fontWeight: '500' }}>
                                    <strong>score:</strong> {selectedData[0]?.check_history[0]?.text?.demographic_report?.addresses[0]?.street_name.score} / 10
                                </Typography>
                            </li>
                        </ul>
                    </Box>




                    <Box sx={{ width: '30%', bgcolor: '#fff', borderRadius: '10px', boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px;", p: 2, borderLeft: `7px solid ${selectedData[0]?.check_history[0]?.text?.demographic_report?.addresses[0]?.locality_area.score >= 4 && selectedData[0]?.check_history[0]?.text?.demographic_report?.addresses[0]?.locality_area.score <= 7 ? '#f0ad4e' : selectedData[0]?.check_history[0]?.text?.demographic_report?.addresses[0]?.locality_area.score >= 8 && selectedData[0]?.check_history[0]?.text?.demographic_report?.addresses[0]?.locality_area.score <= 10 ? 'green' : selectedData[0]?.check_history[0]?.text?.demographic_report?.addresses[0]?.locality_area.score >= 1 && selectedData[0]?.check_history[0]?.text?.demographic_report?.addresses[0]?.locality_area.score <= 3 ? 'red' : ''}` }}>


                        <Typography sx={{ fontSize: '18px', color: '#000', fontWeight: '600' }}>
                            Locality Area
                        </Typography>
                        <Box sx={{ border: '1px solid #aaa', mt: '10px' }} />
                        <ul style={{ padding: '10px' }}>

                            <li>
                                <Typography sx={{ fontSize: '14px', color: '#000', fontWeight: '500', mb: '10px' }}>
                                    <strong>Reason: </strong> {selectedData[0]?.check_history[0]?.text?.demographic_report?.addresses[0]?.locality_area.reason}
                                </Typography>
                            </li>

                            <li>
                                <Typography sx={{ fontSize: '14px', color: '#000', fontWeight: '500' }}>
                                    <strong>score:</strong> {selectedData[0]?.check_history[0]?.text?.demographic_report?.addresses[0]?.locality_area.score} / 10
                                </Typography>
                            </li>
                        </ul>
                    </Box>

                </Stack>
                <Stack direction={'row'} justifyContent={'space-evenly'} mt={'20px'} spacing={1.5}>
                    <Box sx={{ width: '30%', bgcolor: '#fff', borderRadius: '10px', boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px;", p: 2, borderLeft: `7px solid ${selectedData[0]?.check_history[0]?.text?.demographic_report?.addresses[0]?.landmark.score >= 4 && selectedData[0]?.check_history[0]?.text?.demographic_report?.addresses[0]?.landmark.score <= 7 ? '#f0ad4e' : selectedData[0]?.check_history[0]?.text?.demographic_report?.addresses[0]?.landmark.score >= 8 && selectedData[0]?.check_history[0]?.text?.demographic_report?.addresses[0]?.landmark.score <= 10 ? 'green' : selectedData[0]?.check_history[0]?.text?.demographic_report?.addresses[0]?.landmark.score >= 1 && selectedData[0]?.check_history[0]?.text?.demographic_report?.addresses[0]?.landmark.score <= 3 ? 'red' : ''}` }}>

                        <Typography sx={{ fontSize: '18px', color: '#000', fontWeight: '600' }}>
                            Landmark
                        </Typography>
                        <Box sx={{ border: '1px solid #aaa', mt: '10px' }} />
                        <ul style={{ padding: '10px' }}>

                            <li>
                                <Typography sx={{ fontSize: '14px', color: '#000', fontWeight: '500', mb: '10px' }}>
                                    <strong>Reason: </strong> {selectedData[0]?.check_history[0]?.text?.demographic_report?.addresses[0]?.landmark.reason}
                                </Typography>
                            </li>

                            <li>
                                <Typography sx={{ fontSize: '14px', color: '#000', fontWeight: '500' }}>
                                    <strong>score:</strong> {selectedData[0]?.check_history[0]?.text?.demographic_report?.addresses[0]?.landmark.score} / 10
                                </Typography>
                            </li>
                        </ul>
                    </Box>




                    <Box sx={{ width: '30%', bgcolor: '#fff', borderRadius: '10px', boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px;", p: 2, borderLeft: `7px solid ${selectedData[0]?.check_history[0]?.text?.demographic_report?.addresses[0]?.city.score >= 4 && selectedData[0]?.check_history[0]?.text?.demographic_report?.addresses[0]?.city.score <= 7 ? '#f0ad4e' : selectedData[0]?.check_history[0]?.text?.demographic_report?.addresses[0]?.city.score >= 8 && selectedData[0]?.check_history[0]?.text?.demographic_report?.addresses[0]?.city.score <= 10 ? 'green' : selectedData[0]?.check_history[0]?.text?.demographic_report?.addresses[0]?.city.score >= 1 && selectedData[0]?.check_history[0]?.text?.demographic_report?.addresses[0]?.city.score <= 3 ? 'red' : ''}` }}>


                        <Typography sx={{ fontSize: '18px', color: '#000', fontWeight: '600' }}>
                            City
                        </Typography>
                        <Box sx={{ border: '1px solid #aaa', mt: '10px' }} />
                        <ul style={{ padding: '10px' }}>

                            <li>
                                <Typography sx={{ fontSize: '14px', color: '#000', fontWeight: '500', mb: '10px' }}>
                                    <strong>Reason: </strong> {selectedData[0]?.check_history[0]?.text?.demographic_report?.addresses[0]?.city.reason}
                                </Typography>
                            </li>

                            <li>
                                <Typography sx={{ fontSize: '14px', color: '#000', fontWeight: '500' }}>
                                    <strong>score:</strong> {selectedData[0]?.check_history[0]?.text?.demographic_report?.addresses[0]?.city.score} / 10
                                </Typography>
                            </li>
                        </ul>
                    </Box>




                    <Box sx={{ width: '30%', bgcolor: '#fff', borderRadius: '10px', boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px;", p: 2, borderLeft: `7px solid ${selectedData[0]?.check_history[0]?.text?.demographic_report?.addresses[0]?.state.score >= 4 && selectedData[0]?.check_history[0]?.text?.demographic_report?.addresses[0]?.state.score <= 7 ? '#f0ad4e' : selectedData[0]?.check_history[0]?.text?.demographic_report?.addresses[0]?.state.score >= 8 && selectedData[0]?.check_history[0]?.text?.demographic_report?.addresses[0]?.state.score <= 10 ? 'green' : selectedData[0]?.check_history[0]?.text?.demographic_report?.addresses[0]?.state.score >= 1 && selectedData[0]?.check_history[0]?.text?.demographic_report?.addresses[0]?.state.score <= 3 ? 'red' : ''}` }}>

                        <Typography sx={{ fontSize: '18px', color: '#000', fontWeight: '600' }}>
                            State
                        </Typography>
                        <Box sx={{ border: '1px solid #aaa', mt: '10px' }} />
                        <ul style={{ padding: '10px' }}>

                            <li>
                                <Typography sx={{ fontSize: '14px', color: '#000', fontWeight: '500', mb: '10px' }}>
                                    <strong>Reason: </strong> {selectedData[0]?.check_history[0]?.text?.demographic_report?.addresses[0]?.state.reason}
                                </Typography>
                            </li>

                            <li>
                                <Typography sx={{ fontSize: '14px', color: '#000', fontWeight: '500' }}>
                                    <strong>score:</strong> {selectedData[0]?.check_history[0]?.text?.demographic_report?.addresses[0]?.state.score} / 10
                                </Typography>
                            </li>
                        </ul>
                    </Box>

                </Stack>
                <Stack direction={'row'} justifyContent={'space-evenly'} mt={'20px'} mb={'40px'} spacing={1.5}>
                    <Box sx={{ width: '30%', bgcolor: '#fff', borderRadius: '10px', boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px;", p: 2, borderLeft: `7px solid ${selectedData[0]?.check_history[0]?.text?.demographic_report?.addresses[0]?.country.score >= 4 && selectedData[0]?.check_history[0]?.text?.demographic_report?.addresses[0]?.country.score <= 7 ? '#f0ad4e' : selectedData[0]?.check_history[0]?.text?.demographic_report?.addresses[0]?.country.score >= 8 && selectedData[0]?.check_history[0]?.text?.demographic_report?.addresses[0]?.country.score <= 10 ? 'green' : selectedData[0]?.check_history[0]?.text?.demographic_report?.addresses[0]?.country.score >= 1 && selectedData[0]?.check_history[0]?.text?.demographic_report?.addresses[0]?.country.score <= 3 ? 'red' : ''}` }}>


                        <Typography sx={{ fontSize: '18px', color: '#000', fontWeight: '600' }}>
                            Country
                        </Typography>
                        <Box sx={{ border: '1px solid #aaa', mt: '10px' }} />
                        <ul style={{ padding: '10px' }}>

                            <li>
                                <Typography sx={{ fontSize: '14px', color: '#000', fontWeight: '500', mb: '10px' }}>
                                    <strong>Reason: </strong> {selectedData[0]?.check_history[0]?.text?.demographic_report?.addresses[0]?.country.reason}
                                </Typography>
                            </li>

                            <li>
                                <Typography sx={{ fontSize: '14px', color: '#000', fontWeight: '500' }}>
                                    <strong>score:</strong> {selectedData[0]?.check_history[0]?.text?.demographic_report?.addresses[0]?.country.score} / 10
                                </Typography>
                            </li>
                        </ul>
                    </Box>




                    <Box sx={{ width: '30%', bgcolor: '#fff', borderRadius: '10px', boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px;", p: 2, borderLeft: `7px solid ${selectedData[0]?.check_history[0]?.text?.demographic_report?.addresses[0]?.pin_code.score >= 4 && selectedData[0]?.check_history[0]?.text?.demographic_report?.addresses[0]?.pin_code.score <= 7 ? '#f0ad4e' : selectedData[0]?.check_history[0]?.text?.demographic_report?.addresses[0]?.pin_code.score >= 8 && selectedData[0]?.check_history[0]?.text?.demographic_report?.addresses[0]?.pin_code.score <= 10 ? 'green' : selectedData[0]?.check_history[0]?.text?.demographic_report?.addresses[0]?.pin_code.score >= 1 && selectedData[0]?.check_history[0]?.text?.demographic_report?.addresses[0]?.pin_code.score <= 3 ? 'red' : ''}` }}>

                        <Typography sx={{ fontSize: '18px', color: '#000', fontWeight: '600' }}>
                            Pin Code
                        </Typography>
                        <Box sx={{ border: '1px solid #aaa', mt: '10px' }} />
                        <ul style={{ padding: '10px' }}>

                            <li>
                                <Typography sx={{ fontSize: '14px', color: '#000', fontWeight: '500', mb: '10px' }}>
                                    <strong>Reason: </strong> {selectedData[0]?.check_history[0]?.text?.demographic_report?.addresses[0]?.pin_code.reason}
                                </Typography>
                            </li>

                            <li>
                                <Typography sx={{ fontSize: '14px', color: '#000', fontWeight: '500' }}>
                                    <strong>score:</strong> {selectedData[0]?.check_history[0]?.text?.demographic_report?.addresses[0]?.pin_code.score} / 10
                                </Typography>
                            </li>
                        </ul>
                    </Box>




                    <Box sx={{ width: '30%', borderRadius: '10px', boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px;", p: 2, visibility: "hidden" }}>


                    </Box>

                </Stack>


                <Stack direction={'row'} justifyContent={'space-evenly'} mt={'20px'} spacing={1.5}>
                    <Box sx={{ width: '30%', bgcolor: '#fff', borderRadius: '10px', boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px;", p: 2, borderLeft: `7px solid ${selectedData[0]?.check_history[0]?.text?.demographic_report?.number_of_dependents.score >= 4 && selectedData[0]?.check_history[0]?.text?.demographic_report?.number_of_dependents.score <= 7 ? '#f0ad4e' : selectedData[0]?.check_history[0]?.text?.demographic_report?.number_of_dependents.score >= 8 && selectedData[0]?.check_history[0]?.text?.demographic_report?.number_of_dependents.score <= 10 ? 'green' : selectedData[0]?.check_history[0]?.text?.demographic_report?.number_of_dependents.score >= 1 && selectedData[0]?.check_history[0]?.text?.demographic_report?.number_of_dependents.score <= 3 ? 'red' : ''}` }}>


                        <Typography sx={{ fontSize: '18px', color: '#000', fontWeight: '600' }}>
                            Number of Dependents
                        </Typography>
                        <Box sx={{ border: '1px solid #aaa', mt: '10px' }} />

                        <ul style={{ padding: '10px' }}>

                            <li>
                                <Typography sx={{ fontSize: '14px', color: '#000', fontWeight: '500', mb: '10px' }}>
                                    <strong>Reason: </strong> {selectedData[0]?.check_history[0]?.text?.demographic_report?.number_of_dependents.reason}
                                </Typography>
                            </li>

                            <li>
                                <Typography sx={{ fontSize: '14px', color: '#000', fontWeight: '500' }}>
                                    <strong>score:</strong> {selectedData[0]?.check_history[0]?.text?.demographic_report?.number_of_dependents.score} / 10
                                </Typography>
                            </li>
                        </ul>
                    </Box>




                    <Box sx={{ width: '30%', bgcolor: '#fff', borderRadius: '10px', boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px;", p: 2, borderLeft: `7px solid ${selectedData[0]?.check_history[0]?.text?.demographic_report?.number_of_loans_or_emis.score >= 4 && selectedData[0]?.check_history[0]?.text?.demographic_report?.number_of_loans_or_emis.score <= 7 ? '#f0ad4e' : selectedData[0]?.check_history[0]?.text?.demographic_report?.number_of_loans_or_emis.score >= 8 && selectedData[0]?.check_history[0]?.text?.demographic_report?.number_of_loans_or_emis.score <= 10 ? 'green' : selectedData[0]?.check_history[0]?.text?.demographic_report?.number_of_loans_or_emis.score >= 1 && selectedData[0]?.check_history[0]?.text?.demographic_report?.number_of_loans_or_emis.score <= 3 ? 'red' : ''}` }}>

                        <Typography sx={{ fontSize: '18px', color: '#000', fontWeight: '600' }}>
                            Number of loans or EMIs
                        </Typography>
                        <Box sx={{ border: '1px solid #aaa', mt: '10px' }} />
                        <ul style={{ padding: '10px' }}>

                            <li>
                                <Typography sx={{ fontSize: '14px', color: '#000', fontWeight: '500', mb: '10px' }}>
                                    <strong>Reason: </strong> {selectedData[0]?.check_history[0]?.text?.demographic_report?.number_of_loans_or_emis.reason}
                                </Typography>
                            </li>

                            <li>
                                <Typography sx={{ fontSize: '14px', color: '#000', fontWeight: '500' }}>
                                    <strong>score:</strong> {selectedData[0]?.check_history[0]?.text?.demographic_report?.number_of_loans_or_emis.score} / 10
                                </Typography>
                            </li>
                        </ul>
                    </Box>




                    <Box sx={{ width: '30%', bgcolor: '#fff', borderRadius: '10px', boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px;", p: 2, borderLeft: `7px solid ${selectedData[0]?.check_history[0]?.text?.demographic_report?.type_of_residence.score >= 4 && selectedData[0]?.check_history[0]?.text?.demographic_report?.type_of_residence.score <= 7 ? '#f0ad4e' : selectedData[0]?.check_history[0]?.text?.demographic_report?.type_of_residence.score >= 8 && selectedData[0]?.check_history[0]?.text?.demographic_report?.type_of_residence.score <= 10 ? 'green' : selectedData[0]?.check_history[0]?.text?.demographic_report?.type_of_residence.score >= 1 && selectedData[0]?.check_history[0]?.text?.demographic_report?.type_of_residence.score <= 3 ? 'red' : ''}` }}>
                        <Typography sx={{ fontSize: '18px', color: '#000', fontWeight: '600' }}>
                            Type of residence
                        </Typography>
                        <Box sx={{ border: '1px solid #aaa', mt: '10px' }} />
                        <ul style={{ padding: '10px' }}>

                            <li>
                                <Typography sx={{ fontSize: '14px', color: '#000', fontWeight: '500', mb: '10px' }}>
                                    <strong>Reason: </strong> {selectedData[0]?.check_history[0]?.text?.demographic_report?.type_of_residence.reason}
                                </Typography>
                            </li>

                            <li>
                                <Typography sx={{ fontSize: '14px', color: '#000', fontWeight: '500' }}>
                                    <strong>score:</strong> {selectedData[0]?.check_history[0]?.text?.demographic_report?.type_of_residence.score} / 10
                                </Typography>
                            </li>
                        </ul>
                    </Box>

                </Stack>
                <Stack direction={'row'} justifyContent={'space-evenly'} mt={'20px'} spacing={1.5}>
                    <Box sx={{ width: '30%', bgcolor: '#fff', borderRadius: '10px', boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px;", p: 2, borderLeft: `7px solid ${selectedData[0]?.check_history[0]?.text?.demographic_report?.living_at_current_residence_since.score >= 4 && selectedData[0]?.check_history[0]?.text?.demographic_report?.living_at_current_residence_since.score <= 7 ? '#f0ad4e' : selectedData[0]?.check_history[0]?.text?.demographic_report?.living_at_current_residence_since.score >= 8 && selectedData[0]?.check_history[0]?.text?.demographic_report?.living_at_current_residence_since.score <= 10 ? 'green' : selectedData[0]?.check_history[0]?.text?.demographic_report?.living_at_current_residence_since.score >= 1 && selectedData[0]?.check_history[0]?.text?.demographic_report?.living_at_current_residence_since.score <= 3 ? 'red' : ''}` }}>
                        <Typography sx={{ fontSize: '18px', color: '#000', fontWeight: '600' }}>
                            Living at current residence since
                        </Typography>
                        <Box sx={{ border: '1px solid #aaa', mt: '10px' }} />
                        <ul style={{ padding: '10px' }}>

                            <li>
                                <Typography sx={{ fontSize: '14px', color: '#000', fontWeight: '500', mb: '10px' }}>
                                    <strong>Reason: </strong> {selectedData[0]?.check_history[0]?.text?.demographic_report?.living_at_current_residence_since.reason}
                                </Typography>
                            </li>

                            <li>
                                <Typography sx={{ fontSize: '14px', color: '#000', fontWeight: '500' }}>
                                    <strong>score:</strong> {selectedData[0]?.check_history[0]?.text?.demographic_report?.living_at_current_residence_since.score} / 10
                                </Typography>
                            </li>
                        </ul>
                    </Box>
                    <Box sx={{ width: '30%', bgcolor: '#fff', borderRadius: '10px', boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px;", p: 2, borderLeft: `7px solid ${selectedData[0]?.check_history[0]?.text?.demographic_report?.cibil_score.score >= 4 && selectedData[0]?.check_history[0]?.text?.demographic_report?.cibil_score.score <= 7 ? '#f0ad4e' : selectedData[0]?.check_history[0]?.text?.demographic_report?.cibil_score.score >= 8 && selectedData[0]?.check_history[0]?.text?.demographic_report?.cibil_score.score <= 10 ? 'green' : selectedData[0]?.check_history[0]?.text?.demographic_report?.cibil_score.score >= 1 && selectedData[0]?.check_history[0]?.text?.demographic_report?.cibil_score.score <= 3 ? 'red' : ''}` }}>
                        <Typography sx={{ fontSize: '18px', color: '#000', fontWeight: '600' }}>
                            Cibil Score
                        </Typography>
                        <Box sx={{ border: '1px solid #aaa', mt: '10px' }} />
                        <ul style={{ padding: '10px' }}>

                            <li>
                                <Typography sx={{ fontSize: '14px', color: '#000', fontWeight: '500', mb: '10px' }}>
                                    <strong>Reason: </strong> {selectedData[0]?.check_history[0]?.text?.demographic_report?.cibil_score.reason}
                                </Typography>
                            </li>

                            <li>
                                <Typography sx={{ fontSize: '14px', color: '#000', fontWeight: '500' }}>
                                    <strong>score:</strong> {selectedData[0]?.check_history[0]?.text?.demographic_report?.cibil_score.score} / 10
                                </Typography>
                            </li>
                        </ul>
                    </Box>

                    <Box sx={{ width: '30%', bgcolor: '#fff', borderRadius: '10px', boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px;", p: 2, borderLeft: `7px solid ${selectedData[0]?.check_history[0]?.text?.demographic_report?.other_relationship.score >= 4 && selectedData[0]?.check_history[0]?.text?.demographic_report?.other_relationship.score <= 7 ? '#f0ad4e' : selectedData[0]?.check_history[0]?.text?.demographic_report?.other_relationship.score >= 8 && selectedData[0]?.check_history[0]?.text?.demographic_report?.other_relationship.score <= 10 ? 'green' : selectedData[0]?.check_history[0]?.text?.demographic_report?.other_relationship.score >= 1 && selectedData[0]?.check_history[0]?.text?.demographic_report?.other_relationship.score <= 3 ? 'red' : ''}` }}>
                        <Typography sx={{ fontSize: '18px', color: '#000', fontWeight: '600' }}>
                            Other Relationship
                        </Typography>
                        <Box sx={{ border: '1px solid #aaa', mt: '10px' }} />
                        <ul style={{ padding: '10px' }}>

                            <li>
                                <Typography sx={{ fontSize: '14px', color: '#000', fontWeight: '500', mb: '10px' }}>
                                    <strong>Reason: </strong> {selectedData[0]?.check_history[0]?.text?.demographic_report?.other_relationship.reason}
                                </Typography>
                            </li>

                            <li>
                                <Typography sx={{ fontSize: '14px', color: '#000', fontWeight: '500' }}>
                                    <strong>score:</strong> {selectedData[0]?.check_history[0]?.text?.demographic_report?.other_relationship.score} / 10
                                </Typography>
                            </li>
                        </ul>
                    </Box>

                </Stack>

            </Sidebar >

        </>
    )
}

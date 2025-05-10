import React from 'react';
import { Avatar, Box, Button, Divider, Menu, Stack, Typography } from '@mui/material'
import aihlogo from '../assets/logoofsmfg.png';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';
import API from './BaseURL';
// import Markdown from 'markdown-to-jsx';
import DashboardIcon from '@mui/icons-material/Dashboard';
import StraightIcon from '@mui/icons-material/Straight';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CreditScoreOutlinedIcon from '@mui/icons-material/CreditScoreOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function Sidebar({ title, children }) {

    const url = window.location.href
    const mainUrl = url.split('/')

    const [userLoginData, setUserLoginData] = useState('')
    const userDataOfLogin = localStorage.getItem('userData')
    useEffect(() => {
        if (userDataOfLogin) {
            setUserLoginData(JSON.parse(userDataOfLogin))
        }
    }, [])


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


    // const tooltipFun = function () {
    //     return (
    //         <>
    //             <Box sx={{ mb: '20px' }}>
    //                 <Typography sx={{ fontSize: '16px', color: '#000', fontWeight: '600', mb: '10px', textAlign: 'start' }}>Demographic Verifier</Typography>

    //                 <Typography sx={{ fontSize: '14px', color: '#656565', fontWeight: '600', mb: '10px' }}>Categorization:</Typography>
    //                 {selectedData[0]?.check_history[0]?.text?.demographic_assumptions?.demographic_verifier?.assumptions?.categorization && selectedData[0]?.check_history[0]?.text?.demographic_assumptions?.demographic_verifier?.assumptions?.categorization?.map((data, index) => (
    //                     <Typography sx={{ fontSize: '13px', color: '#656565', fontWeight: '500', mb: '10px' }} key={index}>
    //                         <Markdown
    //                             options={{
    //                                 overrides: {
    //                                     ul: {
    //                                         props: {
    //                                             style: {
    //                                                 paddingLeft: 35
    //                                             },
    //                                         },
    //                                     },
    //                                     p: {
    //                                         props: {
    //                                             style: {
    //                                                 margin: '0.5em 0',
    //                                             },
    //                                         },
    //                                     },
    //                                 },
    //                             }}
    //                             style={{
    //                                 color: '#656565',
    //                                 fontSize: '13px',
    //                                 fontFamily: 'sans-serif',
    //                                 marginLeft: '10px',

    //                             }}
    //                         >

    //                             {data || 'no data found'}
    //                         </Markdown>
    //                     </Typography>
    //                 ))}


    //                 <Typography sx={{ fontSize: '14px', color: '#656565', fontWeight: '600', mb: '10px' }}>Scoring:</Typography>
    //                 {selectedData[0]?.check_history[0]?.text?.demographic_assumptions?.demographic_verifier?.assumptions?.scoring && selectedData[0]?.check_history[0]?.text?.demographic_assumptions?.demographic_verifier?.assumptions?.scoring?.map((data, index) => (
    //                     <Typography sx={{ fontSize: '13px', color: '#656565', fontWeight: '500', mb: '10px' }} key={index}>
    //                         <Markdown
    //                             options={{
    //                                 overrides: {
    //                                     ul: {
    //                                         props: {
    //                                             style: {
    //                                                 paddingLeft: 35
    //                                             },
    //                                         },
    //                                     },
    //                                     p: {
    //                                         props: {
    //                                             style: {
    //                                                 margin: '0.5em 0',
    //                                             },
    //                                         },
    //                                     },
    //                                 },
    //                             }}
    //                             style={{
    //                                 color: '#656565',
    //                                 fontSize: '13px',
    //                                 fontFamily: 'sans-serif',
    //                                 marginLeft: '10px',
    //                             }}
    //                         >

    //                             {data || 'no data found'}
    //                         </Markdown>
    //                     </Typography>
    //                 ))}
    //             </Box>

    //             <Box>
    //                 <Typography sx={{ fontSize: '16px', color: '#000', fontWeight: '600', mb: '10px', textAlign: 'start', whiteSpace: "pre-wrap" }}>Income Regularity Quantum Pattern</Typography>

    //                 <Typography sx={{ fontSize: '14px', color: '#656565', fontWeight: '600', mb: '10px' }}>Categorization:</Typography>
    //                 {selectedData[0]?.check_history[0]?.text?.behaviour_assumptions?.income_regularity_quantum_pattern?.assumptions?.categorization && selectedData[0]?.check_history[0]?.text?.behaviour_assumptions?.income_regularity_quantum_pattern?.assumptions?.categorization?.map((data, index) => (
    //                     <Typography sx={{ fontSize: '13px', color: '#656565', fontWeight: '500', mb: '10px', whiteSpace: "pre-wrap" }} key={index}>
    //                         <Markdown
    //                             options={{
    //                                 overrides: {
    //                                     ul: {
    //                                         props: {
    //                                             style: {
    //                                                 paddingLeft: 35
    //                                             },
    //                                         },
    //                                     },
    //                                     p: {
    //                                         props: {
    //                                             style: {
    //                                                 margin: '0.5em 0',
    //                                             },
    //                                         },
    //                                     },
    //                                 },
    //                             }}
    //                             style={{
    //                                 color: '#656565',
    //                                 fontSize: '13px',
    //                                 fontFamily: 'sans-serif',
    //                                 marginLeft: '10px',
    //                                 whiteSpace: "pre-wrap"
    //                             }}
    //                         >

    //                             {data || 'no data found'}
    //                         </Markdown>
    //                     </Typography>
    //                 ))}

    //                 <Typography sx={{ fontSize: '15px', color: '#656565', fontWeight: '600', mb: '10px' }}>Scoring:</Typography>
    //                 {selectedData[0]?.check_history[0]?.text?.behaviour_assumptions?.income_regularity_quantum_pattern?.assumptions?.scoring && selectedData[0]?.check_history[0]?.text?.behaviour_assumptions?.income_regularity_quantum_pattern?.assumptions?.scoring?.map((data, index) => (
    //                     <Typography sx={{ fontSize: '13px', color: '#656565', fontWeight: '500', mb: '10px', whiteSpace: "pre-wrap" }} key={index}>
    //                         <Markdown
    //                             options={{
    //                                 overrides: {
    //                                     ul: {
    //                                         props: {
    //                                             style: {
    //                                                 paddingLeft: 35
    //                                             },
    //                                         },
    //                                     },
    //                                     p: {
    //                                         props: {
    //                                             style: {
    //                                                 margin: '0.5em 0',
    //                                             },
    //                                         },
    //                                     },
    //                                 },
    //                             }}
    //                             style={{
    //                                 color: '#656565',
    //                                 fontSize: '13px',
    //                                 fontFamily: 'sans-serif',
    //                                 marginLeft: '10px',
    //                                 whiteSpace: "pre-wrap"
    //                             }}
    //                         >

    //                             {data}
    //                         </Markdown>
    //                     </Typography>
    //                 ))}
    //             </Box>

    //             <Box>
    //                 <Typography sx={{ fontSize: '16px', color: '#000', fontWeight: '600', mb: '10px', textAlign: 'start', whiteSpace: "pre-wrap" }}>Spent Pattern</Typography>

    //                 <Typography sx={{ fontSize: '14px', color: '#656565', fontWeight: '600', mb: '10px', whiteSpace: "pre-wrap" }}>Categorization:</Typography>
    //                 {selectedData[0]?.check_history[0]?.text?.behaviour_assumptions?.
    //                     spent_pattern?.assumptions?.categorization && selectedData[0]?.check_history[0]?.text?.behaviour_assumptions?.
    //                         spent_pattern?.assumptions?.categorization?.map((data, index) => (
    //                             <Typography sx={{ fontSize: '13px', color: '#656565', fontWeight: '500', mb: '10px', whiteSpace: "pre-wrap" }} key={index}>
    //                                 <Markdown
    //                                     options={{
    //                                         overrides: {
    //                                             ul: {
    //                                                 props: {
    //                                                     style: {
    //                                                         paddingLeft: 35
    //                                                     },
    //                                                 },
    //                                             },
    //                                             p: {
    //                                                 props: {
    //                                                     style: {
    //                                                         margin: '0.5em 0',
    //                                                     },
    //                                                 },
    //                                             },
    //                                         },
    //                                     }}
    //                                     style={{
    //                                         color: '#656565',
    //                                         fontSize: '13px',
    //                                         fontFamily: 'sans-serif',
    //                                         marginLeft: '10px',
    //                                         whiteSpace: "pre-wrap"
    //                                     }}
    //                                 >

    //                                     {data || 'no data found'}
    //                                 </Markdown>
    //                             </Typography>
    //                         ))}

    //                 <Typography sx={{ fontSize: '15px', color: '#656565', fontWeight: '600', mb: '10px', whiteSpace: "pre-wrap" }}>Scoring:</Typography>
    //                 {selectedData[0]?.check_history[0]?.text?.behaviour_assumptions?.
    //                     spent_pattern?.assumptions?.scoring && selectedData[0]?.check_history[0]?.text?.behaviour_assumptions?.
    //                         spent_pattern?.assumptions?.scoring?.map((data, index) => (
    //                             <Typography sx={{ fontSize: '13px', color: '#656565', fontWeight: '500', mb: '10px', whiteSpace: "pre-wrap" }} key={index}>
    //                                 <Markdown
    //                                     options={{
    //                                         overrides: {
    //                                             ul: {
    //                                                 props: {
    //                                                     style: {
    //                                                         paddingLeft: 35
    //                                                     },
    //                                                 },
    //                                             },
    //                                             p: {
    //                                                 props: {
    //                                                     style: {
    //                                                         margin: '0.5em 0',
    //                                                     },
    //                                                 },
    //                                             },
    //                                         },
    //                                     }}
    //                                     style={{
    //                                         color: '#656565',
    //                                         fontSize: '13px',
    //                                         fontFamily: 'sans-serif',
    //                                         marginLeft: '10px',
    //                                         whiteSpace: "pre-wrap"
    //                                     }}
    //                                 >

    //                                     {data}
    //                                 </Markdown>
    //                             </Typography>
    //                         ))}
    //             </Box>

    //             <Box>
    //                 <Typography sx={{ fontSize: '16px', color: '#000', fontWeight: '600', mb: '10px', textAlign: 'start', whiteSpace: "pre-wrap" }}>Transaction Pattern</Typography>

    //                 <Typography sx={{ fontSize: '14px', color: '#656565', fontWeight: '600', mb: '10px', whiteSpace: "pre-wrap" }}>Categorization:</Typography>
    //                 {selectedData[0]?.check_history[0]?.text?.behaviour_assumptions?.

    //                     transaction_pattern?.assumptions?.categorization && selectedData[0]?.check_history[0]?.text?.behaviour_assumptions?.

    //                         transaction_pattern?.assumptions?.categorization?.map((data, index) => (
    //                             <Typography sx={{ fontSize: '13px', color: '#656565', fontWeight: '500', mb: '10px', whiteSpace: "pre-wrap" }} key={index}>
    //                                 <Markdown
    //                                     options={{
    //                                         overrides: {
    //                                             ul: {
    //                                                 props: {
    //                                                     style: {
    //                                                         paddingLeft: 35
    //                                                     },
    //                                                 },
    //                                             },
    //                                             p: {
    //                                                 props: {
    //                                                     style: {
    //                                                         margin: '0.5em 0',
    //                                                     },
    //                                                 },
    //                                             },
    //                                         },
    //                                     }}
    //                                     style={{
    //                                         color: '#656565',
    //                                         fontSize: '13px',
    //                                         fontFamily: 'sans-serif',
    //                                         marginLeft: '10px',
    //                                         whiteSpace: "pre-wrap"
    //                                     }}
    //                                 >

    //                                     {data || 'no data found'}
    //                                 </Markdown>
    //                             </Typography>
    //                         ))}

    //                 <Typography sx={{ fontSize: '15px', color: '#656565', fontWeight: '600', mb: '10px', whiteSpace: "pre-wrap" }}>Scoring:</Typography>
    //                 {selectedData[0]?.check_history[0]?.text?.behaviour_assumptions?.

    //                     transaction_pattern?.assumptions?.scoring && selectedData[0]?.check_history[0]?.text?.behaviour_assumptions?.

    //                         transaction_pattern?.assumptions?.scoring?.map((data, index) => (
    //                             <Typography sx={{ fontSize: '13px', color: '#656565', fontWeight: '500', mb: '10px', whiteSpace: "pre-wrap" }} key={index}>
    //                                 <Markdown
    //                                     options={{
    //                                         overrides: {
    //                                             ul: {
    //                                                 props: {
    //                                                     style: {
    //                                                         paddingLeft: 35
    //                                                     },
    //                                                 },
    //                                             },
    //                                             p: {
    //                                                 props: {
    //                                                     style: {
    //                                                         margin: '0.5em 0',
    //                                                     },
    //                                                 },
    //                                             },
    //                                         },
    //                                     }}
    //                                     style={{
    //                                         color: '#656565',
    //                                         fontSize: '13px',
    //                                         fontFamily: 'sans-serif',
    //                                         marginLeft: '10px',
    //                                         whiteSpace: "pre-wrap"
    //                                     }}
    //                                 >
    //                                     {data}
    //                                 </Markdown>
    //                             </Typography>
    //                         ))}
    //             </Box>

    //             <Box sx={{ maxWidth: '600px' }}>
    //                 <Typography sx={{ fontSize: '16px', color: '#000', fontWeight: '600', mb: '10px', textAlign: 'start', whiteSpace: 'nowrap' }}>Transaction Frequency And Size Details</Typography>


    //                 <Typography sx={{ fontSize: '14px', color: '#656565', fontWeight: '600', mb: '10px' }}>Categorization:</Typography>
    //                 {selectedData[0]?.check_history[0]?.text?.behaviour_assumptions?.
    //                     granularity_of_transactions?.assumptions?.categorization && selectedData[0]?.check_history[0]?.text?.behaviour_assumptions?.
    //                         granularity_of_transactions?.assumptions?.categorization?.map((data, index) => (
    //                             <Typography sx={{ fontSize: '13px', color: '#656565', fontWeight: '500', mb: '10px' }} key={index}>
    //                                 <Markdown

    //                                     options={{
    //                                         overrides: {
    //                                             ul: {
    //                                                 props: {
    //                                                     style: {
    //                                                         paddingLeft: 35
    //                                                     },
    //                                                 },
    //                                             },
    //                                             p: {
    //                                                 props: {
    //                                                     style: {
    //                                                         margin: '0.5em 0',
    //                                                     },
    //                                                 },
    //                                             },
    //                                         },
    //                                     }}
    //                                     style={{
    //                                         color: '#656565',
    //                                         fontSize: '13px',
    //                                         fontFamily: 'sans-serif',
    //                                         marginLeft: '10px',
    //                                         whiteSpace: "pre-wrap"
    //                                     }}
    //                                 >
    //                                     {data || 'no data found'}
    //                                 </Markdown>
    //                             </Typography>
    //                         ))}

    //                 <Typography sx={{ fontSize: '15px', color: '#656565', fontWeight: '600', mb: '10px', whiteSpace: "pre-wrap" }}>Scoring:</Typography>
    //                 {selectedData[0]?.check_history[0]?.text?.behaviour_assumptions?.
    //                     granularity_of_transactions?.assumptions?.scoring && selectedData[0]?.check_history[0]?.text?.behaviour_assumptions?.
    //                         granularity_of_transactions?.assumptions?.scoring?.map((data, index) => (
    //                             <Typography sx={{ fontSize: '13px', color: '#656565', fontWeight: '500', mb: '10px', whiteSpace: "pre-wrap" }} key={index}>
    //                                 <Markdown
    //                                     options={{
    //                                         overrides: {
    //                                             ul: {
    //                                                 props: {
    //                                                     style: {
    //                                                         paddingLeft: 35
    //                                                     },
    //                                                 },
    //                                             },
    //                                             p: {
    //                                                 props: {
    //                                                     style: {
    //                                                         margin: '0.5em 0',
    //                                                     },
    //                                                 },
    //                                             },
    //                                         },
    //                                     }}
    //                                     style={{
    //                                         color: '#656565',
    //                                         fontSize: '13px',
    //                                         fontFamily: 'sans-serif',
    //                                         marginLeft: '10px',
    //                                         whiteSpace: "pre-wrap"
    //                                     }}
    //                                 >
    //                                     {data}
    //                                 </Markdown>
    //                             </Typography>
    //                         ))}

    //             </Box>
    //         </>
    //     )
    // }

    const [anchorEl1, setAnchorEl1] = useState(null);
    const open1 = Boolean(anchorEl1);
    const handleClick = (event) => {
        setAnchorEl1(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl1(null);
    };


    return (
        <>
            <Stack direction={'row'} sx={{ bgcolor: '#f8f8fa', height: '100vh', overflowY: 'hidden' }}>
                <Box sx={{ bgcolor: '#004831', height: '95vh', width: '20%', position: 'relative', borderRadius: '20px', m: 2, boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', p: 1, mb: '20px' }}>
                        <Box sx={{ bgcolor: '#fff', borderRadius: '10px', display: 'flex', justifyContent: 'center', width: '200px', p: 1 }}>
                            <img
                                src={aihlogo}
                                alt="logo"
                                style={{
                                    width: "70%",
                                    borderRadius: '10px',
                                    mixBlendMode: 'darken'

                                }}
                            />
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: '20px' }} >
                        <Link to={`/home`} style={{ textDecoration: "none" }}>
                            <Stack direction={'row'} alignItems={'center'} spacing={2} sx={{ bgcolor: mainUrl[mainUrl.length - 1] === 'home' ? '#c3d600' : '', borderRadius: '8px', width: "200px", p: 1 }}>
                                <DashboardIcon sx={{ color: mainUrl[mainUrl.length - 1] === 'home' ? '#000' : '#fff', fontSize: '20px' }} />
                                <Typography
                                    sx={{
                                        fontSize: mainUrl[mainUrl.length - 1] === 'home' ? '20px' : '14px',
                                        color: mainUrl[mainUrl.length - 1] === 'home' ? '#fff' : '#fff',
                                        fontWeight: '500',
                                        whiteSpace: "nowrap"
                                    }}
                                >
                                    Dashboard
                                </Typography>

                            </Stack>
                        </Link>
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: '20px' }} >
                        <Link to={`/uploadDocument`} style={{ textDecoration: "none" }}>
                            <Stack
                                direction={'row'} alignItems={'center'} spacing={2} sx={{ bgcolor: mainUrl[mainUrl.length - 1] === '' ? '#c3d600' : '', borderRadius: '8px', width: "200px", p: 1.5 }} >
                                <CreditScoreOutlinedIcon sx={{ color: mainUrl[mainUrl.length - 1] === '' ? '#000' : '#fff', fontSize: '20px' }} />
                                <Typography
                                    sx={{
                                        fontSize: mainUrl[mainUrl.length - 1] === '' ? '20px' : '14px',
                                        color: mainUrl[mainUrl.length - 1] === '' ? '#000' : '#fff',
                                        fontWeight: '500',
                                        whiteSpace: "nowrap"
                                    }}
                                >
                                    Cost Analysis
                                </Typography>

                            </Stack>
                        </Link>
                    </Box>


                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}>
                        <Box sx={{
                            position: 'absolute',
                            bottom: 20,
                            width: '70%',
                            bgcolor: '#ffff',
                            p: 2,
                            borderRadius: '20px',

                        }} >

                            <Box sx={{
                                position: 'absolute',
                                top: 8,
                                right: 8,
                                width: '10px',
                                height: '10px',
                                bgcolor: mainUrl[mainUrl.length - 1] === 'uploadDocument' ? 'green' : 'red',
                                borderRadius: '50%',
                                animation: 'blinker 1s linear infinite',
                                '@keyframes blinker': {
                                    '0%': { opacity: 1 },
                                    '50%': { opacity: 0.2 },
                                    '100%': { opacity: 1 },
                                }
                            }}
                            />

                            <Box sx={{ bgcolor: '#000', width: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '20%', height: '30px', position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)' }}>
                                <StraightIcon sx={{ color: '#fff' }} />
                            </Box>

                            <Typography sx={{ fontSize: '14px', color: '#000', fontWeight: '500', fontStyle: 'normal', textAlign: 'center' }}>{`Fast-track your process! Upload ID Proof, Bank Statement & Credit Bureau report.`}</Typography>

                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;' }}>

                                <Button
                                    sx={{ bgcolor: '#000', textTransform: 'none', borderRadius: '10px', }}
                                    disabled={mainUrl[mainUrl.length - 1] === 'uploadDocument'}
                                    onClick={() => window.location.href = "/uploadDocument"}

                                >
                                    <Typography
                                        sx={{
                                            fontSize: '14px',
                                            color: mainUrl[mainUrl.length - 1] === 'uploadDocument' ? '#aaa' : '#fff',
                                            fontWeight: '600',
                                            '&:hover': { color: '#006bb4' }

                                        }}
                                    >
                                        <Stack direction={'row'} alignItems={'center'} spacing={2}>
                                            <Typography
                                                sx={{
                                                    fontSize: '12px',
                                                    color: mainUrl[mainUrl.length - 1] === 'uploadDocument' ? '#aaa' : '#fff',
                                                    fontWeight: '600',
                                                    '&:hover': { color: '#006bb4' },
                                                    whiteSpace: 'nowrap',
                                                    cursor: mainUrl[mainUrl.length - 1] === 'uploadDocument' ? 'none' : 'pointer',
                                                }}
                                            >
                                                Go to Upload Section
                                            </Typography>
                                            <ArrowForwardIcon sx={{ fontSize: '20px' }} />
                                        </Stack>
                                    </Typography>

                                </Button>
                            </Box>


                        </Box>
                    </Box>
                </Box>


                <Box sx={{ width: '90%', height: '95vh', m: 2 }}>

                    <Box sx={{ mb: '30px' }}>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                            <Box>
                                <Typography sx={{ fontSize: '16px', color: '#aaa', fontWeight: '500', fontStyle: 'normal' }} >{'Hello User, Welcome back'}</Typography>
                                <Typography sx={{ fontSize: '30px', color: '#000', fontWeight: '500', fontStyle: 'normal' }} >{title}</Typography>
                            </Box>

                            <Box sx={{  p: 1, borderRadius: '12px',  }}>
                                <Stack direction={'row'} alignItems={'center'}>
                                    <Avatar
                                        src="Image"
                                        alt={`${(userLoginData?.email || 'pooja@gmail.com')[0].toUpperCase()}${(userLoginData?.email || 'pooja@gmail.com').slice(1)}`}
                                        sx={{ width: '40px', height: '40px' }}
                                        onClick={handleClick}
                                    />

                                    {/* <Box>
                                        <Typography sx={{ fontSize: '15px', color: '#aaa', fontWeight: '600', fontStyle: 'normal' }}>{userLoginData?.email || 'pooja@gmail.com'}</Typography>
                                        <Typography sx={{ fontSize: '13px', color: '#aaa', fontWeight: '500', fontStyle: 'normal' }}>{userLoginData?.role_based_control || 'admin'}</Typography>
                                    </Box> */}

                                    {/* <Box onClick={handleClick} sx={{ cursor: 'pointer' }}>
                                        <KeyboardArrowDownIcon sx={{ color: '#aaa' }} />
                                    </Box> */}

                                </Stack>
                            </Box>


                        </Stack>

                        <Divider sx={{ bgcolor: '#aaa', mt: 2 }} />

                        <Menu
                            anchorEl={anchorEl1}
                            open={open1}
                            onClose={handleClose}

                        >
                            <Box sx={{ bgcolor: '#fff' }}>
                                <Box>
                                    <Stack direction={'row'} alignItems={'center'} spacing={1} p={1.5}>
                                        <Avatar
                                            src="Image"
                                            alt={`${(userLoginData?.email || 'pooja@gmail.com')[0].toUpperCase()}${(userLoginData?.email || 'pooja@gmail.com').slice(1)}`}
                                            sx={{ width: '30px', height: '30px' }}
                                        />
                                        <Box>
                                            <Typography sx={{ fontSize: '13px', color: '#000', fontWeight: '600', fontStyle: 'normal' }}>{userLoginData?.email || 'pooja@gmail.com'}</Typography>
                                            <Typography sx={{ fontSize: '13px', color: '#000', fontWeight: '500', fontStyle: 'normal' }}>{userLoginData?.role_based_control || 'admin'}</Typography>
                                        </Box>
                                    </Stack>
                                </Box>

                                <Box sx={{ border: '1px solid #aaa' }} />

                                <Box mt={'10px'} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
                                    <Button sx={{ bgcolor: 'transparent', textTransform: 'none' }}>
                                        <Box
                                            onClick={() => {
                                                setTimeout(() => {
                                                    localStorage.removeItem('userData')
                                                    window.location.href = '/'
                                                }, 100)
                                            }}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <Stack direction={'row'} alignItems={'center'} spacing={1}>
                                                <LockOutlinedIcon sx={{ color: '#676767', fontSize: '20px', '&:hover': { color: '#006bb4' } }} />
                                                <Typography
                                                    sx={{
                                                        fontSize: '14px',
                                                        color: '#676767',
                                                        fontWeight: '600',
                                                        '&:hover': { color: '#006bb4' }
                                                    }}
                                                >
                                                    Logout
                                                </Typography>

                                            </Stack>
                                        </Box>
                                    </Button>
                                </Box>
                            </Box>
                        </Menu>
                    </Box>

                    <Box sx={{ overflowY: 'auto', height: '80vh' ,scrollbarWidth:'none'}}>
                        {children}
                    </Box>

                </Box>

            </Stack >
        </>
    )
}

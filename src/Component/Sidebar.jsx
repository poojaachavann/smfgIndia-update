import { Avatar, Box, CircularProgress, Stack, Tooltip, Typography } from '@mui/material'
import aihlogo from '../assets/logoofsmfg.png';
import AddchartIcon from '@mui/icons-material/Addchart';
import CreditScoreOutlinedIcon from '@mui/icons-material/CreditScoreOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import GridViewIcon from '@mui/icons-material/GridView';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import AssuredWorkloadOutlinedIcon from '@mui/icons-material/AssuredWorkloadOutlined';
import RuleOutlinedIcon from '@mui/icons-material/RuleOutlined';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import BubbleChartOutlinedIcon from '@mui/icons-material/BubbleChartOutlined';
import DonutSmallOutlinedIcon from '@mui/icons-material/DonutSmallOutlined';
import React from 'react';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import InfoIcon from '@mui/icons-material/Info';
import axios from 'axios';
import API from './BaseURL';
import Markdown from 'markdown-to-jsx';


export default function Sidebar({ title, children, loading, selectedId }) {

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


    const tooltipFun = function () {
        return (
            <>
                <Box sx={{ mb: '20px' }}>
                    <Typography sx={{ fontSize: '16px', color: '#000', fontWeight: '600', mb: '10px', textAlign: 'start' }}>Demographic Verifier</Typography>

                    <Typography sx={{ fontSize: '14px', color: '#656565', fontWeight: '600', mb: '10px' }}>Categorization:</Typography>
                    {selectedData[0]?.check_history[0]?.text?.demographic_assumptions?.demographic_verifier?.assumptions?.categorization && selectedData[0]?.check_history[0]?.text?.demographic_assumptions?.demographic_verifier?.assumptions?.categorization?.map((data, index) => (
                        <Typography sx={{ fontSize: '13px', color: '#656565', fontWeight: '500', mb: '10px' }} key={index}>
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
                                    fontSize: '13px',
                                    fontFamily: 'sans-serif',
                                    marginLeft: '10px',

                                }}
                            >

                                {data || 'no data found'}
                            </Markdown>
                        </Typography>
                    ))}


                    <Typography sx={{ fontSize: '14px', color: '#656565', fontWeight: '600', mb: '10px' }}>Scoring:</Typography>
                    {selectedData[0]?.check_history[0]?.text?.demographic_assumptions?.demographic_verifier?.assumptions?.scoring && selectedData[0]?.check_history[0]?.text?.demographic_assumptions?.demographic_verifier?.assumptions?.scoring?.map((data, index) => (
                        <Typography sx={{ fontSize: '13px', color: '#656565', fontWeight: '500', mb: '10px' }} key={index}>
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
                                    fontSize: '13px',
                                    fontFamily: 'sans-serif',
                                    marginLeft: '10px',
                                }}
                            >

                                {data || 'no data found'}
                            </Markdown>
                        </Typography>
                    ))}
                </Box>

                <Box>
                    <Typography sx={{ fontSize: '16px', color: '#000', fontWeight: '600', mb: '10px', textAlign: 'start', whiteSpace: "pre-wrap" }}>Income Regularity Quantum Pattern</Typography>

                    <Typography sx={{ fontSize: '14px', color: '#656565', fontWeight: '600', mb: '10px' }}>Categorization:</Typography>
                    {selectedData[0]?.check_history[0]?.text?.behaviour_assumptions?.income_regularity_quantum_pattern?.assumptions?.categorization && selectedData[0]?.check_history[0]?.text?.behaviour_assumptions?.income_regularity_quantum_pattern?.assumptions?.categorization?.map((data, index) => (
                        <Typography sx={{ fontSize: '13px', color: '#656565', fontWeight: '500', mb: '10px', whiteSpace: "pre-wrap" }} key={index}>
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
                                    fontSize: '13px',
                                    fontFamily: 'sans-serif',
                                    marginLeft: '10px',
                                    whiteSpace: "pre-wrap"
                                }}
                            >

                                {data || 'no data found'}
                            </Markdown>
                        </Typography>
                    ))}

                    <Typography sx={{ fontSize: '15px', color: '#656565', fontWeight: '600', mb: '10px' }}>Scoring:</Typography>
                    {selectedData[0]?.check_history[0]?.text?.behaviour_assumptions?.income_regularity_quantum_pattern?.assumptions?.scoring && selectedData[0]?.check_history[0]?.text?.behaviour_assumptions?.income_regularity_quantum_pattern?.assumptions?.scoring?.map((data, index) => (
                        <Typography sx={{ fontSize: '13px', color: '#656565', fontWeight: '500', mb: '10px', whiteSpace: "pre-wrap" }} key={index}>
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
                                    fontSize: '13px',
                                    fontFamily: 'sans-serif',
                                    marginLeft: '10px',
                                    whiteSpace: "pre-wrap"
                                }}
                            >

                                {data}
                            </Markdown>
                        </Typography>
                    ))}
                </Box>

                <Box>
                    <Typography sx={{ fontSize: '16px', color: '#000', fontWeight: '600', mb: '10px', textAlign: 'start', whiteSpace: "pre-wrap" }}>Spent Pattern</Typography>

                    <Typography sx={{ fontSize: '14px', color: '#656565', fontWeight: '600', mb: '10px', whiteSpace: "pre-wrap" }}>Categorization:</Typography>
                    {selectedData[0]?.check_history[0]?.text?.behaviour_assumptions?.
                        spent_pattern?.assumptions?.categorization && selectedData[0]?.check_history[0]?.text?.behaviour_assumptions?.
                            spent_pattern?.assumptions?.categorization?.map((data, index) => (
                                <Typography sx={{ fontSize: '13px', color: '#656565', fontWeight: '500', mb: '10px', whiteSpace: "pre-wrap" }} key={index}>
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
                                            fontSize: '13px',
                                            fontFamily: 'sans-serif',
                                            marginLeft: '10px',
                                            whiteSpace: "pre-wrap"
                                        }}
                                    >

                                        {data || 'no data found'}
                                    </Markdown>
                                </Typography>
                            ))}

                    <Typography sx={{ fontSize: '15px', color: '#656565', fontWeight: '600', mb: '10px', whiteSpace: "pre-wrap" }}>Scoring:</Typography>
                    {selectedData[0]?.check_history[0]?.text?.behaviour_assumptions?.
                        spent_pattern?.assumptions?.scoring && selectedData[0]?.check_history[0]?.text?.behaviour_assumptions?.
                            spent_pattern?.assumptions?.scoring?.map((data, index) => (
                                <Typography sx={{ fontSize: '13px', color: '#656565', fontWeight: '500', mb: '10px', whiteSpace: "pre-wrap" }} key={index}>
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
                                            fontSize: '13px',
                                            fontFamily: 'sans-serif',
                                            marginLeft: '10px',
                                            whiteSpace: "pre-wrap"
                                        }}
                                    >

                                        {data}
                                    </Markdown>
                                </Typography>
                            ))}
                </Box>

                <Box>
                    <Typography sx={{ fontSize: '16px', color: '#000', fontWeight: '600', mb: '10px', textAlign: 'start', whiteSpace: "pre-wrap" }}>Transaction Pattern</Typography>

                    <Typography sx={{ fontSize: '14px', color: '#656565', fontWeight: '600', mb: '10px', whiteSpace: "pre-wrap" }}>Categorization:</Typography>
                    {selectedData[0]?.check_history[0]?.text?.behaviour_assumptions?.

                        transaction_pattern?.assumptions?.categorization && selectedData[0]?.check_history[0]?.text?.behaviour_assumptions?.

                            transaction_pattern?.assumptions?.categorization?.map((data, index) => (
                                <Typography sx={{ fontSize: '13px', color: '#656565', fontWeight: '500', mb: '10px', whiteSpace: "pre-wrap" }} key={index}>
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
                                            fontSize: '13px',
                                            fontFamily: 'sans-serif',
                                            marginLeft: '10px',
                                            whiteSpace: "pre-wrap"
                                        }}
                                    >

                                        {data || 'no data found'}
                                    </Markdown>
                                </Typography>
                            ))}

                    <Typography sx={{ fontSize: '15px', color: '#656565', fontWeight: '600', mb: '10px', whiteSpace: "pre-wrap" }}>Scoring:</Typography>
                    {selectedData[0]?.check_history[0]?.text?.behaviour_assumptions?.

                        transaction_pattern?.assumptions?.scoring && selectedData[0]?.check_history[0]?.text?.behaviour_assumptions?.

                            transaction_pattern?.assumptions?.scoring?.map((data, index) => (
                                <Typography sx={{ fontSize: '13px', color: '#656565', fontWeight: '500', mb: '10px', whiteSpace: "pre-wrap" }} key={index}>
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
                                            fontSize: '13px',
                                            fontFamily: 'sans-serif',
                                            marginLeft: '10px',
                                            whiteSpace: "pre-wrap"
                                        }}
                                    >
                                        {data}
                                    </Markdown>
                                </Typography>
                            ))}
                </Box>

                <Box sx={{ maxWidth: '600px' }}>
                    <Typography sx={{ fontSize: '16px', color: '#000', fontWeight: '600', mb: '10px', textAlign: 'start', whiteSpace: 'nowrap' }}>Transaction Frequency And Size Details</Typography>


                    <Typography sx={{ fontSize: '14px', color: '#656565', fontWeight: '600', mb: '10px' }}>Categorization:</Typography>
                    {selectedData[0]?.check_history[0]?.text?.behaviour_assumptions?.
                        granularity_of_transactions?.assumptions?.categorization && selectedData[0]?.check_history[0]?.text?.behaviour_assumptions?.
                            granularity_of_transactions?.assumptions?.categorization?.map((data, index) => (
                                <Typography sx={{ fontSize: '13px', color: '#656565', fontWeight: '500', mb: '10px' }} key={index}>
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
                                            fontSize: '13px',
                                            fontFamily: 'sans-serif',
                                            marginLeft: '10px',
                                            whiteSpace: "pre-wrap"
                                        }}
                                    >
                                        {data || 'no data found'}
                                    </Markdown>
                                </Typography>
                            ))}

                    <Typography sx={{ fontSize: '15px', color: '#656565', fontWeight: '600', mb: '10px', whiteSpace: "pre-wrap" }}>Scoring:</Typography>
                    {selectedData[0]?.check_history[0]?.text?.behaviour_assumptions?.
                        granularity_of_transactions?.assumptions?.scoring && selectedData[0]?.check_history[0]?.text?.behaviour_assumptions?.
                            granularity_of_transactions?.assumptions?.scoring?.map((data, index) => (
                                <Typography sx={{ fontSize: '13px', color: '#656565', fontWeight: '500', mb: '10px', whiteSpace: "pre-wrap" }} key={index}>
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
                                            fontSize: '13px',
                                            fontFamily: 'sans-serif',
                                            marginLeft: '10px',
                                            whiteSpace: "pre-wrap"
                                        }}
                                    >
                                        {data}
                                    </Markdown>
                                </Typography>
                            ))}

                </Box>
            </>
        )
    }


    return (
        <>
            <Stack direction={'row'}>
                <Box sx={{ bgcolor: '#fff', minHeight: '100vh', width: '20%' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', p: 1 }}>
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


                    <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: '100%', ml: '30px' }} >
                        <Link to={`/uploadDocument`} style={{ textDecoration: "none" }}>
                            <Stack direction={'row'} alignItems={'center'} spacing={1} sx={{ bgcolor: mainUrl[mainUrl.length - 1] === 'uploadDocument' ? '#fdcf6f' : '', borderRadius: mainUrl[mainUrl.length - 1] === 'uploadDocument' ? '8px' : '', width: "70%" }}>
                                <Typography
                                    sx={{
                                        fontSize: '14px',
                                        color: '#656565',
                                        fontWeight: '600',
                                        whiteSpace:"nowrap"
                                    }}
                                >
                                    Upload Document
                                </Typography>

                            </Stack>
                        </Link>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: '100%', height: '60%', ml: '30px' }} >

                        <Box>
                            <Box mb={'20px'}>
                                <Link to={`/usertableData`} style={{ textDecoration: "none" }}>
                                    <Stack direction={'row'} alignItems={'center'} spacing={1} sx={{ bgcolor: mainUrl[mainUrl.length - 1] === 'usertableData' ? '#aaa' : '', p: mainUrl[mainUrl.length - 1] === 'usertableData' ? 0.9 : '', borderRadius: mainUrl[mainUrl.length - 1] === 'usertableData' ? '8px' : '' }}>
                                        <GridViewIcon sx={{ color: '#656565', fontSize: '20px' }} />
                                        <Typography
                                            sx={{
                                                fontSize: '14px',
                                                color: '#656565',
                                                fontWeight: '600'
                                            }}
                                        >
                                            Home
                                        </Typography>

                                    </Stack>
                                </Link>
                            </Box>

                            {userLoginData.role_based_control === "Owner" ?
                                <Box mb={'20px'}>
                                    <Link to={`/costanalysis`} style={{ textDecoration: "none" }}>
                                        <Stack direction={'row'} alignItems={'center'} spacing={1} sx={{ bgcolor: mainUrl[mainUrl.length - 1] === 'costanalysis' ? '#aaa' : '', p: mainUrl[mainUrl.length - 1] === 'costanalysis' ? 0.9 : '', borderRadius: mainUrl[mainUrl.length - 1] === 'costanalysis' ? '8px' : '' }}>
                                            <QueryStatsIcon sx={{ color: '#656565', fontSize: '20px' }} />
                                            <Typography
                                                sx={{
                                                    fontSize: '14px',
                                                    color: '#656565',
                                                    fontWeight: '600'
                                                }}
                                            >
                                                Cost Analysis
                                            </Typography>

                                        </Stack>
                                    </Link>
                                </Box> : ''}
                            <Box mb={'20px'}
                                onClick={() => {
                                    setTimeout(() => {
                                        localStorage.removeItem('userData')
                                        window.location.href = '/'
                                    }, 100)
                                }}
                                sx={{ cursor: 'pointer' }}

                            >
                                <Stack direction={'row'} alignItems={'center'} spacing={1}>
                                    <LockOutlinedIcon sx={{ color: '#656565', fontSize: '20px' }} />
                                    <Typography
                                        sx={{
                                            fontSize: '14px',
                                            color: '#656565',
                                            fontWeight: '600'
                                        }}
                                    >
                                        Logout
                                    </Typography>

                                </Stack>


                            </Box>

                        </Box>



                    </Box>
                    <Stack direction={'row'} alignItems={'center'} spacing={1} ml={'20px'} mt={'60px'}>
                        <Box>
                            <Avatar src='Image' alt={`${userLoginData?.email || 'pooja@gmail.com'}`} sx={{ width: '35px', height: '35px' }} />
                        </Box>
                        <Box>
                            <Typography sx={{ fontSize: '15px', color: '#858585', fontWeight: '600', fontStyle: 'normal' }}>{userLoginData?.email || 'pooja@gmail.com'}</Typography>
                            <Typography sx={{ fontSize: '13px', color: '#858585', fontWeight: '500', fontStyle: 'normal' }}>{userLoginData?.role_based_control || 'admin'}</Typography>
                        </Box>
                    </Stack>
                </Box>


                <Box sx={{ width: '90%', bgcolor: '#EFEADB' }}>

                    <Stack direction={'row'} justifyContent={'space-between'} p={1} sx={{ bgcolor: '#06756f', borderBottomLeftRadius: '50px', borderBottomRightRadius: '50px' }}>
                        <Typography sx={{ mt: '15%', mb: '15px', p: 0.7, fontSize: '18px', color: '#000', fontWeight: '600', fontStyle: 'normal' }} >{title}</Typography>

                    </Stack>


                    <Stack direction={'row'} spacing={1.5} >
                        {/* <Box sx={{ bgcolor: "#fff", width: '80%', overflowY: 'auto', height: "80vh", borderRadius: '35px', boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;", scrollbarWidth: 'none', p: 1.5 }}>
                            {children}
                        </Box> */}

                        {mainUrl[mainUrl.length - 2] === 'demographic' || mainUrl[mainUrl.length - 2] === 'finalreport' || mainUrl[mainUrl.length - 2] === 'regularity' || mainUrl[mainUrl.length - 2] === 'spendpattern' || mainUrl[mainUrl.length - 2] === 'transactionpattern' || mainUrl[mainUrl.length - 2] === 'Transaction-Frequency-And-Size-Details' ? <Box sx={{ pt: '20px' }}>

                            <Stack direction={'row'} alignItems={'center'} spacing={0.5}>
                                <Tooltip
                                    title={tooltipFun()}
                                    placement="left"
                                    slotProps={{
                                        tooltip: {
                                            sx: {
                                                bgcolor: '#fff',
                                                maxWidth: '680px',
                                                overflowY: 'auto',
                                                height: '70vh',
                                                scrollbarWidth: 'none',
                                                boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;',
                                                borderRadius: '12px',
                                                p: 3,

                                            },
                                        },
                                    }}
                                >
                                    <InfoIcon sx={{ fontSize: '20px', color: '#656565' }} />
                                </Tooltip>

                                <Typography sx={{ fontSize: '14px', color: '#656565', fontWeight: '600', fontStyle: 'normal' }}>Assumptions</Typography>
                            </Stack>


                        </Box> : ''}

                    </Stack>

                </Box >

            </Stack >
        </>
    )
}

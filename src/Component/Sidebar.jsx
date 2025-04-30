import { Avatar, Box, CircularProgress, Stack, Tooltip, Typography } from '@mui/material'
import aihlogo from '../assets/aiHorizon.png';
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

                <Box sx={{ bgcolor: '#f0f0f4', minHeight: '100vh', width: '17%' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', p: 1 }}>
                        <img
                            src={aihlogo}
                            alt="logo"
                            style={{
                                width: "80%",
                                borderRadius: '10px',
                                mixBlendMode: 'darken'

                            }}
                        />
                    </Box>

                    <Box sx={{ mt: '10px', p: 2 }} >

                        {mainUrl[mainUrl.length - 2] === 'demographic' || mainUrl[mainUrl.length - 2] === 'finalreport' || mainUrl[mainUrl.length - 2] === 'regularity' || mainUrl[mainUrl.length - 2] === 'spendpattern' || mainUrl[mainUrl.length - 2] === 'transactionpattern' || mainUrl[mainUrl.length - 2] === 'Transaction-Frequency-And-Size-Details' ? '' :
                            <Box>
                                {!selectedId ?
                                    <>
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

                                    </>
                                    :
                                    <>

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
                                        <Stack
                                            direction={'row'}
                                            alignItems={'center'}
                                            spacing={1}

                                        >
                                            <Link to={`/demographic/${selectedId || mainUrl[mainUrl.length - 1]}`} style={{ textDecoration: "none" }}>
                                                <Stack direction={'row'} alignItems={'center'} spacing={1} mb={'20px'}>
                                                    <AddchartIcon sx={{ color: "#656565", fontSize: '20px' }} />
                                                    <Typography
                                                        sx={{
                                                            fontSize: '14px',
                                                            color: '#656565',
                                                            fontWeight: '600',
                                                            whiteSpace: 'nowrap',

                                                        }}
                                                    >
                                                        Demographic report
                                                    </Typography>
                                                    {loading ? <CircularProgress sx={{ color: '#000' }} size={20} /> : <CheckCircleIcon sx={{ fontSize: '20px', color: 'green', fontWeight: '600' }} />}
                                                </Stack>
                                            </Link>


                                        </Stack>


                                        <Stack direction={'row'} alignItems={'center'} spacing={1} mb={'20px'} cursor={'pointer'}>
                                            <AssuredWorkloadOutlinedIcon
                                                sx={{ color: '#656565', fontSize: '18px' }}
                                            />
                                            <Stack direction={'row'} alignItems={'center'} spacing={2} >
                                                <Typography sx={{ fontSize: '14px', color: '#656565', fontWeight: '600', whiteSpace: 'nowrap' }}>Banking behaviour report</Typography>

                                            </Stack>
                                        </Stack>


                                        <Box sx={{ ml: '18px' }}>

                                            <Link to={`/regularity/${selectedId || mainUrl[mainUrl.length - 1]}`} style={{ textDecoration: "none" }}>
                                                <Stack direction={'row'} alignItems={'center'} spacing={0.5} mb={'15px'} sx={{ cursor: 'pointer' }} >
                                                    <RuleOutlinedIcon sx={{ fontSize: '20px', color: '#656565', }} />
                                                    <Typography sx={{ fontSize: '12px', color: '#656565', fontWeight: '600', whiteSpace: 'pre-line' }}>Regularity and quantum of income flow</Typography>

                                                    {loading ?
                                                        <CircularProgress sx={{ color: '#656565' }} size={13} /> : <CheckCircleIcon sx={{ fontSize: '14px', color: 'green', fontWeight: '600' }} />}
                                                </Stack>
                                            </Link>

                                            <Stack direction={'row'} alignItems={'center'} spacing={0.5} mb={'8px'} sx={{ cursor: 'pointer' }}>
                                                <SavingsOutlinedIcon sx={{ fontSize: '20px', color: '#aaa', whiteSpace: 'pre-line' }} />
                                                <Typography sx={{ fontSize: '12px', color: '#aaa', fontWeight: '500' }} >saving pattern</Typography>
                                            </Stack>

                                            <Stack direction={'row'} alignItems={'center'} spacing={0.5} mb={'8px'} sx={{ cursor: 'pointer' }}>
                                                <AccountBalanceWalletOutlinedIcon sx={{ fontSize: '20px', color: '#aaa', }} />
                                                <Typography sx={{ fontSize: '12px', color: '#aaa', fontWeight: '500' }}>Balance build-up over period</Typography>
                                            </Stack>

                                            <Link to={`/spendpattern/${selectedId || mainUrl[mainUrl.length - 1]}`} style={{ textDecoration: "none" }}>
                                                <Stack direction={'row'} alignItems={'center'} spacing={0.5} mb={'8px'} sx={{ cursor: 'pointer' }}>
                                                    <CurrencyExchangeOutlinedIcon sx={{ fontSize: '20px', color: '#656565', }} />
                                                    <Typography sx={{ fontSize: '12px', color: '#656565', fontWeight: '600' }}>Spend pattern</Typography>
                                                    {loading ? <CircularProgress sx={{ color: '#fff' }} size={13} /> : <CheckCircleIcon sx={{ fontSize: '14px', color: 'green', fontWeight: '600' }} />}
                                                </Stack>
                                            </Link>


                                            <Link to={`/transactionpattern/${selectedId || mainUrl[mainUrl.length - 1]}`} style={{ textDecoration: "none" }}>
                                                <Stack direction={'row'} alignItems={'center'} spacing={0.5} mb={'8px'} sx={{ cursor: 'pointer' }}>
                                                    <CompareArrowsOutlinedIcon sx={{ fontSize: '20px', color: '#656565', }} />
                                                    <Typography sx={{ fontSize: '12px', color: '#656565', fontWeight: '600' }}>Transaction pattern</Typography>
                                                    {loading ? <CircularProgress sx={{ color: '#656565' }} size={13} /> : <CheckCircleIcon sx={{ fontSize: '14px', color: 'green', fontWeight: '600' }} />}
                                                </Stack>
                                            </Link>


                                            <Link to={`/Transaction-Frequency-And-Size-Details/${selectedId || mainUrl[mainUrl.length - 1]}`} style={{ textDecoration: "none" }}>
                                                <Stack direction={'row'} alignItems={'center'} spacing={0.5} mb={'8px'} sx={{ cursor: 'pointer' }}>
                                                    <BubbleChartOutlinedIcon sx={{ fontSize: '20px', color: '#656565', }} />
                                                    <Typography sx={{ fontSize: '12px', color: '#656565', fontWeight: '600' }}>Granularity of transaction</Typography>
                                                    {loading ? <CircularProgress sx={{ color: '#fff' }} size={13} /> : <CheckCircleIcon sx={{ fontSize: '14px', color: 'green', fontWeight: '600' }} />}

                                                </Stack>
                                            </Link>
                                            <Stack direction={'row'} alignItems={'center'} spacing={0.5} mb={'8px'} sx={{ cursor: 'pointer' }}>
                                                <DonutSmallOutlinedIcon sx={{ fontSize: '20px', color: '#aaa', }} />
                                                <Typography sx={{ fontSize: '12px', color: '#aaa', fontWeight: '600' }}>Debit to credit Ratio</Typography>
                                            </Stack>
                                        </Box>


                                        <Link to={`/finalreport/${selectedId || mainUrl[mainUrl.length - 1]}`} style={{ textDecoration: "none" }}>
                                            <Stack direction={'row'} alignItems={'center'} spacing={1} mb={'20px'} >
                                                <CreditScoreOutlinedIcon
                                                    sx={{
                                                        color: '#656565',
                                                        fontSize: '18px'
                                                    }}
                                                />
                                                <Stack direction={'row'} alignItems={'center'} spacing={2}>
                                                    <Typography
                                                        sx={{
                                                            fontSize: '14px',
                                                            color: '#656565',
                                                            fontWeight: '600'
                                                        }}
                                                    >
                                                        Final report
                                                    </Typography>
                                                    {loading ? <CircularProgress sx={{ color: '#fff' }} size={20} /> : <CheckCircleIcon sx={{ fontSize: '20px', color: 'green', fontWeight: '600' }} />}
                                                </Stack>
                                            </Stack>
                                        </Link>

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

                                    </>

                                }
                            </Box>}

                        {mainUrl[mainUrl.length - 2] === 'demographic' || mainUrl[mainUrl.length - 2] === 'finalreport' || mainUrl[mainUrl.length - 2] === 'regularity' || mainUrl[mainUrl.length - 2] === 'spendpattern' || mainUrl[mainUrl.length - 2] === 'transactionpattern' || mainUrl[mainUrl.length - 2] === 'Transaction-Frequency-And-Size-Details' ?
                            <>

                                <Box mb={'20px'}>
                                    <Link to={`/usertableData`} style={{ textDecoration: "none" }}>
                                        <Stack direction={'row'} alignItems={'center'} spacing={1}>
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
                                <Stack
                                    direction={'row'}
                                    alignItems={'center'}
                                    spacing={1}
                                    mb={'20px'}

                                >
                                    <Link to={`/demographic/${selectedId || mainUrl[mainUrl.length - 1]}`} style={{ textDecoration: "none" }}>
                                        <Stack direction={'row'} alignItems={'center'} spacing={1} sx={{ bgcolor: mainUrl[mainUrl.length - 2] === 'demographic' ? '#aaa' : '', p: mainUrl[mainUrl.length - 2] === 'demographic' ? 0.9 : '', borderRadius: mainUrl[mainUrl.length - 2] === 'demographic' ? '8px' : '' }}>
                                            <AddchartIcon sx={{ color: mainUrl[mainUrl.length - 2] === 'demographic' ? '#404040' : '#656565', fontSize: '20px' }} />
                                            <Typography
                                                sx={{
                                                    fontSize: '14px',
                                                    color: mainUrl[mainUrl.length - 2] === 'demographic' ? '#404040' : '#656565',
                                                    fontWeight: '600',
                                                    whiteSpace: 'nowrap',
                                                    mb: '20px',

                                                }}
                                            >
                                                Demographic report
                                            </Typography>
                                            {loading ? <CircularProgress sx={{ color: '#000' }} size={20} /> : <CheckCircleIcon sx={{ fontSize: '20px', color: 'green', fontWeight: '600' }} />}
                                        </Stack>
                                    </Link>


                                </Stack>


                                <Stack direction={'row'} alignItems={'center'} spacing={1} mb={'20px'} cursor={'pointer'}>
                                    <AssuredWorkloadOutlinedIcon
                                        sx={{ color: '#656565', fontSize: '18px' }}
                                    />
                                    <Stack direction={'row'} alignItems={'center'} spacing={2} >
                                        <Typography sx={{ fontSize: '14px', color: '#656565', fontWeight: '600', whiteSpace: 'nowrap' }}>Banking behaviour report</Typography>

                                    </Stack>
                                </Stack>


                                <Box sx={{ ml: '18px' }}>

                                    <Link to={`/regularity/${selectedId || mainUrl[mainUrl.length - 1]}`} style={{ textDecoration: "none" }}>
                                        <Stack direction={'row'} alignItems={'center'} spacing={0.5} mb={'8px'} sx={{ bgcolor: mainUrl[mainUrl.length - 2] === 'regularity' ? '#aaa' : '', p: mainUrl[mainUrl.length - 2] === 'regularity' ? 0.9 : '', borderRadius: mainUrl[mainUrl.length - 2] === 'regularity' ? '8px' : '' }} >
                                            <RuleOutlinedIcon sx={{ fontSize: '20px', color: mainUrl[mainUrl.length - 2] === 'regularity' ? '#404040' : '#656565', }} />
                                            <Typography sx={{ fontSize: '12px', color: mainUrl[mainUrl.length - 2] === 'regularity' ? '#404040' : '#656565', fontWeight: '600', whiteSpace: 'pre-line' }}>Regularity and quantum of income flow</Typography>

                                            {loading ?
                                                <CircularProgress sx={{ color: '#656565' }} size={13} /> : <CheckCircleIcon sx={{ fontSize: '14px', color: 'green', fontWeight: '600' }} />}
                                        </Stack>
                                    </Link>

                                    <Stack direction={'row'} alignItems={'center'} spacing={0.5} mb={'8px'} sx={{ cursor: 'pointer' }}>
                                        <SavingsOutlinedIcon sx={{ fontSize: '20px', color: '#aaa', whiteSpace: 'pre-line' }} />
                                        <Typography sx={{ fontSize: '12px', color: '#aaa', fontWeight: '500' }} >saving pattern</Typography>
                                    </Stack>

                                    <Stack direction={'row'} alignItems={'center'} spacing={0.5} mb={'8px'} sx={{ cursor: 'pointer' }}>
                                        <AccountBalanceWalletOutlinedIcon sx={{ fontSize: '20px', color: '#aaa', }} />
                                        <Typography sx={{ fontSize: '12px', color: '#aaa', fontWeight: '500' }}>Balance build-up over period</Typography>
                                    </Stack>

                                    <Link to={`/spendpattern/${selectedId || mainUrl[mainUrl.length - 1]}`} style={{ textDecoration: "none" }}>
                                        <Stack direction={'row'} alignItems={'center'} spacing={0.5} mb={'8px'} sx={{ bgcolor: mainUrl[mainUrl.length - 2] === 'spendpattern' ? '#aaa' : '', p: mainUrl[mainUrl.length - 2] === 'spendpattern' ? 0.9 : '', borderRadius: mainUrl[mainUrl.length - 2] === 'spendpattern' ? '8px' : '' }}>
                                            <CurrencyExchangeOutlinedIcon sx={{ fontSize: '20px', color: mainUrl[mainUrl.length - 2] === 'spendpattern' ? '#404040' : '#656565', }} />
                                            <Typography sx={{ fontSize: '12px', color: mainUrl[mainUrl.length - 2] === 'spendpattern' ? '#404040' : '#656565', fontWeight: '600' }}>Spend pattern</Typography>
                                            {loading ? <CircularProgress sx={{ color: '#fff' }} size={13} /> : <CheckCircleIcon sx={{ fontSize: '14px', color: 'green', fontWeight: '600' }} />}
                                        </Stack>
                                    </Link>


                                    <Link to={`/transactionpattern/${selectedId || mainUrl[mainUrl.length - 1]}`} style={{ textDecoration: "none" }}>
                                        <Stack direction={'row'} alignItems={'center'} spacing={0.5} mb={'8px'} sx={{ bgcolor: mainUrl[mainUrl.length - 2] === 'transactionpattern' ? '#aaa' : '', p: mainUrl[mainUrl.length - 2] === 'transactionpattern' ? 0.9 : '', borderRadius: mainUrl[mainUrl.length - 2] === 'transactionpattern' ? '8px' : '' }}>
                                            <CompareArrowsOutlinedIcon sx={{ fontSize: '20px', color: mainUrl[mainUrl.length - 2] === 'transactionpattern' ? '#404040' : '#656565', }} />
                                            <Typography sx={{ fontSize: '12px', color: mainUrl[mainUrl.length - 2] === 'transactionpattern' ? '#404040' : '#656565', fontWeight: '600' }}>Transaction pattern</Typography>
                                            {loading ? <CircularProgress sx={{ color: '#656565' }} size={13} /> : <CheckCircleIcon sx={{ fontSize: '14px', color: 'green', fontWeight: '600' }} />}
                                        </Stack>
                                    </Link>


                                    <Link to={`/Transaction-Frequency-And-Size-Details/${selectedId || mainUrl[mainUrl.length - 1]}`} style={{ textDecoration: "none" }}>
                                        <Stack direction={'row'} alignItems={'center'} spacing={0.5} mb={'8px'} sx={{ bgcolor: mainUrl[mainUrl.length - 2] === 'Transaction-Frequency-And-Size-Details' ? '#aaa' : '', p: mainUrl[mainUrl.length - 2] === 'Transaction-Frequency-And-Size-Details' ? 0.9 : '', borderRadius: mainUrl[mainUrl.length - 2] === 'Transaction-Frequency-And-Size-Details' ? '8px' : '' }}>
                                            <BubbleChartOutlinedIcon sx={{ fontSize: '20px', color: mainUrl[mainUrl.length - 2] === 'Transaction-Frequency-And-Size-Details' ? '#404040' : '#656565', }} />
                                            <Typography sx={{ fontSize: '12px', color: mainUrl[mainUrl.length - 2] === 'Transaction-Frequency-And-Size-Details' ? '#404040' : '#656565', fontWeight: '600' }}>Transaction Frequency And Size Details
                                            </Typography>
                                            {loading ? <CircularProgress sx={{ color: '#fff' }} size={13} /> : <CheckCircleIcon sx={{ fontSize: '14px', color: 'green', fontWeight: '600' }} />}

                                        </Stack>
                                    </Link>
                                    <Stack direction={'row'} alignItems={'center'} spacing={0.5} mb={'8px'} sx={{ cursor: 'pointer' }}>
                                        <DonutSmallOutlinedIcon sx={{ fontSize: '20px', color: '#aaa', }} />
                                        <Typography sx={{ fontSize: '12px', color: '#aaa', fontWeight: '600' }}>Debit to credit Ratio</Typography>
                                    </Stack>
                                </Box>


                                <Link to={`/finalreport/${selectedId || mainUrl[mainUrl.length - 1]}`} style={{ textDecoration: "none" }}>
                                    <Stack direction={'row'} alignItems={'center'} spacing={1} mb={'20px'} sx={{ bgcolor: mainUrl[mainUrl.length - 2] === 'finalreport' ? '#aaa' : '', p: mainUrl[mainUrl.length - 2] === 'finalreport' ? 0.9 : '', borderRadius: mainUrl[mainUrl.length - 2] === 'finalreport' ? '8px' : '' }}>
                                        <CreditScoreOutlinedIcon
                                            sx={{
                                                color: mainUrl[mainUrl.length - 2] === 'finalreport' ? '#404040' : '#656565',
                                                fontSize: '18px'
                                            }}
                                        />
                                        <Stack direction={'row'} alignItems={'center'} spacing={2}>
                                            <Typography
                                                sx={{
                                                    fontSize: '14px',
                                                    color: mainUrl[mainUrl.length - 2] === 'finalreport' ? '#404040' : '#656565',
                                                    fontWeight: '600'
                                                }}
                                            >
                                                Final report
                                            </Typography>
                                            {loading ? <CircularProgress sx={{ color: '#fff' }} size={20} /> : <CheckCircleIcon sx={{ fontSize: '20px', color: 'green', fontWeight: '600' }} />}
                                        </Stack>
                                    </Stack>
                                </Link>

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

                            </>
                            : ''}

                    </Box>
                </Box>


                <Box sx={{ width: '90%', bgcolor: '#f0f0f4' }}>


                    <Stack direction={'row'} justifyContent={'space-between'} p={1}>
                        <Typography sx={{ mt: '10px', mb: '15px', p: 0.7, fontSize: '18px', color: '#000', fontWeight: '600', fontStyle: 'normal' }} >{title}</Typography>

                        <Stack direction={'row'} alignItems={'center'} spacing={1}>
                            <Box>
                                <Avatar src='Image' alt={`${userLoginData?.email}`} />
                            </Box>
                            <Box>
                                <Typography sx={{ fontSize: '15px', color: '#858585', fontWeight: '600', fontStyle: 'normal' }}>{userLoginData?.email}</Typography>
                                <Typography sx={{ fontSize: '13px', color: '#858585', fontWeight: '500', fontStyle: 'normal' }}>{userLoginData?.role_based_control}</Typography>
                            </Box>
                        </Stack>
                    </Stack>


                    <Stack direction={'row'} spacing={1.5} >
                        <Box sx={{ bgcolor: "#fff", width: '80%', overflowY: 'auto', height: "80vh", borderRadius: '35px', boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;", scrollbarWidth: 'none', p: 1.5 }}>
                            {children}
                        </Box>
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

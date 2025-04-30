import loginLogo from '../../assets/logoofsmfg.png';
import {
    Box,
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    OutlinedInput,
    Stack,
    TextField,
    Typography,
    FormHelperText,
    CircularProgress,
    useMediaQuery,
} from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import WestOutlinedIcon from '@mui/icons-material/WestOutlined';
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast, ToastContainer } from 'react-toastify';
import API from '../../Component/BaseURL';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import React from 'react';



export default function Login() {
    const [step, setStep] = useState(1);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const [errors, setErrors] = useState({
        emp_id: false,
        password: false,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const isSmallScreen = useMediaQuery("(max-width:950px)")

    const navigate = useNavigate()


    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };



    const validateFields = () => {
        let validationErrors = {};

        if (step === 1 && email.trim() === "") {
            validationErrors.emp_id = true;
        }

        if (step === 2 && password.trim() === "") {
            validationErrors.password = true;
        }

        setErrors({ ...errors, ...validationErrors });
        return Object.keys(validationErrors).length === 0;
    };


    const notify = (msg) => toast(msg);

    const handleLogin = async () => {
        if (!email) {
            notify('Email is required');
            return;
        }

        if (!password) {
            notify('Password is required');
            return;
        }
        // try {
        //     setLoading(true)
        //     const response = await axios.post(API.loginUrl, { email, password });
        //     console.log('response----->', response.data);

        //     const dataOfUser = {
        //         _id: response.data.user._id,
        //         email: response.data.user.email,
        //         password: response.data.user.password,
        //         role_based_control: response.data.user.role_based_control,
        //         updatedAt: response.data.user.updatedAt
        //     }

        //     localStorage.setItem('userData', JSON.stringify(dataOfUser))
           
        // } catch (error) {
        //     console.log(error);
        //     notify(error.response.data.message);
        //     setLoading(false)
        // }
        setTimeout(() => {
            setLoading(false)
            navigate(`/uploadDocument`)
        }, 2000);

    };

    const stepField = () => {
        if (!validateFields()) return;

        setLoading(true);

        setTimeout(() => {
            setStep((prev) => prev + 1);
            setLoading(false);
        }, 1000);
    };


    return (
        <>

            <Box sx={{ bgcolor: "#000", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
                <Box>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        textAlign="center"
                        mb={3}
                    >
                        <img
                            src={loginLogo}
                            alt="logo"
                            style={{
                                width: "70%",
                            }}
                        />

                        <Typography
                            fontSize={"18px"}
                            fontWeight={"600"}
                            color={"#FFAC1C"}
                            mt={2}
                        >
                            Welcome To smfg-india
                        </Typography>

                        <Typography
                            fontSize={"16px"}
                            fontWeight={"500"}
                            color={"#737373"}
                            mt={"8px"}
                        >
                            Log in with your email id
                        </Typography>
                    </Box>


                    {step === 1 && (
                        <>
                            <Typography
                                sx={{
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    color: "#6b6b6b",
                                    mb: "5px",
                                }}
                            >
                                Email id <span style={{ color: "red" }}>*</span>
                            </Typography>
                            <TextField
                                type="text"
                                placeholder="Enter email id..."
                                name="emp_id"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#fff',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#fff',
                                        },
                                    },
                                    '& input': {
                                        color: '#fff',
                                        fontSize: '15px',
                                        height: '17px',
                                        padding: '12px 14px',
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: '#fff',
                                        fontSize: '14px',
                                    },
                                    '& .MuiInputBase-input::placeholder': {
                                        color: '#fff',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                    },

                                    width: "400px"
                                }}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                error={errors.emp_id}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        stepField()
                                    }
                                }}
                            />
                            {errors.emp_id && (
                                <FormHelperText>Please enter a valid email id</FormHelperText>
                            )}

                            <Box sx={{ display: "flex", justifyContent: "center" }}>
                                <Button
                                    sx={{
                                        bgcolor: "#FFAC1C",
                                        color: "#fff",
                                        width: "30%",
                                        textTransform: "none",
                                        boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;',
                                        mt: "20px",
                                    }}
                                    onClick={stepField}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <CircularProgress size={20} sx={{ color: "white" }} />
                                    ) : (
                                        <>
                                            <Typography sx={{ flexGrow: 1, textAlign: "center" }} >
                                                Next
                                            </Typography>
                                            <EastIcon sx={{ color: "white", fontSize: '18px' }} />
                                        </>
                                    )}
                                </Button>
                            </Box>


                        </>
                    )}

                    {step === 2 && (
                        <>
                            <Box display={"flex"} justifyContent={"center"} mb={"20px"} p={1}>
                                <FormControl
                                    sx={{ width: isSmallScreen ? "80%" : "100%", transition: "ease-in" }}
                                    error={errors.password}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: "14px",
                                            fontWeight: "600",
                                            color: "#fff",
                                            mb: "5px",
                                        }}
                                    >
                                        Password <span style={{ color: "red" }}>*</span>
                                        <Typography sx={{
                                            fontSize: "14px",
                                            fontWeight: "500",
                                            color: "#fff",
                                            mb: "10px",
                                        }} >{email}</Typography>
                                    </Typography>


                                    <TextField
                                        type={showPassword ? 'text' : 'password'}
                                        variant="outlined"
                                        placeholder={"Enter your password here"}

                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                    borderColor: '#fff',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: '#fff',
                                                },
                                            },
                                            '& input': {
                                                color: '#fff',
                                                fontSize: '15px',
                                                height: '17px',
                                                padding: '12px 14px',
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: '#fff',
                                                fontSize: '14px',
                                            },
                                            '& .MuiInputBase-input::placeholder': {
                                                color: '#fff',
                                                fontSize: '14px',
                                                fontWeight: '500',
                                            },

                                            width: "400px"
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                loginCredentials()
                                            }
                                        }}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end">
                                                        {!showPassword ? (
                                                            <VisibilityOff sx={{ color: '#fff', fontSize: '20px' }} />
                                                        ) : (
                                                            <Visibility sx={{ color: '#fff', fontSize: '20px' }} />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />


                                    {errors.password && (
                                        <FormHelperText>Please enter your password</FormHelperText>
                                    )}
                                </FormControl>
                            </Box>

                            <Box display={"flex"} justifyContent={"center"} gap={2} width={"100%"}>
                                <Button
                                    sx={{
                                        bgcolor: "#FFAC1C",
                                        color: "#fff",
                                        width: "30%",
                                        textTransform: "none",
                                        boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;'

                                    }}
                                    onClick={() => setStep(1)}

                                // disabled={loading}
                                >

                                    <>
                                        <WestOutlinedIcon sx={{ mr: '8px', color: "white", fontSize: '18px' }} />
                                        <Typography sx={{ flexGrow: 1, textAlign: "center" }} >
                                            Back
                                        </Typography>
                                    </>
                                </Button>
                                <Button
                                    sx={{
                                        bgcolor: "#17bcbc",
                                        color: "#fff",
                                        width: "30%",
                                        textTransform: "none",
                                        boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;'
                                    }}
                                    disabled={loading}
                                    onClick={handleLogin}
                                >
                                    {loading ? (
                                        <CircularProgress size={24} sx={{ color: "white" }} />
                                    ) : (
                                        <>
                                            <Typography sx={{ textAlign: "center" }}  >
                                                Login
                                            </Typography>
                                            <EastIcon sx={{ color: "white", fontSize: '18px' }} />
                                        </>
                                    )}
                                </Button>
                            </Box>
                        </>
                    )}




                </Box>
            </Box >
            <ToastContainer />
        </>
    );
}

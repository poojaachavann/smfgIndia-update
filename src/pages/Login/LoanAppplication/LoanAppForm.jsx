import { Box, Button, FormControl, MenuItem, Modal, Select, Stack, TextField, Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import API from '../../../Component/BaseURL';
import Sidebar from '../../../Component/Sidebar';
import debounce from 'lodash.debounce';
import './loanAppForm.css'
import validator from 'email-validator'
import dayjs from "dayjs";
import React from 'react';



export default function LoanAppForm() {
    const url = window.location.href;
    const mainUrl = url.split('/');


    const urls = window.location.href
    const mainUrls = urls.split('/')
    const domainPath = mainUrls[mainUrls.length - 2]


    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);

    const [userLoginData, setUserLoginData] = useState('')
    const userDataOfLogin = localStorage.getItem('userData')
    useEffect(() => {
        if (userDataOfLogin) {
            setUserLoginData(JSON.parse(userDataOfLogin))
        }
    }, [])


    const fileInputRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const [loading, setLoading] = useState(false)

    const [validFiles, setValidFiles] = useState([]);

    const processFile = async (files) => {
        const maxFileSize = 10 * 1024 * 1024;
        const allowedExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.pdf'];
        const unsupportedExtensions = ['.docx', '.gif', '.svg', '.txt', '.xls'];

        const validFiles = [];
        const errors = [];

        for (let file of files) {
            const fileNameLower = file.name.toLowerCase();
            const fileExtension = fileNameLower.slice(fileNameLower.lastIndexOf('.'));

            if (unsupportedExtensions.includes(fileExtension)) {
                errors.push(`File type not supported: ${fileExtension}.`);
            } else if (!allowedExtensions.includes(fileExtension)) {
                errors.push('Supported file types are: png, jpg, jpeg, webp, pdf.');
            } else if (file.size > maxFileSize) {
                errors.push('File size should not exceed 5MB.');
            } else {
                validFiles.push(file);
            }
        }

        if (errors.length > 0) {
            setError(errors.join(' '));
            setFileName('');
        } else {
            setError('');
            setValidFiles(validFiles);

            const reader = new FileReader();
            reader.onloadend = () => {
                // Handle preview if needed
            };
            reader.readAsDataURL(validFiles[0]);
        }

        return validFiles;
    };

    const handleFileChange = (event) => {
        const files = event.target.files;
        processFile(files).then(validFiles => {
            if (validFiles.length > 0) {
                setValidFiles(validFiles);
            }
        });
    };



    const [updateValue, setUpdateValue] = useState({
        name: '',
        mobile: '',
        emailId: '',
        gender: '',
        dob: '',
        maritalStatus: '',
        relationshipWithBarrower: '',
        otherRelationship: '',
        nameOfGuarantor: '',
        employmentStatus: '',
        numberOfDependents: '',
        numberOfLoansEmis: '',
        typeOfResidense: '',
        livingCurrentResidenceSince: '',
        houseFlatBuilding: '',
        streetName: '',
        localityArea: '',
        landmark: '',
        city: '',
        state: '',
        country: '',
        pinCode: '',
        aadharCard: '',
        panCard: '',
        cibilScore: ''
    });


    const [isMobileValid, setIsMobileValid] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isAadharCardValid, setIsAadharCardValid] = useState(true);
    const [isPanCardValid, setIsPanCardValid] = useState(true);
    const [isBirthDateValid, setIsBirthDateValid] = useState('');

    const handleInputChange = {
        name: (e) => {
            setUpdateValue(prevState => {
                const updatedState = { ...prevState, name: e.target.value };
                return updatedState;
            });
        },
        mobile: (e) => {
            setUpdateValue(prevState => {
                let regex = new RegExp(/^(0|91)?[6-9][0-9]{9}$/);
                const mobileValue = e.target.value;
                const isValid = regex.test(mobileValue);

                setIsMobileValid(isValid);

                const updatedState = {
                    ...prevState,
                    mobile: mobileValue
                };

                return updatedState;
            });
        },
        emailId: (e) => {
            setUpdateValue(prevState => {
                const emailValue = e.target.value;
                const isValid = validator.validate(emailValue);

                setIsEmailValid(isValid)

                const updatedState = {
                    ...prevState,
                    emailId: emailValue
                };
                return updatedState;

            });
        },
        gender: (e) => {
            setUpdateValue(prevState => {
                const updatedState = { ...prevState, gender: e.target.value };
                return updatedState;
            });
        },
        dob: (e) => {
            const selectedDate = e.target.value;
            const currentDate = dayjs();
            const dob = dayjs(selectedDate);
            const age = currentDate.diff(dob, "year");

            if (age >= 18 && age <= 75) {
                setIsBirthDateValid("");
            } else {
                setIsBirthDateValid("Age should be between 18 and 75 years");
            }

            setUpdateValue((prevState) => ({
                ...prevState,
                dob: selectedDate,
            }));
        },

        maritalStatus: (e) => {
            setUpdateValue(prevState => {
                const updatedState = { ...prevState, maritalStatus: e.target.value };
                return updatedState;
            });
        },
        nameOfGuarantor: (e) => {
            setUpdateValue(prevState => {
                const updatedState = { ...prevState, nameOfGuarantor: e.target.value };
                return updatedState;
            });
        },
        relationshipWithBarrower: (e) => {
            setUpdateValue(prevState => {
                const updatedState = { ...prevState, relationshipWithBarrower: e.target.value };
                return updatedState;
            });
        },
        otherRelationship: (e) => {
            setUpdateValue(prevState => {
                const updatedState = { ...prevState, otherRelationship: e.target.value };
                return updatedState;
            });
        },
        employmentStatus: (e) => {
            setUpdateValue(prevState => {
                const updatedState = { ...prevState, employmentStatus: e.target.value };
                return updatedState;
            });
        },
        numberOfDependents: (e) => {
            setUpdateValue(prevState => {
                const updatedState = { ...prevState, numberOfDependents: e.target.value };
                return updatedState;
            });
        },
        numberOfLoansEmis: (e) => {
            setUpdateValue(prevState => {
                const updatedState = { ...prevState, numberOfLoansEmis: e.target.value };
                return updatedState;
            });
        },
        typeOfResidense: (e) => {
            setUpdateValue(prevState => {
                const updatedState = { ...prevState, typeOfResidense: e.target.value };
                return updatedState;
            });
        },
        livingCurrentResidenceSince: (e) => {
            setUpdateValue(prevState => {
                const updatedState = { ...prevState, livingCurrentResidenceSince: e.target.value };
                return updatedState;
            });
        },
        houseFlatBuilding: (e) => {
            setUpdateValue(prevState => {
                const updatedState = { ...prevState, houseFlatBuilding: e.target.value };
                return updatedState;
            });
        },
        streetName: (e) => {
            setUpdateValue(prevState => {
                const updatedState = { ...prevState, streetName: e.target.value };
                return updatedState;
            });
        },
        localityArea: (e) => {
            setUpdateValue(prevState => {
                const updatedState = { ...prevState, localityArea: e.target.value };
                return updatedState;
            });
        },
        landmark: (e) => {
            setUpdateValue(prevState => {
                const updatedState = { ...prevState, landmark: e.target.value };
                return updatedState;
            });
        },
        city: (e) => {
            setUpdateValue(prevState => {
                const updatedState = { ...prevState, city: e.target.value };
                return updatedState;
            });
        },
        state: (e) => {
            setUpdateValue(prevState => {
                const updatedState = { ...prevState, state: e.target.value };
                return updatedState;
            });
        },
        country: (e) => {
            setUpdateValue(prevState => {
                const updatedState = { ...prevState, country: e.target.value };
                return updatedState;
            });
        },
        pinCode: (e) => {
            setUpdateValue(prevState => {
                const updatedState = { ...prevState, pinCode: e.target.value };

                return updatedState;

            });
        },

        aadharCard: (e) => {
            setUpdateValue(prevState => {
                const regex = /^[2-9]{1}[0-9]{3}[ ]?[0-9]{4}[ ]?[0-9]{4}$/;
                const aadharCardValue = e.target.value;
                const isValid = regex.test(aadharCardValue);
                setIsAadharCardValid(isValid);

                const updatedState = {
                    ...prevState,
                    aadharCard: aadharCardValue
                };

                return updatedState;

            });
        },
        panCard: (e) => {
            setUpdateValue(prevState => {
                const regex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

                const panCardValue = e.target.value.trim().toUpperCase();
                const isValid = regex.test(panCardValue);

                setIsPanCardValid(isValid);

                const updatedState = {
                    ...prevState,
                    panCard: panCardValue
                };

                return updatedState;

            });
        },
        cibilScore: (e) => {
            setUpdateValue(prevState => {
                const updatedState = { ...prevState, cibilScore: e.target.value };

                return updatedState;

            });
        }

    };


    const currentYear = dayjs().year();
    const minDate = dayjs().subtract(75, "year").format("YYYY-MM-DD");
    const maxDate = dayjs().subtract(18, "year").format("YYYY-MM-DD");


    const imageRespose = async (files) => {
        try {
            setIsLoading(true);

            const fileArray = Array.isArray(files) ? files : [files];
            const formData = new FormData();

            fileArray.forEach(file => {
                formData.append('file_path', file);
            });

            formData.append("id", mainUrl[mainUrl.length - 1]);

            const response = await axios.post(API.fileUploadByid, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            loanAppWithAi()
            loanAppFormByAi(response.data.updatedData.file_path[0]);
        } catch (error) {
            console.error("Upload failed:", error);
        }
    };

    const validateFields = () => {
        return updateValue.name && updateValue.mobile && updateValue.emailId &&
            updateValue.gender && updateValue.dob && updateValue.maritalStatus &&
            updateValue.employmentStatus && updateValue.numberOfDependents &&
            updateValue.numberOfLoansEmis && updateValue.typeOfResidense &&
            updateValue.livingCurrentResidenceSince && updateValue.houseFlatBuilding &&
            updateValue.streetName && updateValue.localityArea && updateValue.landmark &&
            updateValue.city && updateValue.state && updateValue.country && updateValue.pinCode && updateValue.aadharCard && updateValue.panCard && updateValue.nameOfGuarantor && updateValue.cibilScore
    };

    const loanAppWithAi = async () => {

        try {
            const response = await axios.post(API.loanformapi, {
                _id: mainUrl[mainUrl.length - 1],
                ...updateValue,
                user_id: userLoginData._id || '',
            })

            console.log('post data ', response.data)
        } catch (error) {
            console.log(error)

        }
    }

    const loanAppFormByAi = async (file) => {
        try {
            setLoading(true)
            handleOpen()
            const response = await axios.post(API.startLoanForm, {
                pdfPath: file,
                formJson: {
                    _id: mainUrl[mainUrl.length - 1],
                    ...updateValue
                },
                userId: mainUrl[mainUrl.length - 1],
                domain: domainPath

            })
            console.log('response ai', response.data);
            setLoading(false)
            setOpen(false)
            setTimeout(() => {
                window.location.href = '/usertableData'
            }, 1000)
        } catch (error) {
            console.log(error)
            setLoading(false)
            setOpen(false)

        }
    }

    const [pincodeData, setPincodeData] = useState([])
    const pinCodeAPI = async () => {
        if (!updateValue.city) return;

        try {
            const response = await axios.get(`https://api.postalpincode.in/postoffice/${updateValue.city}`);
            console.log("Response pincode", response.data);
            setPincodeData(response.data[0]?.PostOffice || []);
        } catch (error) {
            console.error("Error fetching pin code data:", error);
        }
    };

    const debouncedPinCodeAPI = debounce(() => {
        pinCodeAPI();
    }, 1000);

    useEffect(() => {
        if (updateValue.city) {
            debouncedPinCodeAPI();
        }
        return () => {
            debouncedPinCodeAPI.cancel();
        };
    }, [updateValue.city]);





    return (
        <>
            <Sidebar title={'Loan Applicant Persona Score Card'} loading={loading}>


                <Box sx={{ display: 'flex', justifyContent: "center", p: 2 }}>
                    <Box width={'95%'}>

                        <Box sx={{ overflowY: 'auto', height: '65vh', scrollbarWidth: 'none' }}>
                            <Stack direction={'row'} justifyContent={'space-around'} gap={2} mb={'30px'} >
                                <Box>
                                    <Typography sx={{ color: '#656565', fontWeight: '500', fontSize: '13px' }}>
                                        Name<span style={{ color: 'red', fontSize: '15px' }}>*</span>
                                    </Typography>

                                    <TextField
                                        type="text"
                                        variant="standard"
                                        value={updateValue.name}
                                        onChange={handleInputChange.name}
                                        sx={{
                                            '& .MuiInputLabel-root': { color: "#656565", fontSize: '14px' },
                                            '& .MuiInput-underline:before': { borderBottomColor: '#656565' },
                                            '& .MuiInput-underline:hover:before': { borderBottomColor: '#656565' },
                                            '& .MuiInput-underline:after': { borderBottomColor: '#656565' },
                                            '& .MuiInput-input': { color: "#656565", fontSize: '14px' },
                                            '& .MuiInput-input::placeholder': { color: '#aaa', fontSize: '13px' },
                                            width: {
                                                xs: '100%',
                                                sm: '300px',
                                                md: '300px',
                                                lg: '300px',
                                            },
                                            '& .MuiSelect-icon': { color: '#656565' }
                                        }}
                                        placeholder="Enter name..."
                                    />
                                </Box>

                                <Box>

                                    <Typography sx={{ color: '#656565', fontWeight: '500', fontSize: '13px', }}>Mobile<span style={{ color: 'red', fontSize: '15px' }}>*</span></Typography>

                                    <TextField
                                        type="number"
                                        variant="standard"

                                        value={updateValue.mobile}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (value.length <= 10) {
                                                handleInputChange.mobile(e);
                                            }
                                        }}
                                        sx={{
                                            '& .MuiInputLabel-root': { color: "#656565", fontSize: '14px' },
                                            '& .MuiInput-underline:before': { borderBottomColor: '#656565' },
                                            '& .MuiInput-underline:hover:before': { borderBottomColor: '#656565' },
                                            '& .MuiInput-underline:after': { borderBottomColor: '#656565' },
                                            '& .MuiInput-input': { color: "#656565", fontSize: '14px' },
                                            '& .MuiInput-input::placeholder': { color: '#aaa', fontSize: '13px' },
                                            width: {
                                                xs: '100%',
                                                sm: '300px',
                                                md: '300px',
                                                lg: '300px',
                                            },
                                            '& .MuiSelect-icon': { color: '#656565' },
                                            mb: '8px',

                                        }}
                                        placeholder="Enter mobile number..."

                                    />
                                    {!isMobileValid && <Typography style={{ color: 'red', fontSize: "12px" }}>Invalid mobile number.</Typography>}

                                </Box>
                                <Box>

                                    <Typography sx={{ color: '#656565', fontWeight: '500', fontSize: '13px', }}>Email Id<span style={{ color: 'red', fontSize: '15px' }}>*</span></Typography>

                                    <TextField
                                        type="text"
                                        variant="standard"
                                        value={updateValue.emailId}
                                        onChange={handleInputChange.emailId}
                                        sx={{
                                            '& .MuiInputLabel-root': { color: "#656565", fontSize: '14px' },
                                            '& .MuiInput-underline:before': { borderBottomColor: '#656565' },
                                            '& .MuiInput-underline:hover:before': { borderBottomColor: '#656565' },
                                            '& .MuiInput-underline:after': { borderBottomColor: '#656565' },
                                            '& .MuiInput-input': { color: "#656565", fontSize: '14px' },
                                            '& .MuiInput-input::placeholder': { color: '#aaa', fontSize: '13px' },
                                            width: {
                                                xs: '100%',
                                                sm: '300px',
                                                md: '300px',
                                                lg: '300px',
                                            },
                                            '& .MuiSelect-icon': { color: '#656565' },
                                            mb: '8px',


                                        }}
                                        placeholder="Enter email id..."

                                    />
                                    {!isEmailValid && <Typography style={{ color: 'red', fontSize: "12px" }}>Invalid email id.</Typography>}

                                </Box>
                            </Stack>
                            <Stack direction={'row'} justifyContent={'space-around'} gap={2} mb={'30px'}>
                                <Box>

                                    <Typography sx={{ color: '#656565', fontWeight: '500', fontSize: '13px', }}>Gender<span style={{ color: 'red', fontSize: '15px' }}>*</span></Typography>

                                    <FormControl variant="standard" sx={{
                                        '& .MuiInputLabel-root': { color: "#656565", fontSize: '14px' },
                                        '& .MuiInput-underline:before': { borderBottomColor: '#656565' },
                                        '& .MuiInput-underline:hover:before': { borderBottomColor: '#656565' },
                                        '& .MuiInput-underline:after': { borderBottomColor: '#656565' },
                                        '& .MuiInput-input': { color: "#656565", fontSize: '14px' },
                                        '& .MuiInput-input::placeholder': { color: '#aaa', fontSize: '13px' },
                                        width: {
                                            xs: '100%',
                                            sm: '300px',
                                            md: '300px',
                                            lg: '300px',
                                        },
                                        '& .MuiSelect-icon': { color: '#656565' },



                                    }}>
                                        <Select
                                            label="Select"
                                            value={updateValue.gender}
                                            onChange={handleInputChange.gender}
                                        >
                                            <MenuItem value="Male">Male</MenuItem>
                                            <MenuItem value="Female">Female</MenuItem>
                                        </Select>
                                    </FormControl>

                                </Box>
                                <Box>
                                    <Typography sx={{ color: "#656565", fontWeight: "500", fontSize: "13px" }}>
                                        Date of birth <span style={{ color: "red", fontSize: "15px" }}>*</span>
                                    </Typography>

                                    <TextField
                                        type="date"
                                        variant="standard"
                                        value={updateValue.dob}
                                        onChange={handleInputChange.dob}
                                        error={!!error}
                                        helperText={error}
                                        inputProps={{
                                            min: minDate,
                                            max: maxDate,
                                        }}
                                        sx={{
                                            "& .MuiInputLabel-root": { color: "#656565", fontSize: "14px" },
                                            "& .MuiInput-underline:before": { borderBottomColor: "#656565" },
                                            "& .MuiInput-underline:hover:before": { borderBottomColor: "#656565" },
                                            "& .MuiInput-underline:after": { borderBottomColor: "#656565" },
                                            "& .MuiInput-input": { color: "#656565", fontSize: "14px" },
                                            "& .MuiInput-input::placeholder": { color: "#aaa", fontSize: "13px" },
                                            width: {
                                                xs: "100%",
                                                sm: "300px",
                                                md: "300px",
                                                lg: "300px",
                                            },
                                            "& .MuiSelect-icon": { color: "#656565" },

                                            mb: "8px",
                                        }}
                                    />
                                    {isBirthDateValid && <Typography style={{ color: 'red', fontSize: "12px" }}>{isBirthDateValid}</Typography>}
                                </Box>
                                <Box>

                                    <Typography sx={{ color: '#656565', fontWeight: '500', fontSize: '13px', }}>Marital Status<span style={{ color: 'red', fontSize: '15px' }}>*</span></Typography>


                                    <FormControl variant="standard" sx={{
                                        '& .MuiInputLabel-root': { color: "#656565", fontSize: '14px' },
                                        '& .MuiInput-underline:before': { borderBottomColor: '#656565' },
                                        '& .MuiInput-underline:hover:before': { borderBottomColor: '#656565' },
                                        '& .MuiInput-underline:after': { borderBottomColor: '#656565' },
                                        '& .MuiInput-input': { color: "#656565", fontSize: '14px' },
                                        '& .MuiInput-input::placeholder': { color: '#aaa', fontSize: '13px' },
                                        width: {
                                            xs: '100%',
                                            sm: '300px',
                                            md: '300px',
                                            lg: '300px',
                                        },
                                        '& .MuiSelect-icon': { color: '#656565' },



                                    }}>
                                        <Select
                                            label="Select"
                                            value={updateValue.maritalStatus}
                                            onChange={handleInputChange.maritalStatus}

                                        >

                                            <MenuItem value="Single">Single</MenuItem>
                                            <MenuItem value="Married">Married</MenuItem>
                                            <MenuItem value="Divorced">Divorced</MenuItem>
                                            <MenuItem value="Widowed">Widowed</MenuItem>

                                        </Select>
                                    </FormControl>

                                </Box>
                            </Stack>

                            <Stack direction={'row'} justifyContent={'space-around'} gap={2} mb={'30px'}>

                                <Box>

                                    <Typography sx={{ color: '#656565', fontWeight: '500', fontSize: '13px', }}>Aadhar Card<span style={{ color: 'red', fontSize: '15px' }}>*</span></Typography>

                                    <TextField
                                        type="number"
                                        variant="standard"
                                        value={updateValue.aadharCard}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (value.length <= 12) {
                                                handleInputChange.aadharCard(e);
                                            }
                                        }}

                                        sx={{
                                            '& .MuiInputLabel-root': { color: "#656565", fontSize: '14px' },
                                            '& .MuiInput-underline:before': { borderBottomColor: '#656565' },
                                            '& .MuiInput-underline:hover:before': { borderBottomColor: '#656565' },
                                            '& .MuiInput-underline:after': { borderBottomColor: '#656565' },
                                            '& .MuiInput-input': { color: "#656565", fontSize: '14px' },
                                            '& .MuiInput-input::placeholder': { color: '#aaa', fontSize: '13px' },
                                            width: {
                                                xs: '100%',
                                                sm: '300px',
                                                md: '300px',
                                                lg: '300px',
                                            },
                                            '& .MuiSelect-icon': { color: '#656565' },
                                            mb: '8px',


                                        }}
                                        placeholder="Enter aadhar card..."

                                    />
                                    {!isAadharCardValid && <Typography style={{ color: 'red', fontSize: "12px" }}>Invalid aadhar number.</Typography>}

                                </Box>



                                <Box>

                                    <Typography sx={{ color: '#656565', fontWeight: '500', fontSize: '13px', }}>PAN Card<span style={{ color: 'red', fontSize: '15px' }}>*</span></Typography>

                                    <TextField
                                        type="text"
                                        variant="standard"
                                        value={updateValue.panCard}
                                        onChange={handleInputChange.panCard}
                                        sx={{
                                            '& .MuiInputLabel-root': { color: "#656565", fontSize: '14px' },
                                            '& .MuiInput-underline:before': { borderBottomColor: '#656565' },
                                            '& .MuiInput-underline:hover:before': { borderBottomColor: '#656565' },
                                            '& .MuiInput-underline:after': { borderBottomColor: '#656565' },
                                            '& .MuiInput-input': { color: "#656565", fontSize: '14px' },
                                            '& .MuiInput-input::placeholder': { color: '#aaa', fontSize: '13px' },
                                            width: {
                                                xs: '100%',
                                                sm: '300px',
                                                md: '300px',
                                                lg: '300px',
                                            },
                                            '& .MuiSelect-icon': { color: '#656565' },
                                            mb: '8px',
                                        }}
                                        placeholder="Enter pan card..."

                                    />
                                    {!isPanCardValid && <Typography style={{ color: 'red', fontSize: "12px" }}>Invalid PAN Card.</Typography>}

                                </Box>

                                <Box>

                                    <Typography sx={{ color: '#656565', fontWeight: '500', fontSize: '13px', }}>Name of Guarantor <span style={{ color: 'red', fontSize: '15px' }}>*</span></Typography>

                                    <TextField
                                        type="text"
                                        variant="standard"
                                        value={updateValue.nameOfGuarantor}
                                        onChange={handleInputChange.nameOfGuarantor}
                                        sx={{
                                            '& .MuiInputLabel-root': { color: "#656565", fontSize: '14px' },
                                            '& .MuiInput-underline:before': { borderBottomColor: '#656565' },
                                            '& .MuiInput-underline:hover:before': { borderBottomColor: '#656565' },
                                            '& .MuiInput-underline:after': { borderBottomColor: '#656565' },
                                            '& .MuiInput-input': { color: "#656565", fontSize: '14px' },
                                            '& .MuiInput-input::placeholder': { color: '#aaa', fontSize: '13px' },
                                            width: {
                                                xs: '100%',
                                                sm: '300px',
                                                md: '300px',
                                                lg: '300px',
                                            },
                                            '& .MuiSelect-icon': { color: '#656565' },



                                        }}
                                        placeholder="Enter name of guarantor..."

                                    />

                                </Box>




                            </Stack>

                            <Stack direction={'row'} justifyContent={'space-around'} gap={2} mb={'30px'}>

                                <Box>

                                    <Typography sx={{ color: '#656565', fontWeight: '500', fontSize: '13px', }}>Relationship with Borrower</Typography>



                                    <FormControl variant="standard" sx={{
                                        '& .MuiInputLabel-root': { color: "#656565", fontSize: '14px' },
                                        '& .MuiInput-underline:before': { borderBottomColor: '#656565' },
                                        '& .MuiInput-underline:hover:before': { borderBottomColor: '#656565' },
                                        '& .MuiInput-underline:after': { borderBottomColor: '#656565' },
                                        '& .MuiInput-input': { color: "#656565", fontSize: '14px' },
                                        '& .MuiInput-input::placeholder': { color: '#aaa', fontSize: '13px' },
                                        width: {
                                            xs: '100%',
                                            sm: '300px',
                                            md: '300px',
                                            lg: '300px',
                                        },
                                        '& .MuiSelect-icon': { color: '#656565' },



                                    }}>
                                        <Select
                                            label="Select"
                                            value={updateValue.relationshipWithBarrower}
                                            onChange={handleInputChange.relationshipWithBarrower}

                                        >

                                            <MenuItem value="Father" >Father</MenuItem>
                                            <MenuItem value="Mother" >Mother</MenuItem>
                                            <MenuItem value="Guardian" >Guardian</MenuItem>
                                            <MenuItem value="Other">Other</MenuItem>




                                        </Select>
                                    </FormControl>

                                </Box>

                                {updateValue.relationshipWithBarrower === "Other" ?
                                    <Box>
                                        <Typography sx={{ color: '#656565', fontWeight: '500', fontSize: '13px', }}>Other Relationship</Typography>

                                        <TextField
                                            type="text"
                                            variant="standard"
                                            value={updateValue.otherRelationship}
                                            onChange={handleInputChange.otherRelationship}
                                            sx={{
                                                '& .MuiInputLabel-root': { color: "#656565", fontSize: '14px' },
                                                '& .MuiInput-underline:before': { borderBottomColor: '#656565' },
                                                '& .MuiInput-underline:hover:before': { borderBottomColor: '#656565' },
                                                '& .MuiInput-underline:after': { borderBottomColor: '#656565' },
                                                '& .MuiInput-input': { color: "#656565", fontSize: '14px' },
                                                '& .MuiInput-input::placeholder': { color: '#aaa', fontSize: '13px' },
                                                width: {
                                                    xs: '100%',
                                                    sm: '300px',
                                                    md: '300px',
                                                    lg: '300px',
                                                },
                                                '& .MuiSelect-icon': { color: '#656565' },
                                            }}
                                            placeholder="Enter Other relationship..."

                                        />

                                    </Box> : ''}



                                <Box>
                                    <Typography sx={{ color: '#656565', fontWeight: '500', fontSize: '13px', }}>Employment Status<span style={{ color: 'red', fontSize: '15px' }}>*</span></Typography>
                                    <FormControl variant="standard" sx={{
                                        '& .MuiInputLabel-root': { color: "#656565", fontSize: '14px' },
                                        '& .MuiInput-underline:before': { borderBottomColor: '#656565' },
                                        '& .MuiInput-underline:hover:before': { borderBottomColor: '#656565' },
                                        '& .MuiInput-underline:after': { borderBottomColor: '#656565' },
                                        '& .MuiInput-input': { color: "#656565", fontSize: '14px' },
                                        '& .MuiInput-input::placeholder': { color: '#aaa', fontSize: '13px' },
                                        width: {
                                            xs: '100%',
                                            sm: '300px',
                                            md: '300px',
                                            lg: '300px',
                                        },
                                        '& .MuiSelect-icon': { color: '#656565' },


                                    }}>
                                        <Select
                                            label="Select"
                                            value={updateValue.employmentStatus}
                                            onChange={handleInputChange.employmentStatus}
                                        >

                                            <MenuItem value="salaried">salaried</MenuItem>
                                            <MenuItem value="Self-employed">Self-employed</MenuItem>


                                        </Select>
                                    </FormControl>

                                </Box>


                                {updateValue.relationshipWithBarrower === "Other" ? '' :
                                    <Box>

                                        <Typography sx={{ color: '#656565', fontWeight: '500', fontSize: '13px', }}>Number of Dependents<span style={{ color: 'red', fontSize: '15px' }}>*</span></Typography>

                                        <TextField
                                            type="number"
                                            variant="standard"
                                            value={updateValue.numberOfDependents}
                                            onChange={handleInputChange.numberOfDependents}
                                            sx={{
                                                '& .MuiInputLabel-root': { color: "#656565", fontSize: '14px' },
                                                '& .MuiInput-underline:before': { borderBottomColor: '#656565' },
                                                '& .MuiInput-underline:hover:before': { borderBottomColor: '#656565' },
                                                '& .MuiInput-underline:after': { borderBottomColor: '#656565' },
                                                '& .MuiInput-input': { color: "#656565", fontSize: '14px' },
                                                '& .MuiInput-input::placeholder': { color: '#aaa', fontSize: '13px' },
                                                width: {
                                                    xs: '100%',
                                                    sm: '300px',
                                                    md: '300px',
                                                    lg: '300px',
                                                },
                                                '& .MuiSelect-icon': { color: '#656565' },
                                            }}
                                            placeholder="Enter number of dependents..."

                                        />

                                    </Box>}


                            </Stack>

                            <Stack direction={'row'} justifyContent={'space-around'} gap={2} mb={'30px'}>

                                {updateValue.relationshipWithBarrower === "Other" ? <Box>

                                    <Typography sx={{ color: '#656565', fontWeight: '500', fontSize: '13px', }}>Number of Dependents<span style={{ color: 'red', fontSize: '15px' }}>*</span></Typography>

                                    <TextField
                                        type="number"
                                        variant="standard"
                                        value={updateValue.numberOfDependents}
                                        onChange={handleInputChange.numberOfDependents}
                                        sx={{
                                            '& .MuiInputLabel-root': { color: "#656565", fontSize: '14px' },
                                            '& .MuiInput-underline:before': { borderBottomColor: '#656565' },
                                            '& .MuiInput-underline:hover:before': { borderBottomColor: '#656565' },
                                            '& .MuiInput-underline:after': { borderBottomColor: '#656565' },
                                            '& .MuiInput-input': { color: "#656565", fontSize: '14px' },
                                            '& .MuiInput-input::placeholder': { color: '#aaa', fontSize: '13px' },
                                            width: {
                                                xs: '100%',
                                                sm: '300px',
                                                md: '300px',
                                                lg: '300px',
                                            },
                                            '& .MuiSelect-icon': { color: '#656565' },



                                        }}
                                        placeholder="Enter number of dependents..."

                                    />

                                </Box> : ''}


                                <Box>
                                    <Typography sx={{ color: '#656565', fontWeight: '500', fontSize: '13px', }}>Number of loans or EMIs<span style={{ color: 'red', fontSize: '15px' }}>*</span></Typography>

                                    <TextField
                                        type="number"
                                        variant="standard"
                                        value={updateValue.numberOfLoansEmis}
                                        onChange={handleInputChange.numberOfLoansEmis}
                                        sx={{
                                            '& .MuiInputLabel-root': { color: "#656565", fontSize: '14px' },
                                            '& .MuiInput-underline:before': { borderBottomColor: '#656565' },
                                            '& .MuiInput-underline:hover:before': { borderBottomColor: '#656565' },
                                            '& .MuiInput-underline:after': { borderBottomColor: '#656565' },
                                            '& .MuiInput-input': { color: "#656565", fontSize: '14px' },
                                            '& .MuiInput-input::placeholder': { color: '#aaa', fontSize: '13px' },
                                            width: {
                                                xs: '100%',
                                                sm: '300px',
                                                md: '300px',
                                                lg: '300px',
                                            },
                                            '& .MuiSelect-icon': { color: '#656565' },

                                        }}
                                        placeholder="Enter number of loans or EMIs..."
                                    />
                                </Box>


                                <Box>
                                    <Typography sx={{ color: '#656565', fontWeight: '500', fontSize: '13px', }}>Type of Residence<span style={{ color: 'red', fontSize: '15px' }}>*</span></Typography>

                                    <FormControl variant="standard" sx={{
                                        '& .MuiInputLabel-root': { color: "#656565", fontSize: '14px' },
                                        '& .MuiInput-underline:before': { borderBottomColor: '#656565' },
                                        '& .MuiInput-underline:hover:before': { borderBottomColor: '#656565' },
                                        '& .MuiInput-underline:after': { borderBottomColor: '#656565' },
                                        '& .MuiInput-input': { color: "#656565", fontSize: '14px' },
                                        '& .MuiInput-input::placeholder': { color: '#aaa', fontSize: '13px' },
                                        width: {
                                            xs: '100%',
                                            sm: '300px',
                                            md: '300px',
                                            lg: '300px',
                                        },
                                        '& .MuiSelect-icon': { color: '#656565' },
                                    }}>
                                        <Select
                                            label="Select"
                                            value={updateValue.typeOfResidense}
                                            onChange={handleInputChange.typeOfResidense}

                                        >
                                            <MenuItem value="Own by self">Own by self</MenuItem>
                                            <MenuItem value="Company provided">Company provided</MenuItem>
                                            <MenuItem value="Rented">Rented</MenuItem>
                                            <MenuItem value="Hosted">Hosted</MenuItem>
                                            <MenuItem value="Paying Guest">Paying Guest</MenuItem>

                                        </Select>
                                    </FormControl>

                                </Box>


                                {updateValue.relationshipWithBarrower === "Other" ? '' :
                                    <Box>

                                        <Typography sx={{ color: '#656565', fontWeight: '500', fontSize: '13px', }}>Living at Current Residence Since<span style={{ color: 'red', fontSize: '15px' }}>*</span></Typography>

                                        <FormControl variant="standard" sx={{
                                            '& .MuiInputLabel-root': { color: "#656565", fontSize: '14px' },
                                            '& .MuiInput-underline:before': { borderBottomColor: '#656565' },
                                            '& .MuiInput-underline:hover:before': { borderBottomColor: '#656565' },
                                            '& .MuiInput-underline:after': { borderBottomColor: '#656565' },
                                            '& .MuiInput-input': { color: "#656565", fontSize: '14px' },
                                            '& .MuiInput-input::placeholder': { color: '#aaa', fontSize: '13px' },
                                            width: {
                                                xs: '100%',
                                                sm: '300px',
                                                md: '300px',
                                                lg: '300px',
                                            },
                                            '& .MuiSelect-icon': { color: '#656565' },



                                        }}>
                                            <Select
                                                label="Select"
                                                value={updateValue.livingCurrentResidenceSince}
                                                onChange={handleInputChange.livingCurrentResidenceSince}

                                            >

                                                <MenuItem value="Less than 2 years">Less than 2 years</MenuItem>
                                                <MenuItem value="2-4 years">2-4 years</MenuItem>
                                                <MenuItem value="More than 4 years">More than 4 years</MenuItem>


                                            </Select>
                                        </FormControl>

                                    </Box>
                                }
                            </Stack>



                            <Stack direction={'row'} justifyContent={'space-around'} gap={2} mb={'30px'}>

                                {updateValue.relationshipWithBarrower !== "Other" ? '' :
                                    <Box>
                                        <Typography sx={{ color: '#656565', fontWeight: '500', fontSize: '13px', }}>Living at Current Residence Since<span style={{ color: 'red', fontSize: '15px' }}>*</span></Typography>

                                        <FormControl variant="standard" sx={{
                                            '& .MuiInputLabel-root': { color: "#656565", fontSize: '14px' },
                                            '& .MuiInput-underline:before': { borderBottomColor: '#656565' },
                                            '& .MuiInput-underline:hover:before': { borderBottomColor: '#656565' },
                                            '& .MuiInput-underline:after': { borderBottomColor: '#656565' },
                                            '& .MuiInput-input': { color: "#656565", fontSize: '14px' },
                                            '& .MuiInput-input::placeholder': { color: '#aaa', fontSize: '13px' },
                                            width: {
                                                xs: '100%',
                                                sm: '300px',
                                                md: '300px',
                                                lg: '300px',
                                            },
                                            '& .MuiSelect-icon': { color: '#656565' },

                                        }}>
                                            <Select
                                                label="Select"
                                                value={updateValue.livingCurrentResidenceSince}
                                                onChange={handleInputChange.livingCurrentResidenceSince}

                                            >

                                                <MenuItem value="Less than 2 years">Less than 2 years</MenuItem>
                                                <MenuItem value="2-4 years">2-4 years</MenuItem>
                                                <MenuItem value="More than 4 years">More than 4 years</MenuItem>


                                            </Select>
                                        </FormControl>

                                    </Box>}


                                <Box>
                                    <Typography sx={{ color: '#656565', fontWeight: '500', fontSize: '13px', }}>Cibil Score<span style={{ color: 'red', fontSize: '15px' }}>*</span></Typography>

                                    <TextField
                                        type="number"
                                        variant="standard"
                                        value={updateValue.cibilScore}
                                        onChange={handleInputChange.cibilScore}
                                        sx={{
                                            '& .MuiInputLabel-root': { color: "#656565", fontSize: '14px' },
                                            '& .MuiInput-underline:before': { borderBottomColor: '#656565' },
                                            '& .MuiInput-underline:hover:before': { borderBottomColor: '#656565' },
                                            '& .MuiInput-underline:after': { borderBottomColor: '#656565' },
                                            '& .MuiInput-input': { color: "#656565", fontSize: '14px' },
                                            '& .MuiInput-input::placeholder': { color: '#aaa', fontSize: '13px' },
                                            width: {
                                                xs: '100%',
                                                sm: '300px',
                                                md: '300px',
                                                lg: '300px',
                                            },
                                            '& .MuiSelect-icon': { color: '#656565' },

                                        }}
                                        placeholder="Enter cibil score..."
                                    />
                                </Box>

                                <Box sx={{
                                    width: {
                                        xs: '100%',
                                        sm: '300px',
                                        md: '300px',
                                        lg: '300px',
                                    },
                                }}></Box>

                                {updateValue.relationshipWithBarrower === "Other" ? '' :
                                    <Box sx={{
                                        width: {
                                            xs: '100%',
                                            sm: '300px',
                                            md: '300px',
                                            lg: '300px',
                                        },
                                    }}></Box>}

                            </Stack>



                            <Box mb={'20px'} mt={'40px'}>
                                <Typography sx={{ color: '#656565', fontWeight: '600', fontSize: '15px', textAlign: 'center' }}>Address</Typography>
                            </Box>


                            <>
                                <Stack direction={'row'} justifyContent={'space-around'} gap={2} mb={'30px'}>

                                    <Box>

                                        <Typography sx={{ color: '#656565', fontWeight: '500', fontSize: '13px', }}>House flat building<span style={{ color: 'red', fontSize: '15px' }}>*</span></Typography>

                                        <TextField
                                            type="text"
                                            variant="standard"
                                            value={updateValue.houseFlatBuilding}
                                            onChange={handleInputChange.houseFlatBuilding}
                                            sx={{
                                                '& .MuiInputLabel-root': { color: "#656565", fontSize: '14px' },
                                                '& .MuiInput-underline:before': { borderBottomColor: '#656565' },
                                                '& .MuiInput-underline:hover:before': { borderBottomColor: '#656565' },
                                                '& .MuiInput-underline:after': { borderBottomColor: '#656565' },
                                                '& .MuiInput-input': { color: "#656565", fontSize: '14px' },
                                                '& .MuiInput-input::placeholder': { color: '#aaa', fontSize: '13px' },
                                                width: {
                                                    xs: '100%',
                                                    sm: '300px',
                                                    md: '300px',
                                                    lg: '300px',
                                                },
                                                '& .MuiSelect-icon': { color: '#656565' },



                                            }}
                                            placeholder="Enter House flat building..."

                                        />

                                    </Box>
                                    <Box>

                                        <Typography sx={{ color: '#656565', fontWeight: '500', fontSize: '13px', }}>Street Name<span style={{ color: 'red', fontSize: '15px' }}>*</span></Typography>

                                        <TextField
                                            type="text"
                                            variant="standard"
                                            value={updateValue.streetName}
                                            onChange={handleInputChange.streetName}
                                            sx={{
                                                '& .MuiInputLabel-root': { color: "#656565", fontSize: '14px' },
                                                '& .MuiInput-underline:before': { borderBottomColor: '#656565' },
                                                '& .MuiInput-underline:hover:before': { borderBottomColor: '#656565' },
                                                '& .MuiInput-underline:after': { borderBottomColor: '#656565' },
                                                '& .MuiInput-input': { color: "#656565", fontSize: '14px' },
                                                '& .MuiInput-input::placeholder': { color: '#aaa', fontSize: '13px' },
                                                width: {
                                                    xs: '100%',
                                                    sm: '300px',
                                                    md: '300px',
                                                    lg: '300px',
                                                },
                                                '& .MuiSelect-icon': { color: '#656565' },



                                            }}
                                            placeholder="Enter Street Name..."

                                        />

                                    </Box>

                                    <Box>

                                        <Typography sx={{ color: '#656565', fontWeight: '500', fontSize: '13px', }}>Landmark<span style={{ color: 'red', fontSize: '15px' }}>*</span></Typography>

                                        <TextField
                                            type="text"
                                            variant="standard"
                                            value={updateValue.landmark}
                                            onChange={handleInputChange.landmark}
                                            sx={{
                                                '& .MuiInputLabel-root': { color: "#656565", fontSize: '14px' },
                                                '& .MuiInput-underline:before': { borderBottomColor: '#656565' },
                                                '& .MuiInput-underline:hover:before': { borderBottomColor: '#656565' },
                                                '& .MuiInput-underline:after': { borderBottomColor: '#656565' },
                                                '& .MuiInput-input': { color: "#656565", fontSize: '14px' },
                                                '& .MuiInput-input::placeholder': { color: '#aaa', fontSize: '13px' },
                                                width: {
                                                    xs: '100%',
                                                    sm: '300px',
                                                    md: '300px',
                                                    lg: '300px',
                                                },
                                                '& .MuiSelect-icon': { color: '#656565' },



                                            }}
                                            placeholder="Enter Landmark..."

                                        />

                                    </Box>





                                </Stack>

                                <Stack direction={'row'} justifyContent={'space-around'} gap={2} mb={'30px'}>

                                    <Box>

                                        <Typography sx={{ color: '#656565', fontWeight: '500', fontSize: '13px', }}>Locality Area<span style={{ color: 'red', fontSize: '15px' }}>*</span></Typography>

                                        <TextField
                                            type="text"
                                            variant="standard"
                                            value={updateValue.localityArea}
                                            onChange={handleInputChange.localityArea}
                                            sx={{
                                                '& .MuiInputLabel-root': { color: "#656565", fontSize: '14px' },
                                                '& .MuiInput-underline:before': { borderBottomColor: '#656565' },
                                                '& .MuiInput-underline:hover:before': { borderBottomColor: '#656565' },
                                                '& .MuiInput-underline:after': { borderBottomColor: '#656565' },
                                                '& .MuiInput-input': { color: "#656565", fontSize: '14px' },
                                                '& .MuiInput-input::placeholder': { color: '#aaa', fontSize: '13px' },
                                                width: {
                                                    xs: '100%',
                                                    sm: '300px',
                                                    md: '300px',
                                                    lg: '300px',
                                                },
                                                '& .MuiSelect-icon': { color: '#656565' },



                                            }}
                                            placeholder="Enter Locality Area..."

                                        />

                                    </Box>

                                    <Box>

                                        <Typography sx={{ color: '#656565', fontWeight: '500', fontSize: '13px', }}>City<span style={{ color: 'red', fontSize: '15px' }}>*</span></Typography>

                                        <TextField
                                            type="text"
                                            variant="standard"
                                            value={updateValue.city}
                                            onChange={handleInputChange.city}
                                            sx={{
                                                '& .MuiInputLabel-root': { color: "#656565", fontSize: '14px' },
                                                '& .MuiInput-underline:before': { borderBottomColor: '#656565' },
                                                '& .MuiInput-underline:hover:before': { borderBottomColor: '#656565' },
                                                '& .MuiInput-underline:after': { borderBottomColor: '#656565' },
                                                '& .MuiInput-input': { color: "#656565", fontSize: '14px' },
                                                '& .MuiInput-input::placeholder': { color: '#aaa', fontSize: '13px' },
                                                width: {
                                                    xs: '100%',
                                                    sm: '300px',
                                                    md: '300px',
                                                    lg: '300px',
                                                },
                                                '& .MuiSelect-icon': { color: '#656565' },



                                            }}
                                            placeholder="Enter city..."

                                        />


                                    </Box>

                                    <Box>

                                        <Typography sx={{ color: '#656565', fontWeight: '500', fontSize: '13px', }}>Pin Code<span style={{ color: 'red', fontSize: '15px' }}>*</span></Typography>

                                        {pincodeData?.length === 0 ?
                                            <TextField
                                                type="number"
                                                variant="standard"
                                                value={updateValue.pinCode}
                                                onChange={handleInputChange.pinCode}
                                                sx={{
                                                    '& .MuiInputLabel-root': { color: "#656565", fontSize: '14px' },
                                                    '& .MuiInput-underline:before': { borderBottomColor: '#656565' },
                                                    '& .MuiInput-underline:hover:before': { borderBottomColor: '#656565' },
                                                    '& .MuiInput-underline:after': { borderBottomColor: '#656565' },
                                                    '& .MuiInput-input': { color: "#656565", fontSize: '14px' },
                                                    '& .MuiInput-input::placeholder': { color: '#aaa', fontSize: '13px' },
                                                    width: {
                                                        xs: '100%',
                                                        sm: '300px',
                                                        md: '300px',
                                                        lg: '300px',
                                                    },
                                                    '& .MuiSelect-icon': { color: '#656565' },
                                                }}
                                                placeholder="Enter Pincode..."

                                            />
                                            : <FormControl variant="standard" sx={{
                                                '& .MuiInputLabel-root': { color: "#656565", fontSize: '14px' },
                                                '& .MuiInput-underline:before': { borderBottomColor: '#656565' },
                                                '& .MuiInput-underline:hover:before': { borderBottomColor: '#656565' },
                                                '& .MuiInput-underline:after': { borderBottomColor: '#656565' },
                                                '& .MuiInput-input': { color: "#656565", fontSize: '14px' },
                                                '& .MuiInput-input::placeholder': { color: '#aaa', fontSize: '13px' },
                                                width: {
                                                    xs: '100%',
                                                    sm: '300px',
                                                    md: '300px',
                                                    lg: '300px',
                                                },
                                                '& .MuiSelect-icon': { color: '#656565' },

                                            }}>
                                                <Select
                                                    label="Select"
                                                    value={updateValue.pinCode}
                                                    onChange={handleInputChange.pinCode}

                                                >

                                                    <MenuItem value="">Select Country</MenuItem>
                                                    {pincodeData && pincodeData.map((pincode, index) => (
                                                        <MenuItem key={index} value={pincode.Pincode}>{pincode.Pincode}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>}





                                    </Box>


                                </Stack>

                                <Stack direction={'row'} justifyContent={'space-around'} gap={2} mb={'30px'}>


                                    <Box>

                                        <Typography sx={{ color: '#656565', fontWeight: '500', fontSize: '13px', }}>State<span style={{ color: 'red', fontSize: '15px' }}>*</span></Typography>

                                        {pincodeData?.length === 0 ?
                                            <TextField
                                                type="text"
                                                variant="standard"
                                                value={updateValue.state}
                                                onChange={handleInputChange.state}
                                                sx={{
                                                    '& .MuiInputLabel-root': { color: "#656565", fontSize: '14px' },
                                                    '& .MuiInput-underline:before': { borderBottomColor: '#656565' },
                                                    '& .MuiInput-underline:hover:before': { borderBottomColor: '#656565' },
                                                    '& .MuiInput-underline:after': { borderBottomColor: '#656565' },
                                                    '& .MuiInput-input': { color: "#656565", fontSize: '14px' },
                                                    '& .MuiInput-input::placeholder': { color: '#aaa', fontSize: '13px' },
                                                    width: {
                                                        xs: '100%',
                                                        sm: '300px',
                                                        md: '300px',
                                                        lg: '300px',
                                                    },
                                                    '& .MuiSelect-icon': { color: '#656565' },
                                                }}
                                                placeholder="Enter state..."

                                            />
                                            :

                                            <FormControl variant="standard" sx={{
                                                '& .MuiInputLabel-root': { color: "#656565", fontSize: '14px' },
                                                '& .MuiInput-underline:before': { borderBottomColor: '#656565' },
                                                '& .MuiInput-underline:hover:before': { borderBottomColor: '#656565' },
                                                '& .MuiInput-underline:after': { borderBottomColor: '#656565' },
                                                '& .MuiInput-input': { color: "#656565", fontSize: '14px' },
                                                '& .MuiInput-input::placeholder': { color: '#aaa', fontSize: '13px' },
                                                width: {
                                                    xs: '100%',
                                                    sm: '300px',
                                                    md: '300px',
                                                    lg: '300px',
                                                },
                                                '& .MuiSelect-icon': { color: '#656565' },
                                            }}>
                                                <Select
                                                    label="Select"
                                                    value={updateValue.state}
                                                    onChange={handleInputChange.state}
                                                >
                                                    <MenuItem value="">Select State</MenuItem>

                                                    {[...new Set(pincodeData && pincodeData.flatMap((pincode) => pincode.State))].map((State, index) => (
                                                        <MenuItem key={index} value={State}>{State}</MenuItem>
                                                    ))}

                                                </Select>
                                            </FormControl>}
                                    </Box>

                                    <Box>
                                        <Typography sx={{ color: '#656565', fontWeight: '500', fontSize: '13px', }}>Country<span style={{ color: 'red', fontSize: '15px' }}>*</span></Typography>

                                        {pincodeData?.length === 0 ?
                                            <TextField
                                                type="text"
                                                variant="standard"
                                                value={updateValue.country}
                                                onChange={handleInputChange.country}
                                                sx={{
                                                    '& .MuiInputLabel-root': { color: "#656565", fontSize: '14px' },
                                                    '& .MuiInput-underline:before': { borderBottomColor: '#656565' },
                                                    '& .MuiInput-underline:hover:before': { borderBottomColor: '#656565' },
                                                    '& .MuiInput-underline:after': { borderBottomColor: '#656565' },
                                                    '& .MuiInput-input': { color: "#656565", fontSize: '14px' },
                                                    '& .MuiInput-input::placeholder': { color: '#aaa', fontSize: '13px' },
                                                    width: {
                                                        xs: '100%',
                                                        sm: '300px',
                                                        md: '300px',
                                                        lg: '300px',
                                                    },
                                                    '& .MuiSelect-icon': { color: '#656565' },
                                                }}
                                                placeholder="Enter country..."

                                            />
                                            :

                                            <FormControl variant="standard" sx={{
                                                '& .MuiInputLabel-root': { color: "#656565", fontSize: '14px' },
                                                '& .MuiInput-underline:before': { borderBottomColor: '#656565' },
                                                '& .MuiInput-underline:hover:before': { borderBottomColor: '#656565' },
                                                '& .MuiInput-underline:after': { borderBottomColor: '#656565' },
                                                '& .MuiInput-input': { color: "#656565", fontSize: '14px' },
                                                '& .MuiInput-input::placeholder': { color: '#aaa', fontSize: '13px' },
                                                width: {
                                                    xs: '100%',
                                                    sm: '300px',
                                                    md: '300px',
                                                    lg: '300px',
                                                },
                                                '& .MuiSelect-icon': { color: '#656565' },

                                            }}>
                                                <Select
                                                    label="Select"
                                                    value={updateValue.country}
                                                    onChange={handleInputChange.country}
                                                >
                                                    <MenuItem value="">Select Country</MenuItem>
                                                    {[...new Set(pincodeData && pincodeData.flatMap((pincode) => pincode.Country))].map((country, index) => (
                                                        <MenuItem key={index} value={country}>{country}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>}
                                    </Box>


                                    <Box width={'300px'}>

                                        <Typography sx={{ color: '#656565', fontWeight: '500', fontSize: '13px', }}>Bank Statement<span style={{ color: 'red', fontSize: '15px' }}>*</span></Typography>

                                        <Box display={'flex'} justifyContent={'center'}>

                                            <Box>
                                                <input
                                                    type="file"
                                                    style={{
                                                        color: '#656565',
                                                        border: '1px solid #656565',
                                                        padding: 5,
                                                        borderRadius: '5px',
                                                    }}
                                                    inputRef={fileInputRef}
                                                    onChange={handleFileChange}
                                                    name="file_path"
                                                    multiple
                                                />

                                            </Box>
                                        </Box>

                                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                            <Box sx={{ mt: '8px', mb: '10px', width: '70%' }}>
                                                <ul style={{ fontFamily: 'sans-serif', paddingLeft: '20px' }}>

                                                    <li style={{ fontSize: '13px', fontWeight: '500', color: '#656565', marginBottom: '8px' }}>
                                                        Supported file types: pdf
                                                    </li>
                                                    <li style={{ fontSize: '13px', fontWeight: '500', color: '#656565', marginBottom: '8px' }}>
                                                        Size limit: 10.00MB per file.
                                                    </li>

                                                </ul>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Stack>
                            </>


                        </Box>


                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button
                                sx={{
                                    bgcolor: !validateFields() ? '#858585' : '#DC3545',
                                    textTransform: 'none',
                                    color: '#fff',
                                    width: "15%",
                                }}
                                onClick={() => imageRespose(validFiles)}
                                disabled={!validateFields()}
                            >
                                Submit
                            </Button>
                        </Box>
                    </Box>
                </Box >



                <Modal open={open} >
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '10%',
                        bgcolor: 'background.paper',
                        border: '0px solid #fff',
                        boxShadow: 24,
                        p: 1,
                        overflowY: "auto",
                        scrollbarWidth: 'none',
                        borderRadius: "8px",
                        fontSize: '16px',
                    }}>

                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Stack direction={'column'} alignItems={'center'} spacing={2}>
                                <Typography sx={{ color: '#000', fontWeight: '500', fontSize: '14px', }}>Analyzing...</Typography>
                                <span class="loader"></span>
                            </Stack>
                        </Box>
                    </Box>
                </Modal >
            </Sidebar >

        </>
    )
}

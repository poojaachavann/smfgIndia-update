import Login from "./pages/Login/Login"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import React, { useEffect, useState } from "react"
import UploadDocuments from "./pages/UploadDocuments/UploadDocuments"
import Home from "./pages/Home/Home"
import UploadDocAnalysis from "./pages/UploadDocuments/UploadDocAnalysis"
import axios from "axios"
import API from "./Component/BaseURL"


export default function App() {

  const urls = window.location.href
  const mainUrls = urls.split('/')
  const domainPath = mainUrls[mainUrls.length - 2]
  console.log(domainPath)



  const [userLoginData, setUserLoginData] = useState('')
  const userDataOfLogin = localStorage.getItem('userData')
  useEffect(() => {
    if (userDataOfLogin) {
      setUserLoginData(JSON.parse(userDataOfLogin))
    }
  }, [])

  const [isLoadingIdProof, setIsLoadingIdProof] = useState(false)
  const [isLoadingBankStatement, setIsLoadingBankStatement] = useState(false)
  const [isLoadingcreditbuero, setIsLoadingcreditbuero] = useState(false)
  const [apiRes, setApiRes] = useState('')


  const analizeDocument = async (file) => {
    try {

      if (file.bankStatement) {
        setIsLoadingBankStatement(true)
      }
      if (file.creditBureau) {
        setIsLoadingcreditbuero(true)

      }
      if (file.idProof) {
        setIsLoadingIdProof(true)
      }

      const response = await axios.post(API.startLoanForm, {
        bankStatementpdfPath: file?.bankStatement,
        idProofpdfPath: file?.idProof,
        creditBureopdfPath: file?.creditBureau,
        userId: userLoginData?._id,
        domain: domainPath
      })
      console.log('response ai analysis', response.data.answer);

      setApiRes(response.data.answer)

      if (file.bankStatement) {
        setIsLoadingBankStatement(false)
      }
      if (file.creditBureau) {
        setIsLoadingcreditbuero(false)

      }
      if (file.idProof) {
        setIsLoadingIdProof(false)
      }

      setTimeout(() => {
        window.location.reload()
      }, 1000)

    } catch (error) {
      console.log(error)
      if (file.bankStatement) {
        setIsLoadingBankStatement(false)
      }
      if (file.creditBureau) {
        setIsLoadingcreditbuero(false)

      }
      if (file.idProof) {
        setIsLoadingIdProof(false)
      }
    }

  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/uploadDocument" element={<UploadDocuments domainPath={domainPath} userLoginData={userLoginData} analizeDocument={analizeDocument} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/uploadDocument/:id" element={<UploadDocAnalysis domainPath={domainPath} userLoginData={userLoginData} isLoadingIdProof={isLoadingIdProof} isLoadingBankStatement={isLoadingBankStatement} isLoadingcreditbuero={isLoadingcreditbuero} apiRes={apiRes} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}



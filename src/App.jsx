import Login from "./pages/Login/Login"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import React, { useEffect, useState } from "react"
import UploadDocuments from "./pages/UploadDocuments/UploadDocuments"
// import Home from "./pages/Home/Home"
import UploadDocAnalysis from "./pages/UploadDocuments/UploadDocAnalysis"
import axios from "axios"
import API from "./Component/BaseURL"
import History from "./pages/History/History"
import CostAnalysis from "./pages/CostAnalysis/CostAnalysis"


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

  const [apiResIdProof, setApiResIdProof] = useState('')
  const [apiResBankStatement, setApiResBankStatement] = useState('')
  const [apiResCreditBurea, setApiResCreditBurea] = useState('')

  const analizeDocument = async (file) => {
    try {
      setIsLoadingIdProof(true)
      const response = await axios.post(API.startLoanForm, {
        idProofpdfPath: file?.idProof,
        userId: userLoginData?._id,
        domain: domainPath,
        type: "idProof"
      })
      console.log('response ai analysis', response.data.answer);
      setApiResIdProof(response.data.answer)
      setIsLoadingIdProof(false)

      if (response.data.answer?.validation_result?.document_type === "id_proof") {
        setIsLoadingBankStatement(true)
        const response = await axios.post(API.startLoanForm, {
          bankStatementpdfPath: file?.bankStatement,
          userId: userLoginData?._id,
          domain: domainPath,
          type: "bankStatement"

        })
        console.log('response ai analysis', response?.data?.answer);
        setApiResBankStatement(response.data.answer)
        setIsLoadingBankStatement(false)

        if (response.data.answer?.validation_result?.document_type === "bank_statement") {
          setIsLoadingcreditbuero(true)

          const response = await axios.post(API.startLoanForm, {
            creditBureopdfPath: file?.creditBureau,
            userId: userLoginData?._id,
            domain: domainPath,
            type: "creditBureau"
          })
          console.log('response ai analysis', response?.data?.answer);
          setApiResCreditBurea(response.data.answer)
          setIsLoadingcreditbuero(false)
          // setTimeout(() => {
          //   window.location.reload()
          // }, 1000)

        }
      }

    } catch (error) {
      console.log(error)
      setIsLoadingBankStatement(false)
      setIsLoadingcreditbuero(false)
      setIsLoadingIdProof(false)

    }

  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/uploadDocument" element={<UploadDocuments domainPath={domainPath} userLoginData={userLoginData} analizeDocument={analizeDocument} />} />
          <Route path="/home" element={<History />} />
          <Route path="/CostAnalysis" element={<CostAnalysis />} />

          <Route path="/uploadDocument/:id" element={<UploadDocAnalysis domainPath={domainPath} userLoginData={userLoginData} isLoadingIdProof={isLoadingIdProof} isLoadingBankStatement={isLoadingBankStatement} isLoadingcreditbuero={isLoadingcreditbuero} apiResIdProof={apiResIdProof} apiResBankStatement={apiResBankStatement} apiResCreditBurea={apiResCreditBurea} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}



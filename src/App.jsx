import Login from "./pages/Login/Login"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import React, { useEffect, useState } from "react"
import UploadDocuments from "./pages/UploadDocuments/UploadDocuments"
import Home from "./pages/Home/Home"
import UploadDocAnalysis from "./pages/UploadDocuments/UploadDocAnalysis"

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

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/uploadDocument" element={<UploadDocuments domainPath={domainPath} userLoginData={userLoginData} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/uploadDocument/:id" element={<UploadDocAnalysis domainPath={domainPath} userLoginData={userLoginData} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}



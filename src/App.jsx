import Sidebar from "./Component/Sidebar"
import Login from "./pages/Login/Login"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import React from "react"
import UploadDocuments from "./pages/UploadDocuments/UploadDocuments"

export default function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/uploadDocument" element={<UploadDocuments/>}/>
          
        </Routes>
      </BrowserRouter>
    </>
  )
}



import Sidebar from "./Component/Sidebar"
import Login from "./pages/Login/Login"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import React from "react"
import UploadDocuments from "./pages/UploadDocuments/UploadDocuments"
import Home from "./pages/Home/Home"

export default function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/uploadDocument" element={<UploadDocuments />} />
          <Route path="/home" element={<Home />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}



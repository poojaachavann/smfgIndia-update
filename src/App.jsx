import Sidebar from "./Component/Sidebar"
import DemographicReport from "./pages/Login/LoanAppplication/DemographicReport"
import FinalReport from "./pages/Login/LoanAppplication/FinalReport"
import Granularityoftransaction from "./pages/Login/LoanAppplication/Granularityoftransaction"
import LoanAppForm from "./pages/Login/LoanAppplication/LoanAppForm"
import Regularity from "./pages/Login/LoanAppplication/Regularity"
import Spendpattern from "./pages/Login/LoanAppplication/Spendpattern"
import Transactionpattern from "./pages/Login/LoanAppplication/Transactionpattern"
import Usertabledata from "./pages/Login/LoanAppplication/Usertabledata"
import Login from "./pages/Login/Login"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import CostAnalysis from "./pages/Login/LoanAppplication/CostAnalysis"
import React from "react"

export default function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/loanapp" element={<Sidebar />} />
          <Route path="/usertableData" element={<Usertabledata />} />
          <Route path="/costanalysis" element={<CostAnalysis />} />
          <Route path="/loanAppform/:id" element={<LoanAppForm />} />
          <Route path="/demographic/:id" element={<DemographicReport />} />
          <Route path="/regularity/:id" element={<Regularity />} />
          <Route path="/spendpattern/:id" element={<Spendpattern />} />
          <Route path="/transactionpattern/:id" element={<Transactionpattern />} />
          <Route path="/Transaction-Frequency-And-Size-Details/:id" element={<Granularityoftransaction />} />
          <Route path="/finalreport/:id" element={<FinalReport />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}



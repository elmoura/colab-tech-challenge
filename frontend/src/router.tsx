import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SendReportPage } from '@/pages/send-report/SendReportPage'
import { SendReportSuccessPage } from '@/pages/send-report/SendReportSuccessPage'

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SendReportPage />} />
        <Route path="/enviado" element={<SendReportSuccessPage />} />
      </Routes>
    </BrowserRouter>
  )
}

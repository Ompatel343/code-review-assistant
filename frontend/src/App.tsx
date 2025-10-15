import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import UploadPage from "./pages/UploadPage";
import ReportsPage from "./pages/ReportsPage";
import ReportDetailPage from "./pages/ReportDetailPage";

export default function App() {
  return (
    <div className="min-h-screen">
      <nav className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="font-bold text-xl">
            Code Review Assistant
          </Link>
          <div className="space-x-4">
            <Link to="/" className="text-sm">
              Upload
            </Link>
            <Link to="/reports" className="text-sm">
              Reports
            </Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<UploadPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/reports/:id" element={<ReportDetailPage />} />
        </Routes>
      </main>
    </div>
  );
}

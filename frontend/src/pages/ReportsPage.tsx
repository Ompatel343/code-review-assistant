import React, { useEffect, useState } from "react";
import { fetchReports } from "../hooks/useApi";
import ReportCard from "../components/ReportCard";

export default function ReportsPage() {
  const [reports, setReports] = useState<any[]>([]);
  useEffect(() => {
    fetchReports().then((r) => setReports(r.reports || []));
  }, []);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Reports</h1>
      <div className="grid gap-4">
        {reports.length === 0 ? (
          <div className="text-gray-500">No reports yet.</div>
        ) : (
          reports.map((r) => <ReportCard key={r.id} report={r} />)
        )}
      </div>
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";

export default function ReportCard({ report }: { report: any }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex justify-between items-start">
        <div>
          <div className="text-sm text-gray-500">{report.filename || "—"}</div>
          <div className="font-semibold">{report.summary}</div>
        </div>
        <Link to={`/reports/${report.id}`} className="text-blue-600 text-sm">
          View
        </Link>
      </div>
    </div>
  );
}

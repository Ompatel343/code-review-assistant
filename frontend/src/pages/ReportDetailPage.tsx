import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchReport } from "../hooks/useApi";

export default function ReportDetailPage() {
  const { id } = useParams();
  const [report, setReport] = useState<any>(null);

  useEffect(() => {
    if (!id) return;
    fetchReport(Number(id)).then((r) => setReport(r));
  }, [id]);

  if (!report) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-2">
        Report for {report.filename || `submission ${report.submission_id}`}
      </h1>
      <div className="bg-white p-4 rounded shadow mb-4">
        <div className="font-medium">Summary</div>
        <div className="text-sm text-gray-700">{report.summary}</div>
      </div>

      <div className="space-y-4">
        {report.suggestions &&
          report.suggestions.map((s: any, i: number) => (
            <div key={i} className="bg-white p-4 rounded shadow">
              <div className="flex justify-between items-center">
                <div className="font-semibold">
                  {s.title}{" "}
                  <span className="text-xs text-gray-500">({s.severity})</span>
                </div>
              </div>
              <div className="text-sm mt-2">{s.detail}</div>
              <pre className="bg-gray-100 p-2 mt-2 text-xs rounded">
                {s.suggestion}
              </pre>
            </div>
          ))}
      </div>
    </div>
  );
}

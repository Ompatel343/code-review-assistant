import React, { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { uploadFiles, requestReview } from "../hooks/useApi";

export default function FileUploader() {
  const [files, setFiles] = useState<File[]>([]);
  const onFiles = (fList: FileList | null) => {
    if (!fList) return;
    setFiles(Array.from(fList));
  };

  const handleUpload = async () => {
    if (files.length === 0) return toast.error("Please pick files first");
    const t = toast.loading("Uploading...");
    try {
      const res = await uploadFiles(files);
      toast.success("Uploaded");
      // request review for first submission returned (simple flow)
      if (res.submissions && res.submissions.length > 0) {
        const sid = res.submissions[0].submission_id;
        toast.loading("Requesting review...");
        const rep = await requestReview(sid);
        toast.success("Review generated");
        // show report detail URL
        window.location.href = `/reports/${rep.report_id}`;
      }
    } catch (e: any) {
      toast.error(e?.response?.data?.error || "Upload failed");
    } finally {
      toast.dismiss(t);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow max-w-2xl mx-auto">
      <h2 className="text-lg font-semibold mb-4">Upload code files</h2>
      <input type="file" multiple onChange={(e) => onFiles(e.target.files)} />
      <div className="mt-4">
        <button
          onClick={handleUpload}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Upload & Review
        </button>
      </div>

      {files.length > 0 && (
        <div className="mt-4">
          <h4 className="font-medium">Selected files</h4>
          <ul className="list-disc ml-5">
            {files.map((f, idx) => (
              <li key={idx}>
                {f.name} — {Math.round(f.size / 1024)} KB
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

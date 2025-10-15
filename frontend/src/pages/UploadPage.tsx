import React from "react";
import FileUploader from "../components/FileUploader";

export default function UploadPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Upload Code</h1>
      <FileUploader />
    </div>
  );
}

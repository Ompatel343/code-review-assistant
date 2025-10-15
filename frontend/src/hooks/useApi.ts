import axios from "axios";
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
});

export async function uploadFiles(files: File[]) {
  const form = new FormData();
  files.forEach((f) => form.append("files", f));
  const res = await API.post("/upload", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function requestReview(submission_id: number) {
  const res = await API.post("/review", { submission_id });
  return res.data;
}

export async function fetchReports() {
  const res = await API.get("/reports");
  return res.data;
}

export async function fetchReport(id: number) {
  const res = await API.get(`/reports/${id}`);
  return res.data;
}

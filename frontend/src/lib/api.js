import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
  baseURL: API_BASE_URL,
});

// Global Error Interceptor for Rate Limiting
// NOTE: We do NOT redirect via window.location.href here because that
// aborts in-flight admin save/edit operations. Components handle 429
// errors themselves via their catch blocks (toast + error state).
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 429) {
      // Simply reject - the calling component will show a toast.
      // No hard redirect to avoid aborting admin CRUD operations.
    }

    return Promise.reject(error);
  },
);

// --- Project ---
export function getProjects() {
  return api.get("/projects");
}

export function createProject(payload) {
  return api.post("/projects", payload);
}

export function patchProject(id, payload) {
  return api.patch(`/projects/${id}`, payload);
}

export function deleteProject(id) {
  return api.delete(`/projects/${id}`);
}

// --- Feedbacks ---
export function getFeedbacks() {
  return api.get("/feedbacks");
}

export function createFeedback(payload) {
  return api.post("/feedbacks", payload);
}

export function patchFeedback(id, payload) {
  return api.patch(`/feedbacks/${id}`, payload);
}

export function deleteFeedback(id) {
  return api.delete(`/feedbacks/${id}`);
}

// --- Stats ---
export function getStats() {
  return api.get("/stats");
}

export function createStat(payload) {
  return api.post("/stats", payload);
}

export function patchStat(id, payload) {
  return api.patch(`/stats/${id}`, payload);
}

export function deleteStat(id) {
  return api.delete(`/stats/${id}`);
}

// --- Upload ---
export function uploadImage(file) {
  const form = new FormData();
  form.append("file", file);
  return api.post("/upload", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

// --- Auth ---
export function loginUser(username, password) {
  return api.post("/auth/login", { username, password });
}

export function registerUser(username, password) {
  return api.post("/auth/register", { username, password });
}

// --- Users Management ---
export function getUsers() {
  return api.get("/users");
}

export function createUser(payload) {
  return api.post("/users", payload);
}

export function updateUser(id, payload) {
  return api.put(`/users/${id}`, payload);
}

export function deleteUser(id) {
  return api.delete(`/users/${id}`);
}

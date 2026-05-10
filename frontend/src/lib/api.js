import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

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

// --- Testimonials ---
export function getTestimonials() {
  return api.get("/testimonials");
}

export function createTestimonial(payload) {
  return api.post("/testimonials", payload);
}

export function patchTestimonial(id, payload) {
  return api.patch(`/testimonials/${id}`, payload);
}

export function deleteTestimonial(id) {
  return api.delete(`/testimonials/${id}`);
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

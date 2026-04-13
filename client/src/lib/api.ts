import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  withCredentials: true, // send cookies (refresh token)
});

// Attach access token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// On 401, try to refresh — then retry once
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;
    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/auth/refresh`,
          {},
          { withCredentials: true }
        );
        localStorage.setItem("accessToken", data.data.accessToken);
        original.headers.Authorization = `Bearer ${data.data.accessToken}`;
        return api(original);
      } catch {
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
      }
    }
    return Promise.reject(err);
  }
);

// ── Auth ──────────────────────────────────────────────────────
export const authApi = {
  register: (body: { name: string; email: string; password: string }) =>
    api.post("/auth/register", body).then((r) => r.data.data),

  login: (body: { email: string; password: string }) =>
    api.post("/auth/login", body).then((r) => r.data.data),

  logout: () => api.post("/auth/logout"),

  me: () => api.get("/auth/me").then((r) => r.data.data.user),

  verifyEmail: (token: string) =>
    api.get(`/auth/verify-email/${token}`).then((r) => r.data.data.user),

  resendVerification: () =>
    api.post("/auth/resend-verification").then((r) => r.data.data),
};

// ── Users ─────────────────────────────────────────────────────
export const userApi = {
  setLevel: (experienceLevel: string) =>
    api.put("/users/level", { experienceLevel }).then((r) => r.data.data.user),
};

// ── Tracks ────────────────────────────────────────────────────
export const trackApi = {
  list: () => api.get("/tracks").then((r) => r.data.data),
  get: (slug: string) => api.get(`/tracks/${slug}`).then((r) => r.data.data),
};

// ── Sections ──────────────────────────────────────────────────
export const sectionApi = {
  forTrack: (trackId: string) =>
    api.get(`/sections/track/${trackId}`).then((r) => r.data.data),
  get: (id: string) => api.get(`/sections/${id}`).then((r) => r.data.data),
};

// ── Logs ──────────────────────────────────────────────────────
export const logApi = {
  create: (body: { subtopicId: string; report: string; timeSpentMinutes: number }) =>
    api.post("/logs", body).then((r) => r.data.data),

  bySubtopic: (subtopicId: string) =>
    api.get(`/logs/subtopic/${subtopicId}`).then((r) => r.data.data),

  bySection: (sectionId: string) =>
    api.get(`/logs/section/${sectionId}`).then((r) => r.data.data),
};

// ── Tests ─────────────────────────────────────────────────────
export const testApi = {
  forSection: (sectionId: string) =>
    api.get(`/tests/section/${sectionId}`).then((r) => r.data.data),

  submit: (testId: string, answers: { questionId: string; selectedAnswer: number }[]) =>
    api.post(`/tests/${testId}/submit`, { answers }).then((r) => r.data.data),

  attempts: (testId: string) =>
    api.get(`/tests/${testId}/attempts`).then((r) => r.data.data),
};

// ── Progress ──────────────────────────────────────────────────
export const progressApi = {
  dashboard: () => api.get("/progress").then((r) => r.data.data),
  track: (trackId: string) =>
    api.get(`/progress/track/${trackId}`).then((r) => r.data.data),
};

// ── Courses ───────────────────────────────────────────────────
export const courseApi = {
  list: () => api.get("/courses").then((r) => r.data.data),
  get: (id: string) => api.get(`/courses/${id}`).then((r) => r.data.data),
  unlock: (id: string) =>
    api.post(`/courses/${id}/unlock`).then((r) => r.data.data),
};

// ── Topic Progress ────────────────────────────────────────────
export const topicProgressApi = {
  forSection: (sectionId: string) =>
    api.get(`/topics/section/${sectionId}`).then((r) => r.data.data),
  complete: (topicId: string) =>
    api.post(`/topics/${topicId}/complete`).then((r) => r.data.data),
  uncomplete: (topicId: string) =>
    api.delete(`/topics/${topicId}/complete`).then((r) => r.data.data),
};

export default api;

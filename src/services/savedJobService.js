import { apiFetch } from "../app/job-detail/[id]/_utils/auth";

const SAVE_JOB_BASE = "http://18.142.226.139:8080/api/v1/save-job";

export const savedJobApi = {
    async status(jobId) {
        const url = `${SAVE_JOB_BASE}/status?${new URLSearchParams({
            job_id: String(jobId),
        })}`;
        const res = await apiFetch(url, { method: "GET" });
        if (!res || !res.ok) return false;
        try {
            const data = await res.json();
            return Boolean(data?.saved);
        } catch {
            return false;
        }
    },
    async save(jobId) {
        const res = await apiFetch(`${SAVE_JOB_BASE}/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ job_id: jobId }),
        });
        if (!res || !res.ok) return null;
        try {
            return await res.json();
        } catch {
            return null;
        }
    },
    async unsave(jobId) {
        const url = `${SAVE_JOB_BASE}?${new URLSearchParams({
            job_id: String(jobId),
        })}`;
        const res = await apiFetch(url, { method: "DELETE" });
        return !!res && (res.ok || res.status === 404);
    },
};

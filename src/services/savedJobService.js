import { apiFetch } from "../app/job-detail/[id]/_utils/auth";

const SAVE_JOB_BASE = "/api/v1/save-job";

export const savedJobApi = {
    async status(jobId) {
        const url = `${SAVE_JOB_BASE}/status?${new URLSearchParams({
            job_id: String(jobId),
        })}`;
        const res = await apiFetch(url, { method: "GET", cache: "no-store" });
        if (!res || !res.ok) return false;
        try {
            const data = await res.json();
            return typeof data === "boolean" ? data : Boolean(data?.saved);
        } catch (e) {
            return false;
        }
    },

    async save(jobId) {
        const res = await apiFetch(`${SAVE_JOB_BASE}/create`, {
            method: "POST",
            cache: "no-store",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ job_id: jobId }),
        });
        if (!res || !res.ok) return null;
        try {
            return await res.json();
        } catch (e) {
            return null;
        }
    },

    async unsave(jobId) {
        const url = `${SAVE_JOB_BASE}?${new URLSearchParams({
            job_id: String(jobId),
        })}`;
        const res = await apiFetch(url, {
            method: "DELETE",
            cache: "no-store",
        });
        return !!res && (res.ok || res.status === 404);
    },
};

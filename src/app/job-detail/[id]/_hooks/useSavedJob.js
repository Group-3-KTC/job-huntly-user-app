import { useEffect, useState, useCallback } from "react";
import { isLoggedIn } from "../_utils/auth";
import { savedJobApi } from "../_api/savedJob";

export default function useSavedJob(jobId, onNeedLogin, onToast) {
  const [liked, setLiked] = useState(false);
  const [saving, setSaving] = useState(false);

  // init status
  useEffect(() => {
    let cancel = false;
    (async () => {
      if (!jobId) return;
      const logged = await isLoggedIn();
      if (!logged) return;
      const saved = await savedJobApi.status(jobId);
      if (!cancel) setLiked(saved);
    })();
    return () => { cancel = true; };
  }, [jobId]);

  const toggle = useCallback(async () => {
    if (saving || !jobId) return;
    const logged = await isLoggedIn();
    if (!logged) { onNeedLogin?.(); return; }

    setSaving(true);
    try {
      if (!liked) {
        const resp = await savedJobApi.save(jobId);
        if (resp) { setLiked(true); onToast?.("Saved job", "success"); }
        else alert("Lưu công việc thất bại!");
      } else {
        const ok = await savedJobApi.unsave(jobId);
        if (ok) { setLiked(false); onToast?.("Unsaved job", "neutral"); }
        else alert("Bỏ lưu công việc thất bại!");
      }
    } finally {
      setSaving(false);
    }
  }, [saving, liked, jobId, onNeedLogin, onToast]);

  return { liked, saving, toggle };
}
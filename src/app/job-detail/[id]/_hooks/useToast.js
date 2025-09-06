import { useState, useRef, useCallback, useEffect } from "react";

const TOAST_DURATION = 2000;

export default function useToast() {
  const [toast, setToast] = useState({ open: false, text: "", type: "neutral" });
  const timer = useRef(null);

  const showToast = useCallback((text, type = "neutral") => {
    setToast({ open: true, text, type });
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(
      () => setToast({ open: false, text: "", type: "neutral" }),
      TOAST_DURATION
    );
  }, []);

  useEffect(() => () => timer.current && clearTimeout(timer.current), []);

  return { toast, showToast };
}
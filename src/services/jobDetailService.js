export const getJobDetail = async (id) => {
  try {
    const res = await fetch(`https://687076977ca4d06b34b6dc20.mockapi.io/api/v1/jobs/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch job detail");
    }

    return res.json();
  } catch (err) {
    console.error("getJobDetail error:", err);
    throw err;
  }
};
const BASE_URL = "http://18.142.226.139:8080/api/v1";

export const getJobDetail = async (id) => {
  if (!id && id !== 0) throw new Error("Missing job id");

  const url = `${BASE_URL}/job/${id}`;

  try {
    const res = await fetch(url, {
      cache: "no-store", // tránh dính cache khi chuyển giữa các id
    });

    if (!res.ok) {
      console.error(`[getJobDetail] HTTP ${res.status} for ${url}`);
      throw new Error(`Failed to fetch job detail (status ${res.status})`);
    }

    const data = await res.json();

    return {
      id: data.id,
      title: data.title || "",
      description: data.description,
      requirements: data.requirements,
      benefits: data.benefits,
      location: data.location,
      avatar: data.company?.avatar || "",
      companyName: data.company?.company_name || "",
      category: data.category_names || [],
      level: data.level_names || [],
      workType: data.work_type_names || [],
      skill: data.skill_names || [],
      city: data.wards || [],
      salaryDisplay: data.salaryDisplay || "Thỏa thuận",
      datePost: data.date_post,
      expiredDate: data.expired_date,
    };
  } catch (err) {
    console.error("getJobDetail error:", err);
    throw err;
  }
};
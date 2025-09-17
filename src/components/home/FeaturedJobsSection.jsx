// "use client";

// import React, {useCallback, useEffect, useMemo, useState} from "react";
// import Link from "next/link";
// import {ArrowRight, Bookmark, BookmarkCheck, MapPin} from "lucide-react";
// import {toast} from "react-toastify";
// import {useSaveJobMutation, useUnsaveJobMutation} from "@/services/savedJobService";
// import {showLoginPrompt} from "@/features/auth/loginPromptSlice";
// import {useDispatch, useSelector} from "react-redux";
// import {selectIsLoggedIn} from "@/features/auth/authSelectors";
// import api from "@/lib/api";
// import axios from "axios";

// const NEXT_PUBLIC_API_PROXY_TARGET = process.env.NEXT_PUBLIC_API_PROXY_TARGET;
// const NEXT_PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
// const API_BASE = NEXT_PUBLIC_API_PROXY_TARGET + NEXT_PUBLIC_API_BASE_URL;

// async function fetchJobs(signal) {
//     const res = await api.get("/job/all", {
//         params: {size: 12, page: 0},
//         signal,
//     });
//     return res.data;
// }


// async function fetchSaveStatus(jobId, signal) {
//     const res = await api.get("/save-job/status", {
//         params: {job_id: jobId},
//         signal,
//     });
//     return !!res.data?.saved;
// }

// async function fetchApplyStatus(jobId, signal) {
//     const res = await api.get("/application/status", {
//         params: {job_id: jobId},
//         signal,
//     });
//     return !!res.data?.applied;
// }


// function typeColorClass(type) {
//     switch ((type || "").toUpperCase()) {
//         case "FULL-TIME":
//         case "FULL TIME":
//             return "bg-blue-100 text-blue-800";
//         case "PART-TIME":
//         case "PART TIME":
//             return "bg-green-100 text-green-800";
//         case "INTERNSHIP":
//             return "bg-purple-100 text-purple-800";
//         case "CONTRACT":
//             return "bg-yellow-100 text-yellow-800";
//         case "REMOTE":
//             return "bg-teal-100 text-teal-800";
//         default:
//             return "bg-gray-100 text-gray-800";
//     }
// }


// function normalizeJob(j) {
//     const companyName = j?.company?.company_name || "Unknown Company";
//     const logo = j?.company?.avatar || "/logo-placeholder.png";
//     const firstWorkType =
//         Array.isArray(j?.work_type_names) && j.work_type_names.length > 0
//             ? j.work_type_names[0]
//             : null;

//     return {
//         id: j?.id,
//         title: j?.title || "Untitled",
//         company: companyName,
//         logo,
//         salary: j?.salaryDisplay || "Negotiable",
//         location: j?.location || "—",
//         type: firstWorkType || "OTHER",
//         typeColor: typeColorClass(firstWorkType),

//         boosted: !!j?.boosted,
//         boostLevel: Number(j?.boostLevel) || 0,

//         // fallback nếu backend đã trả cờ
//         liked: !!(j?.liked ?? j?.saved ?? j?.isSaved),
//     };
// }

// function sortWithBoost(jobs) {
//     return [...jobs].sort((a, b) => {
//         if (a.boosted !== b.boosted) return a.boosted ? -1 : 1;
//         if (a.boostLevel !== b.boostLevel) return b.boostLevel - a.boostLevel;
//         return 0;
//     });
// }

// const FeaturedJobsSection = () => {
//     const [jobs, setJobs] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [err, setErr] = useState("");
//     const dispatch = useDispatch();

//     // maps
//     const [likedMap, setLikedMap] = useState({});
//     const [appliedMap, setAppliedMap] = useState({});
//     const [savingMap, setSavingMap] = useState({});

//     // mutations
//     const [saveJob] = useSaveJobMutation();
//     const [unsaveJob] = useUnsaveJobMutation();

//     const isLoggedIn = useSelector(selectIsLoggedIn);

//     const guardOr = useCallback(
//         (action) => {
//             if (!isLoggedIn) {
//                 dispatch(showLoginPrompt());
//                 return;
//             }
//             action?.();
//         },
//         [dispatch, isLoggedIn]
//     );

//     useEffect(() => {
//         const controller = new AbortController();

//         (async () => {
//             try {
//                 setLoading(true);

//                 const data = await fetchJobs(controller.signal);
//                 const items = Array.isArray(data?.content) ? data.content : [];
//                 const normalized = items.map(normalizeJob);
//                 const finalList = sortWithBoost(normalized).slice(0, 12);

//                 setJobs(finalList);

//                 // init liked từ payload (fallback)
//                 const initLiked = {};
//                 finalList.forEach((j) => (initLiked[j.id] = !!j.liked));
//                 setLikedMap(initLiked);

//                 // nếu đã đăng nhập: gọi 2 API status cho từng job
//                 if (isLoggedIn && finalList.length > 0) {
//                     const ids = finalList.map((j) => j.id);

//                     // gọi song song, ignore error từng job
//                     const savedResults = await Promise.allSettled(
//                         ids.map((id) => fetchSaveStatus(id, controller.signal))
//                     );
//                     const appliedResults = await Promise.allSettled(
//                         ids.map((id) => fetchApplyStatus(id, controller.signal))
//                     );

//                     const newLiked = {...initLiked};
//                     const newApplied = {};
//                     savedResults.forEach((r, idx) => {
//                         const id = ids[idx];
//                         if (r.status === "fulfilled") newLiked[id] = r.value === true;
//                     });
//                     appliedResults.forEach((r, idx) => {
//                         const id = ids[idx];
//                         if (r.status === "fulfilled") newApplied[id] = r.value === true;
//                     });

//                     setLikedMap(newLiked);
//                     setAppliedMap(newApplied);
//                 }
//             } catch (e) {
//                 const isCanceled =
//                     axios.isCancel?.(e) ||
//                     e?.name === "CanceledError" ||
//                     e?.code === "ERR_CANCELED" ||
//                     e?.name === "AbortError" ||
//                     e?.message === "canceled" ||
//                     e?.__CANCEL__ === true;
//                 if (!isCanceled) setErr(e?.message || "Failed to load");
//             } finally {
//                 setLoading(false);
//             }
//         })();

//         return () => controller.abort();
//     }, [isLoggedIn]);

//     // Toggle save/unsave (giống DetailJob)
//     const makeHandleSave = useCallback(
//         (jobId) =>
//             () =>
//                 guardOr(async () => {
//                     try {
//                         if (!jobId) return;
//                         if (savingMap[jobId]) return;

//                         const currentlyLiked = !!likedMap[jobId];
//                         setSavingMap((m) => ({...m, [jobId]: true}));

//                         if (!currentlyLiked) {
//                             await saveJob({jobId}).unwrap();
//                             setLikedMap((m) => ({...m, [jobId]: true}));
//                             toast.success("Job saved successfully");
//                         } else {
//                             await unsaveJob(jobId).unwrap();
//                             setLikedMap((m) => ({...m, [jobId]: false}));
//                             toast.info("Job unsaved");
//                         }
//                     } catch (err) {
//                         console.error("Toggle save error", err);
//                         toast.error("Error while saving/unsaving job");
//                     } finally {
//                         setSavingMap((m) => ({...m, [jobId]: false}));
//                     }
//                 }),
//         [guardOr, likedMap, savingMap, saveJob, unsaveJob]
//     );

//     const body = useMemo(() => {
//         if (loading) {
//             return (
//                 <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//                     {Array.from({length: 6}).map((_, i) => (
//                         <div
//                             key={i}
//                             className="p-6 bg-white border border-gray-200 rounded-lg animate-pulse"
//                         >
//                             <div className="flex items-start justify-between mb-4">
//                                 <div className="w-40 h-4 bg-gray-200 rounded"/>
//                                 <div className="w-6 h-6 bg-gray-200 rounded-full"/>
//                             </div>
//                             <div className="w-24 h-5 mb-2 bg-gray-200 rounded"/>
//                             <div className="h-3 mb-4 bg-gray-200 rounded w-36"/>
//                             <div className="flex items-center">
//                                 <div className="w-10 h-10 mr-3 bg-gray-200 rounded-full"/>
//                                 <div className="flex-1">
//                                     <div className="w-32 h-4 mb-2 bg-gray-200 rounded"/>
//                                     <div className="w-24 h-3 bg-gray-200 rounded"/>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             );
//         }

//         if (err) {
//             return (
//                 <div className="p-6 text-sm text-red-700 border border-red-200 rounded bg-red-50">
//                     Failed to load job listings. {err}
//                 </div>
//             );
//         }

//         if (jobs.length === 0) {
//             return (
//                 <div className="p-6 text-sm text-gray-600 bg-white border border-gray-200 rounded">
//                     No suitable jobs are currently available.
//                 </div>
//             );
//         }

//         return (
//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//                 {jobs.map((job) => {
//                     const liked = !!likedMap[job.id];
//                     const saving = !!savingMap[job.id];
//                     const applied = !!appliedMap[job.id];
//                     const handleSave = makeHandleSave(job.id);

//                     return (
//                         <div
//                             key={job.id}
//                             className="relative p-6 transition-shadow bg-white border border-gray-200 rounded-lg hover:shadow-lg"
//                         >
//                             {/* Badge BOOSTED (phải) */}
//                             {job.boosted && (
//                                 <span
//                                     className="absolute top-3 right-3 px-2 py-0.5 text-[10px] font-semibold rounded-full bg-amber-100 text-amber-800 border border-amber-200">
//                   BOOSTED
//                 </span>
//                             )}


//                             <div className="flex items-start justify-between mb-4">
//                                 <div className="pr-4">
//                                     <h3 className="mb-2 text-base font-semibold text-gray-900 line-clamp-2">
//                                         <Link href={`/job-detail/${job.id}`} className="hover:underline">
//                                             {job.title}
//                                         </Link>
//                                     </h3>

//                                     <section
//                                         className={`${job.typeColor} inline-block px-2 py-1 rounded-full text-xs font-semibold`}
//                                     >
//                                         {job.type}
//                                     </section>

//                                     <p className="mt-2 text-sm text-gray-600">Salary: {job.salary}</p>
//                                 </div>

//                                 {/* Save / Unsave */}
//                                 <div className="relative flex items-center gap-2">
//                                     {applied && (
//                                         <span
//                                             className="inline-flex items-center px-2 py-0.5 text-[10px] font-semibold rounded-full bg-green-50 text-green-700 ring-1 ring-inset ring-green-200 whitespace-nowrap"
//                                             title="You have applied"
//                                         >
//                                           APPLIED
//                                         </span>
//                                     )}
//                                     {liked ? (
//                                         <BookmarkCheck
//                                             onClick={handleSave}
//                                             size={22}
//                                             className={`cursor-pointer hover:scale-110 transition text-blue-700 fill-blue-700 ${
//                                                 saving ? "opacity-60 pointer-events-none" : ""
//                                             }`}
//                                             title="Unsave"
//                                         />
//                                     ) : (
//                                         <Bookmark
//                                             onClick={handleSave}
//                                             size={22}
//                                             className={`cursor-pointer hover:scale-110 transition text-gray-400 ${
//                                                 saving ? "opacity-60 pointer-events-none" : ""
//                                             }`}
//                                             title="Save Job"
//                                         />
//                                     )}
//                                 </div>
//                             </div>

//                             <div className="flex items-center">
//                                 <div
//                                     className="flex items-center justify-center w-10 h-10 mr-3 overflow-hidden bg-white rounded-full shadow-sm ring-1 ring-gray-100">
//                                     <img
//                                         src={job.logo}
//                                         alt={job.company}
//                                         className="object-contain w-full h-full"
//                                     />
//                                 </div>
//                                 <div>
//                                     <p className="font-medium text-gray-900">{job.company}</p>
//                                     <div className="flex items-center text-sm text-gray-600">
//                                         <MapPin className="w-4 h-4 mr-1"/>
//                                         {job.location}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     );
//                 })}
//             </div>
//         );
//     }, [jobs, loading, err, likedMap, savingMap, appliedMap, makeHandleSave]);

//     return (
//         <section className="py-16">
//             <div className="container px-4 mx-auto">
//                 <div className="flex items-center justify-between mb-12">
//                     <h2 className="text-3xl font-bold text-gray-900">Featured job</h2>
//                     <Link
//                         href="/search"
//                         className="flex items-center font-medium text-blue-600 hover:text-blue-700"
//                     >
//                         View All <ArrowRight className="w-4 h-4 ml-2"/>
//                     </Link>
//                 </div>

//                 {body}
//             </div>
//         </section>
//     );
// };

// export default FeaturedJobsSection;

"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Bookmark, BookmarkCheck, MapPin } from "lucide-react";
import { toast } from "react-toastify";
import {
    useSaveJobMutation,
    useUnsaveJobMutation,
} from "@/services/savedJobService";
import { showLoginPrompt } from "@/features/auth/loginPromptSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "@/features/auth/authSelectors";
import api from "@/lib/api";
import axios from "axios";

const NEXT_PUBLIC_API_PROXY_TARGET = process.env.NEXT_PUBLIC_API_PROXY_TARGET;
const NEXT_PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_BASE = NEXT_PUBLIC_API_PROXY_TARGET + NEXT_PUBLIC_API_BASE_URL;

async function fetchJobs(signal) {
    const res = await api.get("/job/all", {
        params: { size: 12, page: 0 },
        signal,
    });
    return res.data;
}

async function fetchSaveStatus(jobId, signal) {
    const res = await api.get("/save-job/status", {
        params: { job_id: jobId },
        signal,
    });
    return !!res.data?.saved;
}

async function fetchApplyStatus(jobId, signal) {
    const res = await api.get("/application/status", {
        params: { job_id: jobId },
        signal,
    });
    return !!res.data?.applied;
}

function typeColorClass(type) {
    switch ((type || "").toUpperCase()) {
        case "FULL-TIME":
        case "FULL TIME":
            return "bg-blue-100 text-blue-800";
        case "PART-TIME":
        case "PART TIME":
            return "bg-green-100 text-green-800";
        case "INTERNSHIP":
            return "bg-purple-100 text-purple-800";
        case "CONTRACT":
            return "bg-yellow-100 text-yellow-800";
        case "REMOTE":
            return "bg-teal-100 text-teal-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
}

function normalizeJob(j) {
    const companyName = j?.company?.company_name || "Unknown Company";
    const logo = j?.company?.avatar || "/logo-placeholder.png";
    const firstWorkType =
        Array.isArray(j?.work_type_names) && j.work_type_names.length > 0
            ? j.work_type_names[0]
            : null;

    return {
        id: j?.id,
        title: j?.title || "Untitled",
        company: companyName,
        logo,
        salary: j?.salaryDisplay || "Negotiable",
        location: j?.location || "—",
        type: firstWorkType || "OTHER",
        typeColor: typeColorClass(firstWorkType),
        boosted: !!j?.boosted,
        boostLevel: Number(j?.boostLevel) || 0,
        liked: !!(j?.liked ?? j?.saved ?? j?.isSaved),
    };
}

function sortWithBoost(jobs) {
    return [...jobs].sort((a, b) => {
        if (a.boosted !== b.boosted) return a.boosted ? -1 : 1;
        if (a.boostLevel !== b.boostLevel) return b.boostLevel - a.boostLevel;
        return 0;
    });
}

const FeaturedJobsSection = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");
    const dispatch = useDispatch();
    const [likedMap, setLikedMap] = useState({});
    const [appliedMap, setAppliedMap] = useState({});
    const [savingMap, setSavingMap] = useState({});
    const [saveJob] = useSaveJobMutation();
    const [unsaveJob] = useUnsaveJobMutation();
    const isLoggedIn = useSelector(selectIsLoggedIn);

    const guardOr = useCallback(
        (action) => {
            if (!isLoggedIn) {
                dispatch(showLoginPrompt());
                return;
            }
            action?.();
        },
        [dispatch, isLoggedIn]
    );

    useEffect(() => {
        const controller = new AbortController();
        (async () => {
            try {
                setLoading(true);
                const data = await fetchJobs(controller.signal);
                const items = Array.isArray(data?.content) ? data.content : [];
                const normalized = items.map(normalizeJob);
                const finalList = sortWithBoost(normalized).slice(0, 12);
                setJobs(finalList);
                const initLiked = {};
                finalList.forEach((j) => (initLiked[j.id] = !!j.liked));
                setLikedMap(initLiked);
                if (isLoggedIn && finalList.length > 0) {
                    const ids = finalList.map((j) => j.id);
                    const savedResults = await Promise.allSettled(
                        ids.map((id) => fetchSaveStatus(id, controller.signal))
                    );
                    const appliedResults = await Promise.allSettled(
                        ids.map((id) => fetchApplyStatus(id, controller.signal))
                    );
                    const newLiked = { ...initLiked };
                    const newApplied = {};
                    savedResults.forEach((r, idx) => {
                        const id = ids[idx];
                        if (r.status === "fulfilled")
                            newLiked[id] = r.value === true;
                    });
                    appliedResults.forEach((r, idx) => {
                        const id = ids[idx];
                        if (r.status === "fulfilled")
                            newApplied[id] = r.value === true;
                    });
                    setLikedMap(newLiked);
                    setAppliedMap(newApplied);
                }
            } catch (e) {
                const isCanceled =
                    axios.isCancel?.(e) ||
                    e?.name === "CanceledError" ||
                    e?.code === "ERR_CANCELED" ||
                    e?.name === "AbortError" ||
                    e?.message === "canceled" ||
                    e?.__CANCEL__ === true;
                if (!isCanceled) setErr(e?.message || "Failed to load");
            } finally {
                setLoading(false);
            }
        })();
        return () => controller.abort();
    }, [isLoggedIn]);

    const makeHandleSave = useCallback(
        (jobId) => () =>
            guardOr(async () => {
                try {
                    if (!jobId) return;
                    if (savingMap[jobId]) return;
                    const currentlyLiked = !!likedMap[jobId];
                    setSavingMap((m) => ({ ...m, [jobId]: true }));
                    if (!currentlyLiked) {
                        await saveJob({ jobId }).unwrap();
                        setLikedMap((m) => ({ ...m, [jobId]: true }));
                        toast.success("Job saved successfully");
                    } else {
                        await unsaveJob(jobId).unwrap();
                        setLikedMap((m) => ({ ...m, [jobId]: false }));
                        toast.info("Job unsaved");
                    }
                } catch (err) {
                    console.error("Toggle save error", err);
                    toast.error("Error while saving/unsaving job");
                } finally {
                    for (job of jobs) {
                        setSavingMap((m) => ({ ...m, [jobId]: false }));
                    }
                }
            }),
        [guardOr, likedMap, savingMap, saveJob, unsaveJob]
    );

    const body = useMemo(() => {
        if (loading) {
            return (
                <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div
                            key={i}
                            className="p-3 bg-white border border-gray-200 rounded-lg sm:p-4 lg:p-6 animate-pulse"
                        >
                            <div className="flex items-start justify-between mb-3 sm:mb-4">
                                <div className="w-40 h-4 bg-gray-200 rounded" />
                                <div className="w-5 h-5 bg-gray-200 rounded-full sm:w-6 sm:h-6" />
                            </div>
                            <div className="w-24 h-4 mb-2 bg-gray-200 rounded sm:h-5" />
                            <div className="h-3 mb-3 bg-gray-200 rounded w-36 sm:mb-4" />
                            <div className="flex items-center">
                                <div className="w-8 h-8 mr-2 bg-gray-200 rounded-full sm:w-10 sm:h-10 sm:mr-3" />
                                <div className="flex-1">
                                    <div className="w-32 h-4 mb-2 bg-gray-200 rounded" />
                                    <div className="w-24 h-3 bg-gray-200 rounded" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            );
        }

        if (err) {
            return (
                <div className="p-3 text-xs text-red-700 border border-red-200 rounded sm:p-4 lg:p-6 sm:text-sm bg-red-50">
                    Failed to load job listings. {err}
                </div>
            );
        }

        if (jobs.length === 0) {
            return (
                <div className="p-3 text-xs text-gray-600 bg-white border border-gray-200 rounded sm:p-4 lg:p-6 sm:text-sm">
                    No suitable jobs are currently available.
                </div>
            );
        }

        return (
            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                {jobs.map((job) => {
                    const liked = !!likedMap[job.id];
                    const saving = !!savingMap[job.id];
                    const applied = !!appliedMap[job.id];
                    const handleSave = makeHandleSave(job.id);

                    return (
                        <div
                            key={job.id}
                            className="relative p-3 transition-shadow bg-white border border-gray-200 rounded-lg sm:p-4 lg:p-6 hover:shadow-lg"
                        >
                            {job.boosted && (
                                <span className="absolute top-2 sm:top-3 right-2 sm:right-3 px-2 py-0.5 text-[10px] font-semibold rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                                    BOOSTED
                                </span>
                            )}
                            <div className="flex items-start justify-between mb-3 sm:mb-4">
                                <div className="pr-3 sm:pr-4">
                                    <h3 className="mb-2 text-sm font-semibold text-gray-900 sm:text-base line-clamp-2">
                                        <Link
                                            href={`/job-detail/${job.id}`}
                                            className="hover:underline"
                                        >
                                            {job.title}
                                        </Link>
                                    </h3>
                                    <section
                                        className={`${job.typeColor} inline-block px-2 py-1 rounded-full text-xs font-semibold`}
                                    >
                                        {job.type}
                                    </section>
                                    <p className="mt-2 text-xs text-gray-600 sm:text-sm">
                                        Salary: {job.salary}
                                    </p>
                                </div>
                                <div className="relative flex items-center gap-2">
                                    {applied && (
                                        <span
                                            className="inline-flex items-center px-2 py-0.5 text-[10px] font-semibold rounded-full bg-green-50 text-green-700 ring-1 ring-inset ring-green-200 whitespace-nowrap"
                                            title="You have applied"
                                        >
                                            APPLIED
                                        </span>
                                    )}
                                    {liked ? (
                                        <BookmarkCheck
                                            onClick={handleSave}
                                            size={16}
                                            className={`cursor-pointer hover:scale-110 transition text-blue-700 fill-blue-700 ${
                                                saving
                                                    ? "opacity-60 pointer-events-none"
                                                    : ""
                                            }`}
                                            title="Unsave"
                                        />
                                    ) : (
                                        <Bookmark
                                            onClick={handleSave}
                                            size={16}
                                            className={`cursor-pointer hover:scale-110 transition text-gray-400 ${
                                                saving
                                                    ? "opacity-60 pointer-events-none"
                                                    : ""
                                            }`}
                                            title="Save Job"
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="flex items-center justify-center w-6 h-6 mr-2 overflow-hidden bg-white rounded-full shadow-sm sm:w-8 sm:h-8 lg:w-10 lg:h-10 sm:mr-3 ring-1 ring-gray-100">
                                    <img
                                        src={job.logo}
                                        alt={job.company}
                                        className="object-contain w-full h-full"
                                    />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900 sm:text-base">
                                        {job.company}
                                    </p>
                                    <div className="flex items-center text-xs text-gray-600 sm:text-sm">
                                        <MapPin className="w-3 h-3 mr-1 sm:w-4 sm:h-4" />
                                        {job.location}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }, [jobs, loading, err, likedMap, savingMap, appliedMap, makeHandleSave]);

    return (
        <section className="py-8 sm:py-12 lg:py-16">
            <div className="container px-2 mx-auto sm:px-4">
                <div className="flex items-center justify-between mb-8 sm:mb-12">
                    <h2 className="text-xl font-bold text-gray-900 sm:text-2xl lg:text-3xl">
                        Featured job
                    </h2>
                    <Link
                        href="/search"
                        className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 sm:text-base"
                    >
                        View All{" "}
                        <ArrowRight className="w-3 h-3 ml-2 sm:w-4 sm:h-4" />
                    </Link>
                </div>
                {body}
            </div>
        </section>
    );
};

export default FeaturedJobsSection;
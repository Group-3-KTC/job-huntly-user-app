import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    DollarSign,
    Clock,
    CalendarDays,
    Eye,
    FileText,
    Building2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const jobApplications = [
    {
        job: "Data Analyst",
        time: "31-07-2025 16:00",
        companyAvatar:
            "https://cdn-new.topcv.vn/unsafe/150x/https://static.topcv.vn/company_logos/6864ae2d6e8cc1751428653.jpg",
        cvUrl: "https://www.topcv.vn/view/cv/abc",
        status: "Applied",
        company: "Viettel Group",
        salaryDisplay: "7 - 12 triệu",
        job_id: "1",
        company_id: "20",
        expired_date: "10-08-2025",
    },
    {
        job: "Flutter Developer",
        time: "28-07-2025 18:34",
        companyAvatar:
            "https://cdn-new.topcv.vn/unsafe/150x/https://static.topcv.vn/company_logos/cong-ty-tnhh-mtv-vien-thong-quoc-te-fpt-5d898f99a34de.jpg",
        cvUrl: "https://www.topcv.vn/view/cv/def",
        status: "Reviewed",
        company: "FPT Corporation",
        salaryDisplay: "Thoả thuận",
        job_id: "2",
        company_id: "21",
        expired_date: "10-08-2025",
    },
    {
        job: "Backend Developer (Java)",
        time: "05-08-2025 09:15",
        companyAvatar:
            "https://cdn-new.topcv.vn/unsafe/150x/https://static.topcv.vn/company_logos/cong-ty-tnhh-samsung-sds-viet-nam-6075021cab6e8.jpg",
        cvUrl: "https://www.topcv.vn/view/cv/xyz",
        status: "Reviewed",
        company: "Samsung Vietnam",
        salaryDisplay: "15 - 25 triệu",
        job_id: "3",
        company_id: "23",
        expired_date: "30-08-2025",
    },
];

function getStatusColor(status) {
    switch (status) {
        case "Applied":
            return "bg-blue-100 text-blue-700";
        case "Reviewed":
            return "bg-blue-100 text-blue-700";
        default:
            return "bg-gray-100 text-gray-700";
    }
}

function formatDate(dateString) {
    const [datePart, timePart] = dateString.split(" ");
    const [day, month, year] = datePart.split("-");
    return {
        date: `${day}/${month}/${year}`,
        time: timePart,
    };
}

export default function AppliedPage() {
    return (
        <div className="space-y-4">
            {jobApplications.map((job) => {
                const { date, time } = formatDate(job.time);
                return (
                    <Card
                        key={job.job_id}
                        className="border border-gray-200 shadow-sm rounded-xl hover:shadow-md transition"
                    >
                        <CardContent className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">
                            {/* Left Section */}
                            <div className="flex items-center gap-4 flex-1">
                                {/* Company Logo */}
                                <div className="relative w-16 h-14 flex-shrink-0">
                                    <Image
                                        src={
                                            job.companyAvatar ||
                                            "/placeholder.svg"
                                        }
                                        alt={job.company}
                                        fill
                                        className="object-contain bg-white rounded-lg p-1 "
                                    />
                                </div>

                                {/* Job Info */}
                                <div className="space-y-2 flex-1">
                                    {/* Job Title with Status Badge */}
                                    <div className="flex items-center gap-3">
                                        <Link
                                            href={`job-detail/${job.job_id}`}
                                            className="text-lg font-semibold text-gray-900  hover:text-blue-700"
                                        >
                                            {job.job}
                                        </Link>
                                        <Badge
                                            className={`${getStatusColor(
                                                job.status
                                            )} px-3 py-1 rounded-full font-medium text-xs`}
                                        >
                                            {job.status}
                                        </Badge>
                                    </div>

                                    {/* Company */}
                                    <div className="flex items-center gap-1 text-gray-600">
                                        <Building2 className="h-4 w-4 text-gray-500" />
                                        <Link
                                            href={`/company/company-detail/${job.company_id}`}
                                            className="underline underline-offset-2 hover:text-blue-700"
                                        >
                                            {job.company}
                                        </Link>
                                    </div>

                                    {/* Job Meta Info */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 text-sm text-gray-700">
                                        <div className="flex items-center gap-1">
                                            <Clock className="h-4 w-4 text-blue-600" />
                                            <span>
                                                Time: {date} {time}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <CalendarDays className="h-4 w-4 text-orange-600" />
                                            <span>
                                                Expired Date: {job.expired_date}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <DollarSign className="h-4 w-4 text-green-600" />
                                            <span>{job.salaryDisplay}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Section - Action Buttons Column */}
                            <div className="flex flex-col gap-6 justify-around md:items-end">
                                <Button
                                    size="sm"
                                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg w-full md:w-auto"
                                    asChild
                                >
                                    <Link
                                        href={job.cvUrl}
                                        target="_blank"
                                        className="flex items-center gap-2"
                                    >
                                        <FileText className="h-4 w-4" />
                                        <span>CV</span>
                                    </Link>
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="rounded-lg w-full md:w-auto"
                                    asChild
                                >
                                    <Link
                                        href={`job-detail/${job.job_id}`}
                                        className="flex items-center gap-2"
                                    >
                                        <Eye className="h-4 w-4" />
                                        <span>Your job</span>
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}

const fakeData = {
    userProfile: {
        id: "1",
        aboutMe: "my name is Võ Hoàng Phúc",
        personalLink: "https://github.com/Group-3-KTC/job-huntly-user-app",
        gender: "male",
        phone: "0767742630",
        address: "Điện Biên Phủ, Việt Nam",
        dateOfBirth: "2025-07-05T17:00:00.000Z",
        email: "phuc111239@gmail.com",
        title: "Frontend Developer",
        name: "Hoang Phuc Vo",
        avatar: "https://ca.slack-edge.com/T092B4T8XTN-U092ZEL3C3A-f1db21fda0f9-512",
        skills: [
            { id: "1", name: "react", level: "Intermediate" },
            { id: "2", name: "nextjs", level: "beginner" },
        ],
        education: [
            {
                id: "1",
                school: "Van Hien Uni",
                degree: "test",
                major: "test",
                date: "08/2021-Now",
                note: "test",
            },
        ],
        workExperience: [
            {
                id: "1",
                position: "Software Architect",
                company: "FPT Education",
                time: "02/2020 - NOW",
                description: "example",
                project: "example",
            },
        ],
        language: [{ id: "1", name: "english", level: "beginner" }],
        certificates: [
            {
                id: "1",
                name: "AWS Certified Solutions Architect",
                issuer: "Amazon Web Services",
                date: "06/2023",
                description: "Certified in cloud architecture and deployment.",
            },
        ],
    },
    candidateProfile: {
        id: "1",
        aboutMe: "my name is Võ Hoàng Phúc",
        personalLink: "https://github.com/Group-3-KTC/job-huntly-user-app",
        gender: "male",
        phone: "0767742630",
        address: "Điện Biên Phủ, Việt Nam",
        dateOfBirth: "2025-07-05T17:00:00.000Z",
        email: "phuc111239@gmail.com",
        title: "Frontend Developer",
        name: "Hoang Phuc Vdro",
        avatar: "https://ca.slack-edge.com/T092B4T8XTN-U092ZEL3C3A-f1db21fda0f9-512",
    },
    skills: [
        { id: "1", name: "react", level: "Intermediate" },
        { id: "2", name: "nextjs", level: "beginner" },
    ],
    education: [
        {
            id: "1",
            school: "Van Hien Uni",
            degree: "test",
            major: "test",
            date: "08/2021-Now",
            note: "test",
        },
    ],
    workExperience: [
        {
            id: "1",
            position: "Software Architect",
            company: "FPT Education",
            time: "02/2020 - NOW",
            description: "example",
            project: "example",
        },
    ],
    language: [{ id: "1", name: "english", level: "beginner" }],
    certificates: [
        {
            id: "1",
            name: "AWS Certified Solutions Architect",
            issuer: "Amazon Web Services",
            date: "06/2023",
            description: "Certified in cloud architecture and deployment.",
        },
    ],
};

export const fakeFetchApi = async (url, method = "GET", body = null) => {
    console.log(
        "Fake API called with url:",
        url,
        "method:",
        method,
        "body:",
        body
    );

    const fullUrl = url.url || url; // Lấy url từ Request object nếu có
    console.log("Full URL processed:", fullUrl);

    // Giả lập ID mặc định là "1" (có thể thay bằng ID từ Redux/state sau này)
    const defaultProfileId = "1";

    // Xử lý endpoint tĩnh, không phụ thuộc vào URL chi tiết
    if (
        fullUrl.startsWith("http://localhost:3000/candidate/") &&
        method === "GET"
    ) {
        if (fullUrl.endsWith("/profile")) {
            console.log(
                "Returning userProfile data for profile endpoint:",
                fakeData.userProfile
            );
            return new Response(
                JSON.stringify({ data: fakeData.userProfile }),
                {
                    status: 200,
                    headers: { "Content-Type": "application/json" },
                }
            );
        } else if (fullUrl.endsWith("/candidateProfile")) {
            return new Response(
                JSON.stringify({ data: fakeData.candidateProfile }),
                {
                    status: 200,
                    headers: { "Content-Type": "application/json" },
                }
            );
        } else {
            const section = fullUrl.split("/").pop();
            if (
                [
                    "skills",
                    "education",
                    "workExperience",
                    "language",
                    "certificates",
                ].includes(section)
            ) {
                return new Response(
                    JSON.stringify({ data: fakeData[section] || [] }),
                    {
                        status: 200,
                        headers: { "Content-Type": "application/json" },
                    }
                );
            }
        }
    } else if (
        fullUrl.startsWith("http://localhost:3000/candidate/") &&
        method === "PUT" &&
        fullUrl.endsWith("/candidateProfile")
    ) {
        fakeData.candidateProfile = {
            ...fakeData.candidateProfile,
            ...body,
        };
        fakeData.userProfile = { ...fakeData.userProfile, ...body };
        return new Response(
            JSON.stringify({ data: fakeData.candidateProfile }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" },
            }
        );
    } else if (
        fullUrl.startsWith("http://localhost:3000/candidate/") &&
        method === "POST"
    ) {
        const section = fullUrl.split("/").pop();
        if (
            [
                "skills",
                "education",
                "workExperience",
                "language",
                "certificates",
            ].includes(section)
        ) {
            const newItem = {
                ...body,
                id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            };
            fakeData[section].push(newItem);
            fakeData.userProfile[section] = fakeData[section];
            return new Response(JSON.stringify({ data: newItem }), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        }
    } else if (
        fullUrl.startsWith("http://localhost:3000/candidate/") &&
        method === "PUT"
    ) {
        const [section, itemId] = fullUrl.split("/").slice(-2);
        if (
            [
                "skills",
                "education",
                "workExperience",
                "language",
                "certificates",
            ].includes(section)
        ) {
            const index = fakeData[section].findIndex(
                (item) => item.id === itemId
            );
            if (index === -1) {
                throw new Error("Item not found");
            }
            fakeData[section][index] = { ...body, id: itemId };
            fakeData.userProfile[section] = fakeData[section];
            return new Response(
                JSON.stringify({ data: fakeData[section][index] }),
                {
                    status: 200,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }
    } else if (
        fullUrl.startsWith("http://localhost:3000/candidate/") &&
        method === "DELETE"
    ) {
        const [section, itemId] = fullUrl.split("/").slice(-2);
        if (
            [
                "skills",
                "education",
                "workExperience",
                "language",
                "certificates",
            ].includes(section)
        ) {
            const index = fakeData[section].findIndex(
                (item) => item.id === itemId
            );
            if (index === -1) {
                throw new Error("Item not found");
            }
            fakeData[section].splice(index, 1);
            fakeData.userProfile[section] = fakeData[section];
            return new Response(JSON.stringify({ data: { success: true } }), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        }
    }

    throw new Error(`Endpoint not found or method not supported: ${fullUrl}`);
};

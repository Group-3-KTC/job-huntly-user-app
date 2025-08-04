"use client";
import { ArrowUpFromLine, FileUser } from "lucide-react";
import React, { useState } from "react";

const ManageCvPage = () => {
  const [cvFile, setCvFile] = useState({
    name: "CV Võ Hoàng Phúc - Intern FrontEnd.pdf",
    lastUploaded: "23/07/2025",
  });
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "Hoang Phuc Vo",
    phoneNumber: "0767742630",
    preferredWorkLocation: "TP Hồ Chí Minh, Bà Rịa-Vũng Tàu, Bình Định",
  });

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCvFile({
        name: file.name,
        lastUploaded: new Date().toLocaleDateString(),
      });
    }
  };

  return (
    <div className="cv-manager w-full p-5 text-gray-900 rounded-xl bg-white">
      <h2 className="text-2xl font-bold">Manage CVs</h2>
      <p className="text-gray-500 mt-2">
        Upload your CV below to use it throughout your application process
      </p>

      <div className="border border-gray-300 rounded-lg p-5 mt-5">
        <h3 className="text-lg font-semibold">Your CV</h3>
        {cvFile.name && (
          <div className="mt-2">
            <div className="flex items-center">
              <span
                role="img"
                aria-label="file"
                className="mr-2 text-blue-800"

              >
                <FileUser size={32} />
              </span>
              <div>
                <p className="underline underline-offset-1">{cvFile.name}</p>
                <p className="text-gray-500">
                  Last uploaded: {cvFile.lastUploaded}
                </p>
              </div>
            </div>
          </div>
        )}
        <input
          type="file"
          accept=".doc,.docx,.pdf"
          onChange={handleFileUpload}
          className="hidden"
          id="cv-upload"
        />
        <button
          htmlFor="cv-upload"
          className="flex items-center gap-2 border-2 border-blue-800 bg-white text-blue-800 px-4 py-2 rounded cursor-pointer mt-4 font-bold"
        >
          <ArrowUpFromLine />
          Upload CV
        </button>
        <p className="text-gray-500 text-sm mt-2">
          Please upload a .doc, .docx, or .pdf file, maximum 3MB and no password
          protection
        </p>
      </div>

      <div className="border border-gray-300 rounded-lg p-5 mt-5">
        <h3 className="text-lg font-semibold">Personal Information</h3>
        <p className="mt-2">
          <strong>Full name:</strong> {personalInfo.fullName}
        </p>
        <p className="mt-2">
          <strong>Phone number:</strong> {personalInfo.phoneNumber}
        </p>
        <p className="mt-2">
          <strong>Preferred work location:</strong>{" "}
          {personalInfo.preferredWorkLocation}
        </p>
      </div>
    </div>
  );
};

export default ManageCvPage;



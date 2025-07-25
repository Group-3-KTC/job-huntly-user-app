import { Mail, Gift, MapPin, Phone, User, Link } from "lucide-react";

export default function PersonalDetailSection({ data }) {
  return (
      <div className="space-y-4 text-lg text-gray-700">
          <div>
              <h1 className="text-2xl font-bold text-black">
                  {data.name || "Your Name Here"}
              </h1>
              <p className="mt-2 font-semibold text-gray-600 text-md">
                  {data.title || "Your Title Here"}
              </p>
          </div>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <div className="w-full space-y-2 sm:w-1/2">
                  <p className="flex items-center">
                      <Mail size={18} className="mr-2 text-gray-500" />
                      {data.email || "Your Email Here"}
                  </p>
                  <p className="flex items-center">
                      <Gift size={18} className="mr-2 text-gray-500" />
                      {data.dateOfBirth
                          ? new Date(data.dateOfBirth)
                                .toISOString()
                                .split("T")[0] // => "2003-11-01"
                          : "Your Date of Birth Here"}
                  </p>
                  <p className="flex items-center">
                      <Link size={18} className="mr-2 text-gray-500" />
                      {data.personalLink ? (
                          <a
                              href={data.personalLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-base text-blue-500 hover:underline"
                          >
                              {data.personalLink}
                          </a>
                      ) : (
                          "Youtr Personal Link Here"
                      )}
                  </p>
              </div>
              <div className="w-full space-y-2 sm:w-1/2">
                  <p className="flex items-center">
                      <Phone size={18} className="mr-2 text-gray-500" />
                      {data.phone || "Your Phone Number Here"}
                  </p>
                  <p className="flex items-center">
                      <User size={18} className="mr-2 text-gray-500" />
                      {data.gender || "Your Gender Here"}
                  </p>
                  <p className="flex items-center">
                      <MapPin size={18} className="mr-2 text-gray-500" />
                      {data.address || "Your Address Here"}
                  </p>
              </div>
          </div>
      </div>
  );
}

export default function ProfileSidebarRight() {
  return (
      <aside className="w-full">
          <div className="p-6 mb-4 bg-white shadow rounded-xl ">
              <div className="mb-4">
                  <div className="mb-2 text-lg font-bold">Profile Strength</div>
                  <div className="w-full h-3 mb-2 bg-gray-200 rounded-full">
                      <div
                          className="h-3 bg-blue-800 rounded-full"
                          style={{ width: "5%" }}
                      ></div>
                  </div>
                  <div className="mb-2 text-xs text-gray-600">5% completed</div>
                  <div className="mb-2 text-xs text-gray-500">
                      Complete profile to{" "}
                      <span className="font-bold text-blue-800">70%</span> to
                      generate CV template for IT professionals.
                  </div>
                  <ul className="mb-2 space-y-1 text-xs text-blue-600">
                      <li>+ Add About me</li>
                      <li>+ Add Contact Information</li>
                      <li>+ Add Work Experience</li>
                      <li>+ Add more information</li>
                  </ul>
                  <button className="w-full py-2 text-sm font-bold text-white bg-blue-800 rounded">
                      Preview & Download CV
                  </button>
              </div>
          </div>
      </aside>
  );
}

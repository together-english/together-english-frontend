export default function myPage() {
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      {/* Profile Card */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-40"></div>
        <div className="p-6">
          <div className="flex items-center">
            <img
              className="w-24 h-24 rounded-full border-4 border-white -mt-12"
              src="/images/user-profile-pic.jpg"
              alt="User profile"
            />
            <div className="ml-6">
              <h1 className="text-2xl font-semibold text-gray-900">John Doe</h1>
              <p className="text-gray-600">johndoe@example.com</p>
            </div>
          </div>
          <div className="mt-6">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Settings Section */}
      <div className="mt-10 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Account Info */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900">Account Information</h2>
            <ul className="mt-4 space-y-3">
              <li className="flex justify-between">
                <span className="text-gray-600">Email</span>
                <span className="text-gray-900">johndoe@example.com</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Phone</span>
                <span className="text-gray-900">+1234567890</span>
              </li>
            </ul>
          </div>

          {/* Security Section */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900">Security</h2>
            <ul className="mt-4 space-y-3">
              <li className="flex justify-between">
                <span className="text-gray-600">Change Password</span>
                <button className="text-blue-500 hover:text-blue-700">Update</button>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Two-factor Authentication</span>
                <button className="text-blue-500 hover:text-blue-700">Manage</button>
              </li>
            </ul>
          </div>

          {/* Recent Activity */}
          <div className="bg-white shadow-lg rounded-lg p-6 col-span-full">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            <ul className="mt-4 space-y-4">
              <li className="flex justify-between items-center">
                <span className="text-gray-600">Updated profile information</span>
                <span className="text-gray-500 text-sm">2 days ago</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-600">Changed password</span>
                <span className="text-gray-500 text-sm">5 days ago</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="mt-12 max-w-4xl mx-auto text-right">
        <button className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600">
          Log Out
        </button>
      </div>
    </div>
  )
}


export default function Layout({ children, role, userName }) {
    return (
      <div className="flex min-h-screen bg-[#5D2E2E]">
        {/* Sidebar */}
        <div className="w-64 bg-[#D9AC42] flex flex-col p-4 shadow-lg">
          {/* Logo */}
          <div className="flex items-center justify-center mb-10">
            <img src="/MJL-logo.png" alt="MJL Logo" className="h-full w-full" />
          </div>
  
          {/* Navigation placeholder */}
          <nav className="flex flex-col gap-4">
            <button className="text-white text-left hover:text-[#1F2163] font-semibold">Statistic View</button>
            <button className="text-white text-left hover:text-[#1F2163] font-semibold">Agreements</button>
            <button className="text-white text-left hover:text-[#1F2163] font-semibold">Activities</button>
            {/* Add more nav items as needed */}
          </nav>
        </div>
  
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col p-6">
          {/* Top Header */}
          <div className="bg-[#1F2163] rounded-t-xl px-6 py-4 flex justify-end items-center shadow-md">
            <div className="flex items-center space-x-3">
              <span className="text-white font-semibold">{userName}</span>
              <img
                src="/profile.png"
                alt="Profile"
                className="w-9 h-9 rounded-full bg-white"
              />
            </div>
          </div>
  
          {/* Content Box */}
          <div className="bg-white flex-1 p-6 rounded-b-xl shadow-lg">
            {children}
          </div>
        </div>
      </div>
    );
  }
  
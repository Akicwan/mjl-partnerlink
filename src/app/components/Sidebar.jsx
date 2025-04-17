// components/Sidebar.jsx
'use client';

import Link from 'next/link';

export default function Sidebar({ children, role, userName }) {
  const links = {
    admin: [
      { name: 'Dashboard', href: '/admin' },
      { name: 'Add Agreement', href: '/admin/add-agreement' },
      { name: 'Activities', href: '/admin/activities' },
      { name: 'Partners', href: '/admin/partners' },
    ],
    partner: [
      { name: 'Dashboard', href: '/partner' },
      { name: 'My Agreements', href: '/partner/agreements' },
      { name: 'Activities', href: '/partner/activities' },
    ],
  };

  return (
    <div className="flex min-h-screen bg-[#5D2E2E]">
      {/* Sidebar */}
      <div className="w-64 bg-[#D9AC42] flex flex-col p-4 shadow-lg">
        {/* Logo */}
        <div className="flex items-center justify-center mb-10">
          <img src="/MJL-logo.png" alt="MJL Logo" className="h-16" />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-4">
          {links[role]?.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white text-left hover:text-[#1F2163] font-semibold"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col p-6">
        {/* Top Header */}
        <div className="bg-[#1F2163] rounded-t-xl px-6 py-4 flex justify-end items-center shadow-md">
          <div className="flex items-center space-x-3">
            <span className="text-white font-semibold">{userName}</span>
            <img src="/profile.png" alt="Profile" className="w-9 h-9 rounded-full bg-white" />
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

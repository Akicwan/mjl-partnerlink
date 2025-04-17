'use client';

import Sidebar from '../components/Sidebar';
import LogoutButton from '../components/LogoutButton';

export default function AdminDashboard() {
  const data = [
    { university: 'Tokyo Tech', agreements: 5, activities: 12 },
    { university: 'Kyushu U', agreements: 3, activities: 8 },
    { university: 'Osaka U', agreements: 4, activities: 10 },
  ];

  return (
    <Sidebar role="admin" userName="Tansim Jannat">
      <div className="text-black">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#1F2163]">Admin Dashboard</h1>
          <LogoutButton />
        </div>

        <table className="w-full bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <thead className="bg-[#D9AC42] text-white border-b border-gray-200">
            <tr>
              <th className="py-3 px-4 text-left border-r border-gray-200">University</th>
              <th className="py-3 px-4 text-left border-r border-gray-200">Agreements</th>
              <th className="py-3 px-4 text-left">Activities</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="hover:bg-gray-100 border-b border-gray-200">
                <td className="py-3 px-4 border-r border-gray-200">{row.university}</td>
                <td className="py-3 px-4 border-r border-gray-200">{row.agreements}</td>
                <td className="py-3 px-4">{row.activities}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Sidebar>
  );
}

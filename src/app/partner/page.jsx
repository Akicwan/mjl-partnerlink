'use client';

import Sidebar from '../components/Sidebar';
import LogoutButton from '../components/LogoutButton';

export default function PartnerDashboard() {
  const partnerData = {
    university: 'Tokyo Tech',
    agreements: 5,
    activities: 12,
    contact: 'Dr. Sato',
  };

  return (
    <Sidebar role="partner" userName="TokyoTech PIC">
      <div className="text-black">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#1F2163]">Partner Dashboard</h1>
          <LogoutButton />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 space-y-4 max-w-xl">
          <div><strong>University:</strong> {partnerData.university}</div>
          <div><strong>Total Agreements:</strong> {partnerData.agreements}</div>
          <div><strong>Total Activities:</strong> {partnerData.activities}</div>
          <div><strong>Contact Person:</strong> {partnerData.contact}</div>
        </div>
      </div>
    </Sidebar>
  );
}

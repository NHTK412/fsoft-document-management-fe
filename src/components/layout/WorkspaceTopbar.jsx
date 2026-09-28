import React from "react";
import { Link } from "react-router-dom";

export default function WorkspaceTopbar({
  projectName = "AI Knowledge Core",
  role = "Owner",
  user = { name: "Nguyễn Văn A", role: "Admin", initials: "NV" },
}) {
  return (
    <header className="w-full h-[64px] shrink-0 flex items-center justify-between px-[24px] bg-white border-b border-[#E2E8F0] select-none">
      {/* Left: Project Switcher */}
      <div className="flex items-center gap-[16px]">
        <button
          type="button"
          className="flex items-center gap-[8px] px-[12px] py-[6px] bg-[#F8FAFC] border border-[#E2E8F0] rounded-[8px] hover:bg-[#F1F5F9] transition-colors cursor-pointer text-left"
        >
          <div className="w-[24px] h-[24px] shrink-0 flex items-center justify-center bg-[#EEF2FF] rounded-[6px]">
            <svg className="w-[14px] h-[14px] text-[#4F46E5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="16" height="16" x="4" y="4" rx="2" />
              <rect width="6" height="6" x="9" y="9" rx="1" />
              <path d="M15 2v2" /><path d="M15 20v2" /><path d="M2 15h2" /><path d="M2 9h2" /><path d="M20 15h2" /><path d="M20 9h2" /><path d="M9 2v2" /><path d="M9 20v2" />
            </svg>
          </div>
          <span className="text-[13px] font-semibold text-[#0F172A] whitespace-nowrap">
            {projectName}
          </span>
          <span className="text-[10px] font-bold text-[#059669] bg-[#ECFDF5] px-[6px] py-[2px] rounded-[4px] whitespace-nowrap">
            {role}
          </span>
          <svg className="w-[14px] h-[14px] text-[#94A3B8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      </div>

      

      {/* Right: Actions and User */}
      <div className="flex items-center gap-[10px]">
       
        {/* Notification Bell */}
        <button
          type="button"
          aria-label="Thông báo"
          className="w-[34px] h-[34px] flex items-center justify-center bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] rounded-[8px] transition-colors cursor-pointer text-[#64748B]"
        >
          <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
          </svg>
        </button>

        {/* User Pill */}
        <Link
          to="/profile"
          className="flex items-center gap-[8px] p-[4px_10px_4px_4px] bg-[#F8FAFC] border border-[#E2E8F0] rounded-[20px] cursor-pointer hover:bg-[#F1F5F9] transition-colors"
        >
          <div className="w-[26px] h-[26px] flex items-center justify-center bg-[#4F46E5] text-white rounded-full text-[10px] font-bold">
            {user.initials}
          </div>
          <div className="flex flex-col">
            <span className="text-[12px] font-semibold text-[#0F172A] leading-tight whitespace-nowrap">
              {user.name}
            </span>
            <span className="text-[10px] font-medium text-[#10B981] leading-tight whitespace-nowrap">
              {user.role}
            </span>
          </div>
          <svg className="w-[12px] h-[12px] text-[#94A3B8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </Link>
      </div>
    </header>
  );
}

import React from "react";
import { Link } from "react-router-dom";

export default function WorkspaceTopbar({
  projectName = "AI Knowledge Core",
  role = "Owner",
  user = { name: "Nguyễn Văn A", role: "Admin", initials: "NV" },
  showSearch = true,
  searchPlaceholder = "Tìm kiếm tệp, hỏi AI...",
  showUpload = true,
  showAskAI = true,
  onUploadClick,
  onAskAIClick,
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

      {/* Middle: Search Box */}
      {showSearch && (
        <div className="hidden md:flex w-[280px] shrink-0 h-[36px] items-center justify-between px-[12px] bg-[#F8FAFC] border border-[#E2E8F0] rounded-[8px]">
          <div className="flex items-center gap-[8px]">
            <svg className="w-[14px] h-[14px] text-[#94A3B8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <span className="text-[12px] text-[#94A3B8] whitespace-nowrap select-none">
              {searchPlaceholder}
            </span>
          </div>
          <div className="px-[6px] py-[2px] bg-white border border-[#CBD5E1] rounded-[4px]">
            <span className="text-[10px] font-semibold text-[#64748B] whitespace-nowrap">⌘ K</span>
          </div>
        </div>
      )}

      {/* Right: Actions and User */}
      <div className="flex items-center gap-[10px]">
        {/* Upload Button */}
        {showUpload && (
          <button
            type="button"
            onClick={onUploadClick}
            className="flex items-center gap-[6px] h-[34px] px-[12px] bg-[#4F46E5] hover:bg-[#4338CA] text-white text-[12px] font-semibold rounded-[8px] transition-colors cursor-pointer"
          >
            <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
              <path d="M12 12v9" />
              <path d="m16 16-4-4-4 4" />
            </svg>
            <span>Upload File</span>
          </button>
        )}

        {/* Ask AI Button */}
        {showAskAI && (
          <button
            type="button"
            onClick={onAskAIClick}
            className="flex items-center gap-[6px] h-[34px] px-[10px] bg-[#EEF2FF] border border-[#C7D2FE] hover:bg-[#E0E7FF] text-[#4F46E5] text-[12px] font-semibold rounded-[8px] transition-colors cursor-pointer"
          >
            <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
            </svg>
            <span>Hỏi AI</span>
          </button>
        )}

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

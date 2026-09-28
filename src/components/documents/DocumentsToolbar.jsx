import React from "react";

export default function DocumentsToolbar({
  searchQuery = "",
  onSearchChange,
  placeholder = "Tìm theo tên file hoặc từ khóa nội dung theo thời gian thực...",
}) {
  return (
    <div className="w-full min-h-[50px] flex flex-row items-center gap-3 bg-white border border-[#E2E8F0] rounded-[10px] px-[18px] py-[8px] shadow-xs">
      <svg className="w-[17px] h-[17px] text-[#94A3B8] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent border-none outline-none text-[13px] sm:text-[14px] text-[#0F172A] placeholder-[#94A3B8]"
      />
    </div>
  );
}

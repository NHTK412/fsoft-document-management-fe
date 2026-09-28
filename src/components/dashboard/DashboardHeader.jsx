import React from "react";

export default function DashboardHeader({
  title = "Tổng quan Dự án: AI Knowledge Core",
  subtitle = "Theo dõi tình trạng tài liệu, lưu trữ MinIO và tương tác hỏi đáp AI thời gian thực.",
  onRefresh
}) {
  return (
    <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      {/* Title stack */}
      <div className="flex flex-col gap-[6px]">
        <h1 className="text-[24px] font-bold text-[#0F172A] tracking-tight">
          {title}
        </h1>
        <p className="text-[14px] text-[#64748B]">
          {subtitle}
        </p>
      </div>

      {/* Status Badges Right */}
      <div className="flex items-center gap-[10px] shrink-0">
        {/* Sync Pill */}
        <button
          type="button"
          onClick={onRefresh}
          className="flex items-center gap-[8px] px-[12px] py-[6px] bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] rounded-[20px] transition-colors cursor-pointer text-[#64748B]"
        >
          <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
            <path d="M8 16H3v5" />
          </svg>
          <span className="text-[12px] font-medium whitespace-nowrap">
            Đồng bộ
          </span>
        </button>
      </div>
    </div>
  );
}

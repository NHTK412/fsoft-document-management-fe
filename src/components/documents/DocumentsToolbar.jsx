import React from "react";

export default function DocumentsToolbar({
  searchQuery = "",
  onSearchChange,
  sortBy = "Mới tải lên nhất",
  viewMode = "table", // 'table' | 'grid'
  onViewModeChange
}) {
  return (
    <div className="w-full min-h-[46px] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 px-[16px] py-[6px] md:py-0 bg-white border border-[#E2E8F0] rounded-[10px]">
      {/* Live Search Box */}
      <div className="w-full md:w-[440px] h-[34px] flex items-center gap-[8px] px-[12px] bg-[#F8FAFC] border border-[#E2E8F0] rounded-[6px]">
        <svg className="w-[15px] h-[15px] text-[#94A3B8] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
          placeholder="Tìm theo tên file hoặc từ khóa nội dung theo thời gian thực..."
          className="w-full bg-transparent border-none outline-none text-[12px] text-[#0F172A] placeholder-[#94A3B8]"
        />
      </div>

      {/* Sort and View Tools */}
      <div className="flex items-center gap-[12px] shrink-0 self-end md:self-auto">
        {/* Sort Dropdown */}
        <button
          type="button"
          className="h-[34px] flex items-center gap-[6px] px-[12px] bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] rounded-[6px] text-[12px] font-medium text-[#334155] transition-colors cursor-pointer"
        >
          <svg className="w-[13px] h-[13px] text-[#64748B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3 16 4 4 4-4" />
            <path d="M7 20V4" />
            <path d="m21 8-4-4-4 4" />
            <path d="M17 4v16" />
          </svg>
          <span className="whitespace-nowrap">Sắp xếp: {sortBy}</span>
          <svg className="w-[12px] h-[12px] text-[#94A3B8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>

        {/* View Switcher */}
        <div className="h-[34px] flex items-center gap-[2px] p-[2px] bg-[#F1F5F9] rounded-[6px]">
          <button
            type="button"
            onClick={() => onViewModeChange && onViewModeChange("table")}
            className={`h-[30px] flex items-center gap-[5px] px-[10px] rounded-[4px] text-[11px] font-semibold transition-colors cursor-pointer ${
              viewMode === "table"
                ? "bg-white border border-[#CBD5E1] text-[#4F46E5] shadow-2xs"
                : "text-[#64748B] hover:text-[#0F172A]"
            }`}
          >
            <svg className="w-[13px] h-[13px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M3 9h18" />
              <path d="M3 15h18" />
              <path d="M12 3v18" />
            </svg>
            <span className="whitespace-nowrap">Dạng bảng</span>
          </button>

          <button
            type="button"
            onClick={() => onViewModeChange && onViewModeChange("grid")}
            className={`h-[30px] flex items-center gap-[5px] px-[10px] rounded-[4px] text-[11px] font-normal transition-colors cursor-pointer ${
              viewMode === "grid"
                ? "bg-white border border-[#CBD5E1] text-[#4F46E5] shadow-2xs font-semibold"
                : "text-[#64748B] hover:text-[#0F172A]"
            }`}
          >
            <svg className="w-[13px] h-[13px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="7" height="7" x="3" y="3" rx="1" />
              <rect width="7" height="7" x="14" y="3" rx="1" />
              <rect width="7" height="7" x="14" y="14" rx="1" />
              <rect width="7" height="7" x="3" y="14" rx="1" />
            </svg>
            <span className="whitespace-nowrap">Dạng lưới</span>
          </button>
        </div>
      </div>
    </div>
  );
}

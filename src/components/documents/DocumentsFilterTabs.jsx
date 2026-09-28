import React from "react";

export default function DocumentsFilterTabs({
  activeFilter = "all",
  onFilterChange,
  counts = {
    all: 38,
    docs: 16,
    sheets: 8,
    media: 4,
    images: 6,
    code: 4,
  },
}) {
  const tabs = [
    { id: "all", label: "Tất cả", count: counts.all },
    { id: "docs", label: "Tài liệu văn bản (PDF, DOCX)", count: counts.docs },
    { id: "sheets", label: "Bảng tính & Trình chiếu (XLSX, PPTX)", count: counts.sheets },
    { id: "media", label: "Video & Âm thanh", count: counts.media },
    { id: "images", label: "Hình ảnh", count: counts.images },
    { id: "code", label: "Markdown & TXT", count: counts.code },
  ];

  return (
    <div className="w-full flex items-center gap-[8px] overflow-x-auto pb-1 no-scrollbar select-none">
      {tabs.map((tab) => {
        const isActive = activeFilter === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onFilterChange && onFilterChange(tab.id)}
            className={`h-[32px] flex items-center gap-[6px] px-[12px] rounded-[20px] text-[12px] whitespace-nowrap transition-all cursor-pointer ${
              isActive
                ? "bg-[#4F46E5] text-white font-semibold border border-[#4F46E5] shadow-xs"
                : "bg-white text-[#475569] font-medium border border-[#E2E8F0] hover:bg-[#F8FAFC]"
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`text-[10px] font-semibold px-[6px] py-[1px] rounded-[10px] ${
                isActive
                  ? "bg-[#3730A3] text-[#E0E7FF]"
                  : "bg-[#F1F5F9] text-[#64748B]"
              }`}
            >
              {tab.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

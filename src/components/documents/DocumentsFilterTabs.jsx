import React from "react";

export default function DocumentsFilterTabs({
  activeFilter = "all",
  onFilterChange,
  counts = {
    all: 0,
    pdf: 0,
    word: 0,
    md: 0,
    txt: 0,
  },
}) {
  const tabs = [
    { id: "all", label: "Tất cả", count: counts.all || 0 },
    { id: "pdf", label: "PDF (.pdf)", count: counts.pdf || 0 },
    { id: "word", label: "Word (.docx, .doc)", count: counts.word || 0 },
    { id: "md", label: "Markdown (.md)", count: counts.md || 0 },
    { id: "txt", label: "Văn bản (.txt)", count: counts.txt || 0 },
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
            className={`h-[36px] flex items-center gap-[8px] px-[14px] rounded-[20px] text-[13px] whitespace-nowrap transition-all cursor-pointer ${
              isActive
                ? "bg-[#4F46E5] text-white font-semibold border border-[#4F46E5] shadow-xs"
                : "bg-white text-[#475569] font-medium border border-[#E2E8F0] hover:bg-[#F8FAFC]"
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`text-[11px] font-semibold px-[7px] py-[2px] rounded-[10px] ${
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

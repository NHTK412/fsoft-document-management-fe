import React from "react";

export default function ContextScopeBar({
  selectedCount = 0,
  totalCount = 0,
  isDocsTabOpen = true,
  onToggleDocsTab,
}) {
  const isAll = totalCount > 0 && selectedCount === totalCount;
  const isNone = selectedCount === 0;

  let label = "Toàn bộ tài liệu dự án (" + totalCount + " tệp)";
  if (isNone) {
    label = "Chưa chọn tài liệu nào";
  } else if (!isAll) {
    label = `Đã chọn ${selectedCount}/${totalCount} tài liệu để hỏi`;
  }

  return (
    <div className="w-full h-[48px] shrink-0 flex items-center justify-between px-[20px] bg-[#F8FAFC] border-b border-[#E2E8F0] select-none">
      {/* Scope info */}
      {/* <div className="flex items-center gap-[8px]">
        <svg className="w-[14px] h-[14px] text-[#4F46E5] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
        <span className="text-[12px] font-medium text-[#64748B]">
          Phạm vi tra cứu:
        </span>
        <span
          className={`flex items-center gap-[6px] px-[8px] py-[3px] rounded-[6px] text-[11px] font-semibold ${
            isNone
              ? "bg-[#FEF2F2] border border-[#FECACA] text-[#DC2626]"
              : "bg-[#EEF2FF] border border-[#C7D2FE] text-[#4F46E5]"
          }`}
        >
          {label}
        </span>
      </div> */}
      <div>
      </div>

      {/* Toggle Right Documents Tab Button */}
      {onToggleDocsTab && (
        <button
          type="button"
          onClick={onToggleDocsTab}
          className={`flex items-center gap-[6px] px-[10px] py-[4px] rounded-[6px] text-[12px] font-medium border transition-colors cursor-pointer ${
            isDocsTabOpen
              ? "bg-white border-[#CBD5E1] text-[#334155] hover:bg-[#F1F5F9]"
              : "bg-[#4F46E5] border-[#4F46E5] text-white hover:bg-[#4338CA]"
          }`}
          title={isDocsTabOpen ? "Ẩn danh sách tài liệu" : "Hiện danh sách tài liệu"}
        >
          <svg className="w-[13px] h-[13px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
          <span>{isDocsTabOpen ? "Ẩn tệp tra cứu" : `Xem tệp tra cứu (${selectedCount})`}</span>
        </button>
      )}
    </div>
  );
}

import React from "react";

export default function ContextScopeBar({
  scope = "Toàn bộ tài liệu dự án (38 tệp • 1.2 GB)",
  modelName = "KBase RAG Engine v2",
  onScopeChange
}) {
  return (
    <div className="w-full h-[48px] shrink-0 flex items-center justify-between px-[24px] bg-[#F8FAFC] border-b border-[#E2E8F0] select-none">
      {/* Scope Left */}
      <div className="flex items-center gap-[8px]">
        <svg className="w-[14px] h-[14px] text-[#4F46E5] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
        <span className="text-[12px] font-medium text-[#64748B]">
          Phạm vi tri thức:
        </span>
        <button
          type="button"
          onClick={onScopeChange}
          className="flex items-center gap-[6px] px-[8px] py-[3px] bg-[#EEF2FF] border border-[#C7D2FE] hover:bg-[#E0E7FF] rounded-[6px] text-[11px] font-semibold text-[#4F46E5] transition-colors cursor-pointer"
        >
          <span>{scope}</span>
          <svg className="w-[12px] h-[12px] text-[#4F46E5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      </div>

      {/* Model Badge */}
      <div className="flex items-center gap-[6px] px-[8px] py-[3px] bg-[#ECFDF5] rounded-[4px]">
        <span className="w-[6px] h-[6px] bg-[#10B981] rounded-full animate-pulse" />
        <span className="text-[11px] font-semibold text-[#059669] whitespace-nowrap">
          {modelName}
        </span>
      </div>
    </div>
  );
}

import React from "react";

export default function BulkActionBar({
  selectedCount = 0,
  totalSize = "6.0 MB",
  onDownloadZip,
  onReindexAI,
  onBulkDelete,
}) {
  if (selectedCount === 0) return null;

  return (
    <div className="w-full h-[48px] flex items-center justify-between px-[18px] bg-[#0F172A] border border-[#334155] rounded-[10px] shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-200">
      {/* Left: Count and Size */}
      <div className="flex items-center gap-[10px]">
        <div className="flex items-center px-[8px] py-[3px] bg-[#4F46E5] rounded-[4px]">
          <span className="text-[11px] font-bold text-white whitespace-nowrap">
            Đã chọn {selectedCount} tệp
          </span>
        </div>
        <span className="text-[12px] text-[#94A3B8] whitespace-nowrap">
          Tổng dung lượng: {totalSize}
        </span>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-[10px]">
        {/* Download Zip */}
        <button
          type="button"
          onClick={onDownloadZip}
          className="h-[32px] flex items-center gap-[6px] px-[12px] bg-[#1E293B] border border-[#334155] hover:bg-[#334155] text-[#E2E8F0] rounded-[6px] text-[11px] font-semibold transition-colors cursor-pointer"
        >
          <svg className="w-[13px] h-[13px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" x2="12" y1="15" y2="3" />
          </svg>
          <span className="whitespace-nowrap">Tải xuống (.zip)</span>
        </button>

        {/* Reindex AI */}
        <button
          type="button"
          onClick={onReindexAI}
          className="h-[32px] flex items-center gap-[6px] px-[12px] bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-[6px] text-[11px] font-semibold transition-colors cursor-pointer shadow-xs"
        >
          <svg className="w-[13px] h-[13px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
          </svg>
          <span className="whitespace-nowrap">AI index lại các tệp</span>
        </button>

        {/* Bulk Delete */}
        <button
          type="button"
          onClick={onBulkDelete}
          className="h-[32px] flex items-center gap-[6px] px-[12px] bg-[#7F1D1D] hover:bg-[#991B1B] text-[#FCA5A5] rounded-[6px] text-[11px] font-semibold transition-colors cursor-pointer"
        >
          <svg className="w-[13px] h-[13px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            <line x1="10" x2="10" y1="11" y2="17" />
            <line x1="14" x2="14" y1="11" y2="17" />
          </svg>
          <span className="whitespace-nowrap">Xóa hàng loạt</span>
        </button>
      </div>
    </div>
  );
}

import React from "react";

export default function DocumentsHeader({
  title = "Tài liệu dự án",
  totalFiles = 38,
  totalSize = "1.2 GB",
  projectName = "AI Knowledge Core",
  onUpload
}) {
  return (
    <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      {/* Title Stack */}
      <div className="flex flex-col gap-[4px]">
        <div className="flex items-center gap-[12px] flex-wrap">
          <h1 className="text-[22px] font-bold text-[#0F172A] tracking-tight">
            {title}
          </h1>
          <span className="text-[12px] font-semibold text-[#4F46E5] bg-[#EEF2FF] px-[10px] py-[4px] rounded-[20px] whitespace-nowrap">
            Tổng cộng {totalFiles} tệp • {totalSize}
          </span>
        </div>
        <p className="text-[13px] text-[#64748B]">
          Toàn bộ tài liệu kỹ thuật, dữ liệu vector AI và tệp tin trong dự án {projectName}.
        </p>
      </div>

      {/* Upload Button Primary */}
      <button
        type="button"
        onClick={onUpload}
        className="h-[40px] flex items-center gap-[8px] px-[18px] bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-[8px] font-semibold text-[13px] transition-colors cursor-pointer shrink-0 shadow-sm"
      >
        <svg className="w-[16px] h-[16px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
          <path d="M12 12v9" />
          <path d="m16 16-4-4-4 4" />
        </svg>
        <span className="whitespace-nowrap">+ Tải lên tệp</span>
      </button>
    </div>
  );
}

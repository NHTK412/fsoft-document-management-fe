import React from "react";

export default function FormatDistribution({ totalFiles = "1,428" }) {
  const formats = [
    { label: "PDF Documents", percent: 45, color: "bg-[#EF4444]" },
    { label: "Office (DOCX, XLSX, PPTX)", percent: 25, color: "bg-[#3B82F6]" },
    { label: "Markdown & Text", percent: 18, color: "bg-[#8B5CF6]" },
    { label: "Video (MP4, MOV)", percent: 8, color: "bg-[#F59E0B]" },
    { label: "Hình ảnh & Khác", percent: 4, color: "bg-[#10B981]" },
  ];

  return (
    <div className="w-full flex flex-col gap-[16px] p-[20px] bg-white border border-[#E2E8F0] rounded-[12px]">
      {/* Chart Header */}
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-[8px]">
          <svg className="w-[16px] h-[16px] text-[#4F46E5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
            <path d="M22 12A10 10 0 0 0 12 2v10z" />
          </svg>
          <h2 className="text-[14px] font-bold text-[#0F172A]">
            Phân loại định dạng tài liệu (Format Distribution)
          </h2>
        </div>
        <span className="text-[12px] font-semibold text-[#64748B]">
          Tổng: {totalFiles} tệp
        </span>
      </div>

      {/* Stacked Progress Bar */}
      <div className="w-full h-[10px] flex rounded-[5px] overflow-hidden bg-[#F1F5F9]">
        {formats.map((fmt) => (
          <div
            key={fmt.label}
            style={{ width: `${fmt.percent}%` }}
            className={`h-full ${fmt.color} transition-all`}
            title={`${fmt.label}: ${fmt.percent}%`}
          />
        ))}
      </div>

      {/* Format Legend */}
      <div className="w-full flex flex-wrap gap-[16px] items-center">
        {formats.map((fmt) => (
          <div key={fmt.label} className="flex items-center gap-[6px]">
            <span className={`w-[8px] h-[8px] rounded-full shrink-0 ${fmt.color}`} />
            <span className="text-[11px] font-medium text-[#475569] whitespace-nowrap">
              {fmt.label} ({fmt.percent}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

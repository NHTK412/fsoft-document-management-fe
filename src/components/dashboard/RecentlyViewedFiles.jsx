import React from "react";

export default function RecentlyViewedFiles({ files, onViewAll, onQuickView }) {
  const defaultFiles = [
    {
      id: "f1",
      name: "Architecture-v2.pdf",
      meta: "PDF • 4.2 MB • 15 phút trước",
      type: "pdf",
      iconBg: "bg-[#FEF2F2]",
      iconColor: "text-[#EF4444]",
      status: "Đã index 100%",
      statusColor: "bg-[#ECFDF5] text-[#059669]",
    },
    {
      id: "f2",
      name: "Vector-Pipeline-Spec.docx",
      meta: "Office Word • 1.8 MB • 1 giờ trước",
      type: "doc",
      iconBg: "bg-[#EFF6FF]",
      iconColor: "text-[#3B82F6]",
      status: "Đã index 100%",
      statusColor: "bg-[#ECFDF5] text-[#059669]",
    },
    {
      id: "f3",
      name: "Prompt-Engineering-Guide.md",
      meta: "Markdown • 320 KB • 3 giờ trước",
      type: "md",
      iconBg: "bg-[#F5F3FF]",
      iconColor: "text-[#8B5CF6]",
      status: "Đã index 100%",
      statusColor: "bg-[#ECFDF5] text-[#059669]",
    },
    {
      id: "f4",
      name: "K8s-Deployment-Log.xlsx",
      meta: "Excel • 2.4 MB • Hôm qua",
      type: "table",
      iconBg: "bg-[#ECFDF5]",
      iconColor: "text-[#10B981]",
      status: "Đang index (80%)",
      statusColor: "bg-[#FEF3C7] text-[#D97706]",
    },
  ];

  const fileList = files || defaultFiles;

  const renderIcon = (type) => {
    switch (type) {
      case "pdf":
        return (
          <svg className="w-[16px] h-[16px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            <path d="M10 9H8" />
            <path d="M16 13H8" />
            <path d="M16 17H8" />
          </svg>
        );
      case "doc":
        return (
          <svg className="w-[16px] h-[16px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            <path d="M8 13h2" />
            <path d="M14 13h2" />
            <path d="M8 17h3" />
            <path d="M13 17h3" />
          </svg>
        );
      case "md":
        return (
          <svg className="w-[16px] h-[16px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
        );
      case "table":
        return (
          <svg className="w-[16px] h-[16px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M3 9h18" />
            <path d="M3 15h18" />
            <path d="M12 3v18" />
          </svg>
        );
      default:
        return (
          <svg className="w-[16px] h-[16px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
          </svg>
        );
    }
  };

  return (
    <div className="w-full flex flex-col gap-[16px] p-[20px] bg-white border border-[#E2E8F0] rounded-[12px]">
      {/* Header */}
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-[8px]">
          <svg className="w-[16px] h-[16px] text-[#4F46E5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <h2 className="text-[14px] font-bold text-[#0F172A]">
            Tài liệu truy cập gần đây (Recently Viewed)
          </h2>
        </div>
        <button
          type="button"
          onClick={onViewAll}
          className="text-[12px] font-semibold text-[#4F46E5] hover:text-[#4338CA] transition-colors cursor-pointer"
        >
          Xem tất cả trong Explorer →
        </button>
      </div>

      {/* Files List */}
      <div className="w-full flex flex-col gap-[8px]">
        {fileList.map((file) => (
          <div
            key={file.id}
            className="w-full h-[52px] flex items-center justify-between px-[12px] bg-[#F8FAFC] border border-[#F1F5F9] rounded-[8px] hover:bg-[#F1F5F9]/70 transition-colors"
          >
            {/* File info left */}
            <div className="flex items-center gap-[12px] min-w-0">
              <div
                className={`w-[32px] h-[32px] shrink-0 flex items-center justify-center rounded-[6px] ${file.iconBg} ${file.iconColor}`}
              >
                {renderIcon(file.type)}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[13px] font-semibold text-[#0F172A] truncate">
                  {file.name}
                </span>
                <span className="text-[11px] text-[#94A3B8]">
                  {file.meta}
                </span>
              </div>
            </div>

            {/* Actions right */}
            <div className="flex items-center gap-[10px] shrink-0">
              <span
                className={`text-[10px] font-semibold px-[8px] py-[3px] rounded-[4px] whitespace-nowrap ${file.statusColor}`}
              >
                {file.status}
              </span>
              <button
                type="button"
                onClick={() => onQuickView && onQuickView(file)}
                className="h-[28px] flex items-center gap-[4px] px-[10px] bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] rounded-[6px] text-[11px] font-medium text-[#475569] transition-colors cursor-pointer"
              >
                <svg className="w-[12px] h-[12px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <span>Xem</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

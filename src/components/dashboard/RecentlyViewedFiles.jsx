import React from "react";
import { formatRelativeTime } from "@/utils/formatDate";

export default function RecentlyViewedFiles({ files, onViewAll, onQuickView }) {
  const fileList = files || [];

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
    <div className="w-full flex flex-col gap-[18px] p-6 lg:p-[24px] bg-white border border-[#E2E8F0] rounded-[12px] shadow-xs">
      {/* Header */}
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-[10px]">
          <svg className="w-[18px] h-[18px] text-[#4F46E5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <h2 className="text-[15px] font-bold text-[#0F172A]">
            Tài liệu truy cập gần đây (Recently Viewed)
          </h2>
        </div>
        <button
          type="button"
          onClick={onViewAll}
          className="text-[13px] font-semibold text-[#4F46E5] hover:text-[#4338CA] transition-colors cursor-pointer"
        >
          Xem tất cả trong Explorer →
        </button>
      </div>

      {/* Files List / Empty State */}
      {fileList.length === 0 ? (
        <div className="w-full py-10 px-4 flex flex-col items-center justify-center text-center bg-[#F8FAFC] border border-dashed border-[#CBD5E1] rounded-[10px] gap-2">
          <div className="w-10 h-10 rounded-full bg-[#EEF2FF] flex items-center justify-center text-[#4F46E5]">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
              <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            </svg>
          </div>
          <p className="text-[14px] font-semibold text-[#334155]">
            Chưa có tài liệu nào gần đây
          </p>
          <p className="text-[12px] text-[#64748B] max-w-sm">
            Tải lên hoặc mở xem tài liệu trong mục Explorer để bắt đầu lưu trữ và tra cứu tri thức AI.
          </p>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-[10px]">
          {fileList.map((file) => (
            <div
              key={file.id}
              className="w-full h-[60px] flex items-center justify-between px-[16px] bg-[#F8FAFC] border border-[#F1F5F9] rounded-[10px] hover:bg-[#F1F5F9]/80 transition-colors"
            >
              {/* File info left */}
              <div className="flex items-center gap-[14px] min-w-0">
                <div
                  className={`w-[38px] h-[38px] shrink-0 flex items-center justify-center rounded-[8px] ${file.iconBg} ${file.iconColor}`}
                >
                  {renderIcon(file.type)}
                </div>
                <div className="flex flex-col min-w-0 gap-[1px]">
                  <span className="text-[14px] font-semibold text-[#0F172A] truncate">
                    {file.name}
                  </span>
                  <span className="text-[12px] text-[#64748B]">
                    {file.meta || `${file.sizeFormatted || (file.size ? file.size + ' MB' : '')} ${file.createdAt || file.updatedAt ? '• ' + formatRelativeTime(file.createdAt || file.updatedAt) : ''}`}
                  </span>
                </div>
              </div>

              {/* Actions right */}
              <div className="flex items-center gap-[12px] shrink-0">
                <button
                  type="button"
                  onClick={() => onQuickView && onQuickView(file)}
                  className="h-[32px] flex items-center gap-[6px] px-[12px] bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] rounded-[6px] text-[12px] font-medium text-[#475569] transition-colors cursor-pointer"
                >
                  <svg className="w-[13px] h-[13px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  <span>Xem</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

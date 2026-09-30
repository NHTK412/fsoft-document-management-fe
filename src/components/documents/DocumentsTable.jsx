import React from "react";
import { formatDate, formatRelativeTime } from "@/utils/formatDate";

export default function DocumentsTable({
  files = [],
  selectedIds = [],
  onToggleSelect,
  onToggleSelectAll,
  onPreview,
  onDownload,
  onDelete,
  onMoreOptions
}) {
  const isAllSelected = files.length > 0 && selectedIds.length === files.length;
  const isPartiallySelected = selectedIds.length > 0 && selectedIds.length < files.length;

  const renderIcon = (type) => {
    switch (type) {
      case "pdf":
        return (
          <div className="w-[36px] h-[36px] shrink-0 flex items-center justify-center bg-[#FEF2F2] rounded-[8px]">
            <svg className="w-[18px] h-[18px] text-[#EF4444]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
              <path d="M14 2v4a2 2 0 0 0 2 2h4" />
              <path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" />
            </svg>
          </div>
        );
      case "docx":
        return (
          <div className="w-[36px] h-[36px] shrink-0 flex items-center justify-center bg-[#EFF6FF] rounded-[8px]">
            <svg className="w-[18px] h-[18px] text-[#2563EB]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
              <path d="M14 2v4a2 2 0 0 0 2 2h4" />
              <path d="M8 13h2" /><path d="M14 13h2" /><path d="M8 17h3" /><path d="M13 17h3" />
            </svg>
          </div>
        );
      case "xlsx":
        return (
          <div className="w-[36px] h-[36px] shrink-0 flex items-center justify-center bg-[#ECFDF5] rounded-[8px]">
            <svg className="w-[18px] h-[18px] text-[#059669]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M3 9h18" /><path d="M3 15h18" /><path d="M12 3v18" />
            </svg>
          </div>
        );
      case "mp4":
        return (
          <div className="w-[36px] h-[36px] shrink-0 flex items-center justify-center bg-[#F3E8FF] rounded-[8px]">
            <svg className="w-[18px] h-[18px] text-[#9333EA]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="14" x="2" y="5" rx="2" />
              <path d="m22 9-5 3 5 3V9Z" />
            </svg>
          </div>
        );
      case "png":
      case "jpg":
        return (
          <div className="w-[36px] h-[36px] shrink-0 flex items-center justify-center bg-[#FFF7ED] rounded-[8px]">
            <svg className="w-[18px] h-[18px] text-[#EA580C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
          </div>
        );
      case "txt":
        return (
          <div className="w-[36px] h-[36px] shrink-0 flex items-center justify-center bg-[#F1F5F9] rounded-[8px]">
            <svg className="w-[18px] h-[18px] text-[#64748B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
              <path d="M14 2v4a2 2 0 0 0 2 2h4" />
              <path d="M10 12h4" /><path d="M10 16h4" />
            </svg>
          </div>
        );
      case "md":
      default:
        return (
          <div className="w-[36px] h-[36px] shrink-0 flex items-center justify-center bg-[#EEF2FF] rounded-[8px]">
            <svg className="w-[18px] h-[18px] text-[#4F46E5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          </div>
        );
    }
  };

  const getFormatBadge = (format) => {
    switch (format?.toUpperCase()) {
      case "PDF":
        return <span className="text-[11px] font-bold text-[#EF4444] bg-[#FEF2F2] px-[9px] py-[3px] rounded-[5px]">PDF</span>;
      case "DOCX":
        return <span className="text-[11px] font-bold text-[#2563EB] bg-[#EFF6FF] px-[9px] py-[3px] rounded-[5px]">DOCX</span>;
      case "XLSX":
        return <span className="text-[11px] font-bold text-[#059669] bg-[#ECFDF5] px-[9px] py-[3px] rounded-[5px]">XLSX</span>;
      case "MP4":
        return <span className="text-[11px] font-bold text-[#9333EA] bg-[#F3E8FF] px-[9px] py-[3px] rounded-[5px]">MP4</span>;
      case "PNG":
      case "JPG":
        return <span className="text-[11px] font-bold text-[#EA580C] bg-[#FFF7ED] px-[9px] py-[3px] rounded-[5px]">{format.toUpperCase()}</span>;
      case "TXT":
        return <span className="text-[11px] font-bold text-[#64748B] bg-[#F1F5F9] px-[9px] py-[3px] rounded-[5px]">TXT</span>;
      case "MARKDOWN":
      case "MD":
        return <span className="text-[11px] font-bold text-[#4F46E5] bg-[#EEF2FF] px-[9px] py-[3px] rounded-[5px]">MARKDOWN</span>;
      default:
        return <span className="text-[11px] font-bold text-[#64748B] bg-[#F1F5F9] px-[9px] py-[3px] rounded-[5px]">{format}</span>;
    }
  };

  return (
    <div className="w-full bg-white border border-[#E2E8F0] rounded-[12px] overflow-hidden shadow-xs">
      <div className="w-full overflow-x-auto">
        <div className="min-w-[1050px]">
          {/* Table Header */}
          <div className="w-full h-[46px] flex items-center px-[20px] bg-[#F8FAFC] border-b border-[#E2E8F0] text-[12px] font-bold text-[#64748B] select-none">
            {/* Checkbox */}
            <div className="w-[42px] shrink-0 flex items-center">
              <button
                type="button"
                onClick={onToggleSelectAll}
                className={`w-[18px] h-[18px] flex items-center justify-center rounded-[4px] transition-colors cursor-pointer ${
                  isAllSelected || isPartiallySelected
                    ? "bg-[#4F46E5] border border-[#4F46E5]"
                    : "bg-white border border-[#CBD5E1]"
                }`}
              >
                {isAllSelected && (
                  <svg className="w-[12px] h-[12px] text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
                {isPartiallySelected && (
                  <svg className="w-[11px] h-[11px] text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" x2="19" y1="12" y2="12" />
                  </svg>
                )}
              </button>
            </div>

            <div className="flex-1 min-w-[280px]">TÊN TỆP TIN</div>
            <div className="w-[110px] shrink-0">ĐỊNH DẠNG</div>
            <div className="w-[120px] shrink-0">KÍCH THƯỚC</div>
            <div className="w-[180px] shrink-0">NGƯỜI TẢI LÊN</div>
            <div className="w-[140px] shrink-0">NGÀY TẢI LÊN</div>
            <div className="w-[130px] shrink-0 text-right pr-2">THAO TÁC</div>
          </div>

          {/* Table Rows */}
          <div className="w-full flex flex-col divide-y divide-[#F1F5F9]">
            {files.map((file) => {
              const isSelected = selectedIds.includes(file.id);
              return (
                <div
                  key={file.id}
                  className={`w-full h-[60px] flex items-center px-[20px] transition-colors ${
                    isSelected ? "bg-[#F5F3FF]" : "bg-white hover:bg-[#F8FAFC]/80"
                  }`}
                >
                  {/* Row Checkbox */}
                  <div className="w-[42px] shrink-0 flex items-center">
                    <button
                      type="button"
                      onClick={() => onToggleSelect && onToggleSelect(file.id)}
                      className={`w-[18px] h-[18px] flex items-center justify-center rounded-[4px] transition-colors cursor-pointer ${
                        isSelected
                          ? "bg-[#4F46E5] border border-[#4F46E5]"
                          : "bg-white border border-[#CBD5E1]"
                      }`}
                    >
                      {isSelected && (
                        <svg className="w-[12px] h-[12px] text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </button>
                  </div>

                  {/* Name Wrap */}
                  <div className="flex-1 min-w-[280px] flex items-center gap-[12px] pr-4">
                    {renderIcon(file.type)}
                    <span className="text-[14px] font-semibold text-[#0F172A] truncate">
                      {file.name}
                    </span>
                  </div>

                  {/* Format Wrap */}
                  <div className="w-[110px] shrink-0">
                    {getFormatBadge(file.format)}
                  </div>

                  {/* Size Wrap */}
                  <div className="w-[120px] shrink-0 text-[13px] font-medium text-[#334155]">
                    {file.size}
                  </div>

                  {/* Author Wrap */}
                  <div className="w-[180px] shrink-0 flex items-center gap-[10px]">
                    <div
                      className="w-[28px] h-[28px] rounded-full flex items-center justify-center text-[12px] font-bold text-white shrink-0 shadow-xs"
                      style={{ backgroundColor: file.authorColor || "#4F46E5" }}
                    >
                      {file.authorInitials || file.author?.charAt(0) || "U"}
                    </div>
                    <span className="text-[13px] font-medium text-[#1E293B] truncate">
                      {file.author}
                    </span>
                  </div>

                  {/* Date Wrap */}
                  <div className="w-[140px] shrink-0 flex flex-col justify-center">
                    <span className="text-[13px] font-medium text-[#334155]">
                      {formatDate(file.createdAt || file.updatedAt)}
                    </span>
                    <span className="text-[11px] text-[#94A3B8]">
                      {formatRelativeTime(file.createdAt || file.updatedAt)}
                    </span>
                  </div>

                  {/* Actions Wrap */}
                  <div className="w-[130px] shrink-0 flex items-center justify-end gap-[8px]">
                    {/* Preview Button */}
                    <button
                      type="button"
                      title="Xem trước"
                      onClick={() => onPreview && onPreview(file)}
                      className="w-[32px] h-[32px] flex items-center justify-center bg-[#F8FAFC] border border-[#E2E8F0] hover:bg-white text-[#475569] rounded-[6px] transition-colors cursor-pointer"
                    >
                      <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </button>

                    {/* Download Button */}
                    <button
                      type="button"
                      title="Tải xuống"
                      onClick={() => onDownload && onDownload(file)}
                      className="w-[32px] h-[32px] flex items-center justify-center bg-[#F8FAFC] border border-[#E2E8F0] hover:bg-white text-[#475569] rounded-[6px] transition-colors cursor-pointer"
                    >
                      <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" x2="12" y1="15" y2="3" />
                      </svg>
                    </button>

                    {/* Delete Action */}
                    <button
                      type="button"
                      title="Xóa tệp"
                      onClick={() => (onDelete ? onDelete(file) : onMoreOptions && onMoreOptions(file))}
                      className="w-[32px] h-[32px] flex items-center justify-center bg-[#F8FAFC] border border-[#E2E8F0] hover:bg-[#FEF2F2] hover:border-[#FCA5A5] text-[#64748B] hover:text-[#EF4444] rounded-[6px] transition-colors cursor-pointer"
                    >
                      <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        <line x1="10" x2="10" y1="11" y2="17" />
                        <line x1="14" x2="14" y1="11" y2="17" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

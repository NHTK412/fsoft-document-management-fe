import React, { useState } from "react";

export default function UploadModal({
  isOpen = false,
  onClose,
  onComplete,
}) {
  const [autoIndexAI, setAutoIndexAI] = useState(true);
  const [queue, setQueue] = useState([
    {
      id: "u1",
      name: "Milvus-Vector-Database-Guide.pdf",
      size: "12.4 MB",
      type: "pdf",
      speed: "2.4 MB/s",
      remaining: "Còn lại 3 giây",
      progress: 68,
      status: "uploading",
    },
    {
      id: "u2",
      name: "Sprint1-Architecture-Walkthrough.mp4",
      size: "38.5 MB",
      type: "mp4",
      note: "Đã tải lên • Đang trích xuất transcript AI...",
      progress: 100,
      status: "completed",
    },
    {
      id: "u3",
      name: "Financial-Audit-2026.xlsx",
      size: "3.2 MB",
      type: "xlsx",
      error: "Lỗi kết nối máy chủ MinIO (Network Timeout)",
      progress: 45,
      status: "error",
    },
  ]);

  if (!isOpen) return null;

  const handleCancelItem = (id) => {
    setQueue((prev) => prev.filter((item) => item.id !== id));
  };

  const handleRetryItem = (id) => {
    setQueue((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: "uploading", progress: 60, error: null }
          : item
      )
    );
  };

  const renderFileIcon = (type) => {
    switch (type) {
      case "pdf":
        return (
          <div className="w-[30px] h-[30px] shrink-0 flex items-center justify-center bg-[#FEF2F2] rounded-[6px]">
            <svg className="w-[15px] h-[15px] text-[#EF4444]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
              <path d="M14 2v4a2 2 0 0 0 2 2h4" />
              <path d="M10 9H8" />
              <path d="M16 13H8" />
              <path d="M16 17H8" />
            </svg>
          </div>
        );
      case "mp4":
        return (
          <div className="w-[30px] h-[30px] shrink-0 flex items-center justify-center bg-[#F3E8FF] rounded-[6px]">
            <svg className="w-[15px] h-[15px] text-[#9333EA]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="14" x="2" y="5" rx="2" />
              <path d="m22 9-5 3 5 3V9Z" />
            </svg>
          </div>
        );
      case "xlsx":
      default:
        return (
          <div className="w-[30px] h-[30px] shrink-0 flex items-center justify-center bg-[#ECFDF5] rounded-[6px]">
            <svg className="w-[15px] h-[15px] text-[#059669]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M3 9h18" />
              <path d="M3 15h18" />
              <path d="M12 3v18" />
            </svg>
          </div>
        );
    }
  };

  const completedCount = queue.filter((item) => item.status === "completed").length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-150">
      {/* Upload Modal Dialog */}
      <div className="relative w-full max-w-[720px] bg-white border border-[#E2E8F0] rounded-[16px] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="w-full flex items-center justify-between p-[20px_28px_18px_28px] border-b border-[#E2E8F0] bg-white">
          <div className="flex items-center gap-[12px]">
            <div className="w-[42px] h-[42px] shrink-0 flex items-center justify-center bg-[#EEF2FF] rounded-[10px]">
              <svg className="w-[20px] h-[20px] text-[#4F46E5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                <path d="M12 12v9" />
                <path d="m16 16-4-4-4 4" />
              </svg>
            </div>
            <div className="flex flex-col gap-[2px]">
              <h2 className="text-[18px] font-bold text-[#0F172A] leading-tight">
                Tải lên tệp tài liệu dự án
              </h2>
              <p className="text-[12px] text-[#64748B]">
                Hỗ trợ đa định dạng, tự động trích xuất và lập chỉ mục AI Vector
              </p>
            </div>
          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng modal"
            className="w-[32px] h-[32px] flex items-center justify-center bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#64748B] hover:text-[#0F172A] rounded-[6px] transition-colors cursor-pointer"
          >
            <svg className="w-[16px] h-[16px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body Container */}
        <div className="w-full flex flex-col gap-[18px] p-[22px_28px_20px_28px] overflow-y-auto max-h-[calc(90vh-160px)]">
          {/* Dropzone Area Box */}
          <div className="w-full h-[170px] shrink-0 flex flex-col items-center justify-center gap-[10px] p-[16px] bg-[#F8FAFC] border-2 border-dashed border-[#818CF8] hover:border-[#4F46E5] rounded-[12px] transition-colors cursor-pointer group">
            <div className="w-[48px] h-[48px] shrink-0 flex items-center justify-center bg-[#EEF2FF] border border-[#C7D2FE] group-hover:scale-105 rounded-full transition-transform">
              <svg className="w-[22px] h-[22px] text-[#4F46E5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                <path d="M12 12v9" />
                <path d="m16 16-4-4-4 4" />
              </svg>
            </div>

            <div className="flex items-center gap-[6px] flex-wrap justify-center text-center">
              <span className="text-[13px] font-semibold text-[#1E293B]">
                Kéo và thả tệp tài liệu, video, hình ảnh vào đây hoặc
              </span>
              <span className="text-[13px] font-bold text-[#4F46E5] hover:underline">
                Duyệt từ máy tính
              </span>
            </div>

            <div className="px-[12px] py-[4px] bg-white border border-[#E2E8F0] rounded-[20px]">
              <span className="text-[11px] text-[#64748B]">
                Hỗ trợ: PDF, DOCX, XLSX, PPTX, MD, TXT, JPG, PNG, MP4, MOV (Tối đa 500 MB/tệp)
              </span>
            </div>
          </div>

          {/* Queue Section Header */}
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-[8px]">
              <span className="text-[13px] font-bold text-[#0F172A]">
                Danh sách tệp đang tải lên
              </span>
              <span className="text-[10px] font-bold text-[#4F46E5] bg-[#EEF2FF] px-[6px] py-[2px] rounded-[10px]">
                {queue.length} tệp
              </span>
            </div>
            <span className="text-[11px] text-[#64748B]">
              Tổng dung lượng: 54.1 MB
            </span>
          </div>

          {/* Upload Queue List */}
          <div className="w-full flex flex-col gap-[10px]">
            {queue.map((item) => {
              if (item.status === "uploading") {
                return (
                  <div
                    key={item.id}
                    className="w-full flex flex-col gap-[8px] p-[10px_14px] bg-[#F8FAFC] border border-[#E2E8F0] rounded-[8px]"
                  >
                    <div className="w-full flex items-center justify-between">
                      <div className="flex items-center gap-[10px] min-w-0">
                        {renderFileIcon(item.type)}
                        <div className="flex flex-col min-w-0">
                          <span className="text-[12px] font-semibold text-[#0F172A] truncate">
                            {item.name}
                          </span>
                          <span className="text-[11px] text-[#64748B]">
                            {item.size} • {item.speed} • {item.remaining}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-[10px] shrink-0">
                        <span className="text-[12px] font-bold text-[#4F46E5]">
                          {item.progress}%
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCancelItem(item.id)}
                          aria-label="Hủy tải lên tệp"
                          className="w-[24px] h-[24px] flex items-center justify-center bg-white border border-[#CBD5E1] hover:bg-slate-100 rounded-full transition-colors cursor-pointer text-[#64748B]"
                        >
                          <svg className="w-[12px] h-[12px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Progress Track */}
                    <div className="w-full h-[5px] bg-[#E2E8F0] rounded-[3px] overflow-hidden">
                      <div
                        style={{ width: `${item.progress}%` }}
                        className="h-full bg-[#4F46E5] rounded-[3px] transition-all duration-300"
                      />
                    </div>
                  </div>
                );
              }

              if (item.status === "completed") {
                return (
                  <div
                    key={item.id}
                    className="w-full flex flex-col gap-[8px] p-[10px_14px] bg-[#ECFDF5] border border-[#A7F3D0] rounded-[8px]"
                  >
                    <div className="w-full flex items-center justify-between">
                      <div className="flex items-center gap-[10px] min-w-0">
                        {renderFileIcon(item.type)}
                        <div className="flex flex-col min-w-0">
                          <span className="text-[12px] font-semibold text-[#0F172A] truncate">
                            {item.name}
                          </span>
                          <span className="text-[11px] text-[#059669]">
                            {item.size} • {item.note}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-[4px] shrink-0">
                        <svg className="w-[14px] h-[14px] text-[#059669]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span className="text-[11px] font-bold text-[#059669]">
                          Hoàn tất 100%
                        </span>
                      </div>
                    </div>

                    {/* Progress Full */}
                    <div className="w-full h-[5px] bg-[#10B981] rounded-[3px]" />
                  </div>
                );
              }

              if (item.status === "error") {
                return (
                  <div
                    key={item.id}
                    className="w-full flex flex-col gap-[8px] p-[10px_14px] bg-[#FEF2F2] border border-[#FECACA] rounded-[8px]"
                  >
                    <div className="w-full flex items-center justify-between">
                      <div className="flex items-center gap-[10px] min-w-0">
                        {renderFileIcon(item.type)}
                        <div className="flex flex-col min-w-0">
                          <span className="text-[12px] font-semibold text-[#0F172A] truncate">
                            {item.name}
                          </span>
                          <span className="text-[11px] text-[#DC2626]">
                            {item.size} • {item.error}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRetryItem(item.id)}
                        className="h-[26px] flex items-center gap-[4px] px-[10px] bg-[#DC2626] hover:bg-[#B91C1C] text-white rounded-[4px] text-[11px] font-semibold transition-colors cursor-pointer shrink-0"
                      >
                        <svg className="w-[11px] h-[11px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                          <path d="M3 3v5h5" />
                          <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                          <path d="M16 16h5v5" />
                        </svg>
                        <span>Thử lại</span>
                      </button>
                    </div>

                    {/* Progress Error */}
                    <div className="w-full h-[5px] bg-[#FEE2E2] rounded-[3px] overflow-hidden">
                      <div
                        style={{ width: `${item.progress}%` }}
                        className="h-full bg-[#EF4444] rounded-[3px]"
                      />
                    </div>
                  </div>
                );
              }

              return null;
            })}
          </div>

          {/* Advanced Options Box */}
          <div
            onClick={() => setAutoIndexAI(!autoIndexAI)}
            className="w-full flex items-start gap-[12px] p-[12px_16px] bg-[#F8FAFC] border border-[#E2E8F0] rounded-[8px] cursor-pointer hover:bg-slate-100/70 transition-colors select-none"
          >
            <div
              className={`w-[18px] h-[18px] shrink-0 mt-0.5 flex items-center justify-center rounded-[4px] transition-colors ${
                autoIndexAI
                  ? "bg-[#4F46E5] text-white"
                  : "bg-white border border-[#CBD5E1]"
              }`}
            >
              {autoIndexAI && (
                <svg className="w-[12px] h-[12px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>

            <div className="flex-1 flex flex-col gap-[2px]">
              <span className="text-[12px] font-bold text-[#0F172A]">
                Tự động phân tích & nạp vào AI Chatbot (Vector Indexing)
              </span>
              <p className="text-[11px] leading-[15px] text-[#64748B]">
                Hệ thống sẽ tự động trích xuất nội dung văn bản, phân đoạn (chunking) và sinh vector embeddings để sẵn sàng hỏi đáp ngay sau khi tải lên hoàn tất.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 p-[16px_28px_18px_28px] bg-[#F8FAFC] border-t border-[#E2E8F0]">
          {/* Storage Hint Left */}
          <div className="flex items-center gap-[6px] text-[12px] text-[#64748B]">
            <svg className="w-[14px] h-[14px] text-[#64748B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" x2="2" y1="12" y2="12" />
              <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
              <line x1="6" x2="6.01" y1="16" y2="16" />
              <line x1="10" x2="10.01" y1="16" y2="16" />
            </svg>
            <span>Dung lượng MinIO còn trống: 8.8 GB / 10 GB</span>
          </div>

          {/* Footer Buttons Right */}
          <div className="flex items-center gap-[12px]">
            <button
              type="button"
              onClick={onClose}
              className="h-[38px] px-[16px] bg-white border border-[#CBD5E1] hover:bg-slate-50 text-[#475569] rounded-[8px] text-[13px] font-medium transition-colors cursor-pointer"
            >
              Hủy bỏ
            </button>

            <button
              type="button"
              onClick={() => {
                if (onComplete) onComplete(queue);
                onClose();
              }}
              className="h-[38px] flex items-center gap-[6px] px-[20px] bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-[8px] text-[13px] font-semibold transition-colors cursor-pointer shadow-sm"
            >
              <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Hoàn tất tải lên ({completedCount}/{queue.length} tệp)</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

import React, { useState, useRef } from "react";
import { documentService } from "@/services";

export default function UploadModal({
  isOpen = false,
  onClose,
  onComplete,
  projectId,
}) {
  const [queue, setQueue] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  // Danh sách định dạng có thể trích xuất & lưu embedding RAG
  const RAG_EXTENSIONS = ['pdf', 'docx', 'doc', 'md', 'txt'];

  // Danh sách định dạng hệ thống lưu trữ MinIO hỗ trợ
  const ALLOWED_EXTENSIONS = [
    // Tài liệu
    'pdf', 'docx', 'doc', 'md', 'txt', 'rtf', 'odt',
    // Dữ liệu & bảng tính
    'xlsx', 'xls', 'csv', 'json', 'xml',
    // Trình chiếu
    'pptx', 'ppt',
    // Hình ảnh
    'png', 'jpg', 'jpeg', 'webp', 'svg', 'gif', 'bmp', 'ico',
    // Đa phương tiện
    'mp4', 'mkv', 'avi', 'mov', 'webm', 'mp3', 'wav', 'ogg',
    // Nén
    'zip', 'rar', '7z', 'tar', 'gz'
  ];

  const handleFiles = (files) => {
    if (!files || files.length === 0) return;

    const validFiles = [];
    const invalidNames = [];

    Array.from(files).forEach((file) => {
      const ext = file.name.split('.').pop()?.toLowerCase() || '';
      if (ALLOWED_EXTENSIONS.includes(ext)) {
        validFiles.push({ file, ext });
      } else {
        invalidNames.push(file.name);
      }
    });

    if (invalidNames.length > 0) {
      alert(
        `Các tệp sau không được hỗ trợ:\n- ${invalidNames.join('\n- ')}\n\nHệ thống hỗ trợ tài liệu (PDF, Word, MD, Text), hình ảnh, video, bảng tính và tệp nén an toàn.`
      );
    }

    if (validFiles.length === 0) return;

    const newItems = validFiles.map(({ file, ext }, idx) => {
      const isRag = RAG_EXTENSIONS.includes(ext);
      return {
        id: `upload-${Date.now()}-${idx}-${Math.random().toString(36).substring(2, 6)}`,
        file,
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        type: ext,
        isRagEligible: isRag,
        progress: 0,
        status: 'pending',
        error: null,
        note: isRag
          ? 'Tự động trích xuất nội dung & nạp AI'
          : 'Lưu trữ MinIO (Không trích xuất)',
      };
    });

    setQueue((prev) => [...prev, ...newItems]);
  };

  const startUpload = async () => {
    const pendingItems = queue.filter((item) => item.status === 'pending');
    if (pendingItems.length === 0) return;

    setIsUploading(true);

    for (const item of pendingItems) {
      try {
        setQueue((prev) =>
          prev.map((q) =>
            q.id === item.id
              ? {
                  ...q,
                  progress: 40,
                  status: 'uploading',
                  note: item.isRagEligible
                    ? 'Đang tải lên MinIO & nạp vector AI...'
                    : 'Đang tải lên MinIO...',
                }
              : q
          )
        );

        // Determine category from extension
        const ext = item.type;
        let category = 'docs';
        if (['pdf', 'docx', 'doc', 'md', 'txt'].includes(ext)) {
          if (ext === 'pdf') category = 'pdf';
          else if (['docx', 'doc'].includes(ext)) category = 'word';
          else if (ext === 'md') category = 'md';
          else if (ext === 'txt') category = 'txt';
        } else if (['png', 'jpg', 'jpeg', 'webp', 'svg', 'gif'].includes(ext)) {
          category = 'images';
        } else if (['mp4', 'mkv', 'avi', 'mov', 'webm', 'mp3', 'wav'].includes(ext)) {
          category = 'media';
        } else if (['xlsx', 'xls', 'csv', 'json'].includes(ext)) {
          category = 'sheets';
        } else if (['zip', 'rar', '7z'].includes(ext)) {
          category = 'archives';
        }

        await documentService.uploadDocument(projectId, item.file, category, item.isRagEligible);

        setQueue((prev) =>
          prev.map((q) =>
            q.id === item.id
              ? {
                  ...q,
                  progress: 100,
                  status: 'completed',
                  note: item.isRagEligible
                    ? 'Hoàn tất: Đã lưu trữ và lập chỉ mục Vector AI'
                    : 'Hoàn tất: Đã lưu trữ MinIO an toàn',
                }
              : q
          )
        );
      } catch (err) {
        setQueue((prev) =>
          prev.map((q) =>
            q.id === item.id
              ? {
                  ...q,
                  status: 'error',
                  error: err.message || 'Lỗi khi tải tệp lên máy chủ',
                }
              : q
          )
        );
      }
    }

    setIsUploading(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleCancelItem = (id) => {
    setQueue((prev) => prev.filter((item) => item.id !== id));
  };

  const renderFileIcon = (type) => {
    switch (type) {
      case "pdf":
        return (
          <div className="w-[32px] h-[32px] shrink-0 flex items-center justify-center bg-[#FEF2F2] text-[#EF4444] rounded-[6px]">
            <svg className="w-[16px] h-[16px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
              <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            </svg>
          </div>
        );
      case "docx":
      case "doc":
        return (
          <div className="w-[32px] h-[32px] shrink-0 flex items-center justify-center bg-[#EFF6FF] text-[#2563EB] rounded-[6px]">
            <svg className="w-[16px] h-[16px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </div>
        );
      case "md":
      case "txt":
        return (
          <div className="w-[32px] h-[32px] shrink-0 flex items-center justify-center bg-[#F3E8FF] text-[#7C3AED] rounded-[6px]">
            <svg className="w-[16px] h-[16px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect width="18" height="14" x="3" y="5" rx="2" />
              <path d="M7 15V9l3 3 3-3v6" />
            </svg>
          </div>
        );
      case "png":
      case "jpg":
      case "jpeg":
      case "webp":
      case "svg":
      case "gif":
        return (
          <div className="w-[32px] h-[32px] shrink-0 flex items-center justify-center bg-emerald-50 text-emerald-600 rounded-[6px]">
            <svg className="w-[16px] h-[16px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
          </div>
        );
      case "mp4":
      case "mkv":
      case "mov":
      case "mp3":
      case "wav":
        return (
          <div className="w-[32px] h-[32px] shrink-0 flex items-center justify-center bg-amber-50 text-amber-600 rounded-[6px]">
            <svg className="w-[16px] h-[16px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
        );
      case "xlsx":
      case "xls":
      case "csv":
        return (
          <div className="w-[32px] h-[32px] shrink-0 flex items-center justify-center bg-teal-50 text-teal-600 rounded-[6px]">
            <svg className="w-[16px] h-[16px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <path d="M14 2v6h6" />
              <path d="M8 13h8" />
              <path d="M8 17h8" />
            </svg>
          </div>
        );
      case "zip":
      case "rar":
      case "7z":
        return (
          <div className="w-[32px] h-[32px] shrink-0 flex items-center justify-center bg-orange-50 text-orange-600 rounded-[6px]">
            <svg className="w-[16px] h-[16px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-[32px] h-[32px] shrink-0 flex items-center justify-center bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0] rounded-[6px]">
            <svg className="w-[16px] h-[16px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            </svg>
          </div>
        );
    }
  };

  const pendingCount = queue.filter((item) => item.status === "pending").length;
  const completedCount = queue.filter((item) => item.status === "completed").length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-150">
      <div className="relative w-full max-w-[760px] bg-white border border-[#E2E8F0] rounded-[16px] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-150">
        
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
                Hỗ trợ đa định dạng MinIO, tùy chọn trích xuất &amp; lập chỉ mục AI Vector (PDF, Word, MD, Text)
              </p>
            </div>
          </div>

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
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="w-full h-[155px] shrink-0 flex flex-col items-center justify-center gap-[8px] p-[16px] bg-[#F8FAFC] border-2 border-dashed border-[#818CF8] hover:border-[#4F46E5] rounded-[12px] transition-colors cursor-pointer group"
          >
            <input
              type="file"
              ref={fileInputRef}
              multiple
              accept=".pdf,.docx,.doc,.md,.txt,.png,.jpg,.jpeg,.webp,.svg,.gif,.xlsx,.xls,.csv,.json,.mp4,.mp3,.zip,.rar,.7z"
              onChange={(e) => handleFiles(e.target.files)}
              className="hidden"
            />
            <div className="w-[44px] h-[44px] shrink-0 flex items-center justify-center bg-[#EEF2FF] border border-[#C7D2FE] group-hover:scale-105 rounded-full transition-transform">
              <svg className="w-[20px] h-[20px] text-[#4F46E5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                <path d="M12 12v9" />
                <path d="m16 16-4-4-4 4" />
              </svg>
            </div>

            <div className="flex items-center gap-[6px] flex-wrap justify-center text-center">
              <span className="text-[13px] font-semibold text-[#1E293B]">
                Kéo và thả tệp vào đây hoặc
              </span>
              <span className="text-[13px] font-bold text-[#4F46E5] hover:underline">
                Duyệt từ máy tính
              </span>
            </div>

            <div className="px-[12px] py-[3px] bg-white border border-[#E2E8F0] rounded-[20px]">
              <span className="text-[11px] text-[#64748B]">
                Hỗ trợ: PDF, Word, Markdown, Text, Hình ảnh, Video, Bảng tính, Tệp nén (Tối đa 100 MB/tệp)
              </span>
            </div>
          </div>

          {/* AI Vector Info Note */}
          <div className="w-full flex items-center gap-[10px] p-[10px_14px] bg-[#F0FDF4] border border-[#BBF7D0] rounded-[10px] text-[#166534]">
            <svg className="w-4 h-4 shrink-0 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
            </svg>
            <span className="text-[12px] font-medium leading-[17px]">
              Hệ thống sẽ <strong>tự động nhận diện và trích xuất nội dung</strong> cho các tệp văn bản (PDF, Word, Markdown, Text) để nạp vào AI Assistant. Các tệp khác (ảnh, video, dữ liệu...) sẽ được lưu trữ an toàn trên MinIO.
            </span>
          </div>

          {/* Queue Section Header */}
          {queue.length > 0 && (
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center gap-[8px]">
                <span className="text-[13px] font-bold text-[#0F172A]">
                  Danh sách tệp ({queue.length})
                </span>
                {pendingCount > 0 && (
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-[6px] py-[2px] rounded-[10px]">
                    {pendingCount} chờ tải lên
                  </span>
                )}
                {completedCount > 0 && (
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-[6px] py-[2px] rounded-[10px]">
                    {completedCount} đã hoàn tất
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Upload Queue List */}
          <div className="w-full flex flex-col gap-[10px]">
            {queue.map((item) => {
              const isPending = item.status === "pending";
              const isUploadingItem = item.status === "uploading";
              const isCompleted = item.status === "completed";
              const isError = item.status === "error";

              let bgBorder = "bg-[#F8FAFC] border-[#E2E8F0]";
              if (isCompleted) bgBorder = "bg-[#ECFDF5] border-[#A7F3D0]";
              if (isError) bgBorder = "bg-[#FEF2F2] border-[#FECACA]";

              return (
                <div
                  key={item.id}
                  className={`w-full flex flex-col gap-[8px] p-[10px_14px] border rounded-[10px] transition-all ${bgBorder}`}
                >
                  <div className="w-full flex items-center justify-between gap-3">
                    {/* Left: Icon and info */}
                    <div className="flex items-center gap-[10px] min-w-0 flex-1">
                      {renderFileIcon(item.type)}
                      <div className="flex flex-col min-w-0">
                        <span className="text-[12px] font-semibold text-[#0F172A] truncate max-w-[280px] sm:max-w-[360px]">
                          {item.name}
                        </span>
                        <span className={`text-[11px] ${isCompleted ? "text-[#059669]" : isError ? "text-[#EF4444]" : "text-[#64748B]"}`}>
                          {item.size} • {item.note}
                        </span>
                      </div>
                    </div>

                    {/* Right: AI extraction badge or storage badge + Actions */}
                    <div className="flex items-center gap-2.5 shrink-0">
                      {item.isRagEligible ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 select-none">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span>AI Tự động trích xuất</span>
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-500 border border-slate-200 select-none">
                          Chỉ lưu trữ MinIO
                        </span>
                      )}

                      {(isPending || isError) && (
                        <button
                          type="button"
                          onClick={() => handleCancelItem(item.id)}
                          title="Xóa tệp khỏi danh sách"
                          className="w-[22px] h-[22px] flex items-center justify-center text-[#94A3B8] hover:text-[#EF4444] transition-colors cursor-pointer"
                        >
                          <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                          </svg>
                        </button>
                      )}

                      {isCompleted && (
                        <div className="flex items-center gap-1 text-[#059669]">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Progress bar */}
                  {isUploadingItem && (
                    <div className="w-full h-[5px] bg-[#E2E8F0] rounded-[3px] overflow-hidden">
                      <div
                        style={{ width: `${item.progress}%` }}
                        className="h-full bg-[#4F46E5] rounded-[3px] transition-all duration-300"
                      />
                    </div>
                  )}

                  {isCompleted && (
                    <div className="w-full h-[4px] bg-[#10B981] rounded-[3px]" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 p-[16px_28px_18px_28px] bg-[#F8FAFC] border-t border-[#E2E8F0]">
          <div className="flex items-center gap-[6px] text-[12px] text-[#64748B]">
            <span>Đã hoàn tất: {completedCount}/{queue.length} tệp</span>
          </div>

          <div className="flex items-center gap-[10px]">
            <button
              type="button"
              onClick={onClose}
              className="h-[38px] px-[16px] bg-white border border-[#CBD5E1] hover:bg-slate-50 text-[#475569] rounded-[8px] text-[13px] font-medium transition-colors cursor-pointer"
            >
              Đóng
            </button>

            {pendingCount > 0 ? (
              <button
                type="button"
                disabled={isUploading}
                onClick={startUpload}
                className="h-[38px] flex items-center gap-[8px] px-[20px] bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-[8px] text-[13px] font-semibold transition-colors cursor-pointer shadow-sm disabled:opacity-50"
              >
                {isUploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Đang tải lên...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                      <path d="M12 12v9" />
                      <path d="m16 16-4-4-4 4" />
                    </svg>
                    <span>Bắt đầu tải lên ({pendingCount})</span>
                  </>
                )}
              </button>
            ) : (
              <button
                type="button"
                disabled={isUploading || queue.length === 0}
                onClick={() => {
                  if (onComplete) onComplete(queue);
                  onClose();
                }}
                className="h-[38px] flex items-center gap-[6px] px-[20px] bg-[#059669] hover:bg-[#047857] text-white rounded-[8px] text-[13px] font-semibold transition-colors cursor-pointer shadow-sm disabled:opacity-50"
              >
                <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Xác nhận &amp; Cập nhật danh sách</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

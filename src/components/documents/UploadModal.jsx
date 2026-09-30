import React, { useState, useRef } from "react";
import { documentService } from "@/services";

export default function UploadModal({
  isOpen = false,
  onClose,
  onComplete,
  projectId,
}) {
  const [autoIndexAI, setAutoIndexAI] = useState(true);
  const [queue, setQueue] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const ALLOWED_EXTENSIONS = ['pdf', 'docx', 'doc', 'md', 'txt'];

  const handleFiles = async (files) => {
    if (!files || files.length === 0) return;

    const validFiles = [];
    const invalidNames = [];

    Array.from(files).forEach((file) => {
      const ext = file.name.split('.').pop()?.toLowerCase() || '';
      if (ALLOWED_EXTENSIONS.includes(ext)) {
        validFiles.push(file);
      } else {
        invalidNames.push(file.name);
      }
    });

    if (invalidNames.length > 0) {
      alert(
        `Các tệp sau không được hỗ trợ:\n- ${invalidNames.join('\n- ')}\n\nHệ thống chỉ cho phép tải lên các định dạng: PDF (.pdf), Word (.docx, .doc), Markdown (.md) và Text (.txt).`
      );
    }

    if (validFiles.length === 0) return;

    const newItems = validFiles.map((file, idx) => ({
      id: `upload-${Date.now()}-${idx}`,
      file,
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      type: file.name.split('.').pop()?.toLowerCase() || 'file',
      progress: 30,
      status: 'uploading',
      error: null,
      note: 'Đang tải lên MinIO...',
    }));

    setQueue((prev) => [...prev, ...newItems]);
    setIsUploading(true);

    for (const item of newItems) {
      try {
        setQueue((prev) =>
          prev.map((q) => (q.id === item.id ? { ...q, progress: 60, note: 'Đang trích xuất & nạp vector PGVector...' } : q))
        );

        // Determine category from extension
        const ext = item.type;
        let category = 'pdf';
        if (['docx', 'doc'].includes(ext)) category = 'word';
        else if (ext === 'md') category = 'md';
        else if (ext === 'txt') category = 'txt';

        await documentService.uploadDocument(projectId, item.file, category);

        setQueue((prev) =>
          prev.map((q) =>
            q.id === item.id
              ? { ...q, progress: 100, status: 'completed', note: 'Đã tải lên và lập chỉ mục Vector thành công' }
              : q
          )
        );
      } catch (err) {
        setQueue((prev) =>
          prev.map((q) =>
            q.id === item.id
              ? { ...q, status: 'error', error: err.message || 'Lỗi khi tải file lên máy chủ' }
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
      case "docx":
      case "doc":
        return (
          <div className="w-[30px] h-[30px] shrink-0 flex items-center justify-center bg-[#EFF6FF] rounded-[6px]">
            <svg className="w-[15px] h-[15px] text-[#2563EB]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="8" y1="13" x2="16" y2="13" />
              <line x1="8" y1="17" x2="14" y2="17" />
            </svg>
          </div>
        );
      case "md":
        return (
          <div className="w-[30px] h-[30px] shrink-0 flex items-center justify-center bg-[#F3E8FF] rounded-[6px]">
            <svg className="w-[15px] h-[15px] text-[#7C3AED]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="14" x="3" y="5" rx="2" />
              <path d="M7 15V9l3 3 3-3v6" />
              <path d="m17 13 2 2 2-2" />
              <path d="M19 9v6" />
            </svg>
          </div>
        );
      case "txt":
      default:
        return (
          <div className="w-[30px] h-[30px] shrink-0 flex items-center justify-center bg-[#F8FAFC] border border-[#E2E8F0] rounded-[6px]">
            <svg className="w-[15px] h-[15px] text-[#64748B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="9" y1="12" x2="15" y2="12" />
              <line x1="9" y1="16" x2="13" y2="16" />
            </svg>
          </div>
        );
    }
  };

  const completedCount = queue.filter((item) => item.status === "completed").length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-150">
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
            className="w-full h-[170px] shrink-0 flex flex-col items-center justify-center gap-[10px] p-[16px] bg-[#F8FAFC] border-2 border-dashed border-[#818CF8] hover:border-[#4F46E5] rounded-[12px] transition-colors cursor-pointer group"
          >
            <input
              type="file"
              ref={fileInputRef}
              multiple
              accept=".pdf,.docx,.doc,.md,.txt"
              onChange={(e) => handleFiles(e.target.files)}
              className="hidden"
            />
            <div className="w-[48px] h-[48px] shrink-0 flex items-center justify-center bg-[#EEF2FF] border border-[#C7D2FE] group-hover:scale-105 rounded-full transition-transform">
              <svg className="w-[22px] h-[22px] text-[#4F46E5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                <path d="M12 12v9" />
                <path d="m16 16-4-4-4 4" />
              </svg>
            </div>

            <div className="flex items-center gap-[6px] flex-wrap justify-center text-center">
              <span className="text-[13px] font-semibold text-[#1E293B]">
                Kéo và thả tệp tài liệu vào đây hoặc
              </span>
              <span className="text-[13px] font-bold text-[#4F46E5] hover:underline">
                Duyệt từ máy tính
              </span>
            </div>

            <div className="px-[12px] py-[4px] bg-white border border-[#E2E8F0] rounded-[20px]">
              <span className="text-[11px] text-[#64748B]">
                Chỉ hỗ trợ: PDF, Word (.docx, .doc), Markdown (.md), Text (.txt) (Tối đa 100 MB/tệp)
              </span>
            </div>
          </div>

          {/* Queue Section Header */}
          {queue.length > 0 && (
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center gap-[8px]">
                <span className="text-[13px] font-bold text-[#0F172A]">
                  Danh sách tệp đang tải lên
                </span>
                <span className="text-[10px] font-bold text-[#4F46E5] bg-[#EEF2FF] px-[6px] py-[2px] rounded-[10px]">
                  {queue.length} tệp
                </span>
              </div>
            </div>
          )}

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
                            {item.size} • {item.note}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleCancelItem(item.id)}
                        className="w-[20px] h-[20px] flex items-center justify-center text-[#94A3B8] hover:text-[#EF4444]"
                      >
                        <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 6 6 18" />
                          <path d="m6 6 12 12" />
                        </svg>
                      </button>
                    </div>

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
                        <svg className="w-[14px] h-[14px] text-[#059669]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span className="text-[11px] font-bold text-[#059669]">
                          Hoàn tất 100%
                        </span>
                      </div>
                    </div>
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
                          <span className="text-[11px] text-[#EF4444] font-medium">
                            {item.error}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleCancelItem(item.id)}
                        className="text-[#94A3B8] hover:text-[#EF4444]"
                      >
                        <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 6 6 18" />
                          <path d="m6 6 12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              }

              return null;
            })}
          </div>

          {/* AI Vector Checkbox */}
          {/* <div className="w-full flex items-start gap-[10px] p-[14px_16px] bg-[#EEF2FF] border border-[#C7D2FE] rounded-[10px]">
            <input
              type="checkbox"
              id="autoIndexAI"
              checked={autoIndexAI}
              onChange={(e) => setAutoIndexAI(e.target.checked)}
              className="mt-[3px] w-4 h-4 text-[#4F46E5] rounded focus:ring-[#4F46E5]"
            />
            <div className="flex-1 flex flex-col gap-[2px]">
              <label htmlFor="autoIndexAI" className="text-[12px] font-bold text-[#0F172A] cursor-pointer">
                Tự động phân tích & nạp vào AI Chatbot (Vector Indexing)
              </label>
              <p className="text-[11px] leading-[15px] text-[#64748B]">
                Hệ thống sẽ tự động trích xuất nội dung văn bản, phân đoạn (chunking) và sinh vector embeddings để sẵn sàng hỏi đáp ngay sau khi tải lên hoàn tất.
              </p>
            </div>
          </div> */}
        </div>

        {/* Modal Footer */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 p-[16px_28px_18px_28px] bg-[#F8FAFC] border-t border-[#E2E8F0]">
          <div className="flex items-center gap-[6px] text-[12px] text-[#64748B]">
            <span>Đã hoàn tất: {completedCount}/{queue.length} tệp</span>
          </div>

          <div className="flex items-center gap-[12px]">
            <button
              type="button"
              onClick={onClose}
              className="h-[38px] px-[16px] bg-white border border-[#CBD5E1] hover:bg-slate-50 text-[#475569] rounded-[8px] text-[13px] font-medium transition-colors cursor-pointer"
            >
              Đóng
            </button>

            <button
              type="button"
              disabled={isUploading}
              onClick={() => {
                if (onComplete) onComplete(queue);
                onClose();
              }}
              className="h-[38px] flex items-center gap-[6px] px-[20px] bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-[8px] text-[13px] font-semibold transition-colors cursor-pointer shadow-sm disabled:opacity-50"
            >
              <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Xác nhận & Cập nhật danh sách</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

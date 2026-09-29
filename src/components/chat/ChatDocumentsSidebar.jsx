import React, { useState, useMemo } from "react";

export default function ChatDocumentsSidebar({
  documents = [],
  selectedIds = [],
  onToggleDocument,
  onSelectAll,
  onDeselectAll,
  isOpen = true,
  onClose,
  loading = false,
}) {
  const [search, setSearch] = useState("");

  const filteredDocs = useMemo(() => {
    if (!search.trim()) return documents;
    const q = search.toLowerCase();
    return documents.filter((doc) =>
      (doc.name || "").toLowerCase().includes(q)
    );
  }, [documents, search]);

  const renderFileIcon = (format) => {
    const fmt = (format || "").toLowerCase();
    if (fmt === "pdf") {
      return (
        <div className="w-[30px] h-[30px] rounded-[6px] bg-[#FEF2F2] text-[#EF4444] flex items-center justify-center shrink-0">
          <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            <path d="M10 9H8" />
            <path d="M16 13H8" />
            <path d="M16 17H8" />
          </svg>
        </div>
      );
    }
    if (fmt === "docx" || fmt === "doc") {
      return (
        <div className="w-[30px] h-[30px] rounded-[6px] bg-[#EFF6FF] text-[#3B82F6] flex items-center justify-center shrink-0">
          <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            <path d="M8 13h2" />
            <path d="M14 13h2" />
            <path d="M8 17h3" />
            <path d="M13 17h3" />
          </svg>
        </div>
      );
    }
    if (fmt === "md") {
      return (
        <div className="w-[30px] h-[30px] rounded-[6px] bg-[#F5F3FF] text-[#8B5CF6] flex items-center justify-center shrink-0">
          <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
        </div>
      );
    }
    return (
      <div className="w-[30px] h-[30px] rounded-[6px] bg-[#F1F5F9] text-[#64748B] flex items-center justify-center shrink-0">
        <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
          <path d="M14 2v4a2 2 0 0 0 2 2h4" />
        </svg>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="w-[280px] xl:w-[310px] shrink-0 h-full flex flex-col bg-white border-l border-[#E2E8F0] select-none text-[#0F172A]">
      {/* Header */}
      <div className="p-4 border-b border-[#E2E8F0] flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="w-[16px] h-[16px] text-[#4F46E5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            <span className="text-[13px] font-bold text-[#0F172A]">
              Tài liệu sử dụng để hỏi
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#EEF2FF] text-[#4F46E5]">
              {selectedIds.length}/{documents.length}
            </span>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="w-6 h-6 flex items-center justify-center text-[#94A3B8] hover:text-[#475569] rounded hover:bg-[#F1F5F9] transition-colors"
                title="Đóng tab tài liệu"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Quick action buttons */}
        <div className="flex items-center justify-between text-[11px] font-medium pt-1">
          <button
            type="button"
            onClick={onSelectAll}
            className="text-[#4F46E5] hover:text-[#4338CA] hover:underline cursor-pointer"
          >
            Chọn tất cả ({documents.length})
          </button>
          <span className="text-[#CBD5E1]">•</span>
          <button
            type="button"
            onClick={onDeselectAll}
            className="text-[#64748B] hover:text-[#475569] hover:underline cursor-pointer"
          >
            Bỏ chọn tất cả
          </button>
        </div>

        {/* Search Input */}
        {documents.length > 4 && (
          <div className="relative">
            <svg
              className="w-3.5 h-3.5 text-[#94A3B8] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Lọc tài liệu..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-8 pl-8 pr-2.5 bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#4F46E5] focus:bg-white rounded-md text-[12px] text-[#0F172A] placeholder-[#94A3B8] outline-none transition-colors"
            />
          </div>
        )}
      </div>

      {/* Documents List */}
      <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-1.5">
        {loading ? (
          <div className="w-full py-8 flex flex-col items-center justify-center text-slate-400 gap-2">
            <div className="w-5 h-5 border-2 border-[#4F46E5] border-t-transparent rounded-full animate-spin" />
            <span className="text-[12px]">Đang tải tài liệu...</span>
          </div>
        ) : documents.length === 0 ? (
          <div className="w-full py-10 px-3 flex flex-col items-center justify-center text-center text-[#64748B] gap-2">
            <div className="w-10 h-10 rounded-full bg-[#F1F5F9] flex items-center justify-center text-[#94A3B8]">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                <path d="M14 2v4a2 2 0 0 0 2 2h4" />
              </svg>
            </div>
            <p className="text-[12px] font-semibold text-[#334155]">
              Chưa có tài liệu nào
            </p>
            <p className="text-[11px] text-[#94A3B8]">
              Tải lên tài liệu tại mục Explorer để bắt đầu hỏi đáp.
            </p>
          </div>
        ) : filteredDocs.length === 0 ? (
          <div className="w-full py-6 text-center text-[#94A3B8] text-[12px]">
            Không tìm thấy tài liệu nào khớp từ khóa.
          </div>
        ) : (
          filteredDocs.map((doc) => {
            const isSelected = selectedIds.includes(doc.id);
            return (
              <div
                key={doc.id}
                onClick={() => onToggleDocument(doc.id)}
                className={`w-full flex items-center gap-2.5 p-2 rounded-lg border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#EEF2FF]/60 border-[#C7D2FE] shadow-2xs"
                    : "bg-white border-[#F1F5F9] hover:bg-[#F8FAFC] opacity-75"
                }`}
              >
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => {}} // Handled by parent container click
                  className="w-4 h-4 rounded text-[#4F46E5] border-[#CBD5E1] focus:ring-[#4F46E5] cursor-pointer shrink-0"
                />

                {/* File Icon */}
                {renderFileIcon(doc.format || doc.type)}

                {/* File Info */}
                <div className="flex-1 min-w-0 flex flex-col">
                  <span
                    className={`text-[12px] font-medium truncate ${
                      isSelected ? "text-[#0F172A] font-semibold" : "text-[#475569]"
                    }`}
                    title={doc.name}
                  >
                    {doc.name}
                  </span>
                  <span className="text-[11px] text-[#94A3B8] truncate">
                    {doc.size || (doc.format ? doc.format.toUpperCase() : "Tệp tin")}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer Info Notice */}
      <div className="p-3 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-start gap-2">
        <svg className="w-4 h-4 text-[#4F46E5] shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
        <div className="flex flex-col">
          <p className="text-[11px] text-[#64748B] leading-tight">
            Chỉ các tài liệu được tích chọn sẽ được AI phân tích và trích dẫn để trả lời.
          </p>
          {selectedIds.length === 0 && documents.length > 0 && (
            <p className="text-[11px] text-[#DC2626] font-medium mt-1 leading-tight">
              ⚠️ Vui lòng chọn ít nhất 1 tài liệu để hỏi đáp.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

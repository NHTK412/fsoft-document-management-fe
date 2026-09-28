import React from "react";

export default function GeneralStorageCard({
  projectName,
  setProjectName,
  projectDesc,
  setProjectDesc,
  maxFileSize,
  setMaxFileSize,
  allowedFormats,
  onToggleFormat,
}) {
  const allFormats = [
    { id: "pdf", label: "PDF (.pdf)" },
    { id: "docx", label: "Word (.docx)" },
    { id: "xlsx", label: "Excel (.xlsx)" },
    { id: "pptx", label: "PPT (.pptx)" },
    { id: "md", label: "Markdown (.md)" },
    { id: "txt", label: "Văn bản (.txt)" },
    { id: "images", label: "Ảnh (PNG/JPG)" },
    { id: "video", label: "Video (MP4)" },
  ];

  return (
    <div className="w-full bg-white border border-[#E2E8F0] rounded-[12px] p-6 lg:p-[26px] flex flex-col gap-6 shadow-xs">
      {/* Card Header */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#F1F5F9]">
        <div className="flex items-center gap-[12px]">
          <div className="w-[36px] h-[36px] shrink-0 flex items-center justify-center bg-[#EEF2FF] rounded-[8px] text-[#4F46E5]">
            <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
              <circle cx="12" cy="13" r="2" />
              <path d="M12 10v1" /><path d="M12 15v1" /><path d="m14.6 11.5-.9.5" /><path d="m10.3 14-.9.5" /><path d="m14.6 14.5-.9-.5" /><path d="m10.3 12-.9-.5" />
            </svg>
          </div>
          <div>
            <h2 className="text-[16px] font-bold text-[#0F172A]">
              Thông Tin Chung
            </h2>
            <p className="text-[13px] text-[#64748B]">
              Tên định danh dự án, biểu tượng đại diện, hạn mức tệp và định dạng cho phép
            </p>
          </div>
        </div>
      </div>

      {/* Form Grid */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-[28px]">
        {/* Left Column: Project Info */}
        <div className="flex flex-col gap-[14px]">
          {/* Logo Section */}
          <div className="flex items-center gap-[14px]">
            <div className="w-[48px] h-[48px] shrink-0 flex items-center justify-center bg-[#4F46E5] rounded-[10px] text-white shadow-xs">
              <svg className="w-[24px] h-[24px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="16" height="16" x="4" y="4" rx="2" />
                <rect width="6" height="6" x="9" y="9" rx="1" />
                <path d="M15 2v2" /><path d="M15 20v2" /><path d="M2 15h2" /><path d="M2 9h2" /><path d="M20 15h2" /><path d="M20 9h2" /><path d="M9 2v2" /><path d="M9 20v2" />
              </svg>
            </div>
            <div className="flex flex-col gap-[4px]">
              <div className="flex items-center gap-[8px]">
                <button
                  type="button"
                  onClick={() => alert("Chọn file hình ảnh logo mới (PNG, JPG, SVG)")}
                  className="flex items-center gap-[6px] h-[30px] px-[10px] bg-[#F8FAFC] border border-[#CBD5E1] hover:bg-[#F1F5F9] text-[#334155] rounded-[6px] text-[12px] font-medium transition-colors cursor-pointer"
                >
                  <svg className="w-[12px] h-[12px] text-[#475569]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" x2="12" y1="3" y2="15" />
                  </svg>
                  <span>Đổi Logo</span>
                </button>
                <button
                  type="button"
                  onClick={() => alert("Đã đặt lại logo mặc định")}
                  className="h-[30px] px-[8px] text-[12px] text-[#94A3B8] hover:text-[#EF4444] transition-colors cursor-pointer"
                >
                  Gỡ bỏ
                </button>
              </div>
              <span className="text-[11px] text-[#94A3B8]">
                Định dạng PNG, JPG hoặc SVG tối đa 2MB (1:1).
              </span>
            </div>
          </div>

          {/* Project Name Field */}
          <div className="flex flex-col gap-[6px]">
            <label className="text-[13px] font-semibold text-[#334155]">
              Tên Dự Án <span className="text-[#EF4444]">*</span>
            </label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full h-[42px] px-[14px] bg-white border border-[#CBD5E1] rounded-[8px] text-[14px] font-semibold text-[#0F172A] focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20 transition-all"
            />
          </div>

          {/* Project Description Field */}
          <div className="flex flex-col gap-[6px]">
            <label className="text-[13px] font-semibold text-[#334155]">
              Mô Tả Dự Án
            </label>
            <textarea
              rows={3}
              value={projectDesc}
              onChange={(e) => setProjectDesc(e.target.value)}
              className="w-full p-[12px_14px] bg-white border border-[#CBD5E1] rounded-[8px] text-[13px] text-[#334155] focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20 transition-all resize-none leading-relaxed"
            />
          </div>
        </div>

        {/* Right Column: Storage Limits */}
        <div className="flex flex-col gap-[16px]">
          {/* Max Size Selector */}
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-[13px] font-semibold text-[#334155]">
                Dung lượng tệp tải lên tối đa
              </div>
              <div className="text-[12px] text-[#94A3B8]">
                Tệp vượt quá ngưỡng sẽ bị từ chối upload
              </div>
            </div>
            <select
              value={maxFileSize}
              onChange={(e) => setMaxFileSize(e.target.value)}
              className="h-[40px] px-[12px] bg-[#F8FAFC] border border-[#CBD5E1] rounded-[8px] text-[13px] font-semibold text-[#1E293B] focus:outline-none focus:border-[#4F46E5] cursor-pointer"
            >
              <option value="10 MB">10 MB / tệp</option>
              <option value="25 MB">25 MB / tệp</option>
              <option value="50 MB">50 MB / tệp</option>
              <option value="100 MB">100 MB / tệp</option>
              <option value="250 MB">250 MB / tệp</option>
            </select>
          </div>

          {/* Allowed Formats Block */}
          <div className="flex flex-col gap-[10px]">
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-semibold text-[#334155]">
                Định Dạng Tệp Cho Phép (Allowed Formats)
              </span>
              <span className="text-[12px] font-medium text-[#059669]">
                {allowedFormats.length} / {allFormats.length} định dạng bật
              </span>
            </div>

            {/* Format Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {allFormats.map((fmt) => {
                const isChecked = allowedFormats.includes(fmt.id);
                return (
                  <button
                    key={fmt.id}
                    type="button"
                    onClick={() => onToggleFormat(fmt.id)}
                    className={`h-[36px] px-[10px] flex items-center gap-[8px] rounded-[8px] border text-[12px] font-semibold transition-all cursor-pointer ${
                      isChecked
                        ? "bg-[#EEF2FF] border-[#C7D2FE] text-[#3730A3]"
                        : "bg-[#F8FAFC] border-[#E2E8F0] text-[#94A3B8] hover:bg-[#F1F5F9]"
                    }`}
                  >
                    <svg
                      className={`w-[13px] h-[13px] shrink-0 ${isChecked ? "text-[#4F46E5]" : "text-[#CBD5E1]"}`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="truncate">{fmt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Storage Summary Bar */}
          <div className="w-full flex items-center justify-between p-[12px_14px] bg-[#F8FAFC] border border-[#E2E8F0] rounded-[8px]">
            <div className="flex items-center gap-[10px]">
              <svg className="w-[16px] h-[16px] text-[#0284C7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" x2="2" y1="12" y2="12" />
                <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
                <line x1="6" x2="6.01" y1="16" y2="16" />
                <line x1="10" x2="10.01" y1="16" y2="16" />
              </svg>
              <span className="text-[13px] text-[#475569]">
                Dung lượng MinIO hiện tại:
              </span>
              <span className="text-[13px] font-semibold text-[#0284C7]">
                1.2 GB / 10 GB (12% đã dùng)
              </span>
            </div>
            <div className="px-[8px] py-[3px] bg-[#ECFDF5] rounded-[4px] text-[11px] font-semibold text-[#059669]">
              🟢 Bình thường
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

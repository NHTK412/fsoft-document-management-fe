import React, { useState, useEffect } from 'react';

/**
 * Modal Tạo Dự Án Mới theo chuẩn KBase Design System
 */
export const CreateProjectModal = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [inviteEmails, setInviteEmails] = useState('');
  const [isSlugCustomized, setIsSlugCustomized] = useState(false);

  // Tự động tạo slug từ tên dự án nếu chưa tự sửa slug
  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);

    if (!isSlugCustomized) {
      const generatedSlug = 'KB-' + newName
        .trim()
        .toUpperCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^A-Z0-9]/g, '-')
        .replace(/-+/g, '-')
        .slice(0, 16);
      setSlug(generatedSlug === 'KB-' ? '' : generatedSlug);
    }
  };

  const handleSlugChange = (e) => {
    setIsSlugCustomized(true);
    setSlug(e.target.value.toUpperCase().replace(/\s+/g, '-'));
  };

  // Đóng modal khi bấm phím Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.({
      name,
      slug: slug || 'KB-PROJECT',
      description,
      inviteEmails: inviteEmails.split(',').map((email) => email.trim()).filter(Boolean),
    });
    onClose?.();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Backdrop overlay click to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Dialog Card */}
      <div
        className="relative w-full max-w-[580px] bg-white border border-slate-200 rounded-[16px] shadow-2xl overflow-hidden z-10 flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="w-full px-7 pt-6 pb-5 flex items-center justify-between border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-primary-50 text-primary-600 rounded-[10px]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
                <line x1="12" y1="10" x2="12" y2="16" />
                <line x1="9" y1="13" x2="15" y2="13" />
              </svg>
            </div>
            <div className="flex flex-col">
              <h2 className="text-[18px] font-bold text-slate-900 leading-snug">
                Tạo Dự Án Mới
              </h2>
              <span className="text-[12px] text-slate-500">
                Thiết lập không gian lưu trữ và trợ lý AI cho đội ngũ
              </span>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 rounded-md transition-colors cursor-pointer"
            aria-label="Đóng modal"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Modal Body Form */}
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="p-7 flex flex-col gap-4.5">
            
            {/* Field: Tên dự án */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-slate-800 flex items-center gap-1">
                <span>Tên dự án</span>
                <span className="text-danger-500 font-bold">*</span>
              </label>
              <div className="h-[42px] px-3.5 bg-white border border-slate-300 rounded-btn flex items-center gap-2.5 focus-within:border-primary-600 focus-within:ring-2 focus-within:ring-primary-100 transition-all">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4 text-slate-400 shrink-0"
                >
                  <polygon points="12 2 2 7 12 12 22 7 12 2" />
                  <polyline points="2 17 12 22 22 17" />
                  <polyline points="2 12 12 17 22 12" />
                </svg>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={handleNameChange}
                  placeholder="Ví dụ: Hệ thống Thanh toán & Ví điện tử"
                  className="w-full text-[13px] text-slate-900 placeholder:text-slate-400 bg-transparent focus:outline-none"
                />
              </div>
            </div>


            {/* Field: Mô tả dự án */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-slate-800">
                Mô tả dự án
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Không gian tài liệu kỹ thuật thanh toán cổng quốc tế, hồ sơ tích hợp PCI-DSS và hướng dẫn API đối tác."
                className="w-full p-3 text-[13px] leading-[18px] text-slate-800 placeholder:text-slate-400 bg-white border border-slate-300 rounded-btn focus:border-primary-600 focus:ring-2 focus:ring-primary-100 transition-all focus:outline-none resize-none"
              />
            </div>

            {/* Field: Mời thành viên */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[13px] font-semibold text-slate-800">
                  Mời thành viên ngay (tùy chọn)
                </label>
                <span className="text-[11px] text-slate-500">Mặc định: Member</span>
              </div>
              <div className="h-[42px] px-3.5 bg-white border border-slate-300 rounded-btn flex items-center gap-2.5 focus-within:border-primary-600 focus-within:ring-2 focus-within:ring-primary-100 transition-all">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4 text-slate-400 shrink-0"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <input
                  type="text"
                  value={inviteEmails}
                  onChange={(e) => setInviteEmails(e.target.value)}
                  placeholder="Nhập email (ví dụ: dev1@company.com, lead@...) cách nhau bằng dấu phẩy"
                  className="w-full text-[12px] text-slate-800 placeholder:text-slate-400 bg-transparent focus:outline-none"
                />
              </div>
            </div>

          </div>

          {/* Modal Footer */}
          <div className="px-7 py-4.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-500 text-[12px]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 text-slate-400"
              >
                <line x1="22" x2="2" y1="12" y2="12" />
                <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
                <line x1="6" x2="6.01" y1="16" y2="16" />
                <line x1="10" x2="10.01" y1="16" y2="16" />
              </svg>
              <span>Dung lượng MinIO ban đầu: <strong className="font-semibold text-slate-700">10 GB</strong></span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                type="button"
                className="h-[38px] px-4 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 rounded-btn text-[13px] font-medium transition-colors cursor-pointer"
              >
                Hủy bỏ
              </button>

              <button
                type="submit"
                className="h-[38px] px-5 bg-primary-600 hover:bg-primary-500 text-white rounded-btn text-[13px] font-semibold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Xác nhận Tạo Dự Án</span>
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
};

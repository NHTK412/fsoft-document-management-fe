import React from 'react';

/**
 * Banner giới thiệu KBase bên trái trang đăng nhập
 */
export const LoginBanner = () => {
  return (
    <div className="w-full lg:w-[640px] shrink-0 min-h-[600px] lg:min-h-[900px] flex flex-col justify-between p-8 sm:p-12 bg-dark-sidebar text-white select-none">
      
      {/* Brand Logo Row */}
      <div className="flex items-center gap-3">
        <div className="w-[42px] h-[42px] shrink-0 flex items-center justify-center bg-primary-600 rounded-[10px] shadow-lg shadow-indigo-950/50">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 text-white"
          >
            <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
            <path d="M20 3v4" />
            <path d="M22 5h-4" />
            <path d="M4 17v2" />
            <path d="M5 18H3" />
          </svg>
        </div>
        <span className="text-[24px] font-bold text-white tracking-tight">KBase</span>
        <span className="px-2.5 py-1 bg-dark-card border border-dark-border text-primary-400 text-[11px] font-semibold rounded-full">
          AI Enterprise 2.0
        </span>
      </div>

      {/* Center Content */}
      <div className="my-10 lg:my-0 flex flex-col gap-7">
        <div className="space-y-3">
          <h1 className="text-[32px] sm:text-[34px] font-bold leading-[42px] text-white">
            Quản Trị Tri Thức &amp; Hỏi Đáp AI Thông Minh
          </h1>
          <p className="text-[15px] leading-[23px] text-slate-400">
            Lưu trữ các tài liệu nội bộ của công ty và trả lời câu hỏi của các thành viên
          </p>
        </div>

        {/* AI Demo Card */}
        <div className="w-full flex flex-col gap-4 p-5 bg-dark-card border border-dark-border rounded-[16px] shadow-xl">
          {/* AI Card Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-500/10 flex items-center justify-center text-primary-400">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="M12 8V4H8" />
                  <rect width="16" height="12" x="4" y="8" rx="2" />
                  <path d="M2 14h2" />
                  <path d="M20 14h2" />
                  <path d="M15 13v2" />
                  <path d="M9 13v2" />
                </svg>
              </div>
              <span className="text-[13px] font-semibold text-slate-100">KBase AI Assistant</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-950/80 border border-emerald-800/40 rounded-full">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-[11px] text-emerald-300 font-medium">10 File</span>
            </div>
          </div>

          {/* User Query Box */}
          <div className="p-3 bg-dark-surface rounded-lg border border-slate-800/80 flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">CÂU HỎI THÀNH VIÊN</span>
            <p className="text-[13px] text-slate-200">
              Quy trình triển khai microservices lên Kubernetes cụm Alpha như thế nào?
            </p>
          </div>

          {/* AI Response Box */}
          <div className="flex flex-col gap-2.5">
            <p className="text-[13px] leading-[20px] text-slate-300">
              Theo tài liệu <span className="text-indigo-300 font-medium">Architecture-v2.pdf (trang 14)</span>: Bạn cần đóng gói Docker image, đẩy lên Harbor registry, sau đó áp dụng file cấu hình Helm chart kbase-prod.
            </p>
            <div className="w-fit flex items-center gap-1.5 px-2.5 py-1 bg-primary-900/70 border border-primary-700/50 rounded-md">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-3.5 h-3.5 text-primary-300"
              >
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                <path d="M10 9H8" />
                <path d="M16 13H8" />
                <path d="M16 17H8" />
              </svg>
              <span className="text-[11px] font-medium text-primary-200">
                Nguồn: Architecture-v2.pdf • Trang 14
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Trust & Security Badges */}
      <div className="flex flex-wrap items-center gap-5 pt-4 border-t border-slate-800/60">
        <div className="flex items-center gap-2">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 text-emerald-400"
          >
            <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
          <span className="text-[12px] text-slate-400">Bảo mật JWT &amp; RBAC 2.0</span>
        </div>
        <div className="flex items-center gap-2">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 text-primary-400"
          >
            <rect width="16" height="16" x="4" y="4" rx="2" />
            <rect width="6" height="6" x="9" y="9" rx="1" />
            <path d="M15 2v2" />
            <path d="M15 20v2" />
            <path d="M2 15h2" />
            <path d="M2 9h2" />
            <path d="M20 15h2" />
            <path d="M20 9h2" />
            <path d="M9 2v2" />
            <path d="M9 20v2" />
          </svg>
          <span className="text-[12px] text-slate-400">Vector Embeddings Realtime</span>
        </div>
      </div>
    </div>
  );
};

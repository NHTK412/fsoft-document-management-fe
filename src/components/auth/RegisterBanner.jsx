import React from 'react';

export const RegisterBanner = () => {
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
          Khởi tạo Không gian
        </span>
      </div>

      {/* Center Content */}
      <div className="my-8 lg:my-0 flex flex-col gap-6">
        <div className="space-y-3">
          <h1 className="text-[32px] sm:text-[34px] font-bold leading-[42px] text-white">
            Khởi Tạo Không Gian Tri Thức Đội Ngũ Của Bạn
          </h1>
          <p className="text-[15px] leading-[23px] text-slate-400">
            Chỉ mất 30 giây để thiết lập. Kết nối dữ liệu đa định dạng, mời đồng nghiệp và kích hoạt sức mạnh hỏi đáp AI ngay hôm nay.
          </p>
        </div>

        {/* Benefits Card */}
        <div className="w-full flex flex-col gap-4 p-5 bg-dark-card border border-dark-border rounded-[16px] shadow-xl">
          <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
            ĐẶC QUYỀN KHI ĐĂNG KÝ:
          </span>

          {/* Benefit Row 1 */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 shrink-0 rounded-lg bg-dark-surface border border-slate-800 flex items-center justify-center text-primary-400">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 text-indigo-400"
              >
                <line x1="22" x2="2" y1="12" y2="12" />
                <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
                <line x1="6" x2="6.01" y1="16" y2="16" />
                <line x1="10" x2="10.01" y1="16" y2="16" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] font-semibold text-slate-100">
                Lưu trữ đa định dạng
              </span>
              <span className="text-[12px] text-slate-400">
                PDF, Word, Excel, Markdown, Video MP4...
              </span>
            </div>
          </div>

          {/* Benefit Row 2 */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 shrink-0 rounded-lg bg-dark-surface border border-slate-800 flex items-center justify-center text-amber-400">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 text-amber-400"
              >
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] font-semibold text-slate-100">
                Chỉ mục Vector Embeddings tức thì
              </span>
              <span className="text-[12px] text-slate-400">
                Tự động phân đoạn dữ liệu và sẵn sàng cho AI.
              </span>
            </div>
          </div>

          {/* Benefit Row 3 */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 shrink-0 rounded-lg bg-dark-surface border border-slate-800 flex items-center justify-center text-emerald-400">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 text-emerald-400"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] font-semibold text-slate-100">
                Cộng tác dự án &amp; Phân quyền RBAC
              </span>
              <span className="text-[12px] text-slate-400">
                Phân chia vai trò Owner, Admin, Member linh hoạt.
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Trust Footer */}
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
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <line x1="2" x2="22" y1="10" y2="10" />
          </svg>
          <span className="text-[12px] text-slate-400">Không yêu cầu thẻ tín dụng</span>
        </div>
      </div>

    </div>
  );
};

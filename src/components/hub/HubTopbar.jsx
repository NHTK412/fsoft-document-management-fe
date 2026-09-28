import React from 'react';
import { Link } from 'react-router-dom';

export const HubTopbar = ({ userName = 'Nguyễn Văn A', userInitials = 'NV' }) => {
  return (
    <header className="w-full h-[64px] shrink-0 px-6 lg:px-8 flex items-center justify-between bg-white border-b border-slate-200 sticky top-0 z-20">
      
      {/* Brand Left */}
      <div className="flex items-center gap-3">
        <Link to="/projects" className="flex items-center gap-3">
          <div className="w-9 h-9 shrink-0 flex items-center justify-center bg-primary-600 rounded-lg shadow-sm">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 text-white"
            >
              <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
              <path d="M20 3v4" />
              <path d="M22 5h-4" />
            </svg>
          </div>
          <span className="text-[20px] font-bold text-slate-900 tracking-tight">KBase</span>
        </Link>

        <div className="w-[1px] h-5 bg-slate-200 hidden sm:block" />

        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 rounded-md">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3.5 h-3.5 text-slate-500"
          >
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
          <span className="text-[12px] font-medium text-slate-600">Không gian làm việc</span>
        </div>
      </div>

      {/* Topbar Actions Right */}
      <div className="flex items-center gap-3">
        {/* Bell Button */}
        <button
          type="button"
          className="w-9 h-9 flex items-center justify-center bg-white hover:bg-slate-50 border border-slate-200 rounded-btn text-slate-500 transition-colors cursor-pointer"
          aria-label="Thông báo"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 text-slate-500"
          >
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
          </svg>
        </button>

        {/* User Dropdown Button */}
        <div className="flex items-center gap-2.5 p-1 pr-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full cursor-pointer transition-colors">
          <div className="w-[30px] h-[30px] rounded-full bg-primary-600 flex items-center justify-center text-white text-[12px] font-bold">
            {userInitials}
          </div>
          <span className="text-[12px] font-semibold text-slate-800 hidden sm:inline">
            {userName}
          </span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3.5 h-3.5 text-slate-400"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>

    </header>
  );
};

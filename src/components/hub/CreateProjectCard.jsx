import React from 'react';

export const CreateProjectCard = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex-1 min-w-[320px] min-h-[260px] flex flex-col items-center justify-center gap-3 p-6 bg-slate-50/70 hover:bg-white border-2 border-dashed border-slate-300 hover:border-primary-400 rounded-[12px] transition-all cursor-pointer group text-center"
    >
      {/* Plus Icon Circle */}
      <div className="w-12 h-12 rounded-full bg-primary-50 group-hover:bg-primary-100 border border-primary-200 flex items-center justify-center transition-transform group-hover:scale-110">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6 text-primary-600"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </div>

      {/* Title */}
      <h3 className="text-[16px] font-bold text-slate-900 group-hover:text-primary-600 transition-colors">
        Khởi tạo Dự án Mới
      </h3>

      {/* Description */}
      <p className="text-[12px] leading-[17px] text-slate-500 max-w-[280px]">
        Tạo không gian riêng biệt để quản lý tài liệu, mời đồng nghiệp và lập chỉ mục AI.
      </p>

      {/* Action Button */}
      <button
        type="button"
        className="mt-1 px-3.5 py-1.5 bg-primary-600 hover:bg-primary-500 text-white rounded-md text-[12px] font-semibold transition-colors shadow-2xs cursor-pointer"
      >
        Bắt đầu ngay
      </button>
    </div>
  );
};

import React from "react";

export default function DashboardMetrics({ metrics }) {
  const defaultMetrics = [
    {
      id: "total_files",
      title: "TỔNG SỐ TỆP TIN",
      value: "1,428",
      unit: "tệp tài liệu",
      iconBg: "bg-[#EEF2FF]",
      iconColor: "text-[#4F46E5]",
      icon: (
        <svg className="w-[16px] h-[16px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
          <path d="M14 2v4a2 2 0 0 0 2 2h4" />
          <path d="M10 9H8" />
          <path d="M16 13H8" />
          <path d="M16 17H8" />
        </svg>
      )
    },
    {
      id: "storage_used",
      title: "DUNG LƯỢNG MINIO",
      value: "3.42 GB",
      unit: "trên 10 GB (34.2%)",
      iconBg: "bg-[#E0F2FE]",
      iconColor: "text-[#0284C7]",
      icon: (
        <svg className="w-[16px] h-[16px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="22" x2="2" y1="12" y2="12" />
          <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
          <line x1="6" x2="6.01" y1="16" y2="16" />
          <line x1="10" x2="10.01" y1="16" y2="16" />
        </svg>
      )
    },
    {
      id: "ai_queries",
      title: "HỎI ĐÁP AI TRONG TUẦN",
      value: "856",
      unit: "lượt giải đáp",
      iconBg: "bg-[#ECFDF5]",
      iconColor: "text-[#059669]",
      icon: (
        <svg className="w-[16px] h-[16px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 8V4H8" />
          <rect width="16" height="12" x="4" y="8" rx="2" />
          <path d="M2 14h2" />
          <path d="M20 14h2" />
          <path d="M15 13v2" />
          <path d="M9 13v2" />
        </svg>
      )
    },
    {
      id: "active_members",
      title: "THÀNH VIÊN HOẠT ĐỘNG",
      value: "12",
      unit: "thành viên dự án",
      iconBg: "bg-[#FEF3C7]",
      iconColor: "text-[#D97706]",
      icon: (
        <svg className="w-[16px] h-[16px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    }
  ];

  const data = metrics || defaultMetrics;

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[18px]">
      {data.map((item) => (
        <div
          key={item.id}
          className="flex flex-col gap-[14px] p-[22px] bg-white border border-[#E2E8F0] rounded-[12px] hover:shadow-sm transition-shadow"
        >
          {/* Top Row */}
          <div className="w-full flex items-center justify-between">
            <span className="text-[12px] font-semibold text-[#64748B] tracking-wider uppercase">
              {item.title}
            </span>
            <div
              className={`w-[36px] h-[36px] shrink-0 flex items-center justify-center rounded-[8px] ${item.iconBg} ${item.iconColor}`}
            >
              {item.icon}
            </div>
          </div>

          {/* Value Stack */}
          <div className="flex flex-col gap-[3px]">
            <span className="text-[28px] font-bold text-[#0F172A] leading-tight tracking-tight">
              {item.value}
            </span>
            <span className="text-[13px] text-[#94A3B8]">
              {item.unit}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

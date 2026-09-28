import React from "react";

export default function ActivityFeed({ activities }) {
  const defaultActivities = [
    {
      id: "a1",
      userAction: "Trần Minh Tâm đã tải lên tệp mới",
      target: "Milvus-Cluster-Config.yaml",
      time: "12 phút trước",
      avatarBg: "bg-[#4F46E5]",
      icon: (
        <svg className="w-[14px] h-[14px] text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
          <path d="M12 12v9" />
          <path d="m16 16-4-4-4 4" />
        </svg>
      ),
    },
    {
      id: "a2",
      userAction: "KBase AI Bot hoàn tất Index Vector 45 chunks",
      target: "Architecture-v2.pdf",
      time: "25 phút trước",
      avatarBg: "bg-[#059669]",
      icon: (
        <svg className="w-[14px] h-[14px] text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 8V4H8" />
          <rect width="16" height="12" x="4" y="8" rx="2" />
          <path d="M2 14h2" />
          <path d="M20 14h2" />
          <path d="M15 13v2" />
          <path d="M9 13v2" />
        </svg>
      ),
    },
    {
      id: "a3",
      userAction: "Lê Hoàng Nam đặt 8 câu hỏi về",
      target: "Quy trình giải nén chunk",
      time: "1 giờ trước",
      avatarBg: "bg-[#D97706]",
      icon: (
        <svg className="w-[14px] h-[14px] text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
    {
      id: "a4",
      userAction: "Nguyễn Văn A đã mời thành viên mới",
      target: "lead_dev@kbase.ai",
      time: "3 giờ trước",
      avatarBg: "bg-[#7C3AED]",
      icon: (
        <svg className="w-[14px] h-[14px] text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <line x1="19" x2="19" y1="8" y2="14" />
          <line x1="22" x2="16" y1="11" y2="11" />
        </svg>
      ),
    },
    {
      id: "a5",
      userAction: "Hệ thống MinIO sao lưu snapshot tự động",
      target: "Backup cụm Alpha (3.4 GB)",
      time: "5 giờ trước",
      avatarBg: "bg-[#0284C7]",
      icon: (
        <svg className="w-[14px] h-[14px] text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      ),
    },
  ];

  const list = activities || defaultActivities;

  return (
    <div className="w-full flex flex-col gap-[18px] p-6 lg:p-[24px] bg-white border border-[#E2E8F0] rounded-[12px] shadow-xs">
      {/* Header */}
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-[10px]">
          <svg className="w-[18px] h-[18px] text-[#4F46E5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
          <h2 className="text-[15px] font-bold text-[#0F172A]">
            Dòng thời gian hoạt động
          </h2>
        </div>
      </div>

      {/* Feed Items */}
      <div className="w-full flex flex-col gap-[16px]">
        {list.map((item) => (
          <div key={item.id} className="w-full flex items-start gap-[12px]">
            <div
              className={`w-[36px] h-[36px] shrink-0 flex items-center justify-center rounded-full ${item.avatarBg} shadow-xs`}
            >
              {item.icon}
            </div>
            <div className="flex-1 flex flex-col gap-[2px] min-w-0">
              <span className="text-[13px] font-semibold text-[#1E293B]">
                {item.userAction}
              </span>
              <span className="text-[13px] font-medium text-[#4F46E5] truncate">
                {item.target}
              </span>
              <span className="text-[12px] text-[#94A3B8]">
                {item.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

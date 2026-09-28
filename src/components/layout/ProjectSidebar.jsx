import React from "react";
import { Link } from "react-router-dom";

export default function ProjectSidebar({ activeMenu = "dashboard" }) {
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: (
        <svg className="w-[18px] h-[18px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="7" height="9" x="3" y="3" rx="1" />
          <rect width="7" height="5" x="14" y="3" rx="1" />
          <rect width="7" height="9" x="14" y="12" rx="1" />
          <rect width="7" height="5" x="3" y="16" rx="1" />
        </svg>
      ),
      path: "/dashboard",
    },
    {
      id: "documents",
      label: "Tài liệu (Documents)",
      badge: "1.4k",
      badgeColor: "bg-[#1E293B] text-[#818CF8]",
      icon: (
        <svg className="w-[18px] h-[18px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
        </svg>
      ),
      path: "/documents",
    },
    {
      id: "ai-assistant",
      label: "AI Assistant (Chatbot)",
      badge: "LIVE",
      badgeColor: "bg-[#064E3B] text-[#34D399]",
      icon: (
        <svg className="w-[18px] h-[18px] shrink-0 text-[#818CF8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 8V4H8" />
          <rect width="16" height="12" x="4" y="8" rx="2" />
          <path d="M2 14h2" />
          <path d="M20 14h2" />
          <path d="M15 13v2" />
          <path d="M9 13v2" />
        </svg>
      ),
      path: "/chat",
    },
    {
      id: "members",
      label: "Thành viên (Members)",
      icon: (
        <svg className="w-[18px] h-[18px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      path: "#",
    },
    {
      id: "settings",
      label: "Cài đặt Dự án (Settings)",
      icon: (
        <svg className="w-[18px] h-[18px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
      path: "#",
    },
  ];

  return (
    <aside className="box-border w-[260px] shrink-0 min-h-screen h-full flex flex-col justify-between p-[24px_16px] bg-[#0B0F19] text-white">
      {/* Sidebar Top Content */}
      <div className="w-full flex flex-col gap-[28px]">
        {/* Brand */}
        <Link to="/projects" className="flex items-center gap-[12px] px-[8px] no-underline">
          <div className="w-[36px] h-[36px] shrink-0 flex items-center justify-center bg-[#4F46E5] rounded-[8px] shadow-sm">
            <svg className="w-[18px] h-[18px] text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-[14px] font-bold text-white tracking-tight whitespace-nowrap">
              KBase Workspace
            </span>
            <span className="text-[11px] text-[#94A3B8] whitespace-nowrap">
              Alpha Engineering
            </span>
          </div>
        </Link>

        {/* Nav Menu */}
        <nav className="w-full flex flex-col gap-[6px]">
          {menuItems.map((item) => {
            const isActive = activeMenu === item.id;
            return (
              <a
                key={item.id}
                href={item.path}
                className={`w-full h-[40px] flex items-center justify-between px-[12px] rounded-[8px] transition-colors cursor-pointer text-[13px] ${
                  isActive
                    ? "bg-[#4F46E5] text-white font-semibold"
                    : "text-[#94A3B8] hover:bg-[#1E293B]/60 hover:text-white font-medium"
                }`}
              >
                <div className="flex items-center gap-[12px]">
                  {item.icon}
                  <span className="whitespace-nowrap">{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-semibold px-[6px] py-[2px] rounded-[10px] whitespace-nowrap ${
                      item.badgeColor || "bg-[#1E293B] text-[#818CF8]"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </a>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Bottom Content */}
      <div className="w-full flex flex-col gap-[16px]">
        {/* Storage Usage Card */}
        <div className="w-full flex flex-col gap-[10px] p-[14px] bg-[#1E293B] rounded-[10px]">
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-[6px]">
              <svg className="w-[14px] h-[14px] text-[#818CF8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" x2="2" y1="12" y2="12" />
                <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
                <line x1="6" x2="6.01" y1="16" y2="16" />
                <line x1="10" x2="10.01" y1="16" y2="16" />
              </svg>
              <span className="text-[12px] font-semibold text-[#E2E8F0] whitespace-nowrap">
                MinIO Storage
              </span>
            </div>
            <span className="text-[11px] font-semibold text-[#38BDF8] whitespace-nowrap">
              34%
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-[6px] bg-[#334155] rounded-[3px] overflow-hidden">
            <div className="w-[34%] h-full bg-[#38BDF8] rounded-[3px]" />
          </div>

          <span className="text-[11px] text-[#94A3B8] whitespace-nowrap">
            3.4 GB / 10 GB đã dùng
          </span>
        </div>

        {/* Admin Portal Button */}
        <button
          type="button"
          className="w-full h-[38px] flex items-center justify-between px-[12px] bg-[#0F172A] border border-[#334155] rounded-[8px] hover:bg-[#1E293B] transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-[8px]">
            <svg className="w-[14px] h-[14px] text-[#F59E0B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
              <path d="M12 8v4" />
              <path d="M12 16h.01" />
            </svg>
            <span className="text-[12px] font-semibold text-[#E2E8F0] whitespace-nowrap">
              Admin Portal
            </span>
          </div>
          <svg className="w-[14px] h-[14px] text-[#64748B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 7h10v10" />
            <path d="M7 17 17 7" />
          </svg>
        </button>
      </div>
    </aside>
  );
}

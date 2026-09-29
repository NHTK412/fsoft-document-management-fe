import React from "react";
import { Link } from "react-router-dom";

export default function ProjectSidebar({ activeMenu = "dashboard", projectId }) {
  const getPath = (menuId) => {
    if (projectId) {
      switch (menuId) {
        case "dashboard":
          return `/projects/${projectId}/dashboard`;
        case "documents":
          return `/projects/${projectId}/documents`;
        case "ai-assistant":
          return `/projects/${projectId}/chat`;
        case "members":
          return `/projects/${projectId}/members`;
        case "settings":
          return `/projects/${projectId}/settings`;
        default:
          return `/projects/${projectId}/dashboard`;
      }
    }
    switch (menuId) {
      case "dashboard":
        return "/dashboard";
      case "documents":
        return "/documents";
      case "ai-assistant":
        return "/chat";
      case "members":
        return "/members";
      case "settings":
        return "/settings";
      default:
        return "/projects";
    }
  };

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
      path: getPath("dashboard"),
    },
    {
      id: "documents",
      label: "Tài liệu",
      badgeColor: "bg-[#1E293B] text-[#818CF8]",
      icon: (
        <svg className="w-[18px] h-[18px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
        </svg>
      ),
      path: getPath("documents"),
    },
    {
      id: "ai-assistant",
      label: "AI Assistant",
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
      path: getPath("ai-assistant"),
    },
    {
      id: "members",
      label: "Thành viên",
      icon: (
        <svg className="w-[18px] h-[18px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      path: getPath("members"),
    },
    {
      id: "settings",
      label: "Cài đặt Dự án",
      icon: (
        <svg className="w-[18px] h-[18px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
      path: getPath("settings"),
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
              AI Knowledge Platform
            </span>
          </div>
        </Link>

        {/* Nav Menu */}
        <nav className="w-full flex flex-col gap-[6px]">
          {menuItems.map((item) => {
            const isActive = activeMenu === item.id;
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`w-full h-[40px] flex items-center justify-between px-[12px] rounded-[8px] transition-colors cursor-pointer text-[13px] no-underline ${isActive
                    ? "bg-[#4F46E5] text-white font-semibold"
                    : "text-[#94A3B8] hover:bg-[#1E293B]/60 hover:text-white font-medium"
                  }`}
              >
                <div className="flex items-center gap-[12px]">
                  {item.icon}
                  <span className="whitespace-nowrap">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Bottom Content */}
      <div className="w-full flex flex-col gap-[16px]">
        {/* Link back to all projects */}
        <Link
          to="/projects"
          className="w-full h-[36px] flex items-center justify-center gap-2 bg-[#1E293B] hover:bg-[#334155] text-slate-300 hover:text-white rounded-[8px] text-[12px] font-semibold transition-colors no-underline"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m15 18-6-6 6-6" />
          </svg>
          <span>Tất cả Dự án</span>
        </Link>
      </div>
    </aside>
  );
}

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts";

export default function AdminSidebar({ activeTab = "overview" }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Exactly 3 tabs as strictly requested
  const menuItems = [
    {
      id: "overview",
      label: "Tổng quan Hệ thống",
      path: "/admin",
      icon: (
        <svg className="w-[18px] h-[18px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="7" height="9" x="3" y="3" rx="1" />
          <rect width="7" height="5" x="14" y="3" rx="1" />
          <rect width="7" height="9" x="14" y="12" rx="1" />
          <rect width="7" height="5" x="3" y="16" rx="1" />
        </svg>
      ),
    },
    {
      id: "users",
      label: "Quản lý người dùng",
      path: "/admin/users",
      icon: (
        <svg className="w-[18px] h-[18px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      id: "projects",
      label: "Quản lý dự án",
      path: "/admin/projects",
      icon: (
        <svg className="w-[18px] h-[18px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
        </svg>
      ),
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="box-border w-[260px] shrink-0 min-h-screen h-full flex flex-col justify-between p-[24px_16px] bg-[#0B0F19] text-white border-r border-slate-800">
      {/* Sidebar Top Content */}
      <div className="w-full flex flex-col gap-[28px]">
        {/* Brand */}
        <div className="flex items-center gap-[12px] px-[8px]">
          <div className="w-[38px] h-[38px] shrink-0 flex items-center justify-center bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-[10px] shadow-md shadow-indigo-500/20">
            <svg className="w-[20px] h-[20px] text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
            </svg>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-[15px] font-bold text-white tracking-tight">
                KBase Admin
              </span>
              {/* <span className="text-[9px] font-semibold bg-indigo-500/30 text-indigo-300 border border-indigo-400/30 px-1.5 py-0.2 rounded">
                ROOT
              </span> */}
            </div>
            <span className="text-[11px] text-slate-400">
              Quản trị hệ thống
            </span>
          </div>
        </div>

        {/* Navigation Menu: 3 tabs */}
        <nav className="w-full flex flex-col gap-[6px]">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 px-3 mb-1">
            Menu Quản Trị
          </div>
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`w-full h-[42px] flex items-center px-[12px] rounded-[10px] transition-all cursor-pointer text-[13px] no-underline ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-md shadow-indigo-600/25"
                    : "text-slate-400 hover:bg-slate-800/80 hover:text-white font-medium"
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
      <div className="w-full flex flex-col gap-[12px] pt-4 border-t border-slate-800/80">
        {/* User Card */}
        <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
              {user?.fullName?.charAt(0) || user?.email?.charAt(0) || "A"}
            </div>
            <div className="min-w-0 flex flex-col">
              <span className="text-xs font-semibold text-white truncate">
                {user?.fullName || "Quản trị viên"}
              </span>
              <span className="text-[10px] text-slate-400 truncate">
                {user?.email}
              </span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            title="Đăng xuất"
            className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-950/30 rounded transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
}

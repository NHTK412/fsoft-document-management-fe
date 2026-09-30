import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts";
import { formatRole } from "@/utils/formatRole";

export default function UserHeaderDropdown({ customTrigger }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  const handleLogout = () => {
    setIsOpen(false);
    logout();
    navigate("/login");
  };

  const displayName = user?.fullName || user?.email || "Người dùng";
  const displayRole = user?.role === "ROLE_ADMIN" ? "Quản trị viên" : formatRole(user?.role || "ROLE_MEMBER");
  const userInitials = (user?.fullName?.charAt(0) || user?.email?.charAt(0) || "U").toUpperCase();

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger: User Name Pill */}
      {customTrigger ? (
        customTrigger
      ) : (
        <div
          className={`flex items-center gap-2 px-2.5 py-1.5 rounded-full border transition-all cursor-pointer select-none ${
            isOpen
              ? "bg-slate-100 border-slate-300 ring-2 ring-indigo-500/10"
              : "bg-slate-50 hover:bg-slate-100 border-slate-200"
          }`}
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white text-[11px] font-bold shrink-0 shadow-2xs">
            {user?.avatarUrl ? (
              <img src={user.avatarUrl} alt="" className="w-full h-full rounded-full object-cover" />
            ) : (
              userInitials
            )}
          </div>
          <span className="text-xs font-semibold text-slate-800 max-w-[130px] truncate hidden sm:inline">
            {displayName}
          </span>
          <svg
            className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180 text-indigo-600" : ""}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      )}

      {/* Hover Dropdown Menu */}
      <div
        className={`absolute right-0 top-full pt-2 w-64 z-50 transition-all duration-150 transform origin-top-right ${
          isOpen
            ? "opacity-100 scale-100 visible pointer-events-auto"
            : "opacity-0 scale-95 invisible pointer-events-none"
        }`}
      >
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-200 p-2 text-slate-800">
          {/* User Info Header */}
          <div className="p-2.5 mb-1 bg-slate-50/80 rounded-xl border border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-xs">
                {user?.avatarUrl ? (
                  <img src={user.avatarUrl} alt="" className="w-full h-full rounded-full object-cover" />
                ) : (
                  userInitials
                )}
              </div>
              <div className="min-w-0 flex flex-col">
                <span className="text-xs font-bold text-slate-900 truncate">
                  {displayName}
                </span>
                <span className="text-[11px] text-slate-500 font-mono truncate">
                  {user?.email}
                </span>
                <span className={`inline-block mt-1 text-[10px] font-semibold px-2 py-0.2 rounded-full w-fit ${
                  user?.role === "ROLE_ADMIN"
                    ? "bg-purple-50 text-purple-700 border border-purple-200"
                    : "bg-indigo-50 text-indigo-700 border border-indigo-200"
                }`}>
                  {displayRole}
                </span>
              </div>
            </div>
          </div>

          <div className="h-px bg-slate-100 my-1" />

          {/* Menu Items */}
          <div className="flex flex-col gap-0.5">
            {/* Thông tin cá nhân */}
            <Link
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/70 transition-colors no-underline group"
            >
              <div className="w-7 h-7 rounded-lg bg-slate-100 group-hover:bg-indigo-100/70 flex items-center justify-center text-slate-600 group-hover:text-indigo-600 transition-colors shrink-0">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-slate-800 group-hover:text-indigo-600">
                  Thông tin cá nhân
                </span>
                <span className="text-[10px] text-slate-400">
                  Hồ sơ &amp; cài đặt bảo mật
                </span>
              </div>
            </Link>

            <div className="h-px bg-slate-100 my-1" />

            {/* Đăng xuất */}
            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-red-600 hover:bg-red-50 transition-colors cursor-pointer group text-left"
            >
              <div className="w-7 h-7 rounded-lg bg-red-50 group-hover:bg-red-100 flex items-center justify-center text-red-600 transition-colors shrink-0">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-red-600">
                  Đăng xuất
                </span>
                <span className="text-[10px] text-red-400">
                  Thoát tài khoản hiện tại
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

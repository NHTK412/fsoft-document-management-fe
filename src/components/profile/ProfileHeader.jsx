import React from "react";
import { Link } from "react-router-dom";

export default function ProfileHeader({
  userName = "Nguyễn Văn A",
  onDiscard,
  onSave,
  isSaving = false,
}) {
  return (
    <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4">
      {/* Left: Breadcrumbs & Title */}
      <div className="flex flex-col gap-1">
        

        {/* Title */}
        <h1 className="text-[22px] font-bold text-[#0F172A] tracking-tight">
          Hồ Sơ &amp; Cài Đặt Cá Nhân
        </h1>

        {/* Subtitle */}
        <p className="text-[13px] text-[#64748B]">
          Quản lý thông tin định danh, tùy biến hiển thị giao diện và bảo mật tài khoản cá nhân.
        </p>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-[10px] shrink-0">
        {/* Discard Button */}
        <button
          type="button"
          onClick={onDiscard}
          className="h-[38px] px-[14px] bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#475569] text-[13px] font-medium rounded-[8px] transition-colors cursor-pointer shadow-xs"
        >
          Hủy thay đổi
        </button>

        {/* Save Button */}
        <button
          type="button"
          onClick={onSave}
          disabled={isSaving}
          className="flex items-center gap-[8px] h-[38px] px-[18px] bg-[#4F46E5] hover:bg-[#4338CA] disabled:opacity-50 text-white text-[13px] font-semibold rounded-[8px] transition-all cursor-pointer shadow-xs hover:shadow-sm"
        >
          {isSaving ? (
            <div className="w-[15px] h-[15px] border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
          <span>{isSaving ? "Đang lưu..." : "Lưu Hồ Sơ"}</span>
        </button>
      </div>
    </div>
  );
}

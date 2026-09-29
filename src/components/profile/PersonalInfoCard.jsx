import React from "react";
import { formatRole } from "@/utils/formatRole";

export default function PersonalInfoCard({
  fullName,
  setFullName,
  title,
  setTitle,
  email,
  phone,
  setPhone,
  role = "Project Admin",
  initials = "NV",
  onUploadAvatar,
  onRemoveAvatar,
}) {
  return (
    <div className="w-full bg-white border border-[#E2E8F0] rounded-[12px] p-[20px] flex flex-col gap-[16px] shadow-xs">
      {/* Avatar Section */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-[16px] border-b border-[#F1F5F9]">
        <div className="flex items-center gap-[16px]">
          {/* Big Avatar */}
          <div className="w-[64px] h-[64px] shrink-0 flex items-center justify-center bg-[#4F46E5] text-white rounded-full text-[22px] font-bold select-none shadow-sm">
            {initials}
          </div>

          {/* Details */}
          <div className="flex flex-col gap-[4px]">
            <div className="flex flex-wrap items-center gap-[8px]">
              <span className="text-[16px] font-bold text-[#0F172A]">
                {fullName}
              </span>
              <span className="px-[8px] py-[2px] bg-[#EEF2FF] border border-[#C7D2FE] rounded-[6px] text-[11px] font-semibold text-[#4F46E5]">
                {formatRole(role)}
              </span>
            </div>
            <span className="text-[12px] text-[#64748B]">
              {email} • Tham gia từ tháng 01/2026
            </span>
          </div>
        </div>

        {/* Avatar Actions */}
        <div className="flex items-center gap-[8px] self-start sm:self-auto">
          <button
            type="button"
            onClick={onUploadAvatar || (() => alert("Chọn tệp ảnh mới (JPG, PNG)"))}
            className="flex items-center gap-[6px] h-[34px] px-[12px] bg-[#F8FAFC] border border-[#CBD5E1] hover:bg-[#F1F5F9] text-[#334155] rounded-[6px] text-[12px] font-medium transition-colors cursor-pointer"
          >
            <svg className="w-[13px] h-[13px] text-[#475569]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
              <circle cx="12" cy="13" r="3" />
            </svg>
            <span>Tải ảnh đại diện</span>
          </button>
          <button
            type="button"
            onClick={onRemoveAvatar || (() => alert("Đã gỡ ảnh đại diện"))}
            className="h-[34px] px-[10px] text-[12px] text-[#94A3B8] hover:text-[#EF4444] transition-colors cursor-pointer"
          >
            Gỡ ảnh
          </button>
        </div>
      </div>

      {/* Fields 2-Col Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-[28px]">
        {/* Col 1 */}
        <div className="flex flex-col gap-[12px]">
          {/* Full Name */}
          <div className="flex flex-col gap-[4px]">
            <label className="text-[12px] font-semibold text-[#334155]">
              Họ và tên <span className="text-[#EF4444]">*</span>
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full h-[38px] px-[12px] bg-white border border-[#CBD5E1] rounded-[8px] text-[13px] text-[#0F172A] focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20 transition-all"
            />
          </div>

          {/* Title / Department */}
          <div className="flex flex-col gap-[4px]">
            <label className="text-[12px] font-semibold text-[#334155]">
              Chức danh / Phòng ban
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-[38px] px-[12px] bg-white border border-[#CBD5E1] rounded-[8px] text-[13px] text-[#0F172A] focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20 transition-all"
            />
          </div>
        </div>

        {/* Col 2 */}
        <div className="flex flex-col gap-[12px]">
          {/* Email (Readonly with Lock) */}
          <div className="flex flex-col gap-[4px]">
            <label className="text-[12px] font-semibold text-[#334155]">
              Địa chỉ Email <span className="text-[#EF4444]">*</span> (Dùng để đăng nhập)
            </label>
            <div className="w-full h-[38px] px-[12px] bg-[#F8FAFC] border border-[#E2E8F0] rounded-[8px] flex items-center justify-between select-none">
              <span className="text-[13px] text-[#64748B]">{email}</span>
              <svg className="w-[14px] h-[14px] text-[#94A3B8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-[4px]">
            <label className="text-[12px] font-semibold text-[#334155]">
              Số điện thoại liên hệ
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full h-[38px] px-[12px] bg-white border border-[#CBD5E1] rounded-[8px] text-[13px] text-[#0F172A] focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20 transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

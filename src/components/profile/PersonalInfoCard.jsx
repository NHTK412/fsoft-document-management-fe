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
    <div className="w-full bg-white border border-[#E2E8F0] rounded-[16px] p-6 sm:p-8 lg:p-9 flex flex-col gap-6 sm:gap-8 shadow-xs">
      {/* Avatar Section */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-6 sm:pb-8 border-b border-[#F1F5F9]">
        <div className="flex items-center gap-5">
          {/* Big Avatar */}
          <div className="w-[72px] h-[72px] shrink-0 flex items-center justify-center bg-[#4F46E5] text-white rounded-full text-[24px] font-bold select-none shadow-sm ring-4 ring-[#EEF2FF]">
            {initials}
          </div>

          {/* Details */}
          <div className="flex flex-col gap-1.5">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-[18px] font-bold text-[#0F172A]">
                {fullName}
              </span>
            </div>
          </div>
        </div>

        {/* Avatar Actions */}
        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            type="button"
            onClick={onUploadAvatar || (() => alert("Chọn tệp ảnh mới (JPG, PNG)"))}
            className="flex items-center gap-2 h-[38px] px-3.5 bg-[#F8FAFC] border border-[#CBD5E1] hover:bg-[#F1F5F9] text-[#334155] rounded-lg text-[13px] font-medium transition-colors cursor-pointer shadow-xs"
          >
            <svg className="w-4 h-4 text-[#475569]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
              <circle cx="12" cy="13" r="3" />
            </svg>
            <span>Tải ảnh đại diện</span>
          </button>
          <button
            type="button"
            onClick={onRemoveAvatar || (() => alert("Đã gỡ ảnh đại diện"))}
            className="h-[38px] px-3 text-[13px] text-[#94A3B8] hover:text-[#EF4444] transition-colors cursor-pointer font-medium"
          >
            Gỡ ảnh
          </button>
        </div>
      </div>

      {/* Fields 2-Col Grid */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Col 1 */}
        <div className="flex flex-col gap-5">
          {/* Full Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold text-[#334155]">
              Họ và tên <span className="text-[#EF4444]">*</span>
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full h-[42px] px-3.5 bg-white border border-[#CBD5E1] rounded-lg text-[14px] text-[#0F172A] focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20 transition-all"
            />
          </div>

          {/* Title / Department */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold text-[#334155]">
              Chức danh / Phòng ban
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-[42px] px-3.5 bg-white border border-[#CBD5E1] rounded-lg text-[14px] text-[#0F172A] focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20 transition-all"
            />
          </div>
        </div>

        {/* Col 2 */}
        <div className="flex flex-col gap-5">
          {/* Email (Readonly with Lock) */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold text-[#334155]">
              Địa chỉ Email <span className="text-[#EF4444]">*</span> (Dùng để đăng nhập)
            </label>
            <div className="w-full h-[42px] px-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg flex items-center justify-between select-none">
              <span className="text-[14px] text-[#64748B]">{email}</span>
              <svg className="w-4 h-4 text-[#94A3B8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold text-[#334155]">
              Số điện thoại liên hệ
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full h-[42px] px-3.5 bg-white border border-[#CBD5E1] rounded-lg text-[14px] text-[#0F172A] focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20 transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";

export default function MembersHeader({ onInviteClick }) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    const inviteUrl = window.location.origin + "/invite/proj-ai-core-xyz";
    navigator.clipboard?.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      {/* Title & Subtitle */}
      <div className="flex flex-col gap-1">
        <h1 className="text-[24px] font-bold text-[#0F172A] tracking-tight">
          Thành viên &amp; Phân quyền
        </h1>
        <p className="text-[14px] text-[#64748B]">
          Quản lý quyền truy cập dự án, mời đồng nghiệp và theo dõi lịch sử đóng góp.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-[10px] shrink-0">
        {/* Copy Invite Link */}
        <button
          type="button"
          onClick={handleCopyLink}
          className="relative flex items-center gap-[8px] h-[42px] px-[16px] bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#334155] rounded-[8px] transition-colors cursor-pointer shadow-xs text-[14px] font-medium"
        >
          {copied ? (
            <>
              <svg className="w-[15px] h-[15px] text-[#059669]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-[#059669] font-semibold">Đã sao chép link!</span>
            </>
          ) : (
            <>
              <svg className="w-[15px] h-[15px] text-[#334155]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 17H7A5 5 0 0 1 7 7h2" />
                <path d="M15 7h2a5 5 0 1 1 0 10h-2" />
                <line x1="8" x2="16" y1="12" y2="12" />
              </svg>
              <span>Sao chép link mời</span>
            </>
          )}
        </button>

        {/* Invite Member Button */}
        <button
          type="button"
          onClick={onInviteClick}
          className="flex items-center gap-[8px] h-[42px] px-[18px] bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-[8px] transition-all cursor-pointer shadow-xs hover:shadow-sm text-[14px] font-semibold"
        >
          <svg className="w-[16px] h-[16px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <line x1="19" x2="19" y1="8" y2="14" />
            <line x1="22" x2="16" y1="11" y2="11" />
          </svg>
          <span>Mời thành viên mới</span>
        </button>
      </div>
    </div>
  );
}

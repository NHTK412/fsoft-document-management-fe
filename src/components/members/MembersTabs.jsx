import React from "react";

export default function MembersTabs({
  activeTab = "current",
  onTabChange,
  currentCount = 12,
  pendingCount = 3,
}) {
  return (
    <div className="w-full h-[46px] shrink-0 flex items-center gap-[24px] border-b border-[#E2E8F0]">
      {/* Current Members Tab */}
      <button
        type="button"
        onClick={() => onTabChange("current")}
        className={`h-full flex items-center gap-[6px] transition-colors cursor-pointer text-[14px] relative ${
          activeTab === "current"
            ? "text-[#4F46E5] font-bold border-b-2 border-[#4F46E5] -mb-[1px]"
            : "text-[#64748B] hover:text-[#0F172A] font-medium"
        }`}
      >
        <span>Thành viên hiện tại ({currentCount})</span>
      </button>

      {/* Pending Invites Tab */}
      <button
        type="button"
        onClick={() => onTabChange("pending")}
        className={`h-full flex items-center gap-[6px] transition-colors cursor-pointer text-[14px] relative ${
          activeTab === "pending"
            ? "text-[#4F46E5] font-bold border-b-2 border-[#4F46E5] -mb-[1px]"
            : "text-[#64748B] hover:text-[#0F172A] font-medium"
        }`}
      >
        <span>Lời mời đang chờ ({pendingCount})</span>
      </button>
    </div>
  );
}

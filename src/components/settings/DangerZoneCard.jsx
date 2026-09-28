import React from "react";

export default function DangerZoneCard({
  onTransferOwnership,
  onArchiveProject,
  onDeleteProject,
}) {
  return (
    <div className="w-full bg-[#FFF5F5] border border-[#FED7D7] rounded-[12px] p-6 lg:p-[24px] flex flex-col gap-[18px] shadow-xs">
      {/* Header */}
      <div className="flex items-center gap-[10px]">
        <div className="w-[32px] h-[32px] shrink-0 flex items-center justify-center bg-[#FEE2E2] rounded-[8px] text-[#EF4444]">
          <svg className="w-[17px] h-[17px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>
        <div className="flex flex-col">
          <span className="text-[15px] font-bold text-[#991B1B]">
            Vùng Nguy Hiểm (Danger Zone)
          </span>
          <span className="text-[12px] text-[#B91C1C]">
            Thao tác không thể hoàn tác, vui lòng thận trọng!
          </span>
        </div>
      </div>

      {/* Action 1: Transfer */}
      <div className="w-full flex items-center justify-between gap-3 pt-1">
        <div className="flex flex-col gap-[2px]">
          <span className="text-[13px] font-semibold text-[#7F1D1D]">
            Chuyển nhượng quyền sở hữu (Transfer)
          </span>
          <span className="text-[12px] text-[#991B1B]">
            Bàn giao quyền Project Owner cho thành viên khác.
          </span>
        </div>
        <button
          type="button"
          onClick={onTransferOwnership}
          className="shrink-0 h-[34px] px-[14px] bg-white border border-[#FCA5A5] hover:bg-[#FEF2F2] text-[#B91C1C] text-[12px] font-semibold rounded-[6px] transition-colors cursor-pointer"
        >
          Chuyển nhượng
        </button>
      </div>

      {/* Action 2: Archive */}
      <div className="w-full flex items-center justify-between gap-3 pt-1">
        <div className="flex flex-col gap-[2px]">
          <span className="text-[13px] font-semibold text-[#7F1D1D]">
            Lưu trữ dự án (Archive Project)
          </span>
          <span className="text-[12px] text-[#991B1B]">
            Chuyển sang chế độ chỉ đọc. Đóng băng dữ liệu.
          </span>
        </div>
        <button
          type="button"
          onClick={onArchiveProject}
          className="shrink-0 h-[34px] px-[14px] bg-white border border-[#FCA5A5] hover:bg-[#FEF2F2] text-[#B91C1C] text-[12px] font-semibold rounded-[6px] transition-colors cursor-pointer"
        >
          Lưu trữ
        </button>
      </div>

      {/* Action 3: Delete Project */}
      <div className="w-full flex items-center justify-between gap-3 pt-1">
        <div className="flex flex-col gap-[2px]">
          <span className="text-[13px] font-bold text-[#991B1B]">
            Xóa vĩnh viễn dự án (Delete Project)
          </span>
          <span className="text-[12px] text-[#B91C1C]">
            Xóa sạch toàn bộ tệp MinIO và vector. Không thể khôi phục.
          </span>
        </div>
        <button
          type="button"
          onClick={onDeleteProject}
          className="shrink-0 h-[34px] px-[14px] bg-[#EF4444] hover:bg-[#DC2626] text-white text-[12px] font-bold rounded-[6px] transition-colors cursor-pointer shadow-xs"
        >
          Xóa Dự Án
        </button>
      </div>
    </div>
  );
}

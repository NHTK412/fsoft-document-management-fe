import React from "react";

export default function ActiveSessionsCard({
  sessions = [],
  onRevokeSession,
  onRevokeAllOther,
}) {
  return (
    <div className="w-full bg-white border border-[#E2E8F0] rounded-[12px] p-[20px] flex flex-col gap-[14px] shadow-xs">
      {/* Header */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
        <div className="flex items-center gap-[10px]">
          <div className="w-[28px] h-[28px] shrink-0 flex items-center justify-center bg-[#DCFCE7] rounded-[6px] text-[#16A34A]">
            <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
          <div>
            <h3 className="text-[14px] font-semibold text-[#0F172A]">
              Các Phiên Đăng Nhập Đang Hoạt Động (Active Sessions)
            </h3>
            <p className="text-[11px] text-[#64748B]">
              Danh sách thiết bị và địa chỉ IP đang duy trì kết nối tới tài khoản của bạn.
            </p>
          </div>
        </div>

        {/* Revoke All Others Button */}
        <button
          type="button"
          onClick={onRevokeAllOther}
          className="flex items-center gap-[6px] h-[32px] px-[12px] bg-[#FEE2E2] border border-[#FCA5A5] hover:bg-[#FEE2E2]/80 text-[#DC2626] rounded-[6px] text-[12px] font-semibold transition-colors cursor-pointer self-start sm:self-auto"
        >
          <svg className="w-[13px] h-[13px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" x2="9" y1="12" y2="12" />
          </svg>
          <span>Đăng xuất khỏi tất cả thiết bị khác</span>
        </button>
      </div>

      {/* Sessions List */}
      <div className="w-full flex flex-col gap-[8px]">
        {sessions.map((session) => (
          <div
            key={session.id}
            className={`w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-[10px_14px] rounded-[8px] transition-colors ${
              session.isCurrent
                ? "bg-[#F0FDF4] border border-[#BBF7D0]"
                : "bg-[#F8FAFC] border border-[#E2E8F0]"
            }`}
          >
            {/* Device Info */}
            <div className="flex items-center gap-[12px]">
              <div
                className={`w-[32px] h-[32px] shrink-0 flex items-center justify-center rounded-[6px] ${
                  session.isCurrent ? "bg-[#DCFCE7] text-[#16A34A]" : "bg-[#E2E8F0] text-[#64748B]"
                }`}
              >
                {session.deviceType === "desktop" ? (
                  <svg className="w-[16px] h-[16px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="14" x="2" y="3" rx="2" />
                    <line x1="8" x2="16" y1="21" y2="21" />
                    <line x1="12" x2="12" y1="17" y2="21" />
                  </svg>
                ) : (
                  <svg className="w-[16px] h-[16px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                    <line x1="12" x2="12.01" y1="18" y2="18" />
                  </svg>
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-semibold text-[#1E293B]">
                  {session.deviceName}
                </span>
                <span className="text-[11px] text-[#64748B]">
                  {session.location} • IP: {session.ip}
                  {session.lastActive && ` • ${session.lastActive}`}
                </span>
              </div>
            </div>

            {/* Action / Status */}
            <div>
              {session.isCurrent ? (
                <div className="px-[10px] py-[4px] bg-[#DCFCE7] rounded-full text-[11px] font-semibold text-[#15803D]">
                  🟢 Thiết bị này (Hiện tại)
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => onRevokeSession(session.id)}
                  className="h-[28px] px-[10px] bg-white border border-[#CBD5E1] hover:bg-[#FEF2F2] hover:border-[#FCA5A5] text-[#DC2626] text-[11px] font-medium rounded-[6px] transition-colors cursor-pointer"
                >
                  Đăng xuất
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

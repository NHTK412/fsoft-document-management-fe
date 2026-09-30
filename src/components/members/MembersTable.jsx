import React, { useState, useEffect } from "react";
import { formatRole } from "@/utils/formatRole";
import { formatDate } from "@/utils/formatDate";

export default function MembersTable({
  activeTab = "current",
  members = [],
  pendingInvites = [],
  onChangeRole,
  onRemoveMember,
  onResendInvite,
  onCancelInvite,
}) {
  const [dropdownState, setDropdownState] = useState(null); // { id, member, top, right, openUpward }

  const toggleDropdown = (e, member) => {
    e.stopPropagation();
    if (dropdownState && dropdownState.id === member.id) {
      setDropdownState(null);
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const openUpward = spaceBelow < 180;
    setDropdownState({
      id: member.id,
      member,
      top: openUpward ? rect.top - 6 : rect.bottom + 6,
      right: Math.max(16, window.innerWidth - rect.right),
      openUpward,
    });
  };

  const closeDropdown = () => setDropdownState(null);

  useEffect(() => {
    if (!dropdownState) return;
    const handleScrollOrResize = () => setDropdownState(null);
    window.addEventListener("scroll", handleScrollOrResize, true);
    window.addEventListener("resize", handleScrollOrResize);
    return () => {
      window.removeEventListener("scroll", handleScrollOrResize, true);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, [dropdownState]);

  return (
    <div className="w-full bg-white border border-[#E2E8F0] rounded-[12px] overflow-hidden shadow-xs">
      <div className="overflow-x-auto min-h-[140px]">
        <div className="min-w-[960px]">
          {activeTab === "current" ? (
            /* Current Members Table */
            <>
              {/* Table Header */}
              <div className="w-full h-[46px] flex items-center px-[22px] bg-[#F8FAFC] border-b border-[#E2E8F0] text-[12px] font-bold text-[#64748B] tracking-wider select-none">
                <div className="flex-1 min-w-[280px]">THÀNH VIÊN</div>
                <div className="w-[180px] shrink-0">VAI TRÒ</div>
                <div className="w-[160px] shrink-0">NGÀY THAM GIA</div>
                <div className="w-[160px] shrink-0">ĐÃ ĐÓNG GÓP</div>
                <div className="w-[140px] shrink-0 text-right pr-2">THAO TÁC</div>
              </div>

              {/* Rows */}
              <div className="divide-y divide-[#F1F5F9]">
                {members.length === 0 ? (
                  <div className="py-12 text-center text-[#64748B] text-[14px]">
                    Chưa có thành viên nào trong danh sách.
                  </div>
                ) : (
                  members.map((member) => (
                    <div
                      key={member.id}
                      className="w-full h-[62px] flex items-center px-[22px] hover:bg-[#F8FAFC]/80 transition-colors"
                    >
                      {/* Column 1: Member Avatar & Info */}
                      <div className="flex-1 min-w-[280px] flex items-center gap-[14px]">
                        {member.avatarUrl ? (
                          <img
                            src={member.avatarUrl}
                            alt={member.name}
                            className="w-[38px] h-[38px] shrink-0 rounded-full object-cover shadow-xs border border-slate-200 bg-slate-50"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                          />
                        ) : (
                          <div
                            className="w-[38px] h-[38px] shrink-0 flex items-center justify-center text-white text-[13px] font-bold rounded-full select-none shadow-xs"
                            style={{ backgroundColor: member.avatarBg || "#4F46E5" }}
                          >
                            {member.initial || member.name.charAt(0)}
                          </div>
                        )}
                        <div className="flex flex-col gap-[2px] min-w-0">
                          <span className="text-[14px] font-semibold text-[#0F172A] truncate">
                            {member.name}
                          </span>
                          <span className="text-[12px] text-[#64748B] truncate">
                            {member.email}
                          </span>
                        </div>
                      </div>

                      {/* Column 2: Role Pill */}
                      <div className="w-[180px] shrink-0 flex items-center">
                        <span
                          className={`inline-flex items-center px-[10px] py-[4px] rounded-full text-[12px] font-bold ${
                            (member.role || '').toUpperCase().includes('OWNER')
                              ? "bg-[#ECFDF5] text-[#059669]"
                              : (member.role || '').toUpperCase().includes('ADMIN')
                              ? "bg-[#FEF3C7] text-[#D97706]"
                              : "bg-[#EEF2FF] text-[#4F46E5]"
                          }`}
                        >
                          {formatRole(member.role)}
                        </span>
                      </div>

                      {/* Column 3: Joined Date */}
                      <div className="w-[160px] shrink-0 text-[13px] text-[#475569] font-normal">
                        {formatDate(member.joinedDate)}
                      </div>

                      {/* Column 4: Contributions */}
                      <div className="w-[160px] shrink-0 text-[13px] text-[#475569] font-medium">
                        {member.contributions}
                      </div>

                      {/* Column 5: Actions */}
                      <div className="w-[140px] shrink-0 flex items-center justify-end gap-[8px] relative">
                        {/* Change Role Button */}
                        <button
                          type="button"
                          onClick={() => onChangeRole && onChangeRole(member)}
                          className="h-[32px] px-[10px] bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#334155] text-[12px] font-medium rounded-[6px] transition-colors cursor-pointer"
                        >
                          Đổi vai trò
                        </button>

                        {/* More Horizontal Button */}
                        <div>
                          <button
                            type="button"
                            onClick={(e) => toggleDropdown(e, member)}
                            className={`w-[32px] h-[32px] flex items-center justify-center rounded-[6px] transition-colors cursor-pointer ${
                              dropdownState?.id === member.id
                                ? "bg-[#E2E8F0] text-[#1E293B]"
                                : "bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#64748B]"
                            }`}
                          >
                            <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="1" />
                              <circle cx="19" cy="12" r="1" />
                              <circle cx="5" cy="12" r="1" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          ) : (
            /* Pending Invitations Table */
            <>
              {/* Table Header */}
              <div className="w-full h-[46px] flex items-center px-[22px] bg-[#F8FAFC] border-b border-[#E2E8F0] text-[12px] font-bold text-[#64748B] tracking-wider select-none">
                <div className="flex-1 min-w-[280px]">EMAIL ĐƯỢC MỜI</div>
                <div className="w-[180px] shrink-0">VAI TRÒ DỰ KIẾN</div>
                <div className="w-[160px] shrink-0">NGÀY GỬI LỜI MỜI</div>
                <div className="w-[160px] shrink-0">TRẠNG THÁI</div>
                <div className="w-[160px] shrink-0 text-right pr-2">THAO TÁC</div>
              </div>

              {/* Rows */}
              <div className="divide-y divide-[#F1F5F9]">
                {pendingInvites.length === 0 ? (
                  <div className="py-12 text-center text-[#64748B] text-[14px]">
                    Không có lời mời nào đang chờ xử lý.
                  </div>
                ) : (
                  pendingInvites.map((invite) => (
                    <div
                      key={invite.id}
                      className="w-full h-[62px] flex items-center px-[22px] hover:bg-[#F8FAFC]/80 transition-colors"
                    >
                      {/* Column 1: Email */}
                      <div className="flex-1 min-w-[280px] flex items-center gap-[14px]">
                        <div className="w-[38px] h-[38px] shrink-0 flex items-center justify-center bg-[#F1F5F9] text-[#64748B] rounded-full text-[13px] font-semibold select-none shadow-2xs">
                          <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="20" height="16" x="2" y="4" rx="2" />
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                          </svg>
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[14px] font-semibold text-[#0F172A] truncate">
                            {invite.email}
                          </span>
                          <span className="text-[12px] text-[#94A3B8]">
                            Hết hạn trong {invite.expiresIn || "7 ngày"}
                          </span>
                        </div>
                      </div>

                      {/* Column 2: Role */}
                      <div className="w-[180px] shrink-0 flex items-center">
                        <span className="inline-flex items-center px-[10px] py-[4px] rounded-full text-[12px] font-bold bg-[#EEF2FF] text-[#4F46E5]">
                          {formatRole(invite.role)}
                        </span>
                      </div>

                      {/* Column 3: Sent Date */}
                      <div className="w-[160px] shrink-0 text-[13px] text-[#475569]">
                        {formatDate(invite.sentDate)}
                      </div>

                      {/* Column 4: Status */}
                      <div className="w-[160px] shrink-0 flex items-center">
                        <span className="inline-flex items-center gap-1.5 px-[10px] py-[4px] rounded-full text-[12px] font-medium bg-[#FEF3C7] text-[#B45309]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse" />
                          Đang chờ
                        </span>
                      </div>

                      {/* Column 5: Actions */}
                      <div className="w-[160px] shrink-0 flex items-center justify-end gap-[8px]">
                        <button
                          type="button"
                          onClick={() => onResendInvite && onResendInvite(invite.id)}
                          className="h-[32px] px-[10px] bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#334155] text-[12px] font-medium rounded-[6px] transition-colors cursor-pointer"
                        >
                          Gửi lại
                        </button>
                        <button
                          type="button"
                          onClick={() => onCancelInvite && onCancelInvite(invite.id)}
                          className="h-[32px] px-[10px] bg-[#FEF2F2] hover:bg-[#FEE2E2] text-[#EF4444] text-[12px] font-medium rounded-[6px] transition-colors cursor-pointer"
                        >
                          Huỷ lời mời
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Fixed Dropdown Menu (Outside scroll/overflow containers) */}
      {dropdownState && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={closeDropdown}
          />
          <div
            className="fixed w-[185px] bg-white border border-[#E2E8F0] rounded-[10px] shadow-2xl py-1.5 z-50 text-[13px] text-[#334155] animate-in fade-in zoom-in-95 duration-100"
            style={{
              top: dropdownState.openUpward ? undefined : `${dropdownState.top}px`,
              bottom: dropdownState.openUpward ? `${window.innerHeight - dropdownState.top}px` : undefined,
              right: `${dropdownState.right}px`,
            }}
          >
            <button
              type="button"
              onClick={() => {
                const m = dropdownState.member;
                closeDropdown();
                onChangeRole && onChangeRole(m);
              }}
              className="w-full text-left px-3.5 py-2 hover:bg-[#F8FAFC] text-[#1E293B] font-medium transition-colors cursor-pointer flex items-center gap-2"
            >
              <svg className="w-4 h-4 text-[#64748B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M19 8v6m3-3h-6" />
              </svg>
              <span>Đổi quyền hạn</span>
            </button>
            <button
              type="button"
              onClick={() => {
                const m = dropdownState.member;
                closeDropdown();
                alert(`Xem hoạt động của ${m.name}`);
              }}
              className="w-full text-left px-3.5 py-2 hover:bg-[#F8FAFC] text-[#1E293B] font-medium transition-colors cursor-pointer flex items-center gap-2"
            >
              <svg className="w-4 h-4 text-[#64748B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>Lịch sử đóng góp</span>
            </button>
            {!((dropdownState.member?.role || '').toUpperCase().includes('OWNER')) && (
              <button
                type="button"
                onClick={() => {
                  const m = dropdownState.member;
                  closeDropdown();
                  if (confirm(`Bạn có chắc muốn xoá ${m.name} khỏi dự án?`)) {
                    onRemoveMember && onRemoveMember(m.id);
                  }
                }}
                className="w-full text-left px-3.5 py-2 text-[#EF4444] hover:bg-[#FEF2F2] font-medium transition-colors cursor-pointer flex items-center gap-2 border-t border-[#F1F5F9] mt-1 pt-2"
              >
                <svg className="w-4 h-4 text-[#EF4444]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
                <span>Xoá khỏi dự án</span>
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

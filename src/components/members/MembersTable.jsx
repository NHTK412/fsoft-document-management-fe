import React, { useState } from "react";

export default function MembersTable({
  activeTab = "current",
  members = [],
  pendingInvites = [],
  onChangeRole,
  onRemoveMember,
  onResendInvite,
  onCancelInvite,
}) {
  const [activeDropdownId, setActiveDropdownId] = useState(null);

  const toggleDropdown = (id) => {
    setActiveDropdownId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full bg-white border border-[#E2E8F0] rounded-[12px] overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <div className="min-w-[960px]">
          {activeTab === "current" ? (
            /* Current Members Table */
            <>
              {/* Table Header */}
              <div className="w-full h-[42px] flex items-center px-[20px] bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#64748B] tracking-wider select-none">
                <div className="w-[380px] shrink-0">THÀNH VIÊN</div>
                <div className="w-[180px] shrink-0">VAI TRÒ</div>
                <div className="w-[160px] shrink-0">NGÀY THAM GIA</div>
                <div className="w-[160px] shrink-0">ĐÃ ĐÓNG GÓP</div>
                <div className="flex-1 text-right">THAO TÁC</div>
              </div>

              {/* Rows */}
              <div className="divide-y divide-[#F1F5F9]">
                {members.length === 0 ? (
                  <div className="py-12 text-center text-[#64748B] text-[13px]">
                    Chưa có thành viên nào trong danh sách.
                  </div>
                ) : (
                  members.map((member) => (
                    <div
                      key={member.id}
                      className="w-full h-[56px] flex items-center px-[20px] hover:bg-[#F8FAFC]/80 transition-colors"
                    >
                      {/* Column 1: Member Avatar & Info */}
                      <div className="w-[380px] shrink-0 flex items-center gap-[12px]">
                        <div
                          className="w-[34px] h-[34px] shrink-0 flex items-center justify-center text-white text-[12px] font-bold rounded-full select-none shadow-xs"
                          style={{ backgroundColor: member.avatarBg || "#4F46E5" }}
                        >
                          {member.initial || member.name.charAt(0)}
                        </div>
                        <div className="flex flex-col gap-[2px] min-w-0">
                          <span className="text-[13px] font-semibold text-[#0F172A] truncate">
                            {member.name}
                          </span>
                          <span className="text-[11px] text-[#64748B] truncate">
                            {member.email}
                          </span>
                        </div>
                      </div>

                      {/* Column 2: Role Pill */}
                      <div className="w-[180px] shrink-0 flex items-center">
                        <span
                          className={`inline-flex items-center px-[8px] py-[3px] rounded-full text-[11px] font-bold ${
                            member.role === "Project Owner"
                              ? "bg-[#ECFDF5] text-[#059669]"
                              : member.role === "Admin"
                              ? "bg-[#FEF3C7] text-[#D97706]"
                              : "bg-[#EEF2FF] text-[#4F46E5]"
                          }`}
                        >
                          {member.role}
                        </span>
                      </div>

                      {/* Column 3: Joined Date */}
                      <div className="w-[160px] shrink-0 text-[12px] text-[#475569] font-normal">
                        {member.joinedDate}
                      </div>

                      {/* Column 4: Contributions */}
                      <div className="w-[160px] shrink-0 text-[12px] text-[#475569] font-medium">
                        {member.contributions}
                      </div>

                      {/* Column 5: Actions */}
                      <div className="flex-1 flex items-center justify-end gap-[8px] relative">
                        {/* Change Role Button */}
                        <button
                          type="button"
                          onClick={() => onChangeRole && onChangeRole(member)}
                          className="px-[8px] py-[4px] bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#334155] text-[11px] font-medium rounded-[4px] transition-colors cursor-pointer"
                        >
                          Đổi vai trò
                        </button>

                        {/* More Horizontal Button & Dropdown */}
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => toggleDropdown(member.id)}
                            className="w-[28px] h-[28px] flex items-center justify-center bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#64748B] rounded-[4px] transition-colors cursor-pointer"
                          >
                            <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="1" />
                              <circle cx="19" cy="12" r="1" />
                              <circle cx="5" cy="12" r="1" />
                            </svg>
                          </button>

                          {activeDropdownId === member.id && (
                            <>
                              <div
                                className="fixed inset-0 z-10"
                                onClick={() => setActiveDropdownId(null)}
                              />
                              <div className="absolute right-0 top-full mt-1 w-[160px] bg-white border border-[#E2E8F0] rounded-[8px] shadow-lg py-1 z-20 text-[12px] text-[#334155]">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setActiveDropdownId(null);
                                    onChangeRole && onChangeRole(member);
                                  }}
                                  className="w-full text-left px-3 py-1.5 hover:bg-[#F8FAFC] transition-colors cursor-pointer"
                                >
                                  Đổi quyền hạn
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setActiveDropdownId(null);
                                    alert(`Xem hoạt động của ${member.name}`);
                                  }}
                                  className="w-full text-left px-3 py-1.5 hover:bg-[#F8FAFC] transition-colors cursor-pointer"
                                >
                                  Xem lịch sử đóng góp
                                </button>
                                {member.role !== "Project Owner" && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setActiveDropdownId(null);
                                      if (confirm(`Bạn có chắc muốn xoá ${member.name} khỏi dự án?`)) {
                                        onRemoveMember && onRemoveMember(member.id);
                                      }
                                    }}
                                    className="w-full text-left px-3 py-1.5 text-[#EF4444] hover:bg-[#FEF2F2] transition-colors cursor-pointer"
                                  >
                                    Xoá khỏi dự án
                                  </button>
                                )}
                              </div>
                            </>
                          )}
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
              <div className="w-full h-[42px] flex items-center px-[20px] bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#64748B] tracking-wider select-none">
                <div className="w-[380px] shrink-0">EMAIL ĐƯỢC MỜI</div>
                <div className="w-[180px] shrink-0">VAI TRÒ DỰ KIẾN</div>
                <div className="w-[160px] shrink-0">NGÀY GỬI LỜI MỜI</div>
                <div className="w-[160px] shrink-0">TRẠNG THÁI</div>
                <div className="flex-1 text-right">THAO TÁC</div>
              </div>

              {/* Rows */}
              <div className="divide-y divide-[#F1F5F9]">
                {pendingInvites.length === 0 ? (
                  <div className="py-12 text-center text-[#64748B] text-[13px]">
                    Không có lời mời nào đang chờ xử lý.
                  </div>
                ) : (
                  pendingInvites.map((invite) => (
                    <div
                      key={invite.id}
                      className="w-full h-[56px] flex items-center px-[20px] hover:bg-[#F8FAFC]/80 transition-colors"
                    >
                      {/* Column 1: Email */}
                      <div className="w-[380px] shrink-0 flex items-center gap-[12px]">
                        <div className="w-[34px] h-[34px] shrink-0 flex items-center justify-center bg-[#F1F5F9] text-[#64748B] rounded-full text-[13px] font-semibold select-none">
                          <svg className="w-[16px] h-[16px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="20" height="16" x="2" y="4" rx="2" />
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                          </svg>
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[13px] font-semibold text-[#0F172A] truncate">
                            {invite.email}
                          </span>
                          <span className="text-[11px] text-[#94A3B8]">
                            Hết hạn trong {invite.expiresIn || "7 ngày"}
                          </span>
                        </div>
                      </div>

                      {/* Column 2: Role */}
                      <div className="w-[180px] shrink-0 flex items-center">
                        <span className="inline-flex items-center px-[8px] py-[3px] rounded-full text-[11px] font-bold bg-[#EEF2FF] text-[#4F46E5]">
                          {invite.role}
                        </span>
                      </div>

                      {/* Column 3: Sent Date */}
                      <div className="w-[160px] shrink-0 text-[12px] text-[#475569]">
                        {invite.sentDate}
                      </div>

                      {/* Column 4: Status */}
                      <div className="w-[160px] shrink-0 flex items-center">
                        <span className="inline-flex items-center gap-1.5 px-[8px] py-[3px] rounded-full text-[11px] font-medium bg-[#FEF3C7] text-[#B45309]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse" />
                          Đang chờ
                        </span>
                      </div>

                      {/* Column 5: Actions */}
                      <div className="flex-1 flex items-center justify-end gap-[8px]">
                        <button
                          type="button"
                          onClick={() => onResendInvite && onResendInvite(invite.id)}
                          className="px-[8px] py-[4px] bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#334155] text-[11px] font-medium rounded-[4px] transition-colors cursor-pointer"
                        >
                          Gửi lại
                        </button>
                        <button
                          type="button"
                          onClick={() => onCancelInvite && onCancelInvite(invite.id)}
                          className="px-[8px] py-[4px] bg-[#FEF2F2] hover:bg-[#FEE2E2] text-[#EF4444] text-[11px] font-medium rounded-[4px] transition-colors cursor-pointer"
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
    </div>
  );
}

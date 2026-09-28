import React, { useState, useEffect } from "react";

export default function ChangeRoleModal({ isOpen, onClose, member, onSaveRole }) {
  const [selectedRole, setSelectedRole] = useState("Member");

  useEffect(() => {
    if (member) {
      setSelectedRole(member.role || "Member");
    }
  }, [member]);

  if (!isOpen || !member) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveRole(member.id, selectedRole);
    onClose();
  };

  const roles = [
    {
      id: "Project Owner",
      title: "Project Owner (Chủ dự án)",
      desc: "Toàn quyền quản trị tài liệu, thành viên, cấu hình và xóa dự án.",
      badge: "bg-[#ECFDF5] text-[#059669]",
    },
    {
      id: "Member",
      title: "Member (Thành viên)",
      desc: "Có thể tải lên, xem, gắn thẻ và chat hỏi đáp AI với các tài liệu trong dự án.",
      badge: "bg-[#EEF2FF] text-[#4F46E5]",
    },
    {
      id: "Viewer",
      title: "Viewer (Chỉ xem)",
      desc: "Chỉ có quyền đọc tài liệu và tương tác chatbot, không thể sửa đổi hoặc tải lên.",
      badge: "bg-[#F1F5F9] text-[#64748B]",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-[460px] bg-white rounded-[16px] shadow-2xl border border-[#E2E8F0] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E2E8F0]">
          <div>
            <h3 className="text-[16px] font-bold text-[#0F172A]">Thay đổi vai trò</h3>
            <p className="text-[12px] text-[#64748B] mt-0.5">
              Cập nhật quyền hạn cho <span className="font-semibold text-[#0F172A]">{member.name}</span>
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-[#94A3B8] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-2.5">
            {roles.map((r) => {
              const isSelected = selectedRole === r.id;
              return (
                <label
                  key={r.id}
                  className={`flex items-start gap-3.5 p-3.5 border rounded-xl cursor-pointer transition-all ${
                    isSelected
                      ? "border-[#4F46E5] bg-[#EEF2FF]/40 ring-1 ring-[#4F46E5]"
                      : "border-[#E2E8F0] hover:bg-[#F8FAFC]"
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value={r.id}
                    checked={isSelected}
                    onChange={() => setSelectedRole(r.id)}
                    className="mt-1 text-[#4F46E5] focus:ring-[#4F46E5]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] font-bold text-[#0F172A]">{r.title}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${r.badge}`}>
                        {r.id}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#64748B] mt-1 leading-relaxed">{r.desc}</p>
                  </div>
                </label>
              );
            })}
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#E2E8F0]">
            <button
              type="button"
              onClick={onClose}
              className="h-9 px-4 text-[13px] font-medium text-[#475569] hover:bg-[#F1F5F9] rounded-lg transition-colors cursor-pointer"
            >
              Huỷ
            </button>
            <button
              type="submit"
              className="h-9 px-5 bg-[#4F46E5] hover:bg-[#4338CA] text-white text-[13px] font-semibold rounded-lg transition-colors shadow-xs cursor-pointer"
            >
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

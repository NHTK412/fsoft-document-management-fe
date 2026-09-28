import React, { useState } from "react";

export default function InviteMemberModal({ isOpen, onClose, onInvite }) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Member");
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    onInvite({ email: email.trim(), role, message });
    setEmail("");
    setMessage("");
    setRole("Member");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-[480px] bg-white rounded-[16px] shadow-2xl border border-[#E2E8F0] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] flex items-center justify-center text-[#4F46E5]">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <line x1="19" x2="19" y1="8" y2="14" />
                <line x1="22" x2="16" y1="11" y2="11" />
              </svg>
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-[#0F172A]">Mời thành viên mới</h3>
              <p className="text-[12px] text-[#64748B]">Gửi lời mời tham gia dự án qua email</p>
            </div>
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
          {/* Email Input */}
          <div className="space-y-1.5">
            <label className="block text-[12px] font-semibold text-[#334155]">
              Địa chỉ Email <span className="text-[#EF4444]">*</span>
            </label>
            <input
              type="email"
              required
              placeholder="dongnghiep@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-10 px-3.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg text-[13px] text-[#0F172A] placeholder-[#94A3B8] focus:bg-white focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20 transition-all"
            />
          </div>

          {/* Role Select */}
          <div className="space-y-1.5">
            <label className="block text-[12px] font-semibold text-[#334155]">
              Vai trò trong dự án
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRole("Member")}
                className={`p-3 border rounded-xl text-left cursor-pointer transition-all ${
                  role === "Member"
                    ? "border-[#4F46E5] bg-[#EEF2FF]/50 ring-1 ring-[#4F46E5]"
                    : "border-[#E2E8F0] hover:bg-[#F8FAFC]"
                }`}
              >
                <div className="text-[12px] font-bold text-[#0F172A]">Thành viên (Member)</div>
                <div className="text-[11px] text-[#64748B] mt-0.5">Upload, xem và hỏi AI trên tài liệu</div>
              </button>

              <button
                type="button"
                onClick={() => setRole("Project Owner")}
                className={`p-3 border rounded-xl text-left cursor-pointer transition-all ${
                  role === "Project Owner"
                    ? "border-[#4F46E5] bg-[#EEF2FF]/50 ring-1 ring-[#4F46E5]"
                    : "border-[#E2E8F0] hover:bg-[#F8FAFC]"
                }`}
              >
                <div className="text-[12px] font-bold text-[#0F172A]">Quản trị (Owner)</div>
                <div className="text-[11px] text-[#64748B] mt-0.5">Toàn quyền quản lý thành viên & cài đặt</div>
              </button>
            </div>
          </div>

          {/* Custom Message */}
          <div className="space-y-1.5">
            <label className="block text-[12px] font-semibold text-[#334155]">
              Lời nhắn (tuỳ chọn)
            </label>
            <textarea
              rows={2}
              placeholder="Chào bạn, mời bạn cùng tham gia làm việc trên dự án tài liệu này..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg text-[13px] text-[#0F172A] placeholder-[#94A3B8] focus:bg-white focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20 transition-all resize-none"
            />
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
              Gửi lời mời
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

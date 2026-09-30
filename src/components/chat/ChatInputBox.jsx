import React, { useState } from "react";

export default function ChatInputBox({ onSendMessage, onAttachFile }) {
  const [inputText, setInputText] = useState("");

  const promptStarters = [
    {
      id: "p1",
      text: "Tóm tắt tài liệu đặc tả dự án",
      icon: (
        <svg className="w-[11px] h-[11px] text-[#4F46E5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
        </svg>
      ),
    },
    {
      id: "p2",
      text: "Tìm các lưu ý bảo mật JWT",
      icon: (
        <svg className="w-[11px] h-[11px] text-[#059669]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      ),
    },
    {
      id: "p3",
      text: "Danh sách API endpoints là gì?",
      icon: (
        <svg className="w-[11px] h-[11px] text-[#D97706]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
    },
  ];

  const handleSend = () => {
    if (!inputText.trim()) return;
    if (onSendMessage) onSendMessage(inputText);
    setInputText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSelectStarter = (starterText) => {
    setInputText(starterText);
  };

  return (
    <div className="w-full shrink-0 flex flex-col gap-[12px] p-[16px_24px_20px_24px] border-t border-[#E2E8F0] bg-white z-10">
      {/* Prompt Starters Row */}
      <div className="flex items-center gap-[8px] flex-wrap select-none">
        {promptStarters.map((starter) => (
          <button
            key={starter.id}
            type="button"
            onClick={() => handleSelectStarter(starter.text)}
            className="flex items-center gap-[4px] px-[10px] py-[4px] bg-[#F1F5F9] hover:bg-[#E2E8F0] rounded-full text-[11px] text-[#475569] transition-colors cursor-pointer"
          >
            {starter.icon}
            <span>{starter.text}</span>
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="w-full h-[52px] flex items-center justify-between px-[14px] bg-[#F8FAFC] border border-[#CBD5E1] focus-within:border-[#4F46E5] focus-within:bg-white rounded-[10px] transition-all shadow-2xs">
        <div className="flex items-center gap-[10px] flex-1">
          {/* Paperclip Button */}
          <button
            type="button"
            onClick={onAttachFile}
            title="Đính kèm tệp"
            className="text-[#94A3B8] hover:text-[#4F46E5] transition-colors cursor-pointer"
          >
            <svg className="w-[16px] h-[16px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
            </svg>
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Hỏi bất kỳ điều gì về cơ sở tri thức dự án... (Nhấn Enter để gửi)"
            className="w-full bg-transparent border-none outline-none text-[13px] text-[#0F172A] placeholder-[#94A3B8]"
          />
        </div>

        {/* Send Button */}
        <button
          type="button"
          onClick={handleSend}
          disabled={!inputText.trim()}
          title="Gửi tin nhắn"
          className={`w-[34px] h-[34px] shrink-0 flex items-center justify-center rounded-[6px] transition-colors cursor-pointer ${
            inputText.trim()
              ? "bg-[#4F46E5] hover:bg-[#4338CA] text-white shadow-xs"
              : "bg-[#4F46E5]/40 text-white cursor-not-allowed"
          }`}
        >
          <svg className="w-[16px] h-[16px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" x2="12" y1="19" y2="5" />
            <polyline points="5 12 12 5 19 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

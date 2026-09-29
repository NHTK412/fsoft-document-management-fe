import React from "react";

export default function AiPersonaCard({
  temperature = 0.2,
  setTemperature,
  systemPrompt,
  setSystemPrompt,
}) {
  const getTempDescription = (val) => {
    if (val <= 0.2) return `${val} (Chính xác cao / RAG)`;
    if (val <= 0.5) return `${val} (Cân bằng)`;
    if (val <= 0.8) return `${val} (Linh hoạt)`;
    return `${val} (Sáng tạo cao)`;
  };

  return (
    <div className="w-full bg-white border border-[#E2E8F0] rounded-[12px] p-6 lg:p-[24px] flex flex-col gap-[18px] shadow-xs">
      {/* Header */}
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-[10px]">
          <div className="w-[32px] h-[32px] shrink-0 flex items-center justify-center bg-[#F3E8FF] rounded-[8px] text-[#9333EA]">
            <svg className="w-[17px] h-[17px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 8V4H8" />
              <rect width="16" height="12" x="4" y="8" rx="2" />
              <path d="M2 14h2" /><path d="M20 14h2" /><path d="M15 13v2" /><path d="M9 13v2" />
            </svg>
          </div>
          <span className="text-[15px] font-bold text-[#0F172A]">
            Chỉ Thị AI Chatbot
          </span>
        </div>

      </div>

      {/* Temperature Slider Block */}
      <div className="w-full flex flex-col gap-[8px]">
        <div className="w-full flex items-center justify-between text-[13px]">
          <span className="font-semibold text-[#334155]">
            Độ sáng tạo 
          </span>
          <span className="font-semibold text-[#4F46E5]">
            {getTempDescription(temperature)}
          </span>
        </div>

        {/* Range Slider */}
        <div className="relative flex items-center py-1">
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            className="w-full h-[6px] bg-[#E2E8F0] rounded-[3px] appearance-none cursor-pointer accent-[#4F46E5] focus:outline-none"
          />
        </div>

        <div className="w-full flex items-center justify-between text-[11px] text-[#94A3B8]">
          <span>0.0 (Chính xác tuyệt đối)</span>
          <span>1.0 (Sáng tạo)</span>
        </div>
      </div>

      {/* System Prompt Block */}
      <div className="w-full flex flex-col gap-[6px]">
        <label className="text-[13px] font-semibold text-[#334155]">
          Chỉ thị hệ thống 
        </label>
        <textarea
          rows={4}
          value={systemPrompt}
          onChange={(e) => setSystemPrompt(e.target.value)}
          placeholder="Nhập hướng dẫn và phong cách ứng xử của trợ lý AI..."
          className="w-full p-[10px_14px] bg-[#F8FAFC] border border-[#CBD5E1] rounded-[8px] text-[13px] text-[#334155] focus:bg-white focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20 transition-all resize-none leading-relaxed"
        />
      </div>
    </div>
  );
}

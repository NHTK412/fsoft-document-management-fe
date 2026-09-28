import React from "react";

export default function SettingsTabs({ activeTab = "general", onTabChange }) {
  const tabs = [
    {
      id: "general",
      label: "Thông tin chung & Lưu trữ",
      colorClass: activeTab === "general" ? "text-[#4F46E5] font-semibold border-b-2 border-[#4F46E5]" : "text-[#64748B] hover:text-[#0F172A] font-medium",
    },
    {
      id: "ai",
      label: "Chỉ thị AI Chatbot (Persona)",
      colorClass: activeTab === "ai" ? "text-[#4F46E5] font-semibold border-b-2 border-[#4F46E5]" : "text-[#64748B] hover:text-[#0F172A] font-medium",
    },
    {
      id: "danger",
      label: "Vùng nguy hiểm (Danger Zone)",
      colorClass: activeTab === "danger" ? "text-[#EF4444] font-semibold border-b-2 border-[#EF4444]" : "text-[#EF4444]/80 hover:text-[#EF4444] font-medium",
    },
  ];

  return (
    <div className="w-full h-[38px] shrink-0 flex items-center gap-[24px] border-b border-[#E2E8F0] select-none">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onTabChange(tab.id)}
          className={`h-full flex items-center transition-colors cursor-pointer text-[13px] relative -mb-[1px] ${tab.colorClass}`}
        >
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
}

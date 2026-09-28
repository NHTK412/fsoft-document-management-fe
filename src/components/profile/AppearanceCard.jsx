import React from "react";

export default function AppearanceCard({
  theme = "dark",
  setTheme,
  language,
  setLanguage,
  timezone,
  setTimezone,
}) {
  const themeOptions = [
    {
      id: "light",
      label: "Giao diện Sáng (Light)",
      icon: (
        <svg className="w-[16px] h-[16px] text-[#64748B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
        </svg>
      ),
    },
    {
      id: "dark",
      label: "Giao diện Tối (Dark Mode)",
      icon: (
        <svg className="w-[16px] h-[16px] text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      ),
    },
    {
      id: "system",
      label: "Đồng bộ Hệ thống (System)",
      icon: (
        <svg className="w-[16px] h-[16px] text-[#64748B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="14" x="2" y="3" rx="2" />
          <line x1="8" x2="16" y1="21" y2="21" />
          <line x1="12" x2="12" y1="17" y2="21" />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-full bg-white border border-[#E2E8F0] rounded-[12px] p-[20px] flex flex-col gap-[14px] shadow-xs">
      {/* Header */}
      <div className="w-full flex items-center justify-between pb-1">
        <div className="flex items-center gap-[10px]">
          <div className="w-[28px] h-[28px] shrink-0 flex items-center justify-center bg-[#EEF2FF] rounded-[6px] text-[#4F46E5]">
            <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
              <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
              <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
              <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.563-2.512 5.563-5.563C22 6.5 17.5 2 12 2Z" />
            </svg>
          </div>
          <span className="text-[14px] font-semibold text-[#0F172A]">
            Tùy Biến Giao Diện &amp; Ngôn Ngữ
          </span>
        </div>
        <span className="text-[12px] text-[#94A3B8]">
          Tự động đồng bộ trên các thiết bị của bạn
        </span>
      </div>

      {/* Theme Modes Selection */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-[16px]">
        {themeOptions.map((opt) => {
          const isSelected = theme === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => setTheme(opt.id)}
              className={`h-[58px] px-[16px] flex items-center justify-between rounded-[8px] transition-all cursor-pointer text-left ${
                isSelected
                  ? "bg-[#F5F3FF] border-2 border-[#4F46E5] text-[#4338CA]"
                  : "bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#1E293B]"
              }`}
            >
              <div className="flex items-center gap-[12px]">
                <div
                  className={`w-[32px] h-[32px] shrink-0 flex items-center justify-center rounded-[6px] ${
                    isSelected ? "bg-[#4F46E5]" : "bg-[#F1F5F9]"
                  }`}
                >
                  {opt.icon}
                </div>
                <span
                  className={`text-[13px] ${
                    isSelected ? "font-semibold" : "font-medium"
                  }`}
                >
                  {opt.label}
                </span>
              </div>

              {/* Radio Indicator */}
              {isSelected ? (
                <svg className="w-[18px] h-[18px] text-[#4F46E5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              ) : (
                <div className="w-[16px] h-[16px] border border-[#CBD5E1] rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Language & Timezone Row */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-[28px] pt-1">
        {/* Language Field */}
        <div className="flex flex-col gap-[4px]">
          <label className="text-[12px] font-semibold text-[#334155]">
            Ngôn ngữ hiển thị
          </label>
          <div className="relative">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full h-[38px] px-[12px] pr-8 bg-[#F8FAFC] border border-[#CBD5E1] rounded-[8px] text-[13px] text-[#1E293B] font-normal appearance-none focus:bg-white focus:outline-none focus:border-[#4F46E5] cursor-pointer"
            >
              <option value="vi">🇻🇳 Tiếng Việt (Mặc định hệ thống)</option>
              <option value="en">🇺🇸 English (US)</option>
              <option value="ja">🇯🇵 日本語 (Japanese)</option>
            </select>
            <svg className="w-[14px] h-[14px] text-[#64748B] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>

        {/* Timezone Field */}
        <div className="flex flex-col gap-[4px]">
          <label className="text-[12px] font-semibold text-[#334155]">
            Múi giờ &amp; Định dạng ngày
          </label>
          <div className="relative">
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full h-[38px] px-[12px] pr-8 bg-[#F8FAFC] border border-[#CBD5E1] rounded-[8px] text-[13px] text-[#1E293B] font-normal appearance-none focus:bg-white focus:outline-none focus:border-[#4F46E5] cursor-pointer"
            >
              <option value="GMT+7">GMT+07:00 (Hà Nội, Băng Cốc) • DD/MM/YYYY</option>
              <option value="GMT+8">GMT+08:00 (Singapore, Bắc Kinh) • YYYY-MM-DD</option>
              <option value="GMT+0">GMT+00:00 (London, UTC) • MM/DD/YYYY</option>
            </select>
            <svg className="w-[14px] h-[14px] text-[#64748B] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

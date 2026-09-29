import React from "react";

export default function ChatHistorySidebar({
  sessions,
  activeSessionId,
  onSelectSession,
  onNewChat,
}) {
  const hasRealSessions = Array.isArray(sessions) && sessions.length > 0;

  return (
    <div className="w-[260px] shrink-0 h-full flex flex-col gap-[16px] p-[16px] bg-white border-r border-[#E2E8F0] select-none">
      {/* New Chat Button */}
      <button
        type="button"
        onClick={onNewChat}
        className="w-full h-[40px] flex items-center justify-center gap-[8px] bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-[8px] text-[13px] font-semibold transition-colors cursor-pointer shadow-xs"
      >
        <svg className="w-[16px] h-[16px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" x2="12" y1="5" y2="19" />
          <line x1="5" x2="19" y1="12" y2="12" />
        </svg>
        <span className="whitespace-nowrap">Cuộc trò chuyện mới</span>
      </button>

      {/* History Groups */}
      <div className="w-full flex-1 flex flex-col gap-[14px] overflow-y-auto">
        {hasRealSessions ? (
          <div className="w-full flex flex-col gap-[6px]">
            <span className="text-[10px] font-bold text-[#94A3B8] tracking-wider uppercase px-[10px]">
              TẤT CẢ PHIÊN CHAT ({sessions.length})
            </span>
            {sessions.map((session) => {
              const isActive = String(activeSessionId) === String(session.id);
              return (
                <button
                  key={session.id}
                  type="button"
                  onClick={() => onSelectSession && onSelectSession(session.id)}
                  className={`w-full h-[36px] flex items-center gap-[8px] px-[10px] rounded-[6px] text-[12px] text-left transition-colors cursor-pointer truncate ${
                    isActive
                      ? "bg-[#EEF2FF] text-[#4F46E5] font-semibold"
                      : "text-[#334155] font-normal hover:bg-[#F8FAFC]"
                  }`}
                >
                  <svg
                    className={`w-[14px] h-[14px] shrink-0 ${
                      isActive ? "text-[#4F46E5]" : "text-[#64748B]"
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  <span className="truncate">{session.title}</span>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-center p-4 gap-2 my-auto">
            <div className="w-10 h-10 rounded-full bg-[#F1F5F9] flex items-center justify-center text-[#94A3B8]">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <p className="text-[13px] font-semibold text-[#64748B]">
              Chưa có lịch sử trò chuyện
            </p>
            <p className="text-[11px] text-[#94A3B8]">
              Bấm &ldquo;Cuộc trò chuyện mới&rdquo; để bắt đầu đặt câu hỏi với AI
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

import React from "react";

export default function ChatMessageThread({
  messages,
  userInitials = "NV",
  onCitationClick,
}) {
  const defaultMessages = [
    {
      id: "m1",
      sender: "user",
      text: "Quy trình triển khai microservices lên Kubernetes cụm Alpha như thế nào?",
    },
    {
      id: "m2",
      sender: "ai",
      intro:
        "Dựa trên tài liệu kiến trúc dự án, quy trình triển khai lên cụm Kubernetes Alpha bao gồm 3 bước chính:",
      steps: [
        "1. Đóng gói container image và gắn thẻ phiên bản (Semantic Tagging).",
        "2. Đẩy Docker image lên Harbor Registry bảo mật nội bộ.",
        "3. Áp dụng Helm chart cấu hình `kbase-prod` với Secret tự động phân bổ.",
      ],
      citation: {
        fileName: "Architecture-v2.pdf",
        page: 14,
        confidence: "98.5%",
      },
    },
  ];

  const thread = messages || defaultMessages;

  return (
    <div className="w-full flex-1 flex flex-col gap-[20px] p-[24px_32px] overflow-y-auto">
      {thread.map((msg) => {
        if (msg.sender === "user") {
          return (
            <div
              key={msg.id}
              className="w-full flex items-start justify-end gap-[12px]"
            >
              <div className="max-w-[80%] p-[12px_16px] bg-[#4F46E5] text-white rounded-[12px] shadow-2xs">
                <p className="text-[13px] leading-relaxed font-normal whitespace-pre-wrap">
                  {msg.text}
                </p>
              </div>

              <div className="w-[32px] h-[32px] shrink-0 flex items-center justify-center bg-[#4F46E5] text-white rounded-full text-[11px] font-bold ring-2 ring-white shadow-2xs">
                {userInitials}
              </div>
            </div>
          );
        }

        if (msg.sender === "ai") {
          return (
            <div key={msg.id} className="w-full flex items-start gap-[12px]">
              <div className="w-[32px] h-[32px] shrink-0 flex items-center justify-center bg-[#EEF2FF] rounded-[8px] text-[#4F46E5]">
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 8V4H8" />
                  <rect width="16" height="12" x="4" y="8" rx="2" />
                  <path d="M2 14h2" />
                  <path d="M20 14h2" />
                  <path d="M15 13v2" />
                  <path d="M9 13v2" />
                </svg>
              </div>

              <div className="max-w-[720px] flex flex-col gap-[12px] p-[18px] bg-[#F8FAFC] border border-[#E2E8F0] rounded-[12px] shadow-2xs text-[#1E293B]">
                {msg.intro && (
                  <p className="text-[13px] leading-[20px] font-normal">
                    {msg.intro}
                  </p>
                )}

                {msg.steps && msg.steps.length > 0 && (
                  <div className="flex flex-col gap-[6px]">
                    {msg.steps.map((step, idx) => (
                      <div
                        key={idx}
                        className="text-[12px] text-[#334155] font-normal"
                      >
                        {step}
                      </div>
                    ))}
                  </div>
                )}

                {msg.text && (
                  <p className="text-[13px] leading-[20px] font-normal whitespace-pre-wrap">
                    {msg.text}
                  </p>
                )}

                {msg.citation && (
                  <button
                    type="button"
                    onClick={() => onCitationClick && onCitationClick(msg.citation)}
                    className="w-fit flex items-center gap-[8px] px-[12px] py-[6px] bg-[#EEF2FF] border border-[#C7D2FE] hover:bg-[#E0E7FF] rounded-[6px] transition-colors cursor-pointer text-left"
                  >
                    <svg className="w-[14px] h-[14px] text-[#4F46E5] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                      <path d="M10 9H8" />
                      <path d="M16 13H8" />
                      <path d="M16 17H8" />
                    </svg>

                    <span className="text-[11px] font-semibold text-[#4F46E5]">
                      Trích dẫn nguồn: {msg.citation.fileName} (Trang {msg.citation.page} • Độ chính xác {msg.citation.confidence})
                    </span>

                    <svg className="w-[12px] h-[12px] text-[#4F46E5] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" x2="21" y1="14" y2="3" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}

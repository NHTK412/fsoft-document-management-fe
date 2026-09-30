import React, { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ChatMessageThread({
  messages,
  userInitials = "NV",
  sending = false,
  onCitationClick,
}) {
  const thread = Array.isArray(messages) ? messages : [];
  const containerRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [thread.length, sending]);

  if (thread.length === 0 && !sending) {
    return (
      <div className="w-full flex-1 min-h-0 flex flex-col items-center justify-center p-8 text-center my-auto overflow-y-auto">
        <div className="w-14 h-14 rounded-2xl bg-[#EEF2FF] flex items-center justify-center text-[#4F46E5] mb-3 shadow-xs">
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 8V4H8" />
            <rect width="16" height="12" x="4" y="8" rx="2" />
            <path d="M2 14h2" />
            <path d="M20 14h2" />
            <path d="M15 13v2" />
            <path d="M9 13v2" />
          </svg>
        </div>
        <h3 className="text-[15px] font-semibold text-[#0F172A] mb-1">
          Chưa có tin nhắn nào trong phiên này
        </h3>
        <p className="text-[13px] text-[#64748B] max-w-md">
          Hãy nhập câu hỏi bên dưới để bắt đầu tra cứu và trao đổi thông tin với AI từ kho tài liệu dự án của bạn.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full flex-1 min-h-0 flex flex-col gap-[20px] p-[24px_32px] overflow-y-auto"
    >
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
          const citationsList = Array.isArray(msg.citations) && msg.citations.length > 0
            ? msg.citations
            : msg.citation
            ? [msg.citation]
            : [];

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

              <div className="max-w-[780px] flex flex-col gap-[12px] p-[18px] bg-[#F8FAFC] border border-[#E2E8F0] rounded-[12px] shadow-2xs text-[#1E293B]">
                {msg.intro && (
                  <p className="text-[13px] leading-[20px] font-medium text-[#475569]">
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

                {/* Markdown Rendered Content */}
                {msg.text && (
                  <div className="text-[13px] leading-[22px] text-[#1E293B] space-y-2">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        p: ({ children }) => <p className="mb-2 last:mb-0 leading-[22px] whitespace-pre-wrap">{children}</p>,
                        h1: ({ children }) => <h1 className="text-[15px] font-bold text-[#0F172A] mt-3 mb-1.5">{children}</h1>,
                        h2: ({ children }) => <h2 className="text-[14px] font-bold text-[#0F172A] mt-2.5 mb-1">{children}</h2>,
                        h3: ({ children }) => <h3 className="text-[13px] font-semibold text-[#0F172A] mt-2 mb-1">{children}</h3>,
                        ul: ({ children }) => <ul className="list-disc pl-5 mb-2 space-y-1">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal pl-5 mb-2 space-y-1">{children}</ol>,
                        li: ({ children }) => <li className="text-[13px] leading-relaxed">{children}</li>,
                        strong: ({ children }) => <strong className="font-semibold text-[#0F172A]">{children}</strong>,
                        code: ({ inline, children }) =>
                          inline ? (
                            <code className="px-1.5 py-0.5 bg-[#EEF2FF] text-[#4F46E5] rounded text-[12px] font-mono">
                              {children}
                            </code>
                          ) : (
                            <pre className="p-3 my-2 bg-[#0F172A] text-[#F8FAFC] rounded-lg overflow-x-auto text-[12px] font-mono leading-relaxed">
                              <code>{children}</code>
                            </pre>
                          ),
                        blockquote: ({ children }) => (
                          <blockquote className="border-l-3 border-[#4F46E5] pl-3 italic text-[#64748B] my-2">
                            {children}
                          </blockquote>
                        ),
                        table: ({ children }) => (
                          <div className="overflow-x-auto my-2 border border-[#E2E8F0] rounded-lg">
                            <table className="min-w-full divide-y divide-[#E2E8F0] text-[12px]">{children}</table>
                          </div>
                        ),
                        th: ({ children }) => (
                          <th className="px-3 py-2 bg-[#F1F5F9] text-left font-semibold text-[#334155]">{children}</th>
                        ),
                        td: ({ children }) => (
                          <td className="px-3 py-2 border-t border-[#F1F5F9] text-[#334155]">{children}</td>
                        ),
                      }}
                    >
                      {msg.text}
                    </ReactMarkdown>
                  </div>
                )}

                {/* Multiple Citations List */}
                {citationsList.length > 0 && (
                  <div className="flex flex-col gap-2 pt-2 border-t border-[#E2E8F0]/70">
                    <span className="text-[11px] font-semibold text-[#64748B] flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-[#4F46E5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                      </svg>
                      {citationsList.length > 1
                        ? `Các nguồn trích dẫn (${citationsList.length}):`
                        : "Trích dẫn nguồn:"}
                    </span>

                    <div className="flex flex-wrap gap-2">
                      {citationsList.map((cite, cIdx) => (
                        <button
                          key={cIdx}
                          type="button"
                          onClick={() => onCitationClick && onCitationClick(cite)}
                          className="flex items-center gap-2 px-2.5 py-1.5 bg-[#EEF2FF] border border-[#C7D2FE] hover:bg-[#E0E7FF] rounded-md transition-colors cursor-pointer text-left group"
                          title={cite.snippet ? `Trích dẫn: "${cite.snippet}"` : cite.fileName}
                        >
                          <svg className="w-3.5 h-3.5 text-[#4F46E5] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                          </svg>

                          <span className="text-[11px] font-semibold text-[#4F46E5] group-hover:text-[#4338CA]">
                            {cite.fileName} {cite.page ? `(Trang ${cite.page})` : ""}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        }

        return null;
      })}

      {/* Loading Skeleton / Thinking Indicator when sending */}
      {sending && (
        <div className="w-full flex items-start gap-[12px] animate-fadeIn">
          <div className="w-[32px] h-[32px] shrink-0 flex items-center justify-center bg-[#EEF2FF] rounded-[8px] text-[#4F46E5] ring-2 ring-[#C7D2FE]/60">
            <svg className="w-[18px] h-[18px] animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 8V4H8" />
              <rect width="16" height="12" x="4" y="8" rx="2" />
              <path d="M2 14h2" />
              <path d="M20 14h2" />
              <path d="M15 13v2" />
              <path d="M9 13v2" />
            </svg>
          </div>

          <div className="max-w-[720px] w-full sm:w-[480px] flex flex-col gap-[12px] p-[16px_18px] bg-[#F8FAFC] border border-[#E2E8F0] rounded-[12px] shadow-2xs text-[#1E293B]">
            <div className="flex items-center gap-[8px]">
              <div className="w-4 h-4 border-2 border-[#4F46E5] border-t-transparent rounded-full animate-spin shrink-0" />
              <span className="text-[13px] font-medium text-[#4F46E5]">
                AI đang tìm kiếm tài liệu và tổng hợp câu trả lời...
              </span>
            </div>

            {/* Skeleton lines */}
            <div className="flex flex-col gap-[8px] pt-1">
              <div className="h-3 bg-[#E2E8F0] rounded-full animate-pulse w-[92%]" />
              <div className="h-3 bg-[#E2E8F0] rounded-full animate-pulse w-[75%]" />
              <div className="h-3 bg-[#E2E8F0] rounded-full animate-pulse w-[45%]" />
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}

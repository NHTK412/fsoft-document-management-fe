import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ProjectSidebar from "../components/layout/ProjectSidebar.jsx";
import WorkspaceTopbar from "../components/layout/WorkspaceTopbar.jsx";
import {
  ChatHistorySidebar,
  ContextScopeBar,
  ChatMessageThread,
  ChatInputBox,
} from "../components/chat";

export default function ProjectChat() {
  const location = useLocation();
  const params = useParams();
  const currentProject = location.state?.project;

  const projectName = currentProject?.title || "AI Knowledge Core";
  const projectRole = currentProject?.role || "Owner";

  const [activeSessionId, setActiveSessionId] = useState("s1");
  const [messages, setMessages] = useState([
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
  ]);

  const handleSendMessage = (text) => {
    const userMsg = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text,
    };

    setMessages((prev) => [...prev, userMsg]);

    // Simulate AI response
    setTimeout(() => {
      const aiReply = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        intro: `Đã truy xuất từ cơ sở tri thức "${projectName}":`,
        text: `Hệ thống đã phân tích các tài liệu liên quan đến yêu cầu "${text}". Bạn có thể xem chi tiết trích dẫn ngữ cảnh từ các tài liệu đã lập chỉ mục vector.`,
        citation: {
          fileName: "Architecture-v2.pdf",
          page: 1,
          confidence: "97.2%",
        },
      };
      setMessages((prev) => [...prev, aiReply]);
    }, 600);
  };

  const handleNewChat = () => {
    setMessages([]);
  };

  return (
    <div className="w-full min-h-screen flex flex-row bg-[#F8FAFC] text-[#0F172A] font-[Inter,system-ui,sans-serif]">
      {/* 1. Left Project Sidebar */}
      <ProjectSidebar activeMenu="ai-assistant" />

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
        {/* Workspace Topbar */}
        <WorkspaceTopbar
          projectName={projectName}
          role={projectRole}
          user={{ name: "Nguyễn Văn A", role: "Admin", initials: "NV" }}
        />

        {/* Chat Main View (History Sidebar + Main Chat Pane) */}
        <div className="w-full flex-1 flex flex-row min-h-0 bg-white overflow-hidden">
          {/* Left Chat History Column */}
          <ChatHistorySidebar
            activeSessionId={activeSessionId}
            onSelectSession={setActiveSessionId}
            onNewChat={handleNewChat}
          />

          {/* Right Main Chat Pane */}
          <div className="flex-1 h-full flex flex-col justify-between bg-white min-w-0">
            {/* Context Scope Bar */}
            <ContextScopeBar
              scope="Toàn bộ tài liệu dự án (38 tệp • 1.2 GB)"
              modelName="KBase RAG Engine v2"
              onScopeChange={() => console.log("Scope change clicked")}
            />

            {/* Message Thread */}
            <ChatMessageThread
              messages={messages}
              userInitials="NV"
              onCitationClick={(citation) =>
                console.log("Citation clicked:", citation)
              }
            />

            {/* Chat Input Section */}
            <ChatInputBox
              onSendMessage={handleSendMessage}
              onAttachFile={() => console.log("Attach file clicked")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import ProjectSidebar from "../components/layout/ProjectSidebar.jsx";
import WorkspaceTopbar from "../components/layout/WorkspaceTopbar.jsx";
import {
  ChatHistorySidebar,
  ContextScopeBar,
  ChatMessageThread,
  ChatInputBox,
} from "../components/chat";
import { chatService, projectService } from "@/services";
import { useAuth } from "@/contexts";

export default function ProjectChat() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const { user } = useAuth();

  const [project, setProject] = useState(location.state?.project || null);
  const storedProjectId = localStorage.getItem("kbase_current_project_id");
  const rawId = params.id || project?.id || storedProjectId;
  const projectId = rawId && !isNaN(Number(rawId)) ? Number(rawId) : null;

  useEffect(() => {
    if (!projectId) {
      navigate("/projects", { replace: true });
    } else {
      localStorage.setItem("kbase_current_project_id", String(projectId));
    }
  }, [projectId, navigate]);

  const [sessions, setSessions] = useState([]);
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sending, setSending] = useState(false);

  // Load project details if needed
  useEffect(() => {
    if (location.state?.project && String(location.state.project.id) === String(projectId)) {
      setProject(location.state.project);
    } else if (projectId) {
      projectService.getProjectById(projectId)
        .then((res) => {
          if (res?.data) setProject(res.data);
        })
        .catch((e) => console.warn("Lỗi tải thông tin dự án:", e.message));
    }
  }, [projectId, location.state]);

  // Load sessions from API
  const fetchSessions = useCallback(async () => {
    if (!projectId) return;
    try {
      const res = await chatService.getSessions(projectId);
      if (res?.data) {
        setSessions(res.data);
        if (res.data.length > 0 && !activeSessionId) {
          setActiveSessionId(res.data[0].id);
        }
      }
    } catch (err) {
      console.warn("Lỗi tải danh sách phiên chat:", err.message);
    }
  }, [projectId, activeSessionId]);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  // Load messages for active session
  useEffect(() => {
    if (!projectId || !activeSessionId) {
      setMessages([]);
      return;
    }

    let isMounted = true;
    const fetchMessages = async () => {
      try {
        setLoadingMessages(true);
        const res = await chatService.getSessionMessages(projectId, activeSessionId);
        if (isMounted && res?.data) {
          setMessages(res.data);
        }
      } catch (err) {
        console.warn("Lỗi tải tin nhắn phiên chat:", err.message);
      } finally {
        if (isMounted) setLoadingMessages(false);
      }
    };

    fetchMessages();
    return () => {
      isMounted = false;
    };
  }, [projectId, activeSessionId]);

  const handleSendMessage = async (text) => {
    if (!text.trim() || sending) return;

    let targetSessionId = activeSessionId;
    const optimisticUserMsg = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, optimisticUserMsg]);
    setSending(true);

    try {
      // If no active session, create a new session first
      if (!targetSessionId) {
        const createRes = await chatService.createSession(projectId, text);
        if (createRes?.data?.id) {
          targetSessionId = createRes.data.id;
          setActiveSessionId(targetSessionId);
          await fetchSessions();
        }
      }

      // Send message to AI RAG
      const replyRes = await chatService.sendMessage(projectId, targetSessionId, text);
      if (replyRes?.data) {
        setMessages((prev) => [...prev, replyRes.data]);
      }
    } catch (err) {
      console.error("Lỗi khi gửi tin nhắn AI:", err);
      const errorAiMsg = {
        id: `ai-err-${Date.now()}`,
        sender: "ai",
        intro: "Thông báo phản hồi từ hệ thống:",
        text: "Xin lỗi, đã xảy ra sự cố khi truy vấn cơ sở tri thức RAG: " + err.message,
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorAiMsg]);
    } finally {
      setSending(false);
    }
  };

  const handleNewChat = () => {
    setActiveSessionId(null);
    setMessages([]);
  };

  const projectName = project?.title || project?.name || "AI Knowledge Core";
  const projectRole = project?.role || "Owner";
  const userInitials = user?.initials || (user?.fullName ? user.fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'NV');

  return (
    <div className="w-full min-h-screen flex flex-row bg-[#F8FAFC] text-[#0F172A] font-[Inter,system-ui,sans-serif]">
      {/* 1. Left Project Sidebar */}
      <ProjectSidebar activeMenu="ai-assistant" projectId={projectId} />

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
        {/* Workspace Topbar */}
        <WorkspaceTopbar
          currentProjectId={projectId}
          projectName={projectName}
          role={projectRole}
          user={{
            name: user?.fullName || "Nguyễn Văn A",
            role: user?.role || "Admin",
            initials: userInitials,
          }}
        />

        {/* Chat Main View (History Sidebar + Main Chat Pane) */}
        <div className="w-full flex-1 flex flex-row min-h-0 bg-white overflow-hidden">
          {/* Left Chat History Column */}
          <ChatHistorySidebar
            sessions={sessions}
            activeSessionId={activeSessionId}
            onSelectSession={setActiveSessionId}
            onNewChat={handleNewChat}
          />

          {/* Right Main Chat Pane */}
          <div className="flex-1 h-full flex flex-col justify-between bg-white min-w-0">
            {/* Context Scope Bar */}
            <ContextScopeBar
              scope={`Toàn bộ tài liệu dự án ${projectName}`}
              modelName="Gemini RAG PGVector Engine"
              onScopeChange={() => console.log("Scope change clicked")}
            />

            {/* Message Thread */}
            {loadingMessages ? (
              <div className="w-full flex-1 flex items-center justify-center text-slate-400">
                <div className="w-6 h-6 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <ChatMessageThread
                messages={messages}
                userInitials={userInitials}
                onCitationClick={(citation) => {
                  console.log("Citation clicked:", citation);
                }}
              />
            )}

            {/* Chat Input Section */}
            <ChatInputBox
              onSendMessage={handleSendMessage}
              disabled={sending}
              onAttachFile={() => console.log("Attach file clicked")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

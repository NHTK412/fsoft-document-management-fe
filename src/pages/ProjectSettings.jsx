import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ProjectSidebar from "../components/layout/ProjectSidebar.jsx";
import WorkspaceTopbar from "../components/layout/WorkspaceTopbar.jsx";
import {
  SettingsHeader,
  SettingsTabs,
  GeneralStorageCard,
  AiPersonaCard,
  DangerZoneCard,
} from "../components/settings";
import { projectService } from "@/services";
import { useAuth } from "@/contexts";

export default function ProjectSettings() {
  const location = useLocation();
  const navigate = useNavigate();
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

  // Sync project when projectId changes
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

  // Form State
  const [projectName, setProjectName] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const [maxFileSize, setMaxFileSize] = useState("50 MB");
  const [allowedFormats, setAllowedFormats] = useState(["pdf", "docx", "doc", "md", "txt"]);
  const [temperature, setTemperature] = useState(0.2);
  const [systemPrompt, setSystemPrompt] = useState("");

  const [activeTab, setActiveTab] = useState("general");
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveToast, setSaveToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("Cài đặt dự án đã được lưu thành công!");

  const fetchSettings = useCallback(async () => {
    if (!projectId) return;
    try {
      setLoading(true);
      const res = await projectService.getProjectSettings(projectId);
      if (res?.data) {
        const d = res.data;
        setProjectName(d.projectName || "");
        setProjectDesc(d.projectDesc || "");
        setMaxFileSize(d.maxFileSize || "50 MB");
        const allowedOnly = (d.allowedFormats || ["pdf", "docx", "doc", "md", "txt"])
          .filter(f => ['pdf', 'docx', 'doc', 'md', 'txt'].includes(f.toLowerCase()));
        setAllowedFormats(allowedOnly.length > 0 ? allowedOnly : ["pdf", "docx", "doc", "md", "txt"]);
        if (d.aiPersona) {
          setTemperature(d.aiPersona.temperature ?? 0.2);
          setSystemPrompt(d.aiPersona.systemPrompt || "");
        }
      }
    } catch (err) {
      console.warn("Lỗi tải cài đặt dự án:", err.message);
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const handleToggleFormat = (formatId) => {
    setAllowedFormats((prev) =>
      prev.includes(formatId)
        ? prev.filter((item) => item !== formatId)
        : [...prev, formatId]
    );
  };

  const handleDiscard = () => {
    if (confirm("Bạn có chắc chắn muốn hủy bỏ các thay đổi chưa lưu?")) {
      fetchSettings();
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const payload = {
        projectName,
        projectDesc,
        maxFileSize,
        allowedFormats,
        aiPersona: {
          temperature,
          systemPrompt,
        },
      };
      await projectService.updateProjectSettings(projectId, payload);
      setToastMessage("Cài đặt dự án đã được lưu thành công!");
      setSaveToast(true);
      setTimeout(() => setSaveToast(false), 3000);
    } catch (err) {
      alert("Lưu cài đặt thất bại: " + (err.message || "Lỗi không xác định"));
    } finally {
      setIsSaving(false);
    }
  };

  const handleTransferOwnership = async () => {
    const newOwnerEmail = prompt("Nhập địa chỉ email thành viên nhận quyền Project Owner:");
    if (!newOwnerEmail) return;
    try {
      await projectService.transferOwnership(projectId, newOwnerEmail.trim());
      alert(`Đã chuyển nhượng quyền Project Owner thành công sang ${newOwnerEmail}.`);
      navigate("/projects");
    } catch (err) {
      alert("Chuyển nhượng thất bại: " + (err.message || "Lỗi không xác định"));
    }
  };

  const handleArchiveProject = async () => {
    if (!confirm("Bạn có chắc muốn lưu trữ dự án này? Dự án sẽ chuyển sang chế độ chỉ đọc.")) return;
    try {
      await projectService.archiveProject(projectId);
      alert("Dự án đã được chuyển sang chế độ lưu trữ.");
      navigate("/projects");
    } catch (err) {
      alert("Lưu trữ thất bại: " + (err.message || "Lỗi không xác định"));
    }
  };

  const handleDeleteProject = async () => {
    const confirmation = prompt(
      `Hành động này không thể hoàn tác! Vui lòng gõ chính xác "${projectName}" để xác nhận xóa vĩnh viễn dự án:`
    );
    if (confirmation !== projectName) {
      if (confirmation !== null) alert("Tên dự án xác nhận không trùng khớp!");
      return;
    }

    try {
      await projectService.deleteProject(projectId, confirmation);
      alert("Dự án và toàn bộ dữ liệu MinIO, vector đã bị xóa vĩnh viễn!");
      navigate("/projects");
    } catch (err) {
      alert("Xóa dự án thất bại: " + (err.message || "Lỗi không xác định"));
    }
  };

  const currentTitle = projectName || project?.title || "AI Knowledge Core";
  const projectRole = project?.role || "Owner";

  return (
    <div className="w-full min-h-screen flex flex-row bg-[#F8FAFC] text-[#0F172A] font-[Inter,system-ui,sans-serif]">
      {/* 1. Left Sidebar */}
      <ProjectSidebar activeMenu="settings" projectId={projectId} />

      {/* 2. Main Workspace Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
        {/* Topbar */}
        <WorkspaceTopbar
          currentProjectId={projectId}
          projectName={currentTitle}
          role={projectRole}
          user={{
            name: user?.fullName || "Nguyễn Văn A",
            role: user?.role || "Admin",
            initials: user?.initials || "NV",
          }}
        />

        {/* Settings Body Content */}
        <main className="flex-1 p-6 sm:p-8 lg:p-9 xl:p-10 flex flex-col gap-6 max-w-[1600px] w-full mx-auto pb-24">
          {/* Header */}
          <SettingsHeader
            onDiscard={handleDiscard}
            onSave={handleSave}
            isSaving={isSaving}
          />

          {/* Success Toast */}
          {saveToast && (
            <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 p-3.5 bg-emerald-600 text-white rounded-lg shadow-lg text-[13px] font-semibold animate-in slide-in-from-bottom duration-200">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>{toastMessage}</span>
            </div>
          )}

          {/* Settings Tabs */}
          <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {loading ? (
            <div className="w-full py-16 flex items-center justify-center text-slate-400">
              <div className="w-6 h-6 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="w-full flex flex-col gap-6">
              {/* Tab 1: General & Storage */}
              {(activeTab === "general" || activeTab === "all") && (
                <GeneralStorageCard
                  projectName={projectName}
                  onProjectNameChange={setProjectName}
                  projectDesc={projectDesc}
                  onProjectDescChange={setProjectDesc}
                  maxFileSize={maxFileSize}
                  onMaxFileSizeChange={setMaxFileSize}
                  allowedFormats={allowedFormats}
                  onToggleFormat={handleToggleFormat}
                />
              )}

              {/* Tab 2: AI Persona */}
              {(activeTab === "ai" || activeTab === "all") && (
                <AiPersonaCard
                  temperature={temperature}
                  onTemperatureChange={setTemperature}
                  systemPrompt={systemPrompt}
                  onSystemPromptChange={setSystemPrompt}
                />
              )}

              {/* Tab 3: Danger Zone */}
              {(activeTab === "danger" || activeTab === "all") && (
                <DangerZoneCard
                  onTransferOwnership={handleTransferOwnership}
                  onArchiveProject={handleArchiveProject}
                  onDeleteProject={handleDeleteProject}
                />
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

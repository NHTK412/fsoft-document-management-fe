import React, { useState } from "react";
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

const INITIAL_SETTINGS = {
  projectName: "AI Knowledge Core",
  projectDesc:
    "Kho lưu trữ tài liệu kỹ thuật, kiến trúc hệ thống và quy chuẩn mã nguồn dành cho đội ngũ kỹ sư và nhà phát triển của dự án AI Knowledge Core.",
  maxFileSize: "50 MB",
  allowedFormats: ["pdf", "docx", "xlsx", "pptx", "md", "txt", "images", "video"],
  temperature: 0.2,
  systemPrompt: `Bạn là trợ lý AI chuyên gia kỹ thuật cho dự án AI Knowledge Core.
Hãy trả lời súc tích, dựa trên các tài liệu đã được cung cấp trong dự án.
Luôn kèm nhãn trích dẫn nguồn [File - Trang/Dòng] chính xác và định dạng code chuẩn.`,
};

export default function ProjectSettings() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  // Project state
  const currentProject = location.state?.project;
  const initialName = currentProject?.title || INITIAL_SETTINGS.projectName;
  const projectRole = currentProject?.role || "Owner";

  // Form State
  const [projectName, setProjectName] = useState(initialName);
  const [projectDesc, setProjectDesc] = useState(INITIAL_SETTINGS.projectDesc);
  const [maxFileSize, setMaxFileSize] = useState(INITIAL_SETTINGS.maxFileSize);
  const [allowedFormats, setAllowedFormats] = useState(INITIAL_SETTINGS.allowedFormats);
  const [temperature, setTemperature] = useState(INITIAL_SETTINGS.temperature);
  const [systemPrompt, setSystemPrompt] = useState(INITIAL_SETTINGS.systemPrompt);

  // Tabs State
  const [activeTab, setActiveTab] = useState("general"); // "general" | "ai" | "danger"
  const [isSaving, setIsSaving] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  // Format toggle handler
  const handleToggleFormat = (formatId) => {
    setAllowedFormats((prev) =>
      prev.includes(formatId)
        ? prev.filter((item) => item !== formatId)
        : [...prev, formatId]
    );
  };

  // Discard handler
  const handleDiscard = () => {
    if (confirm("Bạn có chắc chắn muốn hủy bỏ các thay đổi chưa lưu?")) {
      setProjectName(initialName);
      setProjectDesc(INITIAL_SETTINGS.projectDesc);
      setMaxFileSize(INITIAL_SETTINGS.maxFileSize);
      setAllowedFormats(INITIAL_SETTINGS.allowedFormats);
      setTemperature(INITIAL_SETTINGS.temperature);
      setSystemPrompt(INITIAL_SETTINGS.systemPrompt);
    }
  };

  // Save handler
  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveToast(true);
      setTimeout(() => setSaveToast(false), 3000);
    }, 600);
  };

  // Danger actions
  const handleTransferOwnership = () => {
    const newOwner = prompt("Nhập địa chỉ email thành viên nhận quyền Project Owner:");
    if (newOwner) {
      alert(`Đã gửi yêu cầu chuyển nhượng dự án cho ${newOwner}.`);
    }
  };

  const handleArchiveProject = () => {
    if (
      confirm(
        "Bạn có chắc muốn lưu trữ dự án này? Dự án sẽ chuyển sang chế độ chỉ đọc."
      )
    ) {
      alert("Dự án đã được chuyển sang chế độ lưu trữ.");
    }
  };

  const handleDeleteProject = () => {
    const confirmation = prompt(
      `Hành động này không thể hoàn tác! Vui lòng gõ "${projectName}" để xác nhận xóa vĩnh viễn dự án:`
    );
    if (confirmation === projectName) {
      alert("Dự án đã được xóa thành công.");
      navigate("/projects");
    } else if (confirmation !== null) {
      alert("Tên dự án không khớp. Thao tác xóa đã bị hủy.");
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-row bg-[#F8FAFC] text-[#0F172A] font-[Inter,system-ui,sans-serif]">
      {/* 1. Left Sidebar */}
      <ProjectSidebar activeMenu="settings" />

      {/* 2. Main Workspace Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
        {/* Topbar */}
        <WorkspaceTopbar
          projectName={projectName}
          role={projectRole}
          user={{ name: "Nguyễn Văn A", role: "Admin", initials: "NV" }}
        />

        {/* Settings Body Content */}
        <main className="flex-1 p-6 sm:p-8 lg:p-9 xl:p-10 flex flex-col gap-6 max-w-[1600px] w-full mx-auto relative">
          {/* Toast Notification */}
          {saveToast && (
            <div className="fixed top-20 right-8 z-50 bg-[#064E3B] text-[#ECFDF5] border border-[#059669] px-4 py-3 rounded-lg shadow-xl flex items-center gap-2.5 animate-in fade-in slide-in-from-top-4 duration-200">
              <svg className="w-5 h-5 text-[#34D399]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-[13px] font-semibold">
                Cài đặt dự án đã được lưu thành công!
              </span>
            </div>
          )}

          {/* Header */}
          <SettingsHeader
            projectName={projectName}
            onDiscard={handleDiscard}
            onSave={handleSave}
            isSaving={isSaving}
          />

          {/* Tabs */}
          {/* <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} /> */}

          {/* Cards Content */}
          <div className="w-full flex flex-col gap-6">
            {/* 1. General & Storage Card */}
            <GeneralStorageCard
              projectName={projectName}
              setProjectName={setProjectName}
              projectDesc={projectDesc}
              setProjectDesc={setProjectDesc}
              maxFileSize={maxFileSize}
              setMaxFileSize={setMaxFileSize}
              allowedFormats={allowedFormats}
              onToggleFormat={handleToggleFormat}
            />
            {/* 2. Bottom Row: AI Persona & Danger Zone */}
            <div className="w-full flex flex-col lg:flex-row gap-6 items-stretch">

              <div className={activeTab === "ai" ? "w-full" : "flex-1 w-full min-w-0 flex"}>
                <AiPersonaCard
                  temperature={temperature}
                  setTemperature={setTemperature}
                  systemPrompt={systemPrompt}
                  setSystemPrompt={setSystemPrompt}
                />
              </div>
              <div className={activeTab === "danger" ? "w-full" : "flex-1 w-full min-w-0 flex"}>
                <DangerZoneCard
                  onTransferOwnership={handleTransferOwnership}
                  onArchiveProject={handleArchiveProject}
                  onDeleteProject={handleDeleteProject}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

import React from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import ProjectSidebar from "../components/layout/ProjectSidebar.jsx";
import WorkspaceTopbar from "../components/layout/WorkspaceTopbar.jsx";
import {
  DashboardHeader,
  DashboardMetrics,
  RecentlyViewedFiles,
  FormatDistribution,
  ActivityFeed
} from "../components/dashboard";

export default function ProjectDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const currentProject = location.state?.project;

  const projectName = currentProject?.title || "AI Knowledge Core";
  const projectRole = currentProject?.role || "Owner";
  const handleUploadClick = () => {
    console.log("Upload File clicked");
  };

  const handleAskAIClick = () => {
    console.log("Ask AI clicked");
  };

  const handleRefresh = () => {
    console.log("Sync refreshed");
  };

  const handleViewAllFiles = () => {
    navigate("/documents", { state: { project: currentProject } });
  };

  const handleQuickViewFile = (file) => {
    console.log("Quick view file:", file);
  };

  return (
    <div className="w-full min-h-screen flex flex-row bg-[#F8FAFC] text-[#0F172A] font-[Inter,system-ui,sans-serif]">
      {/* 1. Left Sidebar */}
      <ProjectSidebar activeMenu="dashboard" />

      {/* 2. Main Workspace Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
        {/* Topbar */}
        <WorkspaceTopbar
          projectName={projectName}
          role={projectRole}
          user={{ name: "Nguyễn Văn A", role: "Admin", initials: "NV" }}
          onUploadClick={handleUploadClick}
          onAskAIClick={handleAskAIClick}
        />

        {/* Dashboard Body */}
        <main className="flex-1 p-[24px_28px_28px_28px] flex flex-col gap-[20px] max-w-[1400px] w-full mx-auto">
          {/* View Header */}
          <DashboardHeader
            title={`Tổng quan Dự án: ${projectName}`}
            subtitle="Theo dõi tình trạng tài liệu, lưu trữ MinIO và tương tác hỏi đáp AI thời gian thực."
            onRefresh={handleRefresh}
          />

          {/* 4 Metric Cards */}
          <DashboardMetrics />

          {/* Middle 2-Column Content */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-[20px] items-start">
            {/* Left 8-col: Recent Files & Format Distribution */}
            <div className="lg:col-span-8 flex flex-col gap-[20px]">
              <RecentlyViewedFiles
                onViewAll={handleViewAllFiles}
                onQuickView={handleQuickViewFile}
              />
              <FormatDistribution totalFiles="1,428" />
            </div>

            {/* Right 4-col: Realtime Activity Feed */}
            <div className="lg:col-span-4 flex flex-col gap-[20px]">
              <ActivityFeed />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

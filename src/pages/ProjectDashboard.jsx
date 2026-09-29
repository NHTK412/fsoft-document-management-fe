import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import ProjectSidebar from "../components/layout/ProjectSidebar.jsx";
import WorkspaceTopbar from "../components/layout/WorkspaceTopbar.jsx";
import {
  DashboardHeader,
  DashboardMetrics,
  RecentlyViewedFiles,
  FormatDistribution,
  ActivityFeed,
} from "../components/dashboard";
import { dashboardService, projectService } from "@/services";
import { useAuth } from "@/contexts";

export default function ProjectDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const { user } = useAuth();

  const [project, setProject] = useState(location.state?.project || null);
  const [stats, setStats] = useState(null);
  const [recentFiles, setRecentFiles] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

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
        .catch((e) => console.warn("Không thể tải thông tin dự án:", e.message));
    }
  }, [projectId, location.state]);

  const loadDashboardData = useCallback(async () => {
    if (!projectId) return;
    try {
      setLoading(true);
      const [statsRes, filesRes, actsRes] = await Promise.allSettled([
        dashboardService.getStats(projectId),
        dashboardService.getRecentlyViewed(projectId, 5),
        dashboardService.getActivities(projectId, 10),
      ]);

      if (statsRes.status === "fulfilled" && statsRes.value?.data) {
        setStats(statsRes.value.data);
      }
      if (filesRes.status === "fulfilled" && filesRes.value?.data) {
        setRecentFiles(filesRes.value.data);
      }
      if (actsRes.status === "fulfilled" && actsRes.value?.data) {
        setActivities(actsRes.value.data);
      }
    } catch (err) {
      console.error("Lỗi khi tải dữ liệu dashboard:", err);
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  const projectName = project?.title || project?.name || "AI Knowledge Core";
  const projectRole = project?.role || "Owner";

  const handleRefresh = () => {
    loadDashboardData();
  };

  const handleViewAllFiles = () => {
    navigate(`/projects/${projectId}/documents`, { state: { project } });
  };

  const handleQuickViewFile = (file) => {
    navigate(`/projects/${projectId}/documents`, { state: { project, selectedFileId: file.id } });
  };

  return (
    <div className="w-full min-h-screen flex flex-row bg-[#F8FAFC] text-[#0F172A] font-[Inter,system-ui,sans-serif]">
      {/* 1. Left Sidebar */}
      <ProjectSidebar activeMenu="dashboard" projectId={projectId} />

      {/* 2. Main Workspace Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
        {/* Topbar */}
        <WorkspaceTopbar
          currentProjectId={projectId}
          projectName={projectName}
          role={projectRole}
          user={{
            name: user?.fullName || "Nguyễn Văn A",
            role: user?.role || "Admin",
            initials: user?.initials || "NV",
          }}
        />

        {/* Dashboard Body */}
        <main className="flex-1 p-6 sm:p-8 lg:p-9 xl:p-10 flex flex-col gap-6 max-w-[1600px] w-full mx-auto">
          {/* View Header */}
          <DashboardHeader
            title={`Tổng Quan Dự Án: ${projectName}`}
            subtitle="Theo dõi tình trạng tài liệu, lưu trữ MinIO và tương tác hỏi đáp AI thời gian thực."
            onRefresh={handleRefresh}
          />

          {/* 4 Metric Cards */}
          <DashboardMetrics metrics={stats?.metrics} />

          {/* Middle 2-Column Content */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-[20px] items-start">
            {/* Left 8-col: Recent Files & Format Distribution */}
            <div className="lg:col-span-8 flex flex-col gap-[20px]">
              <RecentlyViewedFiles
                files={recentFiles}
                onViewAll={handleViewAllFiles}
                onQuickView={handleQuickViewFile}
              />
              {/* <FormatDistribution
                totalFiles={stats?.formatDistribution?.totalFiles || "0"}
                formats={stats?.formatDistribution?.formats}
              /> */}
            </div>

            {/* Right 4-col: Realtime Activity Feed */}
            <div className="lg:col-span-4 flex flex-col gap-[20px]">
              <ActivityFeed activities={activities.length > 0 ? activities : undefined} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

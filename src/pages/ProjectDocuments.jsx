import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import ProjectSidebar from "../components/layout/ProjectSidebar.jsx";
import WorkspaceTopbar from "../components/layout/WorkspaceTopbar.jsx";
import {
  DocumentsHeader,
  DocumentsToolbar,
  DocumentsFilterTabs,
  DocumentsTable,
  BulkActionBar,
  UploadModal,
} from "../components/documents";
import { documentService, projectService } from "@/services";
import { useAuth } from "@/contexts";

export default function ProjectDocuments() {
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

  const [files, setFiles] = useState([]);
  const [summary, setSummary] = useState({
    totalFiles: 0,
    totalSize: "0 B",
    counts: { all: 0, docs: 0, sheets: 0, media: 0, images: 0, code: 0 },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [viewMode, setViewMode] = useState("list");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Load project details if not passed via route state
  useEffect(() => {
    if (!project && projectId) {
      projectService.getProjectById(projectId)
        .then((res) => {
          if (res?.data) setProject(res.data);
        })
        .catch((e) => console.warn("Lỗi tải thông tin dự án:", e.message));
    }
  }, [projectId, project]);

  // Fetch documents from API
  const fetchDocuments = useCallback(async () => {
    if (!projectId) return;
    try {
      setLoading(true);
      setError("");
      const res = await documentService.getDocuments(projectId, {
        category: activeFilter !== "all" ? activeFilter : undefined,
        search: searchQuery.trim() || undefined,
        limit: 100,
      });

      if (res?.data) {
        setFiles(res.data.files || []);
        if (res.data.summary) {
          setSummary(res.data.summary);
        }
      }
    } catch (err) {
      console.error("Lỗi khi tải danh sách tài liệu:", err);
      setError(err.message || "Không thể tải danh sách tài liệu!");
    } finally {
      setLoading(false);
    }
  }, [projectId, activeFilter, searchQuery]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const projectName = project?.title || project?.name || "AI Knowledge Core";
  const projectRole = project?.role || "Owner";

  const handleToggleSelect = (fileId) => {
    setSelectedIds((prev) =>
      prev.includes(fileId) ? prev.filter((id) => id !== fileId) : [...prev, fileId]
    );
  };

  const handleToggleSelectAll = () => {
    if (selectedIds.length === files.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(files.map((f) => f.id));
    }
  };

  const handlePreview = async (file) => {
    try {
      const res = await documentService.getPreviewUrl(projectId, file.id);
      if (res?.data?.previewUrl) {
        window.open(res.data.previewUrl, "_blank");
      }
    } catch (err) {
      alert("Lỗi xem trước: " + (err.message || "Không thể tạo liên kết xem trước!"));
    }
  };

  const handleDownload = async (file) => {
    try {
      const res = await documentService.getDownloadUrl(projectId, file.id);
      if (res?.data?.downloadUrl) {
        window.open(res.data.downloadUrl, "_blank");
      }
    } catch (err) {
      alert("Lỗi tải xuống: " + (err.message || "Không thể tạo liên kết tải về!"));
    }
  };

  const handleDelete = async (file) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa vĩnh viễn tệp "${file.name}"?`)) return;
    try {
      await documentService.deleteDocument(projectId, file.id);
      setSelectedIds((prev) => prev.filter((id) => id !== file.id));
      await fetchDocuments();
    } catch (err) {
      alert("Xóa tệp thất bại: " + (err.message || "Lỗi không xác định"));
    }
  };

  const handleBulkDelete = async () => {
    if (!confirm(`Bạn có chắc muốn xóa ${selectedIds.length} tệp tin đã chọn?`)) return;
    try {
      await documentService.bulkDeleteDocuments(projectId, selectedIds);
      setSelectedIds([]);
      await fetchDocuments();
    } catch (err) {
      alert("Xóa hàng loạt thất bại: " + (err.message || "Lỗi không xác định"));
    }
  };

  const selectedTotalSize = useMemo(() => {
    const bytes = files
      .filter((f) => selectedIds.includes(f.id))
      .reduce((acc, f) => acc + (f.sizeBytes || 0), 0);
    if (bytes === 0) return "0 MB";
    const mb = bytes / (1024 * 1024);
    if (mb >= 1024) return `${(mb / 1024).toFixed(1)} GB`;
    return `${mb.toFixed(1)} MB`;
  }, [files, selectedIds]);

  return (
    <div className="w-full min-h-screen flex flex-row bg-[#F8FAFC] text-[#0F172A] font-[Inter,system-ui,sans-serif]">
      {/* 1. Left Project Sidebar */}
      <ProjectSidebar activeMenu="documents" projectId={projectId} />

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
        {/* Workspace Topbar */}
        <WorkspaceTopbar
          projectName={projectName}
          role={projectRole}
          user={{
            name: user?.fullName || "Nguyễn Văn A",
            role: user?.role || "Admin",
            initials: user?.initials || "NV",
          }}
        />

        {/* Explorer Body Container */}
        <main className="flex-1 p-6 sm:p-8 lg:p-9 xl:p-10 flex flex-col gap-6 max-w-[1600px] w-full mx-auto pb-24">
          {/* Page Info Header */}
          <DocumentsHeader
            title="Tài liệu dự án"
            totalFiles={summary.totalFiles || files.length}
            totalSize={summary.totalSize || "0 B"}
            projectName={projectName}
            onUpload={() => setIsUploadModalOpen(true)}
          />

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-[14px] flex items-center justify-between">
              <span>{error}</span>
              <button onClick={fetchDocuments} className="font-semibold underline">Thử lại</button>
            </div>
          )}

          {/* Search and Controls Toolbar */}
          <DocumentsToolbar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />

          {/* Filter Tabs Pills */}
          <DocumentsFilterTabs
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            counts={summary.counts || {
              all: files.length,
              docs: files.filter((f) => f.category === "docs").length,
              sheets: files.filter((f) => f.category === "sheets").length,
              media: files.filter((f) => f.category === "media").length,
              images: files.filter((f) => f.category === "images").length,
              code: files.filter((f) => f.category === "code").length,
            }}
          />

          {/* Flat Files Table Card */}
          {loading ? (
            <div className="w-full py-20 flex flex-col items-center justify-center gap-3 text-slate-400 bg-white border border-slate-200 rounded-xl">
              <div className="w-8 h-8 border-3 border-primary-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-[14px]">Đang tải danh sách tài liệu từ MinIO & Cơ sở dữ liệu...</p>
            </div>
          ) : (
            <DocumentsTable
              files={files}
              selectedIds={selectedIds}
              onToggleSelect={handleToggleSelect}
              onToggleSelectAll={handleToggleSelectAll}
              onPreview={handlePreview}
              onDownload={handleDownload}
              onDelete={handleDelete}
              onMoreOptions={(file) => handlePreview(file)}
            />
          )}

          {/* Bulk Action Floating Bar */}
          <BulkActionBar
            selectedCount={selectedIds.length}
            totalSize={selectedTotalSize}
            onDownloadZip={() => {
              if (selectedIds.length > 0) {
                // Download first selected or open in tabs
                const first = files.find(f => f.id === selectedIds[0]);
                if (first) handleDownload(first);
              }
            }}
            onBulkDelete={handleBulkDelete}
          />
        </main>
      </div>

      {/* 3. Upload Modal Dialog */}
      <UploadModal
        isOpen={isUploadModalOpen}
        projectId={projectId}
        onClose={() => setIsUploadModalOpen(false)}
        onComplete={() => {
          fetchDocuments();
        }}
      />
    </div>
  );
}

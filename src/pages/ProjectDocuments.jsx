import React, { useState, useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
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

const INITIAL_FILES = [
  {
    id: 1,
    name: "Architecture-v2.pdf",
    type: "pdf",
    format: "PDF",
    size: "4.2 MB",
    sizeBytes: 4.2 * 1024 * 1024,
    category: "docs",
    author: "Trần Minh Tâm",
    authorInitials: "T",
    authorColor: "#4F46E5",
    updatedAt: "15 phút trước",
  },
  {
    id: 2,
    name: "Vector-Pipeline-Spec.docx",
    type: "docx",
    format: "DOCX",
    size: "1.8 MB",
    sizeBytes: 1.8 * 1024 * 1024,
    category: "docs",
    author: "Nguyễn Văn A",
    authorInitials: "N",
    authorColor: "#059669",
    updatedAt: "1 giờ trước",
  },
  {
    id: 3,
    name: "K8s-Deployment-Log.xlsx",
    type: "xlsx",
    format: "XLSX",
    size: "2.4 MB",
    sizeBytes: 2.4 * 1024 * 1024,
    category: "sheets",
    author: "Lê Hoàng Nam",
    authorInitials: "L",
    authorColor: "#D97706",
    updatedAt: "Hôm qua",
  },
  {
    id: 4,
    name: "System-Demo-Walkthrough.mp4",
    type: "mp4",
    format: "MP4",
    size: "48.5 MB",
    sizeBytes: 48.5 * 1024 * 1024,
    category: "media",
    author: "Trần Minh Tâm",
    authorInitials: "T",
    authorColor: "#4F46E5",
    updatedAt: "2 ngày trước",
  },
  {
    id: 5,
    name: "Milvus-Cluster-Topology.png",
    type: "png",
    format: "PNG",
    size: "3.1 MB",
    sizeBytes: 3.1 * 1024 * 1024,
    category: "images",
    author: "Trần Minh Tâm",
    authorInitials: "T",
    authorColor: "#4F46E5",
    updatedAt: "3 ngày trước",
  },
  {
    id: 6,
    name: "Raw-Logs-Dump-2026.txt",
    type: "txt",
    format: "TXT",
    size: "850 KB",
    sizeBytes: 850 * 1024,
    category: "code",
    author: "Hoàng Yến",
    authorInitials: "H",
    authorColor: "#EC4899",
    updatedAt: "3 ngày trước",
  },
  {
    id: 7,
    name: "Prompt-Engineering-Guide.md",
    type: "md",
    format: "MARKDOWN",
    size: "320 KB",
    sizeBytes: 320 * 1024,
    category: "code",
    author: "Nguyễn Văn A",
    authorInitials: "N",
    authorColor: "#059669",
    updatedAt: "4 ngày trước",
  },
];

export default function ProjectDocuments() {
  const location = useLocation();
  const params = useParams();
  const currentProject = location.state?.project;

  const projectName = currentProject?.title || "AI Knowledge Core";
  const projectRole = currentProject?.role || "Owner";

  const [files, setFiles] = useState(INITIAL_FILES);
  const [selectedIds, setSelectedIds] = useState([1, 2]); // default selected 2 files like mockup
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [viewMode, setViewMode] = useState("table");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Filter files by tab category and search term
  const filteredFiles = useMemo(() => {
    return files.filter((file) => {
      if (activeFilter !== "all" && file.category !== activeFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          file.name.toLowerCase().includes(q) ||
          file.author.toLowerCase().includes(q) ||
          file.format.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [files, activeFilter, searchQuery]);

  // Compute selected total size
  const selectedTotalSize = useMemo(() => {
    const selectedFiles = files.filter((f) => selectedIds.includes(f.id));
    const totalBytes = selectedFiles.reduce((sum, f) => sum + (f.sizeBytes || 0), 0);
    if (totalBytes >= 1024 * 1024 * 1024) {
      return `${(totalBytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
    }
    return `${(totalBytes / (1024 * 1024)).toFixed(1)} MB`;
  }, [files, selectedIds]);

  const handleToggleSelect = (fileId) => {
    setSelectedIds((prev) =>
      prev.includes(fileId) ? prev.filter((id) => id !== fileId) : [...prev, fileId]
    );
  };

  const handleToggleSelectAll = () => {
    if (selectedIds.length === filteredFiles.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredFiles.map((f) => f.id));
    }
  };

  const handleUpload = () => {
    setIsUploadModalOpen(true);
  };

  const handleDownloadZip = () => {
    console.log("Download zip for ids:", selectedIds);
  };

  const handleReindexAI = () => {
    console.log("Reindex AI for ids:", selectedIds);
  };

  const handleBulkDelete = () => {
    setFiles((prev) => prev.filter((f) => !selectedIds.includes(f.id)));
    setSelectedIds([]);
  };

  return (
    <div className="w-full min-h-screen flex flex-row bg-[#F8FAFC] text-[#0F172A] font-[Inter,system-ui,sans-serif]">
      {/* 1. Left Project Sidebar */} 
      <ProjectSidebar activeMenu="documents" />

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
        {/* Workspace Topbar */}
        <WorkspaceTopbar
          projectName={projectName}
          role={projectRole}
          user={{ name: "Nguyễn Văn A", role: "Admin", initials: "NV" }}
        />

        {/* Explorer Body Container */}
        <main className="flex-1 p-6 sm:p-8 lg:p-9 xl:p-10 flex flex-col gap-6 max-w-[1600px] w-full mx-auto pb-24">
          {/* Page Info Header */}
          <DocumentsHeader
            title="Tài liệu dự án"
            totalFiles={38}
            totalSize="1.2 GB"
            projectName={projectName}
            onUpload={handleUpload}
          />

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
            counts={{
              all: 38,
              docs: 16,
              sheets: 8,
              media: 4,
              images: 6,
              code: 4,
            }}
          />

          {/* Flat Files Table Card */}
          <DocumentsTable
            files={filteredFiles}
            selectedIds={selectedIds}
            onToggleSelect={handleToggleSelect}
            onToggleSelectAll={handleToggleSelectAll}
            onPreview={(file) => console.log("Preview file:", file)}
            onDownload={(file) => console.log("Download file:", file)}
            onDelete={(file) => {
              if (confirm(`Bạn có chắc muốn xóa tệp "${file.name}"?`)) {
                setFiles((prev) => prev.filter((f) => f.id !== file.id));
                setSelectedIds((prev) => prev.filter((id) => id !== file.id));
              }
            }}
            onMoreOptions={(file) => console.log("More options for file:", file)}
          />

          {/* Bulk Action Floating Bar */}
          <BulkActionBar
            selectedCount={selectedIds.length}
            totalSize={selectedTotalSize}
            onDownloadZip={handleDownloadZip}
            onBulkDelete={handleBulkDelete}
          />
        </main>
      </div>

      {/* 3. Upload Modal Dialog */}
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onComplete={(uploadedQueue) => {
          console.log("Upload completed with queue:", uploadedQueue);
          setIsUploadModalOpen(false);
        }}
      />
    </div>
  );
}

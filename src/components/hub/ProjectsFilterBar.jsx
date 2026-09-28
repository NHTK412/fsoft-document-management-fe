import React from 'react';

export const ProjectsFilterBar = ({
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  counts = { all: 5, owner: 3, shared: 2 },
}) => {
  const tabs = [
    { id: 'all', label: `Tất cả dự án (${counts.all})` },
    { id: 'owner', label: `Tôi làm chủ (${counts.owner})` },
    { id: 'shared', label: `Được chia sẻ (${counts.shared})` },
  ];

  return (
    <div className="w-full min-h-[52px] px-4 py-2 flex flex-col sm:flex-row gap-3 justify-between items-center bg-white border border-slate-200 rounded-[10px] shadow-2xs">
      
      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange?.(tab.id)}
              className={`px-3.5 py-1.5 rounded-md text-[13px] font-medium transition-colors cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-primary-50 text-primary-600 font-semibold'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Search & Sort Right */}
      <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
        {/* Search Box */}
        <div className="flex-1 sm:w-[360px] h-[36px] px-2.5 flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-md focus-within:border-primary-600 focus-within:ring-1 focus-within:ring-primary-100 transition-all">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3.5 h-3.5 text-slate-400 shrink-0"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="Tìm kiếm dự án..."
            className="w-full text-[13px] bg-transparent text-slate-800 placeholder:text-slate-400 focus:outline-none"
          />
        </div>

        {/* Sort Dropdown */}
        <button
          type="button"
          className="h-[36px] px-3 flex items-center gap-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-md text-slate-700 text-[12px] font-medium transition-colors cursor-pointer shrink-0"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3.5 h-3.5 text-slate-500"
          >
            <line x1="21" x2="14" y1="4" y2="4" />
            <line x1="10" x2="3" y1="4" y2="4" />
            <line x1="21" x2="12" y1="12" y2="12" />
            <line x1="8" x2="3" y1="12" y2="12" />
            <line x1="21" x2="16" y1="20" y2="20" />
            <line x1="12" x2="3" y1="20" y2="20" />
            <line x1="14" x2="14" y1="2" y2="6" />
            <line x1="8" x2="8" y1="10" y2="14" />
            <line x1="16" x2="16" y1="18" y2="22" />
          </svg>
          <span>Cập nhật gần nhất</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3 h-3 text-slate-400"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      </div>

    </div>
  );
};

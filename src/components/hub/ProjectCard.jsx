import React from 'react';
import { formatRole } from '@/utils/formatRole';

export const ProjectCard = ({ project, onClick }) => {
  const {
    title,
    desc,
    role,
    iconBg,
    iconColor,
    updatedAt,
    docsCount,
    membersCount,
    avatars = [],
    extraMembers = 0,
  } = project;

  const isOwner = (role || '').toUpperCase().includes('OWNER');

  return (
    <div
      onClick={onClick}
      className="flex-1 min-w-[320px] flex flex-col gap-4 p-5 bg-white hover:bg-slate-50/50 border border-slate-200 hover:border-primary-300 rounded-[12px] shadow-xs hover:shadow-md transition-all cursor-pointer group"
    >
      {/* Card Header */}
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div
            className="w-[38px] h-[38px] flex items-center justify-center rounded-lg transition-transform group-hover:scale-105"
            style={{ backgroundColor: iconBg }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" style={{ color: iconColor }}>
              <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
              <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
              <line x1="6" x2="6.01" y1="6" y2="6" />
              <line x1="6" x2="6.01" y1="18" y2="18" />
            </svg>
          </div>
          <div className="w-fit flex items-center gap-1.5 px-2 py-1 bg-slate-50 border border-slate-200 rounded-md">
            <span className="text-[11px] text-slate-400">{updatedAt}</span>
          </div>
        </div>

        <span
          className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${isOwner
            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
            : 'bg-blue-50 text-blue-700 border border-blue-200/60'
            }`}
        >
          {formatRole(role)}
        </span>
      </div>

      {/* Title & Desc */}
      <div className="flex flex-col gap-1.5 flex-1">
        <h3 className="text-[16px] font-bold text-slate-900 group-hover:text-primary-600 transition-colors line-clamp-1">
          {title}
        </h3>
        <p className="text-[13px] leading-[19px] text-slate-500 line-clamp-2">
          {desc}
        </p>
      </div>

      {/* AI Status Pill */}


      {/* Card Divider */}
      <div className="w-full h-[1px] bg-slate-100" />

      {/* Card Footer */}
      <div className="w-full flex items-center justify-between pt-0.5">
        <div className="flex items-center gap-3 text-slate-600 text-[12px] font-medium">
          {/* Docs Count */}
          <div className="flex items-center gap-1">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-3.5 h-3.5 text-slate-400"
            >
              <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
              <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            </svg>
            <span>{docsCount}</span>
          </div>

          {/* Members Count */}
          <div className="flex items-center gap-1">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-3.5 h-3.5 text-slate-400"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span>{membersCount}</span>
          </div>
        </div>

        {/* Avatar Stack */}
        <div className="flex items-center -space-x-2">
          {avatars.map((color, index) => (
            <div
              key={index}
              className="w-6 h-6 rounded-full border-2 border-white shadow-2xs"
              style={{ backgroundColor: color }}
            />
          ))}
          {extraMembers > 0 && (
            <div className="w-6 h-6 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[9px] font-semibold text-slate-600 shadow-2xs">
              +{extraMembers}
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

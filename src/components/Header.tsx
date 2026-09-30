import React from 'react';
import { ExternalLink, CheckCircle2, Activity } from 'lucide-react';
import { WorkflowEndpointStatus } from '../types';

interface HeaderProps {
  endpointStatus: WorkflowEndpointStatus | null;
  onOpenModal: () => void;
  onSubmitClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  endpointStatus,
  onOpenModal,
  onSubmitClick,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-800/80 bg-neutral-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="text-lg font-bold tracking-tight text-white transition-opacity hover:opacity-85 font-display"
          >
            Resume Analysier
          </a>
          <span className="text-xs text-neutral-500 hidden sm:inline-block font-mono">
            n8n cloud
          </span>
        </div>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-300">
          <a
            href="#overview"
            className="hover:text-amber-400 transition-colors"
          >
            Overview
          </a>
          <a
            href="#submission-station"
            className="hover:text-amber-400 transition-colors"
          >
            Submit Resume
          </a>
          <a
            href="#pipeline"
            className="hover:text-amber-400 transition-colors"
          >
            Pipeline Logic
          </a>
          <a
            href="#ats-rubric"
            className="hover:text-amber-400 transition-colors"
          >
            ATS Criteria
          </a>
          <button
            onClick={onOpenModal}
            className="text-xs font-mono text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <Activity className="w-3.5 h-3.5 text-amber-400" />
            <span>Endpoint Specs</span>
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <a
            href="https://charishma321.app.n8n.cloud/form/caa03cd9-5a73-4b37-b48c-c6f590493079"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-300 hover:text-white border border-neutral-800 rounded-lg hover:bg-neutral-900 transition-colors"
          >
            <span>Original Form</span>
            <ExternalLink className="w-3 h-3 text-neutral-400" />
          </a>
          <button
            onClick={onSubmitClick}
            className="px-4 py-2 text-xs font-semibold text-neutral-950 bg-amber-400 rounded-lg hover:bg-amber-300 transition-colors whitespace-nowrap shadow-sm shadow-amber-500/20 active:scale-[0.98]"
          >
            Submit Resume
          </button>
        </div>
      </div>
    </header>
  );
};

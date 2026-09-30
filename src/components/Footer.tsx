import React from 'react';
import { ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-neutral-900 bg-neutral-950 py-12 text-xs text-neutral-500">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-neutral-900">
          <div>
            <span className="text-sm font-bold text-white font-display">
              Resume Analysier
            </span>
            <p className="mt-1 text-xs text-neutral-400">
              Automated Resume Evaluation & ATS Ingestion Portal
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-neutral-400">
            <a href="#overview" className="hover:text-white transition-colors">
              Overview
            </a>
            <a href="#submission-station" className="hover:text-white transition-colors">
              Submission Station
            </a>
            <a href="#pipeline" className="hover:text-white transition-colors">
              Workflow Architecture
            </a>
            <a href="#ats-rubric" className="hover:text-white transition-colors">
              ATS Criteria
            </a>
            <a
              href="https://charishma321.app.n8n.cloud/form/caa03cd9-5a73-4b37-b48c-c6f590493079"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
            >
              <span>Original n8n Form</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <p>© {new Date().getFullYear()} Resume Analysier Portal. Automated with n8n Cloud.</p>
          <div className="flex items-center gap-4">
            <span>Candidate Data Privacy Protected</span>
            <span aria-hidden="true">·</span>
            <span>Single-Column ATS Parsing Standard</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

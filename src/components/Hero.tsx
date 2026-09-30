import React from 'react';
import { ArrowRight, CheckCircle2, CloudLightning, ShieldCheck, Zap } from 'lucide-react';
import { WorkflowEndpointStatus } from '../types';

interface HeroProps {
  endpointStatus: WorkflowEndpointStatus | null;
  onScrollToForm: () => void;
  onOpenModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  endpointStatus,
  onScrollToForm,
  onOpenModal,
}) => {
  return (
    <section id="overview" className="relative pt-12 pb-16 md:pt-18 md:pb-24 overflow-hidden border-b border-neutral-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Proposition & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Clean unboxed metadata with subtle typographic separators */}
            <div className="flex items-center gap-2.5 text-xs text-neutral-400 font-mono mb-4">
              <span className="flex items-center gap-1.5 text-amber-400">
                <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                n8n Cloud Webhook
              </span>
              <span aria-hidden="true" className="text-neutral-700">·</span>
              <span>caa03cd9-5a73-4b37-b48c-c6f590493079</span>
              <span aria-hidden="true" className="text-neutral-700">·</span>
              <span className="text-neutral-500">
                {endpointStatus ? `${endpointStatus.latencyMs}ms response` : 'Connected'}
              </span>
            </div>

            {/* Headline with text-wrap: balance */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.12] mb-6 font-display" style={{ textWrap: 'balance' }}>
              Automated Resume Analysis & ATS Optimization Pipeline
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl mb-8">
              Submit your curriculum vitae directly to the automated n8n cloud analysis workflow.
              Get instant scoring on applicant tracking system compliance, keyword alignment,
              and quantified impact before applying to top tier organizations.
            </p>

            {/* Value bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 text-xs text-neutral-300">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Direct n8n Form payload dispatch</span>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Workday & Greenhouse ATS audit</span>
              </div>
              <div className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>Real-time keyword & metric grading</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onScrollToForm}
                className="px-6 py-3.5 text-sm font-semibold text-neutral-950 bg-amber-400 rounded-lg hover:bg-amber-300 transition-all flex items-center gap-2 shadow-lg shadow-amber-500/20 active:scale-[0.98]"
              >
                <span>Upload & Analyze Resume</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenModal}
                className="px-5 py-3.5 text-sm font-medium text-neutral-200 hover:text-white bg-neutral-900 border border-neutral-800 rounded-lg hover:bg-neutral-850 hover:border-neutral-700 transition-all flex items-center gap-2"
              >
                <CloudLightning className="w-4 h-4 text-amber-400" />
                <span>Inspect n8n Pipeline</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl">
              <img
                src="/src/assets/images/hero_resume_analyzer_1790759326135.jpg"
                alt="Minimalist modern recruitment desk with resume review station"
                className="w-full h-auto object-cover aspect-16/9"
                referrerPolicy="no-referrer"
              />

              {/* Overlay telemetry bar */}
              <div className="p-4 bg-neutral-900/95 border-t border-neutral-800/80 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-white">Target Workflow</p>
                  <p className="text-[11px] text-neutral-400 font-mono truncate max-w-[200px]">
                    charishma321.app.n8n.cloud
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1 justify-end">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Webhook Active
                  </span>
                  <span className="text-[10px] text-neutral-500 font-mono">
                    form/caa03cd9-5a73-4b37-b48c
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

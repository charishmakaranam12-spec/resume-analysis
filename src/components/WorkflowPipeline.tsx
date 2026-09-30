import React from 'react';
import { Cpu, FileSpreadsheet, GitBranch, ArrowRight, ShieldCheck, Database } from 'lucide-react';

export const WorkflowPipeline: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Cloud Webhook Trigger Node',
      endpoint: 'POST /form/caa03cd9-5a73-4b37-b48c-c6f590493079',
      desc: 'Listens for multipart candidate submissions with strict schema validation across name, email, and document payload.',
    },
    {
      num: '02',
      title: 'Binary Extraction & Normalization',
      endpoint: 'n8n Binary Parser Engine',
      desc: 'Extracts stream text from PDF, DOCX, and TXT structures, eliminating non-printable artifacts, multi-column tables, and image overlays.',
    },
    {
      num: '03',
      title: 'Semantic ATS Rubric Evaluation',
      endpoint: 'Gemini 2.5 Flash / Algorithmic Core',
      desc: 'Evaluates curriculum vitae against role-specific requirements, assessing typography clarity, metric density, and keyword frequency.',
    },
    {
      num: '04',
      title: 'Workflow Dispatch & Automation',
      endpoint: 'Recruiter CRM / Candidate Notify',
      desc: 'Stores structured candidate record, triggers automated notification hooks, and returns verification telemetry to applicant.',
    },
  ];

  return (
    <section id="pipeline" className="py-16 md:py-24 border-b border-neutral-900 bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono mb-2">
            <span>Workflow Automation Architecture</span>
            <span aria-hidden="true">·</span>
            <span>n8n Cloud Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display">
            How the Automated Resume Analyzer Pipeline Operates
          </h2>
          <p className="mt-3 text-sm text-neutral-400 leading-relaxed">
            Every submission flows through an orchestrated pipeline designed to parse unstructured resume documents
            into high-confidence ATS scoring data.
          </p>
        </div>

        {/* Grid with Visual Asset and Sequential Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Visual Showcase Card */}
          <div className="lg:col-span-5 rounded-2xl border border-neutral-800 bg-neutral-900/90 overflow-hidden shadow-xl">
            <img
              src="/src/assets/images/feature_workflow_automation_1790759351541.jpg"
              alt="Automated data pipeline workstation"
              className="w-full h-auto object-cover aspect-4/3"
              referrerPolicy="no-referrer"
            />
            <div className="p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-white font-mono">
                  charishma321.app.n8n.cloud
                </span>
                <span className="text-[11px] text-amber-400 font-mono">
                  Production Cloud Node
                </span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                The n8n workflow executes server-side automation logic with zero client exposure,
                ensuring resilient data transmission and privacy-compliant candidate processing.
              </p>
            </div>
          </div>

          {/* Sequential Step List */}
          <div className="lg:col-span-7 space-y-4">
            {steps.map((step) => (
              <div
                key={step.num}
                className="p-5 rounded-xl border border-neutral-800/90 bg-neutral-900/60 hover:border-neutral-700 transition-colors"
              >
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/20">
                      {step.num}
                    </span>
                    <h3 className="text-sm font-semibold text-white">
                      {step.title}
                    </h3>
                  </div>
                  <span className="text-[11px] text-neutral-500 font-mono hidden sm:inline-block">
                    {step.endpoint}
                  </span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed pl-9">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

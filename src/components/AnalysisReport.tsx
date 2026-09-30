import React from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  TrendingUp,
  FileCheck,
  Award,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Layers,
} from 'lucide-react';
import { ATSAnalysis, SubmissionResult } from '../types';

interface AnalysisReportProps {
  analysis: ATSAnalysis;
  submission: SubmissionResult | null;
  onReset: () => void;
}

export const AnalysisReport: React.FC<AnalysisReportProps> = ({
  analysis,
  submission,
  onReset,
}) => {
  const getStatusIcon = (status: 'pass' | 'warn' | 'fail') => {
    switch (status) {
      case 'pass':
        return <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />;
      case 'warn':
        return <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />;
      case 'fail':
        return <XCircle className="w-4 h-4 text-rose-400 shrink-0" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-400';
    if (score >= 70) return 'text-amber-400';
    return 'text-rose-400';
  };

  const getScoreBg = (score: number) => {
    if (score >= 85) return 'bg-emerald-400';
    if (score >= 70) return 'bg-amber-400';
    return 'bg-rose-400';
  };

  return (
    <section id="results" className="py-16 md:py-24 border-b border-neutral-900 bg-neutral-950">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        {/* Header with Back/Reset action */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono mb-1">
              <span>ATS Evaluation Report</span>
              <span aria-hidden="true">·</span>
              <span>Workflow Execution Complete</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display">
              Resume Performance & ATS Breakdown
            </h2>
          </div>
          <button
            onClick={onReset}
            className="px-4 py-2 text-xs font-semibold text-neutral-300 hover:text-white border border-neutral-800 rounded-lg hover:bg-neutral-900 transition-colors"
          >
            ← Submit Another Resume
          </button>
        </div>

        {/* n8n Webhook Dispatch Confirmation Box */}
        {submission && (
          <div
            className={`mb-8 p-5 rounded-xl border ${
              submission.success
                ? 'border-emerald-500/30 bg-emerald-950/20 text-emerald-200'
                : 'border-amber-500/30 bg-amber-950/20 text-amber-200'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">
                    {submission.success
                      ? 'Successfully Recorded in n8n Cloud Pipeline'
                      : 'n8n Workflow Notice'}
                  </h4>
                  <p className="text-xs text-neutral-300 mt-0.5">
                    {submission.message}
                  </p>
                  {submission.candidate && (
                    <div className="flex flex-wrap items-center gap-2 mt-2 text-[11px] text-neutral-400 font-mono">
                      <span>Candidate: {submission.candidate.name}</span>
                      <span aria-hidden="true">·</span>
                      <span>Email: {submission.candidate.email}</span>
                      <span aria-hidden="true">·</span>
                      <span>File: {submission.candidate.fileName}</span>
                    </div>
                  )}
                </div>
              </div>
              <a
                href="https://charishma321.app.n8n.cloud/form/caa03cd9-5a73-4b37-b48c-c6f590493079"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 p-2 text-xs text-neutral-400 hover:text-white border border-neutral-800 rounded-lg hover:bg-neutral-900 transition-colors flex items-center gap-1.5"
                title="Verify directly in n8n Form"
              >
                <span className="hidden sm:inline">Inspect n8n URL</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

        {/* Master Score Banner */}
        <div className="mb-10 rounded-2xl border border-neutral-800 bg-neutral-900/90 p-6 sm:p-8 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Score Dial / Numerical Stat */}
            <div className="md:col-span-4 flex flex-col items-center justify-center text-center p-6 bg-neutral-950 rounded-xl border border-neutral-800/80">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                ATS Compatibility
              </span>
              <div className="flex items-baseline gap-1 my-2">
                <span className={`text-6xl font-extrabold tracking-tight tabular-nums ${getScoreColor(analysis.atsScore)} font-display`}>
                  {analysis.atsScore}
                </span>
                <span className="text-xl text-neutral-500 font-mono">/100</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-300 font-medium">
                <span>Grade:</span>
                <span className="font-bold text-amber-400 font-mono text-sm px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/30">
                  {analysis.matchGrade}
                </span>
              </div>
            </div>

            {/* Executive Synthesis */}
            <div className="md:col-span-8 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Executive Summary</span>
              </div>
              <p className="text-sm sm:text-base text-neutral-200 leading-relaxed mb-6">
                {analysis.summary}
              </p>

              {/* 4 Dimension Bars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-neutral-400">Layout & Hierarchy</span>
                    <span className="font-mono text-neutral-200 tabular-nums">
                      {analysis.scores.structure}%
                    </span>
                  </div>
                  <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getScoreBg(analysis.scores.structure)}`}
                      style={{ width: `${analysis.scores.structure}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-neutral-400">Quantified Metrics</span>
                    <span className="font-mono text-neutral-200 tabular-nums">
                      {analysis.scores.quantifiedImpact}%
                    </span>
                  </div>
                  <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getScoreBg(analysis.scores.quantifiedImpact)}`}
                      style={{ width: `${analysis.scores.quantifiedImpact}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-neutral-400">Keyword Alignment</span>
                    <span className="font-mono text-neutral-200 tabular-nums">
                      {analysis.scores.keywordMatch}%
                    </span>
                  </div>
                  <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getScoreBg(analysis.scores.keywordMatch)}`}
                      style={{ width: `${analysis.scores.keywordMatch}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-neutral-400">Brevity & Focus</span>
                    <span className="font-mono text-neutral-200 tabular-nums">
                      {analysis.scores.brevityAndRelevance}%
                    </span>
                  </div>
                  <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getScoreBg(analysis.scores.brevityAndRelevance)}`}
                      style={{ width: `${analysis.scores.brevityAndRelevance}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Keywords Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          
          {/* Detected Keywords */}
          <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/60">
            <h3 className="text-sm font-semibold text-neutral-200 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Recognized Keywords in Profile</span>
            </h3>
            <p className="text-xs text-neutral-400 mb-4">
              These terms will be correctly indexed by automated ATS search filters:
            </p>
            <div className="flex flex-wrap gap-2">
              {analysis.detectedKeywords.map((kw, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 text-xs rounded-md bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 font-mono"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {/* Missing / High-Value Additions */}
          <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/60">
            <h3 className="text-sm font-semibold text-neutral-200 mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-amber-400" />
              <span>Recommended Target Keywords</span>
            </h3>
            <p className="text-xs text-neutral-400 mb-4">
              Adding these high-frequency terms increases rank in recruiter searches:
            </p>
            <div className="flex flex-wrap gap-2">
              {analysis.missingKeywords.map((kw, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 text-xs rounded-md bg-amber-950/60 border border-amber-800/60 text-amber-300 font-mono"
                >
                  + {kw}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Actionable Bullet Point Improvements */}
        <div className="mb-10">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-white font-display">
              Actionable Bullet Point Improvements
            </h3>
            <p className="text-xs text-neutral-400">
              Transform passive task lists into high-impact accomplishments using the Google X-Y-Z formula.
            </p>
          </div>

          <div className="space-y-4">
            {analysis.actionableImprovements.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl border border-neutral-800 bg-neutral-900/80"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-semibold text-amber-400 font-mono">
                    {item.category}
                  </span>
                  <span className="text-[11px] text-neutral-500 font-mono">
                    Impact Priority #{idx + 1}
                  </span>
                </div>
                <p className="text-xs text-neutral-300 mb-3 font-medium">
                  {item.issue}
                </p>
                <p className="text-xs text-neutral-400 mb-3 leading-relaxed">
                  <strong className="text-neutral-200">Recommendation:</strong> {item.recommendation}
                </p>
                <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800/80 text-xs font-mono text-neutral-300">
                  {item.example}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ATS Technical Parser Checklist */}
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-6">
          <h3 className="text-sm font-semibold text-neutral-200 mb-2 flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-sky-400" />
            <span>Applicant Tracking System Verification Checklist</span>
          </h3>
          <p className="text-xs text-neutral-400 mb-6">
            Tested against industry parser standards (Workday, Taleo, Greenhouse, Lever, iCIMS):
          </p>

          <div className="divide-y divide-neutral-800">
            {analysis.atsChecklist.map((item, index) => (
              <div key={index} className="py-3.5 flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">{getStatusIcon(item.status)}</div>
                  <div>
                    <p className="text-xs font-medium text-neutral-200">{item.item}</p>
                    <p className="text-[11px] text-neutral-400 mt-0.5">{item.note}</p>
                  </div>
                </div>
                <span
                  className={`text-[11px] font-mono px-2 py-0.5 rounded capitalize ${
                    item.status === 'pass'
                      ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/60'
                      : item.status === 'warn'
                      ? 'bg-amber-950/80 text-amber-400 border border-amber-800/60'
                      : 'bg-rose-950/80 text-rose-400 border border-rose-800/60'
                  }`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

import React from 'react';
import { Eye, FileCheck2, Filter, Layers, Target, Terminal } from 'lucide-react';

export const ATSBentoGrid: React.FC = () => {
  return (
    <section id="ats-rubric" className="py-16 md:py-24 border-b border-neutral-900 bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono mb-2">
            <span>ATS Engine Benchmark</span>
            <span aria-hidden="true">·</span>
            <span>Parsing Standards</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display">
            What ATS Algorithms Look For in 2026
          </h2>
          <p className="mt-3 text-sm text-neutral-400 leading-relaxed">
            Modern corporate recruiters at Fortune 500 enterprises receive hundreds of applicants per posting.
            Understanding ATS ingestion mechanics ensures your qualifications reach decision-makers.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Bento Card 1: Visual Asset Card (2 columns on md) */}
          <div className="md:col-span-2 rounded-2xl border border-neutral-800 bg-neutral-900/90 overflow-hidden flex flex-col justify-between shadow-xl">
            <div className="p-6 sm:p-8">
              <span className="text-xs font-semibold text-amber-400 font-mono block mb-2">
                Linear Structural Parsing
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
                Single-Column Hierarchy Outperforms Multi-Column Graphics
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-xl">
                Applicant tracking parsers like Workday and Lever scan left-to-right, top-to-bottom.
                Complex multi-column Canva layouts, tables, and floating text boxes cause section interleaving,
                resulting in scrambled work history and automatic filtering.
              </p>
            </div>
            <div className="relative h-64 sm:h-72 w-full overflow-hidden border-t border-neutral-800">
              <img
                src="/src/assets/images/feature_ats_scanning_1790759336662.jpg"
                alt="Executive CV Document Layout Scanning"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Bento Card 2: Quantitative Scan Rigor */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div>
              <span className="text-xs font-semibold text-sky-400 font-mono block mb-2">
                Quantitative Rigor
              </span>
              <h3 className="text-lg font-bold text-white mb-3">
                The 6-Second Recruiter Filter
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed mb-6">
                Studies show recruiters glance at a resume for an average of 7.4 seconds before sorting.
                Bullet points containing specific metrics ($ / % / hours) retain attention 2.8x longer.
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-neutral-800">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-neutral-400">ATS Rejection Rate</span>
                <span className="text-lg font-bold text-rose-400 font-mono tabular-nums">75%</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-neutral-400">Metric Retention Lift</span>
                <span className="text-lg font-bold text-emerald-400 font-mono tabular-nums">+180%</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-neutral-400">Target Keyword Match</span>
                <span className="text-lg font-bold text-amber-400 font-mono tabular-nums">&gt;80%</span>
              </div>
            </div>
          </div>

          {/* Bento Card 3: Google X-Y-Z Formula */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-6 sm:p-8 shadow-xl">
            <span className="text-xs font-semibold text-emerald-400 font-mono block mb-2">
              Formula Standard
            </span>
            <h3 className="text-lg font-bold text-white mb-2">
              Google X-Y-Z Framework
            </h3>
            <p className="text-xs text-neutral-400 mb-4 leading-relaxed">
              Standard format recognized by elite hiring committees:
            </p>
            <div className="p-3.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs font-mono text-neutral-200 mb-3">
              "Accomplished [X], as measured by [Y], by doing [Z]."
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Replace passive job descriptions with verified business outcomes.
            </p>
          </div>

          {/* Bento Card 4: Keyword Density */}
          <div className="md:col-span-2 rounded-2xl border border-neutral-800 bg-neutral-900/80 p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <div>
                <span className="text-xs font-semibold text-amber-400 font-mono block mb-1">
                  Contextual Density
                </span>
                <h3 className="text-lg font-bold text-white">
                  Natural Semantic Keyword Distribution
                </h3>
              </div>
              <span className="text-xs font-mono text-neutral-400 px-2.5 py-1 rounded bg-neutral-950 border border-neutral-800">
                Anti-Stuffing Standard
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-4">
              Modern ATS systems utilize contextual embeddings rather than raw substring matching.
              Avoid hiding white text keywords in footers. Integrate technical proficiencies directly
              into role impact descriptions.
            </p>
            <div className="flex flex-wrap gap-2 text-xs font-mono text-neutral-300">
              <span className="px-2 py-1 rounded bg-neutral-950 border border-neutral-800">System Architecture</span>
              <span className="px-2 py-1 rounded bg-neutral-950 border border-neutral-800">CI/CD Pipelines</span>
              <span className="px-2 py-1 rounded bg-neutral-950 border border-neutral-800">Latency Optimization</span>
              <span className="px-2 py-1 rounded bg-neutral-950 border border-neutral-800">Cross-Functional Leadership</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

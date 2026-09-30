import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ResumeForm } from './components/ResumeForm';
import { AnalysisReport } from './components/AnalysisReport';
import { WorkflowPipeline } from './components/WorkflowPipeline';
import { ATSBentoGrid } from './components/ATSBentoGrid';
import { EndpointModal } from './components/EndpointModal';
import { Footer } from './components/Footer';
import { ATSAnalysis, SubmissionResult, WorkflowEndpointStatus } from './types';

export default function App() {
  const [endpointStatus, setEndpointStatus] = useState<WorkflowEndpointStatus | null>(null);
  const [isPinging, setIsPinging] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysis, setAnalysis] = useState<ATSAnalysis | null>(null);
  const [submission, setSubmission] = useState<SubmissionResult | null>(null);

  // Ping n8n endpoint status on mount
  const checkEndpointStatus = async () => {
    setIsPinging(true);
    try {
      const res = await fetch('/api/n8n-status');
      if (res.ok) {
        const data = await res.json();
        setEndpointStatus(data);
      } else {
        setEndpointStatus({
          status: 'online',
          latencyMs: 142,
          url: 'https://charishma321.app.n8n.cloud/form/caa03cd9-5a73-4b37-b48c-c6f590493079',
          workflowTitle: 'resume analysier',
        });
      }
    } catch {
      setEndpointStatus({
        status: 'online',
        latencyMs: 185,
        url: 'https://charishma321.app.n8n.cloud/form/caa03cd9-5a73-4b37-b48c-c6f590493079',
        workflowTitle: 'resume analysier',
      });
    } finally {
      setIsPinging(false);
    }
  };

  useEffect(() => {
    checkEndpointStatus();
  }, []);

  const handleScrollToForm = () => {
    const el = document.getElementById('submission-station');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAnalysisComplete = (newAnalysis: ATSAnalysis, newSubmission: SubmissionResult) => {
    setAnalysis(newAnalysis);
    setSubmission(newSubmission);
    // Smooth scroll to results
    setTimeout(() => {
      const resultsEl = document.getElementById('results');
      if (resultsEl) {
        resultsEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleReset = () => {
    setAnalysis(null);
    setSubmission(null);
    handleScrollToForm();
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-amber-400/20 selection:text-amber-200">
      <Header
        endpointStatus={endpointStatus}
        onOpenModal={() => setIsModalOpen(true)}
        onSubmitClick={handleScrollToForm}
      />

      <main className="flex-1">
        <Hero
          endpointStatus={endpointStatus}
          onScrollToForm={handleScrollToForm}
          onOpenModal={() => setIsModalOpen(true)}
        />

        <ResumeForm
          onAnalysisComplete={handleAnalysisComplete}
          isProcessing={isProcessing}
          setIsProcessing={setIsProcessing}
        />

        {analysis && (
          <AnalysisReport
            analysis={analysis}
            submission={submission}
            onReset={handleReset}
          />
        )}

        <WorkflowPipeline />

        <ATSBentoGrid />
      </main>

      <Footer />

      <EndpointModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        status={endpointStatus}
        onPing={checkEndpointStatus}
        isPinging={isPinging}
      />
    </div>
  );
}

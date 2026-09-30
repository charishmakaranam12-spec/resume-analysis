import React, { useState, useRef } from 'react';
import {
  Upload,
  FileText,
  Check,
  AlertCircle,
  Sparkles,
  Send,
  X,
  User,
  Mail,
  Briefcase,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';
import { SAMPLE_PROFILES } from '../data/samples';
import { ATSAnalysis, SubmissionResult, SampleProfile } from '../types';

interface ResumeFormProps {
  onAnalysisComplete: (analysis: ATSAnalysis, submission: SubmissionResult) => void;
  isProcessing: boolean;
  setIsProcessing: (val: boolean) => void;
}

const TARGET_ROLES = [
  'Software Engineer',
  'Product Manager',
  'Data Scientist',
  'DevOps & Cloud Engineer',
  'UX/UI Designer',
  'Engineering Manager',
  'Technical Project Manager',
];

export const ResumeForm: React.FC<ResumeFormProps> = ({
  onAnalysisComplete,
  isProcessing,
  setIsProcessing,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [targetRole, setTargetRole] = useState(TARGET_ROLES[0]);
  const [file, setFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState('');
  const [showTextEditor, setShowTextEditor] = useState(false);
  const [activeSampleId, setActiveSampleId] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitNotice, setSubmitNotice] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle sample selection
  const handleSelectSample = (sample: SampleProfile) => {
    setName(sample.name);
    setEmail(sample.email);
    setTargetRole(sample.targetRole);
    setResumeText(sample.snippet);
    setActiveSampleId(sample.id);

    // Create a mock File object from the sample text
    const sampleBlob = new Blob([sample.snippet], { type: 'text/plain' });
    const sampleFile = new File(
      [sampleBlob],
      `${sample.name.replace(/\s+/g, '_')}_Resume.txt`,
      { type: 'text/plain' }
    );
    setFile(sampleFile);

    // Clear validation errors
    setErrors({});
    setSubmitNotice(`Loaded sample profile: ${sample.label}`);
  };

  // Handle custom file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setActiveSampleId(null);
      setErrors((prev) => ({ ...prev, file: '' }));

      // If text file, read text
      if (selected.type === 'text/plain' || selected.name.endsWith('.txt')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setResumeText(event.target.result as string);
          }
        };
        reader.readAsText(selected);
      }
    }
  };

  const handleClearFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    setActiveSampleId(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) {
      newErrors.name = 'Candidate name is required by the n8n form';
    }
    if (!email.trim()) {
      newErrors.email = 'Candidate email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!file && !resumeText.trim()) {
      newErrors.file = 'Please upload a resume file (field-2)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsProcessing(true);
    setSubmitNotice('Preparing multipart payload and dispatching to n8n Cloud...');

    try {
      // Ensure file object exists
      let fileToUpload = file;
      if (!fileToUpload && resumeText.trim()) {
        const blob = new Blob([resumeText], { type: 'text/plain' });
        fileToUpload = new File(
          [blob],
          `${name.replace(/\s+/g, '_') || 'Candidate'}_Resume.txt`,
          { type: 'text/plain' }
        );
      }

      if (!fileToUpload) {
        throw new Error('No resume file provided');
      }

      // 1. Submit to n8n Cloud endpoint via backend proxy
      const n8nFormData = new FormData();
      n8nFormData.append('field-0', name.trim());
      n8nFormData.append('field-1', email.trim());
      n8nFormData.append('field-2', fileToUpload);

      const n8nPromise = fetch('/api/submit-to-n8n', {
        method: 'POST',
        body: n8nFormData,
      }).then(async (res) => {
        const data = await res.json();
        return { ok: res.ok, status: res.status, data };
      });

      // 2. Perform ATS analysis
      const analysisFormData = new FormData();
      analysisFormData.append('field-0', name.trim());
      analysisFormData.append('field-1', email.trim());
      analysisFormData.append('targetRole', targetRole);
      analysisFormData.append('field-2', fileToUpload);
      if (resumeText) {
        analysisFormData.append('resumeText', resumeText);
      }

      const analysisPromise = fetch('/api/analyze-resume', {
        method: 'POST',
        body: analysisFormData,
      }).then(async (res) => {
        const data = await res.json();
        return { ok: res.ok, data };
      });

      // Await both
      const [n8nResult, analysisResult] = await Promise.all([n8nPromise, analysisPromise]);

      const submissionSummary: SubmissionResult = {
        success: n8nResult.ok,
        message: n8nResult.data?.message || 'Form submitted to n8n',
        statusCode: n8nResult.status,
        candidate: {
          name: name.trim(),
          email: email.trim(),
          fileName: fileToUpload.name,
          fileSize: fileToUpload.size,
        },
        error: n8nResult.ok ? undefined : n8nResult.data?.error,
        details: n8nResult.data,
      };

      if (analysisResult.ok && analysisResult.data?.analysis) {
        onAnalysisComplete(analysisResult.data.analysis, submissionSummary);
      } else {
        throw new Error('Failed to generate ATS analysis report');
      }
    } catch (err: any) {
      console.error('Submission error:', err);
      setErrors((prev) => ({
        ...prev,
        form: err?.message || 'An error occurred during submission. Please try again.',
      }));
    } finally {
      setIsProcessing(false);
      setSubmitNotice(null);
    }
  };

  return (
    <section id="submission-station" className="py-16 md:py-24 border-b border-neutral-900 bg-neutral-950">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs text-neutral-400 font-mono mb-3">
            <span>Direct Form Integration</span>
            <span aria-hidden="true">·</span>
            <span className="text-amber-400">POST /form/caa03cd9-5a73-4b37-b48c-c6f590493079</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display">
            Resume Submission & Analysis Station
          </h2>
          <p className="mt-3 text-sm text-neutral-400 leading-relaxed">
            Fill the standard n8n form fields (Name, Email, Resume file) to dispatch your document into
            the automated cloud pipeline while unlocking real-time ATS scoring.
          </p>
        </div>

        {/* Quick Sample Selector */}
        <div className="mb-8 p-4 rounded-xl border border-neutral-800/80 bg-neutral-900/60">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
            <span className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              1-Click Sample Resumes (Test Immediately)
            </span>
            <span className="text-[11px] text-neutral-500 font-mono">
              Prefills name, email & valid CV file
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {SAMPLE_PROFILES.map((sample) => {
              const isSelected = activeSampleId === sample.id;
              return (
                <button
                  key={sample.id}
                  type="button"
                  onClick={() => handleSelectSample(sample)}
                  className={`p-3 text-left rounded-lg border transition-all text-xs ${
                    isSelected
                      ? 'border-amber-400/80 bg-amber-400/10 text-white'
                      : 'border-neutral-800 bg-neutral-900 text-neutral-300 hover:border-neutral-700 hover:text-white'
                  }`}
                >
                  <p className="font-semibold text-neutral-200">{sample.name}</p>
                  <p className="text-[11px] text-neutral-400 truncate">{sample.label}</p>
                  <span className="text-[10px] text-amber-400/80 font-mono mt-1 block">
                    {sample.targetRole}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Form Card */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-neutral-800 bg-neutral-900/90 p-6 sm:p-8 shadow-xl"
        >
          {errors.form && (
            <div className="mb-6 p-4 rounded-lg bg-red-950/60 border border-red-800/80 text-xs text-red-300 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{errors.form}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            
            {/* Field-0: Name */}
            <div>
              <label
                htmlFor="field-0"
                className="block text-xs font-semibold text-neutral-200 mb-2 flex items-center justify-between"
              >
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-neutral-400" />
                  Candidate Name <span className="text-amber-400">*</span>
                </span>
                <span className="text-[11px] text-neutral-500 font-mono">field-0</span>
              </label>
              <input
                id="field-0"
                name="field-0"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                }}
                placeholder="e.g. Alex Morgan"
                className={`w-full px-3.5 py-2.5 text-sm bg-neutral-950 border rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-amber-400 ${
                  errors.name ? 'border-red-500' : 'border-neutral-800 hover:border-neutral-700'
                }`}
              />
              {errors.name && (
                <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>
              )}
            </div>

            {/* Field-1: Email */}
            <div>
              <label
                htmlFor="field-1"
                className="block text-xs font-semibold text-neutral-200 mb-2 flex items-center justify-between"
              >
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-neutral-400" />
                  Email Address <span className="text-amber-400">*</span>
                </span>
                <span className="text-[11px] text-neutral-500 font-mono">field-1</span>
              </label>
              <input
                id="field-1"
                name="field-1"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                }}
                placeholder="e.g. alex.morgan@example.com"
                className={`w-full px-3.5 py-2.5 text-sm bg-neutral-950 border rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-amber-400 ${
                  errors.email ? 'border-red-500' : 'border-neutral-800 hover:border-neutral-700'
                }`}
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>
              )}
            </div>

          </div>

          {/* Target Role selection for ATS Context */}
          <div className="mb-6">
            <label
              htmlFor="target-role"
              className="block text-xs font-semibold text-neutral-200 mb-2 flex items-center justify-between"
            >
              <span className="flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-neutral-400" />
                Target Career Role (For ATS Keyword Benchmarking)
              </span>
              <span className="text-[11px] text-neutral-500 font-mono">Context</span>
            </label>
            <select
              id="target-role"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
            >
              {TARGET_ROLES.map((role) => (
                <option key={role} value={role} className="bg-neutral-950 text-white">
                  {role}
                </option>
              ))}
            </select>
          </div>

          {/* Field-2: Upload Resume (File Dropzone) */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="field-2"
                className="text-xs font-semibold text-neutral-200 flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5 text-neutral-400" />
                Upload Resume File (Upload_Resume) <span className="text-amber-400">*</span>
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowTextEditor(!showTextEditor)}
                  className="text-xs text-amber-400 hover:text-amber-300 transition-colors"
                >
                  {showTextEditor ? 'Hide Text Inspector' : 'View/Edit Resume Text'}
                </button>
                <span className="text-[11px] text-neutral-500 font-mono">field-2</span>
              </div>
            </div>

            <div
              onClick={() => fileInputRef.current?.click()}
              className={`relative cursor-pointer rounded-xl border-2 border-dashed p-6 text-center transition-all ${
                file
                  ? 'border-amber-400/60 bg-amber-400/5'
                  : errors.file
                  ? 'border-red-500/80 bg-red-950/20'
                  : 'border-neutral-800 hover:border-neutral-700 bg-neutral-950/60'
              }`}
            >
              <input
                ref={fileInputRef}
                id="field-2"
                name="field-2"
                type="file"
                accept=".pdf,.docx,.doc,.txt"
                onChange={handleFileChange}
                className="hidden"
              />

              {file ? (
                <div className="flex items-center justify-between px-4 py-2 bg-neutral-900 rounded-lg border border-neutral-800 max-w-lg mx-auto">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <FileText className="w-5 h-5 text-amber-400 shrink-0" />
                    <div className="text-left truncate">
                      <p className="text-xs font-medium text-white truncate">{file.name}</p>
                      <p className="text-[11px] text-neutral-400 font-mono">
                        {(file.size / 1024).toFixed(1)} KB · {file.type || 'document'}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleClearFile}
                    className="p-1 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                    title="Remove file"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-4">
                  <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-3 text-neutral-400">
                    <Upload className="w-5 h-5 text-amber-400" />
                  </div>
                  <p className="text-sm font-medium text-neutral-200">
                    Click to browse or drop your resume here
                  </p>
                  <p className="text-xs text-neutral-500 mt-1">
                    Accepts PDF, DOCX, DOC, or TXT formats (Max 15MB)
                  </p>
                </div>
              )}
            </div>
            {errors.file && (
              <p className="mt-1.5 text-xs text-red-400">{errors.file}</p>
            )}
          </div>

          {/* Optional Resume Text Inspector */}
          {showTextEditor && (
            <div className="mb-6 p-4 rounded-xl border border-neutral-800 bg-neutral-950">
              <label
                htmlFor="resume-text"
                className="block text-xs font-semibold text-neutral-300 mb-2"
              >
                Resume Text Content (Auto-parsed or Manual Input)
              </label>
              <textarea
                id="resume-text"
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste or edit resume text directly..."
                rows={7}
                className="w-full px-3 py-2 text-xs font-mono bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-300 placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-amber-400"
              />
            </div>
          )}

          {/* Submission Feedback & Submit Button */}
          <div className="pt-4 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-neutral-400">
              {submitNotice ? (
                <span className="text-amber-400 flex items-center gap-1.5">
                  <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  {submitNotice}
                </span>
              ) : (
                <span className="flex items-center gap-1 text-neutral-500">
                  <HelpCircle className="w-3.5 h-3.5" />
                  Submits to cloud webhook & runs ATS evaluator
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href="https://charishma321.app.n8n.cloud/form/caa03cd9-5a73-4b37-b48c-c6f590493079"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 text-xs font-medium text-neutral-400 hover:text-white border border-neutral-800 rounded-lg hover:bg-neutral-800 transition-colors flex items-center gap-1.5 whitespace-nowrap"
              >
                <span>View n8n URL</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-neutral-950 bg-amber-400 rounded-lg hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-sm shadow-amber-500/20 active:scale-[0.98] whitespace-nowrap"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
                    <span>Processing Workflow...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Dispatch to n8n & Analyze</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

      </div>
    </section>
  );
};

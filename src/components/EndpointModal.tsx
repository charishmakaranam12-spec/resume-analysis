import React, { useState } from 'react';
import { X, Check, Copy, ExternalLink, Activity, Terminal, Shield } from 'lucide-react';
import { WorkflowEndpointStatus } from '../types';

interface EndpointModalProps {
  isOpen: boolean;
  onClose: () => void;
  status: WorkflowEndpointStatus | null;
  onPing: () => void;
  isPinging: boolean;
}

export const EndpointModal: React.FC<EndpointModalProps> = ({
  isOpen,
  onClose,
  status,
  onPing,
  isPinging,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const n8nUrl = 'https://charishma321.app.n8n.cloud/form/caa03cd9-5a73-4b37-b48c-c6f590493079';
  const curlExample = `curl -X POST "${n8nUrl}" \\
  -F "field-0=Alex Morgan" \\
  -F "field-1=alex.morgan@example.com" \\
  -F "field-2=@resume.pdf"`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(curlExample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl rounded-2xl border border-neutral-800 bg-neutral-900 p-6 sm:p-8 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-6">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-amber-400" />
            <h3 className="text-base font-bold text-white font-display">
              n8n Cloud Webhook Specification
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6 text-xs text-neutral-300">
          
          {/* Status Bar */}
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between">
            <div>
              <p className="text-[11px] text-neutral-400 uppercase tracking-wider font-mono">
                Webhook Status
              </p>
              <p className="text-sm font-semibold text-white mt-0.5 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {status ? `Connected (${status.latencyMs}ms latency)` : 'Active Endpoint'}
              </p>
            </div>
            <button
              onClick={onPing}
              disabled={isPinging}
              className="px-3 py-1.5 text-xs font-medium text-neutral-300 hover:text-white border border-neutral-800 rounded-lg hover:bg-neutral-900 transition-colors"
            >
              {isPinging ? 'Pinging...' : 'Test Connection'}
            </button>
          </div>

          {/* Form Schema */}
          <div>
            <h4 className="text-xs font-semibold text-neutral-200 mb-2 font-mono uppercase tracking-wider">
              Form Schema Fields
            </h4>
            <div className="rounded-xl border border-neutral-800 bg-neutral-950 divide-y divide-neutral-800 font-mono text-xs">
              <div className="p-3 flex justify-between items-center">
                <span className="text-amber-400 font-bold">field-0</span>
                <span className="text-neutral-400">string (Name) · Required</span>
              </div>
              <div className="p-3 flex justify-between items-center">
                <span className="text-amber-400 font-bold">field-1</span>
                <span className="text-neutral-400">email (Email Address) · Required</span>
              </div>
              <div className="p-3 flex justify-between items-center">
                <span className="text-amber-400 font-bold">field-2</span>
                <span className="text-neutral-400">file (Upload_Resume binary) · Required</span>
              </div>
            </div>
          </div>

          {/* Direct cURL snippet */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-neutral-200 font-mono uppercase tracking-wider flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-amber-400" />
                Direct API Invocation (cURL)
              </span>
              <button
                onClick={copyToClipboard}
                className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy cURL'}</span>
              </button>
            </div>
            <pre className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-[11px] text-neutral-300 overflow-x-auto">
              {curlExample}
            </pre>
          </div>

          {/* Links */}
          <div className="pt-2 flex items-center justify-between border-t border-neutral-800">
            <span className="text-[11px] text-neutral-500 font-mono">
              n8n Cloud Workflow caa03cd9-5a73-4b37-b48c
            </span>
            <a
              href={n8nUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
            >
              <span>Open raw n8n Form in Browser</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};

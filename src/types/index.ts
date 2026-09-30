export interface ATSChecklistItem {
  item: string;
  status: 'pass' | 'warn' | 'fail';
  note: string;
}

export interface ActionableImprovement {
  category: string;
  issue: string;
  recommendation: string;
  example: string;
}

export interface ATSAnalysis {
  atsScore: number;
  matchGrade: string;
  summary: string;
  scores: {
    structure: number;
    quantifiedImpact: number;
    keywordMatch: number;
    brevityAndRelevance: number;
  };
  detectedKeywords: string[];
  missingKeywords: string[];
  actionableImprovements: ActionableImprovement[];
  atsChecklist: ATSChecklistItem[];
}

export interface SubmissionResult {
  success: boolean;
  message: string;
  statusCode?: number;
  candidate?: {
    name: string;
    email: string;
    fileName: string;
    fileSize: number;
  };
  error?: string;
  details?: any;
}

export interface WorkflowEndpointStatus {
  status: 'online' | 'degraded' | 'error';
  statusCode?: number;
  latencyMs: number;
  url: string;
  workflowTitle?: string;
  timestamp?: string;
}

export interface SampleProfile {
  id: string;
  name: string;
  email: string;
  targetRole: string;
  label: string;
  snippet: string;
}

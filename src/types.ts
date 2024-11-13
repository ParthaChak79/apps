export interface Problem {
  id: string;
  title: string;
  description: string;
  category: 'business' | 'personal';
  icon: string;
  isUserGenerated?: boolean;
  answer?: string;
}

export interface AnalysisResult {
  content: string;
}
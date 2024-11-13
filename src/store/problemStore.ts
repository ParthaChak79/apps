import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Problem, AnalysisResult } from '../types';
import { TOP_PROBLEMS } from '../data/problems';

interface ProblemState {
  problems: Problem[];
  selectedProblem: Problem | null;
  analysis: AnalysisResult | null;
  isAnalyzing: boolean;
  error: string | null;
  setSelectedProblem: (problem: Problem | null) => void;
  setAnalysis: (analysis: AnalysisResult | null) => void;
  setIsAnalyzing: (isAnalyzing: boolean) => void;
  setError: (error: string | null) => void;
  addProblem: (problem: Omit<Problem, 'id'>) => void;
  saveProblemAnswer: (problemId: string, answer: string) => void;
}

export const useProblemStore = create<ProblemState>()(
  persist(
    (set) => ({
      problems: TOP_PROBLEMS,
      selectedProblem: null,
      analysis: null,
      isAnalyzing: false,
      error: null,
      setSelectedProblem: (problem) => set({ selectedProblem: problem }),
      setAnalysis: (analysis) => set({ analysis }),
      setIsAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
      setError: (error) => set({ error }),
      addProblem: (problem) => set((state) => ({
        problems: [
          ...state.problems,
          {
            ...problem,
            id: crypto.randomUUID(),
            isUserGenerated: true,
          },
        ],
      })),
      saveProblemAnswer: (problemId, answer) => set((state) => ({
        problems: state.problems.map((p) =>
          p.id === problemId ? { ...p, answer } : p
        ),
      })),
    }),
    {
      name: 'problem-store',
      partialize: (state) => ({
        problems: state.problems,
      }),
      merge: (persistedState: any, currentState) => ({
        ...currentState,
        problems: persistedState.problems || TOP_PROBLEMS,
      }),
    }
  )
);
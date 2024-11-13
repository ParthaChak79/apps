import React from 'react';
import { Problem } from '../types';

interface AnalysisProps {
  problem: Problem;
  content: string;
}

export function Analysis({ problem, content }: AnalysisProps) {
  const formatContent = (text: string) => {
    return text.split('\n').map((line, index) => {
      const indent = (line.match(/^[#-*\s]+/) || [''])[0].length;
      const formattedLine = line.replace(/^[#-*\s]+/, '').trim();
      
      if (!formattedLine) return null;
      
      return (
        <div
          key={index}
          className="py-1"
          style={{ paddingLeft: `${indent * 1.5}rem` }}
        >
          <span className={indent === 0 ? 'font-bold text-lg' : ''}>
            {formattedLine}
          </span>
        </div>
      );
    });
  };

  return (
    <div className="mt-8">
      <div className="bg-white dark:bg-dark-card rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
          MECE Analysis: {problem.title}
        </h2>
        <div className="prose dark:prose-invert max-w-none">
          <div className="space-y-1 text-gray-700 dark:text-gray-300">
            {formatContent(content)}
          </div>
        </div>
      </div>
    </div>
  );
}
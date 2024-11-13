import React from 'react';
import { Loader2 } from 'lucide-react';

export function LoadingAnalysis() {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-40">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
        <p className="text-lg font-medium text-gray-900">Analyzing problem...</p>
        <p className="text-sm text-gray-500">This may take a few moments</p>
      </div>
    </div>
  );
}
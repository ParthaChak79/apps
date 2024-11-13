import React from 'react';
import { motion } from 'framer-motion';
import { Problem } from '../types';
import * as Icons from 'lucide-react';

interface ProblemCardProps {
  problem: Problem;
  onClick: () => void;
}

export function ProblemCard({ problem, onClick }: ProblemCardProps) {
  const Icon = (Icons as any)[problem.icon] || Icons.HelpCircle;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-all"
      onClick={onClick}
    >
      <div className="flex items-center mb-4">
        <Icon className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{problem.title}</h3>
      </div>
      <p className="text-gray-600 dark:text-gray-400">{problem.description}</p>
      <div className="mt-4 flex items-center gap-2">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
          {problem.category}
        </span>
        {problem.isUserGenerated && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
            Community
          </span>
        )}
      </div>
    </motion.div>
  );
}
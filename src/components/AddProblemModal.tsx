import React, { useState } from 'react';
import { X } from 'lucide-react';
import * as Icons from 'lucide-react';

interface AddProblemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (problem: {
    title: string;
    description: string;
    category: 'business' | 'personal';
    icon: string;
  }) => void;
}

const ICON_OPTIONS = [
  'Lightbulb', 'Brain', 'Target', 'TrendingUp', 'Users',
  'Building', 'Rocket', 'Star', 'Heart', 'Shield'
];

export function AddProblemModal({ isOpen, onClose, onSubmit }: AddProblemModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'business',
    icon: 'Lightbulb'
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      title: '',
      description: '',
      category: 'business',
      icon: 'Lightbulb'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New Problem</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
                rows={3}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as 'business' | 'personal' })}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="business">Business</option>
                <option value="personal">Personal</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Icon
              </label>
              <div className="grid grid-cols-5 gap-2">
                {ICON_OPTIONS.map((iconName) => {
                  const Icon = (Icons as any)[iconName];
                  return (
                    <button
                      key={iconName}
                      type="button"
                      onClick={() => setFormData({ ...formData, icon: iconName })}
                      className={`p-2 rounded-md ${
                        formData.icon === iconName
                          ? 'bg-blue-100 text-blue-600'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <Icon size={24} />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add Problem
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
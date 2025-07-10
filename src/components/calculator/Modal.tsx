"use client";

import { ReactNode } from 'react';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ show, onClose, children }: ModalProps) {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/10 backdrop-blur-sm flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl max-w-md w-full relative border border-gray-200 dark:border-gray-700 animate-fade-in transition-all duration-200 ease-in-out">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-100 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Modal Content */}
        <div className="overflow-y-auto max-h-[80vh] text-gray-800 dark:text-gray-100">
          {children}
        </div>
      </div>
    </div>
  );
}

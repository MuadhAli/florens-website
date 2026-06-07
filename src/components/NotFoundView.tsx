import React from 'react';
import { Link } from 'react-router-dom';
import { getPath } from '../navigation';
import { ArrowLeft } from 'lucide-react';

export default function NotFoundView() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-20 bg-[#f9f9ff]">
      <h1 className="font-serif text-6xl md:text-8xl text-primary font-bold mb-6">404</h1>
      <h2 className="font-sans text-2xl md:text-3xl font-semibold mb-6">Page Not Found</h2>
      <p className="font-sans text-neutral-500 mb-10 max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link 
        to={getPath('home')}
        className="bg-[#005eb5] text-white font-mono text-sm font-bold uppercase tracking-widest px-8 py-4 rounded hover:bg-opacity-90 transition-all flex items-center gap-3"
      >
        <ArrowLeft className="w-5 h-5" /> Back to Home
      </Link>
    </div>
  );
}

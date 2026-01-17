import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`relative rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl overflow-hidden
        before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:to-transparent
        hover:shadow-2xl transition-all duration-300 ease-in-out cursor-pointer ${className}`}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default GlassCard;
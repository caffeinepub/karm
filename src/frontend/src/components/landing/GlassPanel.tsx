import { ReactNode } from 'react';

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  strong?: boolean;
}

export default function GlassPanel({ children, className = '', strong = false }: GlassPanelProps) {
  return (
    <div className={`${strong ? 'glass-panel-strong' : 'glass-panel'} ${className}`}>
      {children}
    </div>
  );
}

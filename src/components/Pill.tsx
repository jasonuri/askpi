interface PillProps {
  children: React.ReactNode;
  className?: string;
}

export function Pill({ children, className = "" }: PillProps) {
  return (
    <div className={`inline-flex items-center px-3 py-1 border border-black rounded-full text-sm font-medium text-primary mb-8 ${className}`}
         style={{ 
           backgroundColor: "#444444",
           boxShadow: "0 0 8px rgba(101, 236, 135, 0.3), 0 0 16px rgba(101, 236, 135, 0.1)" 
         }}>
      {children}
    </div>
  );
}
import { cn } from "./utils";

interface SectionHeaderProps {
  label: string;
  title?: string;
  description?: string;
  className?: string;
  descriptionClassName?: string;
}

export function SectionHeader({
  label,
  title,
  description,
  className,
  descriptionClassName,
}: SectionHeaderProps) {
  return (
    <div className={cn("text-center space-y-4", title && "mb-16", className)}>
      <p className="text-sm font-medium text-primary uppercase tracking-widest">
        {label}
      </p>
      {title && (
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground">
          {title}
        </h2>
      )}
      {description && (
        <p className={cn("text-muted-foreground", descriptionClassName)}>
          {description}
        </p>
      )}
    </div>
  );
}

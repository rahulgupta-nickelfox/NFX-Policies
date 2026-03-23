interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
};

export function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  return (
    <div
      className={[
        'border-border border-t-accent animate-spin rounded-full border-2',
        sizeClasses[size],
        className,
      ].join(' ')}
      role="status"
      aria-label="Loading"
    />
  );
}

import React from 'react';
import { cn } from '@/lib/utils';

export const CodeBlock = ({
  children,
  language,
  file,
}: {
  children: React.ReactNode;
  language?: string;
  file?: string;
  isComplete?: boolean;
  baseDir?: string;
}) => {
  return (
    <div className="my-2 text-left">
      {file && <div className="text-xs text-muted-foreground p-2 bg-muted rounded-t-md">{file}</div>}
      <pre
        className={cn(
          'bg-card p-3 font-mono text-sm rounded-b-md border',
          !file && 'rounded-md',
        )}
      >
        <code className={`language-${language}`}>{children}</code>
      </pre>
    </div>
  );
};

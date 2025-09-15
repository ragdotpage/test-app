import React from 'react';

export const CodeInline = ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => {
  return (
    <code {...props} className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
      {children}
    </code>
  );
};

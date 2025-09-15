import React from 'react';

export const CustomCommandBashBlock = ({
  command,
  output,
}: {
  command: string;
  output: string;
  baseDir: string;
}) => {
  return (
    <div className="custom-command-bash my-2 bg-card p-3 rounded-lg border font-mono text-sm text-left">
      <div className="command flex items-center gap-2">
        <span className="text-muted-foreground">$</span>
        <span>{command}</span>
      </div>
      {output && <pre className="output mt-2 whitespace-pre-wrap">{output}</pre>}
    </div>
  );
};

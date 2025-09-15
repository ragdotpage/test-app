import React from "react";

export const ThinkingAnswerBlock = ({
  thinking,
  answer,
}: {
  thinking: string;
  answer?: string | null;
  baseDir: string;
  allFiles: string[];
  renderMarkdown?: boolean;
}) => {
  return (
    <div className="thinking-answer-block my-2 text-left">
      <details className="bg-card/50 border rounded-lg">
        <summary className="p-2 cursor-pointer font-semibold">Thinking</summary>
        <pre className="p-2 border-t whitespace-pre-wrap font-sans">
          {thinking}
        </pre>
      </details>
      {answer && (
        <div className="answer-block mt-2 p-2 bg-card rounded-lg border">
          <pre className="whitespace-pre-wrap font-sans">{answer}</pre>
        </div>
      )}
    </div>
  );
};

import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";

import { CopyMessageButton } from "./CopyMessageButton";

import { useParsedContent } from "@/hooks/useParsedContent";
import type { Message } from "@/types/message";

type Props = {
  baseDir: string;
  message: Message;
  allFiles: string[];
};

export const ReflectedMessageBlock = ({
  baseDir,
  message,
  allFiles,
}: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const parsedContent = useParsedContent(baseDir, message.content, allFiles);

  return (
    <div className="rounded-md p-3 mb-2 max-w-full text-xs bg-bg-primary-light-strong border border-border-dark-light-strong text-text-muted-light  relative group break-words whitespace-pre-wrap">
      <div
        className="flex items-center cursor-pointer select-none"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? (
          <MdKeyboardArrowDown className="mr-2" />
        ) : (
          <MdKeyboardArrowRight className="mr-2" />
        )}
        <span className="opacity-70 text-xs">ReflectedMessageBlock</span>
      </div>
      {isExpanded && (
        <div className="mt-2">
          {parsedContent}
          <div className="absolute top-2 right-2">
            <CopyMessageButton
              content={message.content}
              className="text-text-muted-dark hover:text-text-tertiary"
            />
          </div>
        </div>
      )}
    </div>
  );
};

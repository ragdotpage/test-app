import { useMemo } from 'react';

import { parseMessageContent } from '@/components/message/utils';

export const useParsedContent = (baseDir: string, content: string | null | undefined, allFiles: string[], renderMarkdown?: boolean) => {
  return useMemo(() => {
    if (!content) {
      return null;
    }
    return parseMessageContent(baseDir, content, allFiles, renderMarkdown);
    // we use allFiles.length to re-evaluate if the array content might have changed
    // even if the array reference itself hasn't.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseDir, content, allFiles.length, renderMarkdown]);
};

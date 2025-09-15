import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UsageReportData } from '@common/types';
import { MdDeleteForever, MdRedo, MdEdit } from 'react-icons/md';
import { FaEllipsisVertical } from 'react-icons/fa6';
import { twMerge } from 'tailwind-merge';

import { IconButton } from '../common/IconButton';

import { CopyMessageButton } from './CopyMessageButton';
import { UsageInfo } from './UsageInfo';

import { useClickOutside } from '@/hooks/useClickOutside';

type Props = {
  className?: string;
  content?: string;
  usageReport?: UsageReportData;
  remove?: () => void;
  redo?: () => void;
  edit?: () => void;
};

export const MessageBar = ({ className, content, usageReport, remove, redo, edit }: Props) => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useClickOutside([menuRef, buttonRef], () => {
    setIsMenuOpen(false);
  });

  const handleRemoveClick = () => {
    remove?.();
    setIsMenuOpen(false);
  };

  const handleRedoClick = () => {
    redo?.();
    setIsMenuOpen(false);
  };

  const handleEditClick = () => {
    edit?.();
    setIsMenuOpen(false);
  };

  return (
    <div className={twMerge('mt-3 pt-3 h-[30px] flex items-center justify-end gap-3 border-t border-border-dark-light px-1 relative', className)}>
      {usageReport && <UsageInfo usageReport={usageReport} className="mt-[4px]" />}
      {content && <CopyMessageButton content={content} className="transition-colors text-text-dark hover:text-text-primary" alwaysShow={true} />}
      {(remove || redo || edit) && (
        <div ref={buttonRef}>
          <IconButton
            icon={<FaEllipsisVertical className="w-4 h-4" />}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="transition-colors text-text-dark hover:text-text-primary"
          />
        </div>
      )}
      {isMenuOpen && (remove || redo || edit) && (
        <div
          ref={menuRef}
          className="absolute right-0 bottom-full mb-1 w-[120px] bg-bg-secondary-light border border-border-default-dark rounded shadow-lg z-10"
        >
          <ul>
            {edit && (
              <li
                className="flex items-center gap-1 px-2 py-1 text-2xs text-text-primary hover:bg-bg-tertiary cursor-pointer transition-colors"
                onClick={handleEditClick}
              >
                <MdEdit className="w-4 h-4" />
                <span className="whitespace-nowrap mb-[-4px]">{t('messages.edit')}</span>
              </li>
            )}
            {redo && (
              <li
                className="flex items-center gap-1 px-2 py-1 text-2xs text-text-primary hover:bg-bg-tertiary cursor-pointer transition-colors"
                onClick={handleRedoClick}
              >
                <MdRedo className="w-4 h-4" />
                <span className="whitespace-nowrap mb-[-4px]">{t('messages.redo')}</span>
              </li>
            )}
            {remove && (
              <li
                className="flex items-center gap-1 px-2 py-1 text-2xs text-text-primary hover:bg-bg-tertiary cursor-pointer transition-colors"
                onClick={handleRemoveClick}
              >
                <MdDeleteForever className="w-4 h-4" />
                <span className="whitespace-nowrap mb-[-4px]">{t('messages.delete')}</span>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

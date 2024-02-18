import React, { useState } from 'react';
import './MoreOptionDocument.scss';
import { AnimatePresence, motion } from 'framer-motion';

interface IPropsMoreOptionsDocument {
  isOpen: boolean;
  buttonsList?: string[];
  setOpenWindow: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MoreOptionsDocument: React.FC<IPropsMoreOptionsDocument> = ({
  setOpenWindow,
  isOpen,
}) => {
  const [_file, setFile] = useState<FileList | null>(null);

  const handleSaveFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files);
      setOpenWindow(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          layout
          initial={{ opacity: 0, y: '100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '100%' }}
          className='generealWrapper'
        >
          <label htmlFor='selectFile' className='generealWrapper__buttonText'>
            Update document
          </label>
          <input
            type='file'
            id='selectFile'
            accept='.pdf, .doc'
            style={{ display: 'none' }}
            onChange={handleSaveFile}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

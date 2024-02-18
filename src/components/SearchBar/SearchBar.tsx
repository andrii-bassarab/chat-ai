import { useSearchOnDocument } from '@/store/searchOnDocument';
import { faClose, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import './SearchBar.scss';

interface IProps {
  openSearchInput: boolean;
  setOpenSearchInput: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SearchBar: React.FC<IProps> = ({ openSearchInput, setOpenSearchInput }) => {
  const { input, setInput } = useSearchOnDocument();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    openSearchInput && inputRef.current?.focus();
  }, [openSearchInput])

  return (
    <AnimatePresence>
      {openSearchInput && (
        <motion.label
          layout
          initial={{ opacity: 0, y: '100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '-100%' }}
          className='header__search-input-label'
        >
          <input
            className='header__search-input'
            type='text'
            placeholder='Enter a text'
            value={input}
            ref={inputRef}
            onChange={(e) => setInput(e.target.value)}
          />
          <FontAwesomeIcon className='header__search-input-cursor' width={12} icon={faSearch} />
          <FontAwesomeIcon
            onClick={() => (setOpenSearchInput(false), setInput(''))}
            className='header__search-input-cursor'
            width={12}
            icon={faClose}
          />
        </motion.label>
      )}
    </AnimatePresence>
  );
};

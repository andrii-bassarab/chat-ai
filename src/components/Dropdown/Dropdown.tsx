import { useRef, useState } from 'react';
import './Dropdown.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { useDocuments } from '@/store/documents';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import { useClickOutside } from '@/hooks/useClickOutside';

const variants: Variants = {
  initial: {
    opacity: 0,
    height: 0,
  },
  animate: {
    opacity: 1,
    height: 'auto',
  },
};

export default function Dropdown() {
  const [isActive, setIsActive] = useState(false);
  const { setFilter, filter } = useDocuments();
  const dropdownRef = useRef(null);

  useClickOutside(dropdownRef, () => setIsActive(false), isActive);

  return (
    <div className='dropdown' ref={dropdownRef}>
      <button
        onClick={() => {
          setIsActive(!isActive);
        }}
        className='dropdown-btn'
      >
        {filter.value}
        <FontAwesomeIcon icon={isActive ? faAngleUp : faAngleDown} />
      </button>
      <AnimatePresence>
        {isActive && (
          <motion.div
            className='dropdown-content'
            variants={variants}
            initial='initial'
            animate='animate'
            exit='initial'
          >
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsActive(!isActive);
                setFilter('all');
              }}
              className='item'
            >
              All
            </motion.div>
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='item'
              onClick={() => {
                setIsActive(!isActive);
                setFilter('lastSaved');
              }}
            >
              Last Saved
            </motion.div>
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='item'
              onClick={() => {
                setIsActive(!isActive);
                setFilter('lastViewed');
              }}
            >
              Latest Viewed
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { forwardRef, useEffect, useRef } from 'react';
import Highlighter from 'react-highlight-words';
import './DocumentPage.scss';
import { useInView } from 'react-intersection-observer';
import { useCurrentDocument } from '@/store/currentDocument';
import { IPage } from '../types';
import { mergeRefs } from '@/utils/ref';
import { useSearchOnDocument } from '@/store/searchOnDocument';
import React from 'react';

interface IProps {
  page: IPage;
}

export const DocumentPage = forwardRef<HTMLElement, IProps>(({ page }, ref) => {
  const {
    setCurrentPageFocusNumber,
    showScrollAnimation,
    currentPageFocusNumber,
    setShowScrollAnimation,
  } = useCurrentDocument();

  const { input } = useSearchOnDocument();

  const focusRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (page.number === currentPageFocusNumber && focusRef.current && showScrollAnimation) {
      focusRef.current.scrollIntoView({ block: 'start' });
      setShowScrollAnimation(false);
    }
  }, [showScrollAnimation]);

  const { ref: inViewRef, inView } = useInView({
    threshold: 0.3,
  });

  useEffect(() => {
    if (inView) {
      setCurrentPageFocusNumber(page.number);
    }
  }, [inView]);

  const combineRef = mergeRefs(inViewRef, focusRef, ref);

  const convertTextToHTML = (text: string) => {
    const lines = text.split('\n');

    const indentedHTML = lines.map((line, index) => {
      return (
        <React.Fragment key={index}>
          {index ? '\n' : null}
          <Highlighter
            className='document-page__paragraph'
            searchWords={[input]}
            autoEscape={true}
            textToHighlight={index ? '\n' + line : line}
          />
        </React.Fragment>
      );
    });

    return indentedHTML;
  };

  return (
    <article
      ref={combineRef}
      className='document-page'
      children={convertTextToHTML(page.content)}
    />
  );
});

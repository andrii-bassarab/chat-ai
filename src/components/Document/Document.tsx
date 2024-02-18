import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import './Document.scss';
import { DocumentPage } from './DocumentPage';
import './helper';
import { IDocument } from '@/types/Document';
import { useCurrentDocument } from '@/store/currentDocument';
import { characterWidth, fontSize, lineHeight, padding } from './helper';

interface IProps {
  document: IDocument | null;
}

export const Document: React.FC<IProps> = ({ document }) => {
  const { pages, setPages } = useCurrentDocument();
  const documentPageRef = useRef<HTMLElement>(null);
  const [documentPageSize, setDocumentSize] = useState({ width: 640, height: 850 });
  const documentText = document?.extractedText || '';

  const documentWidth = useMemo(
    () => Math.min(documentPageSize.width, 640) - padding * 2,
    [documentPageSize.width],
  );
  const charactersPerLine = useMemo(
    () => Math.floor(documentWidth / characterWidth),
    [documentWidth],
  );
  const documentHeight = useMemo(
    () => Math.min(documentPageSize.height, 850) - padding * 2,
    [documentPageSize.height],
  );
  const linesPerPage = useMemo(
    () => Math.floor(documentHeight / (fontSize * lineHeight)),
    [documentHeight],
  );

  useEffect(() => {
    const paragraphs: string[] = documentText.split('\n');
    const pagesArray = [];
    let currentPageContent = '';
    let currentPageNumber = 1;
    let currentLinesOccupied = 0;

    paragraphs.forEach((paragraph) => {
      const paragraphLinesOccupied = Math.ceil(paragraph.length / charactersPerLine);

      const linesOccupied = Math.ceil(currentLinesOccupied + paragraphLinesOccupied);

      if (linesOccupied > linesPerPage && currentPageContent.trim() !== '') {
        pagesArray.push({ number: currentPageNumber, content: currentPageContent.trim() });
        currentPageContent = paragraph + '\n';
        currentPageNumber++;
        currentLinesOccupied = paragraphLinesOccupied;
      } else {
        const emptyString = String().padEnd(charactersPerLine, ' ');

        currentPageContent += paragraph + '\n' + emptyString;
        currentLinesOccupied += paragraphLinesOccupied + 1;
      }
    });

    if (currentPageContent.trim() !== '') {
      pagesArray.push({ number: currentPageNumber, content: currentPageContent.trim() });
    }

    setPages(pagesArray);
  }, [documentText, linesPerPage]);

  useLayoutEffect(() => {
    documentPageRef.current &&
      setDocumentSize({
        height: documentPageRef.current?.offsetHeight,
        width: documentPageRef.current?.offsetWidth,
      });
  }, [documentPageRef.current]);

  if (!document) {
    return <DocumentPage page={{ number: 0, content: '' }} />;
  }

  return (
    <div>
      {pages.map((page, index) => (
        <DocumentPage
          key={page.number}
          ref={index === 0 ? documentPageRef : undefined}
          page={page}
        />
      ))}
    </div>
  );
};

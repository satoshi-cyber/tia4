import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import SkeletonLoader from '@/components/SkeletonLoader';

import { CLASS_NAMES, PDF_WORKER_SRC, SKELETON_PROPS } from './Pdf-constants';
import { PdfProps } from './Pdf-types';
import { usePdf } from './Pdf-hook';

pdfjs.GlobalWorkerOptions.workerSrc = PDF_WORKER_SRC;

const Pdf: React.FC<PdfProps> = ({ src }) => {
  const { onDocumentLoadSuccess, pages } = usePdf();

  if (!src) {
    return (
      <div className={CLASS_NAMES.loadingContainer}>
        <SkeletonLoader {...SKELETON_PROPS} />
      </div>
    );
  }

  return (
    <Document
      file={src}
      onLoadSuccess={onDocumentLoadSuccess}
      loading={
        <div className={CLASS_NAMES.loadingContainer}>
          <SkeletonLoader {...SKELETON_PROPS} />
        </div>
      }
    >
      {pages.map((index: number) => (
        <Page
          key={index}
          pageNumber={index}
          width={820}
          className={CLASS_NAMES.page}
        />
      ))}
    </Document>
  );
};

export default Pdf;

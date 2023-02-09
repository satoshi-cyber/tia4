import { pdfjs } from 'react-pdf'

export const PDF_WORKER_SRC = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export const CLASS_NAMES = {
    loadingContainer: "border my-10 xl:-ml-[90px] xl:w-[820px] p-16",
    page: "border my-10 xl:-ml-[90px]"
}

export const SKELETON_PROPS = {
    isLoading: true,
    count: 50
}
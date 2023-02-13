import { useState } from "react";

export const usePdf = () => {
    const [pages, setPages] = useState<any>([]);

    const onDocumentLoadSuccess = ({ numPages }: any) => {
        setPages(
            Array(numPages)
                .fill(0)
                .map((_, index) => index + 1)
        );
    };

    return { pages, onDocumentLoadSuccess }

}
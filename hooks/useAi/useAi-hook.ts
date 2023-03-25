import { useState, useLayoutEffect } from 'react';

type UseSSEHookReturnType<T> = [T | null, string | null, number, (streamUrls: string[]) => void, () => void, () => void];

const useAI = <T>(): UseSSEHookReturnType<T> => {
    const [urls, setUrls] = useState<string[]>([])
    const [data, setData] = useState<T | null>(null);
    const [eventSource, setEventSource] = useState<EventSource | null>(null);
    const [urlIndex, setUrlIndex] = useState<number>(-1);

    const currentUrl = urlIndex >= 0 && urlIndex < urls.length ? urls[urlIndex] : null;

    useLayoutEffect(() => {
        if (urlIndex >= 0 && urlIndex < urls.length) {
            setData(null);

            const newEventSource = new EventSource(urls[urlIndex], { withCredentials: false, });
            setEventSource(newEventSource);

            newEventSource.onmessage = (event) => {
                setData((prevData) => prevData ? prevData + event.data : event.data);
            };

            newEventSource.onerror = () => {
                newEventSource.close()

                setUrlIndex((prevIndex) => prevIndex + 1);

            };

            return
        }

        return () => eventSource?.close()
    }, [urls, urlIndex]);

    const startStream = (streamUrls: string[]) => {
        setUrls(streamUrls);
        // Set the first URL as the current URL
        setUrlIndex(0);
    };

    const nextStream = () => {
        setData(null);
        setUrlIndex((prevIndex) => prevIndex + 1);
    };

    const stopStream = () => {
        eventSource && eventSource.close();
        setUrlIndex(-1);
    };

    return [data, currentUrl, urlIndex, startStream, stopStream, nextStream];
};

export default useAI;
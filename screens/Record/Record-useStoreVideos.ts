import { set, get, del } from 'idb-keyval'

import { useCallback, useEffect, useState } from "react";

export const useStoreVideos = (questionsIds: string[]) => {
  const [videos, setVideos] = useState<Record<string, Blob>>({})

  const storeVideo = useCallback((id: string, blob: Blob) => {
    const newVideos = { ...videos, [id]: blob }

    setVideos(newVideos)
    set(id, blob)

  }, [videos])

  const deleteVideo = useCallback((id: string) => {
    const newVideos = { ...videos }
    delete newVideos[id]

    setVideos(newVideos)
    del(id)

  }, [videos])

  useEffect(() => {
    Promise.all(questionsIds.map((id) => get(id))).then(videBlobs => {
      const newVideos = questionsIds.reduce((acc, id, index) => {
        if (videBlobs[index]) {
          return ({ ...acc, [id]: videBlobs[index] })
        }
        return acc
      }, {})
      setVideos(newVideos)
    })

  }, [questionsIds])


  return {
    videos,
    storeVideo,
    deleteVideo
  };
}

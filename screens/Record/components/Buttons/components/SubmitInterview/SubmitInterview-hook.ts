import { useProcessInterviewMutation, useSubmitInterviewMutation } from "@/graphql"
import { useRef, useState } from "react"
import { toast } from "react-toastify"
import { SubmitInterviewProps } from "./SubmitInterview-types"
import { useRouter } from "next/router"

import { TOAST_ERROR } from "./SubmitInterview-constants"
import { TOAST_OPTIONS, URLS } from "@/config"


export const useSubmitInterview = ({ videos, questions, deleteVideo, swiper }: SubmitInterviewProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [uploadProgres, setUploadProgres] = useState(-1);

  const uploadingIds = useRef<Record<string, number>>({})

  const router = useRouter();

  const jobId = String(router.query.applyJobId)

  const [{ fetching: interviewIsSubmitting }, submitInterviewMutation] = useSubmitInterviewMutation()

  const [{ fetching: interviewIsProcessing }, progressInterview] = useProcessInterviewMutation()

  const isUploading = interviewIsSubmitting || uploadProgres !== -1 || interviewIsProcessing

  const closeDialog = () => setIsDialogOpen(false)

  const submitInterview = async () => {

    if (Object.keys(videos).length === 0) {
      setIsDialogOpen(true)
      return
    }

    swiper?.disable()

    setUploadProgres(0)

    const answers = questions.filter(question => videos[question.id]).map(question => ({ question }))

    const res = await submitInterviewMutation({ input: { jobId, answers } }, { additionalTypenames: ['Interview'] })

    if (res.error) {
      toast.error(TOAST_ERROR, TOAST_OPTIONS)
      setUploadProgres(-1)
      swiper?.enable()

      return
    }


    res.data?.submitInterview.answers.forEach(async (answer) => {
      const xhr = new XMLHttpRequest()
      xhr.open('PUT', answer.uploadUrl!)

      xhr.upload.addEventListener("progress", (e) => {

        uploadingIds.current[answer.question.id] = e.loaded / e.total * 100

        const totalProgress = Math.floor(Object.values(uploadingIds.current).reduce((sum, current) => sum + current, 0) / Object.keys(uploadingIds.current).length)
        setUploadProgres(totalProgress)

        if (totalProgress === 100) {

          questions.map(question => deleteVideo(question.id))

          progressInterview({ id: String(res.data?.submitInterview.id) }).then(() => router.push(URLS.MY_INTERVIEWS))

        }
      });

      uploadingIds.current[answer.question.id] = 0

      const video = videos[answer.question.id]

      xhr.send(new File([video], `${answer.question.id}.mp4`, { type: video.type }))
    })

  }

  return { submitInterview, isUploading, closeDialog, isDialogOpen, uploadProgres }
}
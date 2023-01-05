import { useSubmitInterviewMutation } from "@/graphql"
import { useRef, useState } from "react"
import { toast } from "react-toastify"
import { del, get } from "idb-keyval"

import { SubmitInterviewProps } from "./SubmitInterview-types"
import { useRouter } from "next/router"

import { TOAST_ERROR, TOAST_OPTIONS } from "./SubmitInterview-constants"
import { URLS } from "@/config"

export const useSubmitInterview = ({ isRecorded, questions, setIsRecorded }: SubmitInterviewProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [uploadProgres, setUploadProgres] = useState(-1);

  const uploadingIds = useRef<Record<string, number>>({})

  const router = useRouter();

  const jobId = String(router.query.applyJobId)

  const [{ fetching: interviewIsSubmitting }, submitInterviewMutation] = useSubmitInterviewMutation()

  const isUploading = interviewIsSubmitting || uploadProgres !== -1

  const closeDialog = () => setIsDialogOpen(false)

  const submitInterview = async () => {

    if (Object.keys(isRecorded).length === 0) {
      setIsDialogOpen(true)
      return
    }

    setUploadProgres(0)

    const answers = questions.filter(question => isRecorded[question.id]).map(question => ({ question }))

    const res = await submitInterviewMutation({ input: { jobId, answers } })

    if (res.error) {
      toast.error(TOAST_ERROR, TOAST_OPTIONS)
      setUploadProgres(-1)

      return
    }


    res.data?.submitInterview.answers.forEach(async (answer) => {
      const xhr = new XMLHttpRequest()
      xhr.open('PUT', answer.uploadUrl)

      xhr.upload.addEventListener("progress", (e) => {

        uploadingIds.current[answer.question.id] = e.loaded / e.total * 100

        const totalProgress = Math.floor(Object.values(uploadingIds.current).reduce((sum, current) => sum + current, 0) / Object.keys(uploadingIds.current).length)
        setUploadProgres(totalProgress)

        if (totalProgress === 100) {
          setIsRecorded({})
          questions.map(question => del(question.id))

          setTimeout(() => router.push(URLS.MY_INTERVIEWS), 400)
        }
      });

      uploadingIds.current[answer.question.id] = 0
      const video = await get(answer.question.id)

      xhr.send(new File([video], `${answer.question.id}.mp4`, { type: video.type }))
    })

  }

  return { submitInterview, isUploading, closeDialog, isDialogOpen, uploadProgres }
}
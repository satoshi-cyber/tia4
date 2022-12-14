export interface ResumeProps {
  src?: string
  uploadUrl?: string
  fileName?: string
  className?: string
  isLoading?: boolean
  onUpload?: (fileName: string) => void
  onRemove?: () => void
};

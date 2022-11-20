import Loader from '@/components/Loader'
import { useFormState } from 'react-hook-form'

const FormLoader: React.FC = () => {
  const { isSubmitting } = useFormState()

  if (!isSubmitting) return null

  return <Loader />
}

export default FormLoader

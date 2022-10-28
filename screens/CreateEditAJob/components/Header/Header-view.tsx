import { Title } from '@/components'

import { SettingsMenu } from './components'
import { CLASS_NAMES, TITLE_PROPS } from './Header-constants'
import { useHeader } from './Header-hook'
import { HeaderProps } from './Header-types'

export const Header: React.FC<HeaderProps> = ({ editJob, handleDeleteJob }) => {
  const { title } = useHeader({ editJob })

  return (
    <div className={CLASS_NAMES.container}>
      <Title title={title} {...TITLE_PROPS} />
      {editJob && <SettingsMenu handleDeleteJob={handleDeleteJob} />}
    </div>
  )
}

export default Header

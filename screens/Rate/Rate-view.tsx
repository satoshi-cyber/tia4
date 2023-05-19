import { Title, Layout, LoadingProvider } from '@/components';
import Candidate from '@/components/Candidate';

import EmptyScreen from './components/EmptyScreen';
import { TITLE_PROPS, CLASS_NAMES, LAYOUT_PROPS } from './Rate-constants';
import { useRate } from './Rate-hook';

const Rate = () => {
  const { isListVisible, interviews, isLoading } = useRate();

  return (
    <Layout.Default {...LAYOUT_PROPS}>
      <Title {...TITLE_PROPS} />
      <LoadingProvider isLoading={isLoading}>
        {isListVisible ? (
          <div className={CLASS_NAMES.list}>
            {interviews?.map(
              (interview) =>
                interview && (
                  <Candidate key={interview.id} interview={interview} />
                )
            )}
          </div>
        ) : (
          <EmptyScreen />
        )}
      </LoadingProvider>
    </Layout.Default>
  );
};

export default Rate;

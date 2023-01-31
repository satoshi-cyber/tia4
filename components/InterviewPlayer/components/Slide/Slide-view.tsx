import { ControlBar, Player, Shortcut, BigPlayButton } from 'video-react';
import 'video-react/dist/video-react.css';

import { SlideProps } from './Slide-types';
import FullScreenButton from './components/FullScreenButton';
import { CLASS_NAMES, PLAYER_PROPS } from './Slide-constants';

const PlayerWithWidth = Player as any;

const Slide: React.FC<SlideProps> = ({
  answer,
  players,
  index,
  onEnded,
  fullScreen,
  toggleFullScreen,
}) => (
  <div className={CLASS_NAMES.container}>
    <div className={CLASS_NAMES.questionContianer}>
      <p className={CLASS_NAMES.question}>{answer.question.question}</p>
    </div>
    <PlayerWithWidth
      {...PLAYER_PROPS}
      className={CLASS_NAMES.player}
      src={answer.url}
      ref={(player: typeof Player) => (players.current[index] = player)}
      onEnded={onEnded}
    >
      <BigPlayButton position="center" />
      <Shortcut dblclickable={false} />
      <ControlBar>
        <FullScreenButton
          fullScreen={fullScreen}
          order={7}
          onClick={toggleFullScreen}
        />
      </ControlBar>
    </PlayerWithWidth>
  </div>
);

export default Slide;

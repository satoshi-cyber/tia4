import { Player } from 'video-react';

import { MutableRefObject } from 'react';

export interface SlideProps {
  answer: Pick<PrismaJson.Answer, 'url' | 'question'>;
  players: MutableRefObject<(typeof Player)[]>;
  index: number;
  fullScreen: boolean;
  onEnded: () => void;
  toggleFullScreen: () => void;
}

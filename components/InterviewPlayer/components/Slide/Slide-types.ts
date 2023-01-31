import { Answer } from '@/graphql'
import { Player } from 'video-react';

import { MutableRefObject } from 'react'

export interface SlideProps {
    answer: Pick<Answer, 'url' | 'question'>
    players: MutableRefObject<typeof Player[]>
    index: number
    fullScreen: boolean
    onEnded: () => void
    toggleFullScreen: () => void
}


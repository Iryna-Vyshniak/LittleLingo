import { HTML5Backend } from 'react-dnd-html5-backend';
import {
  createTransition,
  MouseTransition,
  MultiBackendOptions,
} from 'react-dnd-multi-backend';
import { TouchBackend } from 'react-dnd-touch-backend';

const TouchTransition = createTransition('touchstart', (event) => {
  const touchEvent = event as TouchEvent;
  return touchEvent.touches != null;
});

export const HTML5toTouch: MultiBackendOptions = {
  backends: [
    {
      id: 'html5',
      backend: HTML5Backend,
      transition: MouseTransition,
    },
    {
      id: 'touch',
      backend: TouchBackend,
      options: { enableMouseEvents: true, delayTouchStart: 100 },
      preview: true,
      transition: TouchTransition,
    },
  ],
};

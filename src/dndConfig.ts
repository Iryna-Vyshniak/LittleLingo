import { HTML5Backend } from "react-dnd-html5-backend";
import { MouseTransition, TouchTransition } from "react-dnd-multi-backend";
import { TouchBackend } from "react-dnd-touch-backend";

export const HTML5toTouch = {
    backends: [
        {
            id: 'html5',
            backend: HTML5Backend,
            transition: MouseTransition,
        },
        {
            id: 'touch',
            backend: TouchBackend,
           options: { enableMouseEvents: true, delayTouchStart: 500 },
            preview: true,
            transition: TouchTransition,
        },
    ],
}
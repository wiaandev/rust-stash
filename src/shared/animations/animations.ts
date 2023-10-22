import { animate, style, transition, trigger } from '@angular/animations';

// list of animation functions
export const enterTransition = transition(':enter', [
  style({
    opacity: 0,
  }),
  animate('0.3s ease-in', style({ opacity: 1 })),
]);

export const leaveTransition = transition(":leave", [
    style({
        opacity: 1
    }),
    animate("0.3s ease-in", style({opacity: 0}))
])

//list of animation props
export const fadeIn = trigger('fadeIn', [enterTransition]);
export const fadeOut = trigger('fadeOut', [leaveTransition]);

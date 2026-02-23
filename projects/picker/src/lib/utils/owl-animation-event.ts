export interface OwlAnimationEvent {
    phaseName: 'start' | 'done';
    fromState: string;
    toState: string;
}

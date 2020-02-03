import { PushUp } from './push-up.modal';
import { SitUp } from './sit-up.modal';

export interface Day {
    date: Date;
    pushUpComplete: boolean;
    sitUpComplete: boolean;
    pushUps: PushUp[];
    sitUps: SitUp[];
}

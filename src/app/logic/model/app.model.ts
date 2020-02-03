import { PushUp } from './push-up.modal';
import { SitUp } from './sit-up.modal';
import { Day } from '.';

export interface AppData {
    pushUpGoal: number;
    sitUpGoal: number;
    days: Day[];
}

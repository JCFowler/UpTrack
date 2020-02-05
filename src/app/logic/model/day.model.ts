import { Up } from '.';

export interface Day {
    date: Date;
    pushUpComplete: boolean;
    sitUpComplete: boolean;
    pushUps: number;
    sitUps: number;
}

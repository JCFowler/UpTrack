import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppData } from '../model';
import { setString, getString } from 'tns-core-modules/application-settings';

@Injectable({providedIn: 'root'})
export class AppDataService {
    constructor() {}

    public static data = new BehaviorSubject<AppData>(AppDataService.getInitial('data'));

    public setAppData(data: AppData) {
        this.set('data', data);
        AppDataService.data.next(data);
    }

    private set(key: string, value: any) {
        const valueJSON = JSON.stringify(value);
        setString(key, valueJSON);
    }

    private static getInitial<T>(key: string): T {
        const valueJSON = getString(key);
        if (valueJSON === undefined) {
            return undefined;
        }

        return JSON.parse(valueJSON) as T;
    }
}

import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AppDataService } from '../logic/storage/app-storage.service';
import { AppData, Up, Day } from '../logic/model';

@Component({
    selector: 'Home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    public data$ = AppDataService.data;
    public today: Date;
    public todayPushUps = 0;
    public todaySitUps = 0;

    private pushUps = 0;
    private sitUps = 0;

    constructor(private dataService: AppDataService) { }

    ngOnInit(): void {
        this.today = new Date();

        this.data$.subscribe(data => {
            if (!data) {
                const newData: AppData = {
                    pushUpGoal: 100,
                    sitUpGoal: 100,
                    days: []
                };

                this.dataService.setAppData(newData);
            } else if (data && data.days.length > 0 && data.days[0].date.getDate() === this.today.getDate()) {
                this.todayPushUps = data.days[0].pushUps;
                this.todaySitUps = data.days[0].sitUps;
                console.dir(data)
            }
        });
    }

    onTextChange(args, num: number) {
        if (num === 0) {
            this.pushUps = args.value;
        } else {
            this.sitUps = args.value;
        }
    }

    submitTap() {
        this.data$.pipe(first()).subscribe(data => {
            console.log(data.days)
            if (data && data.days.length > 0 && data.days[0].date.getDate() === this.today.getDate()) {
                data.days[0].pushUps = data.days[0].pushUps + this.pushUps;
                data.days[0].sitUps = data.days[0].sitUps + this.sitUps;

                data.days[0].pushUpComplete = true ? data.days[0].pushUps >= data.pushUpGoal : false;
                data.days[0].sitUpComplete = true ? data.days[0].sitUps >= data.sitUpGoal : false;

            } else {
                const pComplete = true ? this.pushUps >= data.pushUpGoal : false;
                const sComplete = true ? this.sitUps >= data.sitUpGoal : false;

                const newDay: Day = {
                    date: this.today,
                    pushUps: this.pushUps,
                    pushUpComplete: pComplete,
                    sitUps: this.sitUps,
                    sitUpComplete: sComplete
                };

                data.days.unshift(newDay);
            }

            this.dataService.setAppData(data);
        });
        console.log('omg')
    }
}

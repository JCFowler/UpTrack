import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AppDataService } from '../logic/storage/app-storage.service';
import { AppData, Day } from '../logic/model';
import { TextField } from 'tns-core-modules/ui/text-field/text-field';
import { prompt, PromptOptions, inputType } from 'tns-core-modules/ui/dialogs';

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
    private textFields: TextField[] = [];

    constructor(private dataService: AppDataService) { }

    ngOnInit(): void {
        this.today = new Date();
        // this.today.setDate(this.today.getDate() + 3)

        this.setUpData();
    }

    setUpData() {
        this.data$.pipe(first()).subscribe(data => {
            if (!data) {
                const newData: AppData = {
                    pushUpGoal: 100,
                    sitUpGoal: 100,
                    days: [{
                        date: this.today,
                        pushUpComplete: false,
                        pushUps: 0,
                        sitUpComplete: false,
                        sitUps: 0
                    }]
                };

                this.dataService.setAppData(newData);
            } else if (data && data.days.length > 0 && new Date(data.days[0].date).getDate() === this.today.getDate()) {
                this.todayPushUps = data.days[0].pushUps;
                this.todaySitUps = data.days[0].sitUps;
            } else {
                const date = new Date(data.days[0].date);
                date.setDate(date.getDate() + 1);
                const newDay: Day = {
                    date: date,
                    pushUpComplete: false,
                    pushUps: 0,
                    sitUpComplete: false,
                    sitUps: 0
                };

                data.days.unshift(newDay);
                this.setUpData();
            }
        });
    }

    textFieldLoaded(args) {
        this.textFields.push(args.object);
    }

    submitTap() {
        this.textFields[1].dismissSoftInput();
        this.data$.pipe(first()).subscribe(data => {
            if (data && data.days.length > 0 && new Date(data.days[0].date).getDate() === this.today.getDate()) {
                data.days[0].pushUps = +data.days[0].pushUps + +this.textFields[0].text;
                data.days[0].sitUps = +data.days[0].sitUps + +this.textFields[1].text;

                data.days[0].pushUpComplete = true ? data.days[0].pushUps >= data.pushUpGoal : false;
                data.days[0].sitUpComplete = true ? data.days[0].sitUps >= data.sitUpGoal : false;

            } else {
                const pComplete = true ? +this.textFields[0].text >= data.pushUpGoal : false;
                const sComplete = true ? +this.textFields[1].text >= data.sitUpGoal : false;

                const newDay: Day = {
                    date: this.today,
                    pushUps: +this.textFields[0].text,
                    pushUpComplete: pComplete,
                    sitUps: +this.textFields[1].text,
                    sitUpComplete: sComplete
                };

                data.days.unshift(newDay);
            }

            this.textFields[0].text = '';
            this.textFields[1].text = '';
            this.dataService.setAppData(data);
            this.setUpData();
        });
    }

    changeGoal(num: number) {
        this.data$.pipe(first()).subscribe(data => {
            let options: PromptOptions = {
                okButtonText: 'Change',
                cancelButtonText: 'Cancel',
                cancelable: true,
                inputType: inputType.number
            };

            if (num === 0) {
                options.title = 'Change Push Up Goal';
                options.message = `Current Goal: ${data.pushUpGoal}`;
            } else {
                options.title = 'Change Sit Up Goal';
                options.message = `Current Goal: ${data.sitUpGoal}`;
            }

            prompt(options).then((result) => {
                if (result.result) {
                    if (num === 0) {
                        data.pushUpGoal = +result.text;
                    } else {
                        data.sitUpGoal = +result.text;
                    }

                    this.dataService.setAppData(data);
                }
            });
        });
    }
}

import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AppDataService } from '../logic/storage/app-storage.service';
import { AppData } from '../logic/model';

@Component({
    selector: 'Home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    public data$ = AppDataService.data;

    constructor(private dataService: AppDataService) { }

    ngOnInit(): void {
        this.data$.pipe(first()).subscribe(data => {
            if (!data) {
                const newData: AppData = {
                    pushUpGoal: 100,
                    sitUpGoal: 100,
                    days: []
                };

                this.dataService.setAppData(newData);
            } else {
                console.dir(data)
            }
        });
    }
}

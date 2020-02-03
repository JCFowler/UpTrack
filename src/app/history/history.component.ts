import { Component, OnInit } from '@angular/core';
import { AppDataService } from '../logic/storage/app-storage.service';

@Component({
    selector: 'History',
    templateUrl: './history.component.html'
})
export class HistoryComponent implements OnInit {
    public data$ = AppDataService.data;

    constructor() { }

    ngOnInit(): void {

    }
}

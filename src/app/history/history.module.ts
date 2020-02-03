import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { HistoryRoutingModule } from './history-routing.module';
import { HistoryComponent } from './history.component';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        HistoryRoutingModule
    ],
    declarations: [
        HistoryComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class HistoryModule { }

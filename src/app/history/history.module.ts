import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { HistoryComponent } from './history.component';
import { NativeScriptRouterModule } from 'nativescript-angular';
import { Routes } from '@angular/router';

const routes: Routes = [
    { path: '', component: HistoryComponent }
];

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptRouterModule.forChild(routes)
    ],
    declarations: [
        HistoryComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class HistoryModule { }

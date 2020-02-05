import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';

import { AppComponent } from './app.component';
import { NativeScriptRouterModule, NSEmptyOutletComponent } from 'nativescript-angular';
import { Routes } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: '/(homeTab:home//historyTab:history)', pathMatch: 'full' },
    { path: 'home', component: NSEmptyOutletComponent,
        loadChildren: () => import('~/app/home/home.module').then((m) => m.HomeModule), outlet: 'homeTab'
    },
    { path: 'history', component: NSEmptyOutletComponent,
        loadChildren: () => import('~/app/history/history.module').then((m) => m.HistoryModule), outlet: 'historyTab'
    }
];

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptRouterModule.forRoot(routes)
    ],
    declarations: [
        AppComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }

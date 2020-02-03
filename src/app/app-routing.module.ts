import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NSEmptyOutletComponent } from 'nativescript-angular';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/(homeTab:home/default//historyTab:history/default//searchTab:search/default)',
        pathMatch: 'full'
    },

    {
        path: 'home',
        component: NSEmptyOutletComponent,
        loadChildren: () => import('~/app/home/home.module').then((m) => m.HomeModule),
        outlet: 'homeTab'
    },
    {
        path: 'history',
        component: NSEmptyOutletComponent,
        loadChildren: () => import('~/app/history/history.module').then((m) => m.HistoryModule),
        outlet: 'historyTab'
    },
    {
        path: 'search',
        component: NSEmptyOutletComponent,
        loadChildren: () => import('~/app/search/search.module').then((m) => m.SearchModule),
        outlet: 'searchTab'
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }

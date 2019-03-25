import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataGridComponent } from './data-grid/data-grid.component';

const routes: Routes = [
    {
        path: '',
        component: DataGridComponent,
    },
    {
        path: '**',
        component: DataGridComponent,
    },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ],
})
export class AppRoutingModule {}

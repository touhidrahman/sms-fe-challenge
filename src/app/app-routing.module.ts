import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataGridComponent } from './data-grid/data-grid.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
    {
        path: '',
        component: DataGridComponent,
    },
    {
        path: 'signup',
        component: SignupComponent,
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

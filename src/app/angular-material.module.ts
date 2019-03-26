import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
} from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule,
        MatCheckboxModule,
        MatTableModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatSortModule,
    ],
    exports: [
        MatButtonModule,
        MatCheckboxModule,
        MatTableModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatSortModule,
    ],
})
export class AngularMaterialModule {}

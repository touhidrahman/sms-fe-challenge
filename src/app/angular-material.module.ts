import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatProgressBarModule,
    MatCardModule,
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
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        MatProgressBarModule,
        MatCardModule,
    ],
    exports: [
        MatButtonModule,
        MatCheckboxModule,
        MatTableModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatSortModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        MatProgressBarModule,
        MatCardModule,
    ],
})
export class AngularMaterialModule {}

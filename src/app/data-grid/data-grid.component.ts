import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { DataRecord } from 'src/_shared/app.types';
import { DataService } from 'src/_shared/services/data.service';
import { Observable, concat } from 'rxjs';
import { tap, merge } from 'rxjs/operators';
import { RecordDataSource } from './record-data-source';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-data-grid',
    templateUrl: './data-grid.component.html',
    styleUrls: [ './data-grid.component.scss' ],
})
export class DataGridComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = [
        'city',
        'start_date',
        'end_date',
        'price',
        'status',
        'color',
    ];
    dataSource: RecordDataSource;

    dateStart: FormControl;
    dateEnd: FormControl;

    @ViewChild(MatSort) sort: MatSort;

    constructor(private dataService: DataService) {
        this.dateStart = new FormControl();
        this.dateEnd = new FormControl();
    }

    ngOnInit() {
        this.dataSource = new RecordDataSource(this.dataService);
        this.loadRecords();

        this.dateStart.valueChanges
            .pipe(merge(this.dateEnd.valueChanges))
            .subscribe((value) => this.loadRecords());
    }

    ngAfterViewInit() {
        this.sort.sortChange.pipe(tap(() => this.loadRecords())).subscribe();
    }

    loadRecords() {
        this.dataSource.loadRecords(
            this.dateStart.value, // start date
            this.dateEnd.value, // end date
            this.sort.active || 'city', // sort by
            this.sort.direction || 'asc', // order
        );
    }

    applyFilter(event) {}
}

import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { DataRecord } from 'src/_shared/app.types';
import { DataService } from 'src/_shared/services/data.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RecordDataSource } from './record-data-source';

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

    @ViewChild(MatSort) sort: MatSort;

    constructor(private dataService: DataService) {}

    ngOnInit() {
        this.dataSource = new RecordDataSource(this.dataService);
        this.loadRecords();
    }

    ngAfterViewInit() {
        this.sort.sortChange.pipe(tap(() => this.loadRecords())).subscribe();
    }

    loadRecords() {
        this.dataSource.loadRecords(
            undefined, // start date
            undefined, // end date
            this.sort.active || 'city', // sort by
            this.sort.direction || 'asc', // order
        );
    }

    applyFilter(event) {}
}

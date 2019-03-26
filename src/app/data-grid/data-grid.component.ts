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
        'startDate',
        'endDate',
        'price',
        'status',
        'color',
    ];
    dataSource: RecordDataSource;

    data$: Observable<Array<DataRecord>>;
    data: Array<DataRecord>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private dataService: DataService) {}

    ngOnInit() {
        this.data$ = this.dataService.getDataWithFilter(
            new Date(2015, 4, 13),
            new Date(2015, 7, 12),
        );
        // this.data$.subscribe();

        this.dataSource = new RecordDataSource(this.dataService);
        this.dataSource.loadRecords();
    }

    ngAfterViewInit() {
        // this.dataSource = new MatTableDataSource(this.data);

        this.sort.sortChange
            .pipe(tap(() => this.dataSource.loadRecords()))
            .subscribe();
    }

    applyFilter(event) {}
}

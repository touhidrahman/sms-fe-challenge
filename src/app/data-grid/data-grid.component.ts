import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { DataRecord } from 'src/_shared/app.types';
import { DataService } from 'src/_shared/services/data.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-data-grid',
    templateUrl: './data-grid.component.html',
    styleUrls: [ './data-grid.component.scss' ],
})
export class DataGridComponent implements OnInit {
    displayedColumns: string[] = [
        'city',
        'startDate',
        'endDate',
        'price',
        'status',
        'color',
    ];
    dataSource: MatTableDataSource<DataRecord>;

    data$: Observable<Array<DataRecord>>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private dataService: DataService) {}

    ngOnInit() {
        this.data$ = this.dataService.getData();
    }

    applyFilter(event) {}
}

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSort } from '@angular/material';
import { merge, tap } from 'rxjs/operators';
import { RecordDataSource } from './record-data-source';
import { DataService } from '../_shared/services/data.service';

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

    ngOnInit(): void {
        this.dataSource = new RecordDataSource(this.dataService);
        this.loadRecords();

        this.dateStart.valueChanges
            .pipe(merge(this.dateEnd.valueChanges))
            .subscribe((value) => this.loadRecords());
    }

    ngAfterViewInit(): void {
        this.sort.sortChange.pipe(tap(() => this.loadRecords())).subscribe();
    }

    loadRecords(): void {
        this.dataSource.loadRecords(
            this.dateStart.value, // start date
            this.dateEnd.value, // end date
            this.sort.active || 'city', // sort by
            this.sort.direction || 'asc', // order
        );
    }
}

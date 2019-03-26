import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { DataRecord } from '../_shared/app.types';
import { DataService } from '../_shared/services/data.service';

export class RecordDataSource implements DataSource<DataRecord> {
    private subject = new BehaviorSubject<Array<DataRecord>>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    loading$ = this.loadingSubject.asObservable();

    constructor(private dataService: DataService) {}

    connect(collectionViewer: CollectionViewer): Observable<Array<DataRecord>> {
        return this.subject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.subject.complete();
        this.loadingSubject.complete();
    }

    loadRecords(
        startDate: Date,
        endDate: Date,
        sortBy = 'city',
        order = 'asc',
    ) {
        this.loadingSubject.next(true);
        const isDescOrder = order === 'asc' ? false : true;

        this.dataService
            .getData(startDate, endDate, sortBy, isDescOrder)
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false)),
            )
            .subscribe((records) => this.subject.next(records));
    }
}

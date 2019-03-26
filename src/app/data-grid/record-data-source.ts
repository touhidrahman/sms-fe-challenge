import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { DataRecord } from 'src/_shared/app.types';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { DataService } from 'src/_shared/services/data.service';
import { catchError, finalize } from 'rxjs/operators';

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

    loadRecords() {
        this.loadingSubject.next(true);

        this.dataService
            .getData()
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false)),
            )
            .subscribe((records) => this.subject.next(records));
    }
}

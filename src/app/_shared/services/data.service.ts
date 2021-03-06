import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DataRecord, RawRecord } from '../app.types';

const API_URL = environment.apiUrl + '/data';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    constructor(private http: HttpClient) {}

    getData(
        startDate: Date,
        endDate: Date = new Date(),
        compareBy: string,
        isDescOrder = false,
    ): Observable<Array<DataRecord>> {
        return this.http
            .get<Array<RawRecord>>(API_URL)
            .pipe(
                map((data) => data.map((record) => this.transform(record))),
                map((data) => this.getFilteredData(data, startDate, endDate)),
                map((data) => this.sortRecords(data, compareBy, isDescOrder)),
            );
    }

    getDataById(id: string | number): Observable<DataRecord> {
        return this.http
            .get<any>(`${API_URL}/${id}`)
            .pipe(map((record) => this.transform(record)));
    }

    /**
     * Filter records by date range
     */
    private getFilteredData(
        data: Array<DataRecord>,
        startDate: Date,
        endDate: Date,
    ): Array<DataRecord> {
        return data.filter((record) => {
            if (startDate && endDate) {
                return (
                    record.start_date.getTime() >= startDate.getTime() &&
                    record.end_date.getTime() <= endDate.getTime()
                );
            } else if (startDate) {
                return record.start_date.getTime() >= startDate.getTime();
            } else if (endDate) {
                return record.end_date.getTime() <= endDate.getTime();
            } else {
                return true;
            }
        });
    }

    /**
     * Dealing sorting from the frontend, normally should be done in the backend.
     * We have dates inside the object which is in string format. So the mock server
     * cannot sort the date logically. This method handles date sorting effectively
     * along with sorting of other fields.
     */
    private sortRecords(
        data: Array<DataRecord>,
        compareBy: string,
        isDescOrder = false,
    ): Array<DataRecord> {
        let sortFunc;

        switch (compareBy) {
            case 'city':
            case 'color':
            case 'status':
                sortFunc = (a: DataRecord, b: DataRecord) => {
                    if (
                        a[compareBy].toLowerCase() < b[compareBy].toLowerCase()
                    ) {
                        return isDescOrder ? 1 : -1;
                    } else if (
                        a[compareBy].toLowerCase() > b[compareBy].toLowerCase()
                    ) {
                        return isDescOrder ? -1 : 1;
                    } else {
                        return 0;
                    }
                };
                break;
            case 'price':
                sortFunc = (a: DataRecord, b: DataRecord) => {
                    if (a[compareBy] < b[compareBy]) {
                        return isDescOrder ? 1 : -1;
                    } else if (a[compareBy] > b[compareBy]) {
                        return isDescOrder ? -1 : 1;
                    } else {
                        return 0;
                    }
                };
                break;
            case 'start_date':
            case 'end_date':
                sortFunc = (a: DataRecord, b: DataRecord) => {
                    if (a[compareBy].getTime() < b[compareBy].getTime()) {
                        return isDescOrder ? 1 : -1;
                    } else if (
                        a[compareBy].getTime() > b[compareBy].getTime()
                    ) {
                        return isDescOrder ? -1 : 1;
                    } else {
                        return 0;
                    }
                };
                break;

            default:
                sortFunc = (a: DataRecord, b: DataRecord) => 0;
                break;
        }

        return data.sort(sortFunc);
    }

    /**
     * The date strings are in US format. So we convert them to JS date object
     * for better sorting and feeding into date pipe.
     */
    private toDate(dateStr: string): Date {
        const [ month, day, year ] = dateStr.split('/');
        return new Date(
            parseInt(year, 10),
            parseInt(month, 10) - 1,
            parseInt(day, 10),
        );
    }

    /**
     * Transform the record object from the server (or data.json) into
     * correctly typecasted object (i.e- date to JS date, price to number)
     */
    private transform(record: RawRecord): DataRecord {
        return {
            ...record,
            start_date: this.toDate(record.start_date),
            end_date: this.toDate(record.end_date),
            price: parseFloat(record.price),
        };
    }
}

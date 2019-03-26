import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { DataRecord } from '../app.types';
import { map, filter, tap } from 'rxjs/operators';

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
            .get<Array<any>>(API_URL)
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

    private getFilteredData(
        data: Array<DataRecord>,
        startDate: Date,
        endDate: Date,
    ): Array<DataRecord> {
        const filteredData = data.filter((record) => {
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

        return filteredData;
    }

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

    private toDate(dateStr: string): Date {
        const [ month, day, year ] = dateStr.split('/');
        return new Date(
            parseInt(year, 10),
            parseInt(month, 10) - 1,
            parseInt(day, 10),
        );
    }

    private transform(record: any): DataRecord {
        return {
            ...record,
            start_date: this.toDate(record.start_date),
            end_date: this.toDate(record.end_date),
            price: parseFloat(record.price),
        };
    }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { DataRecord } from '../app.types';
import { map } from 'rxjs/operators';

const API_URL = environment.apiUrl + '/data';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    constructor(private http: HttpClient) {}

    getData(): Observable<Array<DataRecord>> {
        return this.http.get<Array<any>>(API_URL).pipe(
            map((data) => {
                return data.map((record) => {
                    return {
                        ...record,
                        start_date: this.toDate(record.start_date),
                        end_date: this.toDate(record.end_date),
                        price: parseFloat(record.price),
                    };
                });
            }),
        );
    }

    getDataById(id: string | number): Observable<DataRecord> {
        return this.http.get<any>(`${API_URL}/${id}`).pipe(
            map((record) => {
                return {
                    ...record,
                    start_date: this.toDate(record.start_date),
                    end_date: this.toDate(record.end_date),
                    price: parseFloat(record.price),
                };
            }),
        );
    }

    private toDate(dateStr: string): Date {
        const [ month, day, year ] = dateStr.split('/');
        return new Date(
            parseInt(year, 10),
            parseInt(month, 10) - 1,
            parseInt(day, 10),
        );
    }
}

export interface DataRecord {
    id: string | number;
    city: string;
    start_date: Date;
    end_date: Date;
    price: number;
    status: string;
    color: string;
}

export interface RawRecord {
    id: string | number;
    city: string;
    color: string;
    status: string;
    start_date: string;
    end_date: string;
    price: string;
}

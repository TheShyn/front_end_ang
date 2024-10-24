import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


export interface Image {
    id: number;
    name: string;
    description?: string;
    url: string; 
    
}

export interface ApiResponse {
    data: Image[];
}

@Injectable({
    providedIn: 'root'
})
export class BackendService {
    private baseUrl = "http://localhost:3000"; 

    constructor(private http: HttpClient) {}

    getText(): Observable<any> {
        return this.http.get<string>(`${this.baseUrl}/`);
    }

    getFiles(): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(`${this.baseUrl}/upload`);
    }

    uploadFiles( formData: FormData): Observable<any> {
        return this.http.post(`${this.baseUrl}/upload`, formData);
    }

    deleteFile(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/upload/${id}`);
    }
}

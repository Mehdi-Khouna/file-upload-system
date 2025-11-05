import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Upload {
  private baseUrl = 'http://localhost:3000/files'; 

  constructor(private http: HttpClient) {}

  

  
 uploadFile(file : File) : Observable<{key : string}> {
  const formData = new FormData();
  formData.append('file', file);
  return this.http.post<{key : string}>(`${this.baseUrl}/upload`, formData);
 }

 getFileUrl(key : string): Observable<{url : string}>{
  return this.http.get<{url : string}>(`${this.baseUrl}/${key}/url`);
 }
}

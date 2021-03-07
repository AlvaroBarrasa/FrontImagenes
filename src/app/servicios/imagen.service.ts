import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Imagen } from '../modelos/imagen';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  imagenURL = 'http://localhost:8888/imagen/';
/**
 * @param httpClient
 */
  constructor(private httpClient: HttpClient, private tokenService: TokenService) { }
/**
 * @return this.httpClient.get<Imagen[]>(this.imagenURL + 'list')
 */
  public list(): Observable<Imagen[]> {
    return this.httpClient.get<Imagen[]>(this.imagenURL + 'list',{ headers: new HttpHeaders().set('Authorization', `Bearer ${ this.tokenService.getToken() }`)});
  }
/**
 * 
 * @param imagen 
 * @return this.httpClient.post<any>(this.imagenURL + 'upload', formData)
 * 
 */
  public upload(imagen: File): Observable<any> {
    const formData = new FormData();
    formData.append('multipartFile', imagen);
    return this.httpClient.post<any>(this.imagenURL + 'upload', formData, { headers: new HttpHeaders().set('Authorization', `Bearer ${ this.tokenService.getToken() }`)});
  }
/**
 * @return this.httpClient.delete<any>(this.imagenURL + `delete/${id}`)
 */
  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.imagenURL + `delete/${id}`, { headers: new HttpHeaders().set('Authorization', `Bearer ${ this.tokenService.getToken() }`)});
  }
}
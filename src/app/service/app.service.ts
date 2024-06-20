import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  baseUrl = 'https://opentdb.com/';
  categoryList = 'api_category.php';

  constructor(private http: HttpClient) { }

  getTriviaCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}${this.categoryList}`);
  }
}

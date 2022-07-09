import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
   apiURLCategories = environment.apiURL + 'categories/';

  constructor(private http: HttpClient) {

   }

   getCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(this.apiURLCategories);
   }

   getCategory(categoryId: string): Observable<Category>{
    return this.http.get<Category>(`${this.apiURLCategories}/${categoryId}`);
   }

   createCategory(category: Category): Observable<Category>{
      return this.http.post<Category>(this.apiURLCategories, category);
   }

   updateCategory(category: Category, id: String): Observable<Category>{
    return this.http.put<Category>(this.apiURLCategories+id, category);
 }

   deleteCategory(categoryId: string): Observable<Object>{
    return this.http.delete<Object>(`${this.apiURLCategories}/${categoryId}`);
   }
}

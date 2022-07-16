import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiURLUsers = environment.apiURL + 'users/';
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.apiURLUsers);
   }

   getUser(userId: string): Observable<User>{
    return this.http.get<User>(`${this.apiURLUsers}/${userId}`);
   }

   createUser(user: User): Observable<User>{
      return this.http.post<User>(this.apiURLUsers, user);
   }

   updateUser(user: User, id: String): Observable<User>{
    return this.http.put<User>(this.apiURLUsers+id, user);
 }

   deleteUser(userId: string): Observable<any>{
    return this.http.delete<any>(`${this.apiURLUsers}${userId}`);
   }
}

  

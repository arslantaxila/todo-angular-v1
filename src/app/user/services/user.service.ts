import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import {
  Status,
  Todo,
  Transcript,
  User
} from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiURLUsers = environment.apiURL + 'user';
  apiURLTodo = environment.apiURL + 'todo';
  apiURLTranscript = environment.apiURL + 'transcript';
  apiURLSemester = environment.apiURL + 'semester';

  constructor(private http: HttpClient, private router: Router) { }

  getTodo(): Observable<any> {
    return this.http.get<[]>(`${this.apiURLTodo}`);
  }

  getDashbaordCount(d: any): Observable<any> {
    return this.http.get<[]>(`${this.apiURLTranscript}/dashboardcount/${d}`);
  }
  
  viewImage(docName: string): Observable<any> {
    return this.http.get(`${this.apiURLUsers}/images/${docName}`, {
      responseType: 'blob',
    });
  }

  updateTodo(todo: Todo, id: any): Observable<Todo> {
    return this.http.put<Status>(
      `${this.apiURLTodo}/${id}`,
      todo
    );
  }

  updateTodoStatus(status: Status, id: any): Observable<Status> {
    return this.http.put<Status>(
      `${this.apiURLTodo}/status/${id}`,
      status
    );
  }

  deleteTodo(id: any): Observable<any> {
    return this.http.delete<any>(
      `${this.apiURLTodo}/${id}`
    );
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(`${this.apiURLTodo}/create`, todo);
  }


  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiURLUsers}/create`, user);
  }

  updateUser(user: User, id: any): Observable<User> {
    return this.http.put<User>(
      `${this.apiURLUsers}/${id}`,
      user
    );
  }

  downloadAttachment(): Observable<any> {
    return this.http.get(`${this.apiURLSemester}/getDocument`,
      { responseType: 'blob' }
    );
  }
  
}

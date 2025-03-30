import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }


  createTask(obj:any):Observable<any>
  {
    return this.http.post<any>("https://api.freeprojectapi.com/api/GoalTracker/createTask",obj);
  }

  getTaskByUser(userId:number):Observable<any>
  {
    return this.http.get<any>("https://api.freeprojectapi.com/api/GoalTracker/getAllTasks?userId="+userId);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GoalService {

loggedUserData:any
  constructor(private http: HttpClient) {
    const logUser=localStorage.getItem("user")
    if(logUser)
      {
        const loggedUserData=JSON.parse(logUser);
        this.loggedUserData=loggedUserData;
      }
  }

  saveGoal(obj: any) {
    return this.http.post(
      'https://api.freeprojectapi.com/api/GoalTracker/createGoalWithMilestones',
      obj
    );
  }

  getAllGoalsByUser(userId: number) {
    return this.http.get(
      'https://api.freeprojectapi.com/api/GoalTracker/getAllGoalsByUser?userId=' +
        userId
    );
  }
}

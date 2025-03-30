import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoalService } from '../../service/goal.service';
import { IGoalList } from '../../interface/user';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-goal-list',
  imports: [DatePipe],
  templateUrl: './goal-list.component.html',
  styleUrl: './goal-list.component.css'
})
export class GoalListComponent implements OnInit,OnDestroy{

  ngOnInit(): void {
    this.getAllGoalCreatedByMe();
  }

  router=inject(Router)
  goalService=inject(GoalService)
  goalList:IGoalList[]=[]; 
  subscriptionList:Subscription[]=[]; 

  navigateToNewGoal():void
  {
    this.router.navigateByUrl("/new-goal");
  }

  getAllGoalCreatedByMe()
  {
    const newSub=this.goalService.getAllGoalsByUser(this.goalService.loggedUserData.userId).subscribe((res:any)=>{
      this.goalList=res;
    })
    this.subscriptionList.push(newSub)
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach(element=>{
      element.unsubscribe();
    })
  }

}

import { Component, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GoalService } from '../../service/goal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-goal',
  imports: [ReactiveFormsModule],
  templateUrl: './new-goal.component.html',
  styleUrl: './new-goal.component.css'
})
export class NewGoalComponent {
 goalForm:FormGroup=new FormGroup({});
 goalService=inject(GoalService)
 router=inject(Router)


 constructor()
 {
  this.initializeForm();
  this.createNewMilestoneForm();
  const logUser=localStorage.getItem("user")
  if(logUser)
  {
    const loggedUserData=JSON.parse(logUser);
    this.goalForm.get("userId")?.setValue(loggedUserData.userId)
  }
 }

 initializeForm()
 {
  this.goalForm=new FormGroup({
    goalId:new FormControl(0),
    goalName:new FormControl(""),
    description:new FormControl(""),
    startDate:new FormControl(""),
    endDate:new FormControl(""),
    isAchieved:new FormControl(false),
    userId:new FormControl(""),
    milestones:new FormArray([])
  })
 }

 get milestoneList():FormArray
 {
    return this.goalForm.get("milestones") as FormArray;
 }

 createNewMilestoneForm()
 {
  const newForm=new FormGroup({
    milestoneId:new FormControl(0),
    milestoneName:new FormControl(""),
    description:new FormControl(""),
    targetDate:new FormControl(""),
    isCompleted:new FormControl(false),
  });
  this.milestoneList.push(newForm);
 }

 onSaveGoal()
 {
   const formValue=this.goalForm.value;
   this.goalService.saveGoal(formValue).subscribe((res:any)=>{
    alert("Goal Created");
    this.router.navigateByUrl("/goals");
    
   },error=>{
    alert(error.error);
   })
 }
}

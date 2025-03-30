import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { GoalService } from '../../service/goal.service';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../service/task.service';
import { IGoalList } from '../../interface/user';
import { Observable } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-task-list',
  imports: [FormsModule,AsyncPipe,DatePipe],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent {
  newTask={
      "taskId": 0,
      "taskName": "",
      "description": "",
      "frequency": "",
      "createdDate": new Date(),
      "startDate": "2025-03-29T18:26:31.600Z",
      "dueDate": "2025-03-29T18:26:31.600Z",
      "isCompleted": false,
      "userId": 0
  }

  @ViewChild('modal') modal!: ElementRef;
  goalService=inject(GoalService);
  taskService=inject(TaskService);
  goalList:IGoalList[]=[];
  taskList$:Observable<any[]>=new Observable<any[]>();
  
  constructor()
  {
    this.newTask.userId=this.goalService.loggedUserData.userId;
    this.taskList$=this.taskService.getTaskByUser(this.newTask.userId);
  }


  public openModal(): void {
    if (this.modal) {
      this.modal.nativeElement.style.display = 'block';
    }
  }
  public closeModal(): void {
    if (this.modal) {
      this.modal.nativeElement.style.display = 'none';
    }
  }

  public onSaveTask(): void {
      this.taskService.createTask(this.newTask).subscribe((res:any)=>{
        alert("Task Created!")
        this.closeModal();
        this.newTask={
          "taskId": 0,
          "taskName": "",
          "description": "",
          "frequency": "",
          "createdDate": new Date(),
          "startDate": "2025-03-29T18:26:31.600Z",
          "dueDate": "2025-03-29T18:26:31.600Z",
          "isCompleted": false,
          "userId": 0
      };
      this.newTask.userId=this.goalService.loggedUserData.userId;
      },error=>{
        alert(error.error)
      });
    }
}

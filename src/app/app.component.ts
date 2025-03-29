import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @ViewChild("loginModal") loginModal!: ElementRef

  public openModal():void
  {
    if(this.loginModal)
    {
      this.loginModal.nativeElement.style.display="block";
    }
  }

  public closeModal():void
  {
    if(this.loginModal)
    {
      this.loginModal.nativeElement.style.display="none";
    }
  }
}

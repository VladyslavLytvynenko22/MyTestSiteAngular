import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f') signupForm: NgForm;
  defaultQuestion = 'pet';
  answer = '';

  suggestUserName(): void {
    const suggestedName = 'Superuser';
  }

  onSubmit(): void{
    console.log(this.signupForm);
  }

}

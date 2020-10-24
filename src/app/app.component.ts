import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('frm') signupForm: NgForm;
  defoultSubscriptions = 'Advanced';
  submited = false;
  user = {
    email: '',
    subscriptions: '',
    password: '',
  };

  onSubmit(): void{
    console.log(this.signupForm.value.userData);
    this.submited = true;
    this.user.email = this.signupForm.value.userData.email;
    this.user.subscriptions = this.signupForm.value.userData.subscriptions;
    this.user.password = this.signupForm.value.userData.password;

    this.signupForm.reset();
  }
}

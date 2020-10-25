import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  userDataForm: FormGroup;
  projectsStatus = ['Stable', 'Critical', 'Finished'];
  forbiddenProjectNames = ['Test'];

  ngOnInit(): void {
    this.userDataForm = new FormGroup({
      projectName: new FormControl(null, [Validators.required, this.validateProjectName.bind(this)]),
      email: new FormControl(null, [Validators.required, Validators.email], this.validateEmails),
      projectStatus: new FormControl()
    });
  }

  validateProjectName(control: FormControl): {[s: string]: boolean}{
    if (this.forbiddenProjectNames.indexOf(control.value) !== -1){
      return {nameIsForbidden: true};
    }
    return null;
  }

  validateEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({emailIsForbidden: true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

  onSubmit(): void{
    console.log(this.userDataForm);
    this.userDataForm.reset();
  }
}

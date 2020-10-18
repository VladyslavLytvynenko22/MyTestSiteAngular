import { Subscription } from 'rxjs';
import { UserService } from './user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  activated = false;
  private activatedSub: Subscription;

  constructor(private userSrv: UserService) {}

  ngOnDestroy(): void {
    this.activatedSub.unsubscribe();
  }

  ngOnInit(): void{
    this.activatedSub = this.userSrv.activatedEmmiter.subscribe((activated: boolean) => {
      this.activated = activated;
    });
  }
}

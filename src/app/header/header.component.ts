import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

import { AuthService } from './../auth/auth.service';
import { DataStorageService } from './../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public isAuthenticated = false;
  private userChanged: Subscription;

  constructor(private dataStorageService: DataStorageService, private authService: AuthService){}

  ngOnDestroy(): void {
    this.userChanged.unsubscribe();
  }

  ngOnInit(): void {
    this.userChanged = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  onSaveData(): void {
    this.dataStorageService.storeRecipe();
  }

  onFetchData(): void {
    this.dataStorageService.fetchRecipe().subscribe();
  }

  onLogOut(): void {
    this.authService.logOut();
  }
}

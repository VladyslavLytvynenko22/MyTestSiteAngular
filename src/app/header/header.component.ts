import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from './../auth/store/auth.actions';
import * as RecipeActions from '../recipes/store/recipe.actions';
import { DataStorageService } from './../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public isAuthenticated = false;
  private userChanged: Subscription;

  constructor(private dataStorageService: DataStorageService,
              private store: Store<fromApp.AppState>) { }

  ngOnDestroy(): void {
    this.userChanged.unsubscribe();
  }

  ngOnInit(): void {
    this.userChanged = this.store
      .select('auth')
      .pipe(map(authState => authState.user))
      .subscribe(user => this.isAuthenticated = !!user);
  }

  onSaveData(): void {
    this.dataStorageService.storeRecipe();
  }

  onFetchData(): void {
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }

  onLogOut(): void {
    this.store.dispatch(new AuthActions.Logout());
  }
}

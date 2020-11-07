import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Ingredient } from './../../shared/ingredient.model';
import { ShoppingService } from './../shopping.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  constructor(private shoppingSrv: ShoppingService){}

  ngOnInit(): void {}

  onAddItem(form: NgForm): void{
    const vlue = form.value;
    const newIngridient = new Ingredient(vlue.name, vlue.amount);

    this.shoppingSrv.addIngredient(newIngridient);
  }
}

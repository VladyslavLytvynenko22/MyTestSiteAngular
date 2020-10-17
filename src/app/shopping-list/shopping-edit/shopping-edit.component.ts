import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';

import { Ingredient } from './../../shared/ingredient.model';
import { ShoppingService } from './../shopping.service';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput', { static: false}) nameInputRef: ElementRef;
  @ViewChild('amountInput', { static: false}) amountInputRef: ElementRef;

  constructor(private shoppingSrv: ShoppingService){}

  ngOnInit(): void {}

  onAddItem(): void{
    const newIngrName: string = this.nameInputRef.nativeElement.value;
    const newIngrAmount: number = +this.amountInputRef.nativeElement.value;
    const newIngridient = new Ingredient(newIngrName, newIngrAmount);

    this.shoppingSrv.addIngredient(newIngridient);
  }
}

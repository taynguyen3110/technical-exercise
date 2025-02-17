import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FruitItem, LocalFruitItem } from '../types';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'fruit-table',
  templateUrl: 'fruit-table.component.html',
})
export class FruitTableComponent implements OnInit {
  fruitList: FruitItem[] = [];
  selectedFruit: LocalFruitItem[] = [];

  private fb = inject(FormBuilder);
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getAllFruit().subscribe((data) => {
      this.fruitList = data.map((fruit) => {
        return { ...fruit, selected: false };
      });
    });
  }

  //   Add new fruit form
  addFruitForm = this.fb.group({
    id: [0 as number, [Validators.required]],
    name: [''],
    calories: [0],
    fat: [0],
    carbohydrates: [0],
    protein: [0],
  });

  // API services
  baseUrl = 'https://www.fruityvice.com/api/';
  getAllFruit() {
    return this.http.get<FruitItem[]>(this.baseUrl + 'fruit/all');
  }

  //   Select fruit item
  toogleCheckFruit(fr: FruitItem) {
    const index = this.fruitList.findIndex((fruit) => fruit.id === fr.id);
    this.fruitList[index] = {
      ...this.fruitList[index],
      selected: !this.fruitList[index].selected,
    };

    // Add to selected Array
    const existIndex = this.selectedFruit.findIndex((i) => i.id === fr.id);
    if (existIndex >= 0) {
      this.selectedFruit.splice(existIndex, 1);
    } else {
      this.selectedFruit.push(this.fruitItemToLocalFruit(fr));
    }
    console.log(this.selectedFruit);
  }

  //   FruitItem to LocalStorageFruit
  fruitItemToLocalFruit(fruit: FruitItem): LocalFruitItem {
    const localFruit = {
      name: fruit.name,
      id: fruit.id,
      calories: fruit.nutritions.calories,
      fat: fruit.nutritions.fat,
      carbohydrates: fruit.nutritions.carbohydrates,
      protein: fruit.nutritions.protein,
    };
    return localFruit;
  }

  //   Save to Local storage
  onSaveFruit() {
    localStorage.setItem('fruitList', JSON.stringify(this.selectedFruit));
  }

  //   Put request to add fruit
  onAddFruit() {
    const fruit: FruitItem = {
      name: this.addFruitForm.get('name')!.value!,
      id: this.addFruitForm.get('id')!.value!,
      family: '',
      order: '',
      genus: '',
      nutritions: {
        sugar: 0,
        calories: this.addFruitForm.get('calories')!.value!,
        fat: this.addFruitForm.get('fat')!.value!,
        carbohydrates: this.addFruitForm.get('carbohydrates')!.value!,
        protein: this.addFruitForm.get('protein')!.value!,
      },
    };
    this.http.put(this.baseUrl + 'fruit', fruit).subscribe(() => {
    });
  }
}

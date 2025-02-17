import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FruitTableComponent } from "./shared/components/fruit-table.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FruitTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'technical-exercise';
}

import { Component, signal } from '@angular/core';
import { HeaderComponent } from './components/header/header';
import { HomeComponent } from './pages/home/home';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class App {
  protected readonly title = signal('fitness-class-scheduler');
  currentYear = new Date().getFullYear();
}

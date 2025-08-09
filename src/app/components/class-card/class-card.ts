import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-class-card',
  standalone: true,
  templateUrl: './class-card.html',
  styleUrl: './class-card.css'
})
export class ClassCardComponent {
  @Input() className = '';
  @Input() day = '';
  @Input() time = '';
}

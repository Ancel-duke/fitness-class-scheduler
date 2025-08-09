import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface FitnessClassDraft {
  className: string;
  day: string;
  time: string;
}

@Component({
  selector: 'app-add-class-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-class-form.html',
  styleUrl: './add-class-form.css'
})
export class AddClassFormComponent {
  @Output() addClass = new EventEmitter<FitnessClassDraft>();

  className = '';
  day = 'Mon';
  time = '';

  onSubmit(): void {
    if (!this.className || !this.day || !this.time) {
      return;
    }
    this.addClass.emit({ className: this.className.trim(), day: this.day, time: this.time });
    this.className = '';
    this.day = 'Mon';
    this.time = '';
  }
}

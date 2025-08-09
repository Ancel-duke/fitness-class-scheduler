import { Component, EventEmitter, Input, Output, computed, signal } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { FitnessClass } from '../../models/fitness-class';

const DAY_ORDER = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] as const;

@Component({
  selector: 'app-schedule-table',
  standalone: true,
  imports: [],
  animations: [
    trigger('rowAnim', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(6px)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'none' }))
      ]),
      transition(':leave', [
        animate('180ms ease-in', style({ opacity: 0, transform: 'translateX(-8px)' }))
      ])
    ])
  ],
  templateUrl: './schedule-table.html',
  styleUrl: './schedule-table.css'
})
export class ScheduleTableComponent {
  private readonly _classes = signal<FitnessClass[]>([]);

  @Input() set classes(value: FitnessClass[]) {
    this._classes.set(value ?? []);
  }

  @Output() removeClass = new EventEmitter<number>();

  readonly grouped = computed(() => {
    const src = this._classes();
    const groups: Record<string, FitnessClass[]> = {};
    for (const d of DAY_ORDER) groups[d] = [];
    for (const item of src) {
      if (!groups[item.day]) groups[item.day] = [];
      groups[item.day].push(item);
    }
    for (const d of DAY_ORDER) {
      groups[d].sort((a, b) => a.time.localeCompare(b.time));
    }
    return groups;
  });

  onRemove(id: number): void {
    this.removeClass.emit(id);
  }
}

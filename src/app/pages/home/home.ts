import { Component, OnInit, signal, effect, inject, PLATFORM_ID, computed } from '@angular/core';
import { isPlatformBrowser, NgIf, NgFor } from '@angular/common';
import { AddClassFormComponent, FitnessClassDraft } from '../../components/add-class-form/add-class-form';
import { ScheduleTableComponent } from '../../components/schedule-table/schedule-table';
import { ClassCardComponent } from '../../components/class-card/class-card';
import { FitnessClass } from '../../models/fitness-class';

const STORAGE_KEY = 'fitness_classes_v1';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, NgFor, AddClassFormComponent, ScheduleTableComponent, ClassCardComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  message = 'Manage your weekly classes';

  classes = signal<FitnessClass[]>([]);
  viewMode = signal<'table' | 'card'>('table');
  grouped = computed(() => {
    const order = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    const groups: Record<string, FitnessClass[]> = {};
    for (const d of order) groups[d] = [];
    for (const c of this.classes()) {
      if (!groups[c.day]) groups[c.day] = [];
      groups[c.day].push(c);
    }
    for (const d of order) groups[d].sort((a,b)=>a.time.localeCompare(b.time));
    return groups;
  });

  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  constructor() {
    if (this.isBrowser) {
      effect(() => {
        const current = this.classes();
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
        } catch {}
      });
    }
  }

  ngOnInit(): void {
    if (!this.isBrowser) return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as FitnessClass[];
        if (Array.isArray(parsed)) {
          this.classes.set(parsed);
        }
      }
    } catch {}
  }

  handleAddClass(draft: FitnessClassDraft): void {
    const newItem: FitnessClass = {
      id: Date.now(),
      className: draft.className,
      day: draft.day,
      time: draft.time,
    };
    this.classes.update((arr) => [newItem, ...arr]);
  }

  handleRemoveClass(id: number): void {
    this.classes.update((arr) => arr.filter((c) => c.id !== id));
  }
}

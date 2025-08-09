export interface FitnessClass {
  id: number;
  className: string;
  day: string;
  time: string; // HH:mm
}

export type DayOfWeek = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';

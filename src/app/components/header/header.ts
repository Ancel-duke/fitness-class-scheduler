import { Component, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, NgIf } from '@angular/common';

const THEME_KEY = 'theme_pref_v1';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent {
  title = '🏋️ Fitness Class Scheduler';
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  isDark = false;

  constructor() {
    if (this.isBrowser) {
      const saved = localStorage.getItem(THEME_KEY);
      this.isDark = saved === 'dark' || (saved == null && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
      this.applyTheme();
    }
  }

  toggleTheme(): void {
    if (!this.isBrowser) return;
    this.isDark = !this.isDark;
    localStorage.setItem(THEME_KEY, this.isDark ? 'dark' : 'light');
    this.applyTheme();
  }

  private applyTheme(): void {
    const root = document.documentElement;
    if (this.isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }
}

import { Component, inject } from '@angular/core';
import { DarkModeService } from '../service/darkmode.service';
import { ZardButtonComponent } from '@shared/components/button/button.component';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [ZardButtonComponent],
  template: `
    <z-button
      zType="outline"
      zSize="icon"
      zShape="circle"
      class="relative overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-pointer"
      (click)="toggleTheme()"
      [attr.aria-label]="'Toggle ' + (isDark() ? 'light' : 'dark') + ' mode'"
    >
      @if (isDark()) {
        <div class="absolute inset-0 flex items-center justify-center transition-all duration-500 rotate-0 scale-100">☀️</div>
      } @else {
        <div class="absolute inset-0 flex items-center justify-center transition-all duration-500 rotate-0 scale-100">🌙</div>
      }
    </z-button>
  `,
})

export class ThemeToggleComponent {

  constructor(private darkModeService: DarkModeService) {}

  protected isDark(): boolean {
    return this.darkModeService.getCurrentTheme() === 'dark';
  }

  protected toggleTheme(): void {
    this.darkModeService.toggleTheme();
  }
}

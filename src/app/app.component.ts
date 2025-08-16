import {Component, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import {ZardDividerComponent} from '@shared/components/divider/divider.component';
import {ZardPaginationModule} from '@shared/components/pagination/pagination.module';
import {ZardButtonComponent} from '@shared/components/button/button.component';
import {DarkModeService} from './service/darkmode.service';
import {ThemeToggleComponent} from './theme/themetoggle.component';
import {AvatarComponent} from './avatar/avatar.component';
import {BackgroundComponent} from './background/background.component';
import {TracksComponent} from './tracks/tracks.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ZardDividerComponent,
    ZardPaginationModule,
    ZardButtonComponent,
    ThemeToggleComponent,
    AvatarComponent,
    BackgroundComponent,
    NgOptimizedImage,
    TracksComponent,
  ],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div class="fixed top-4 right-4 z-50">
        <app-theme-toggle/>
      </div>

      <header class="container mx-auto px-6 py-12">
        <div class="flex flex-col items-center text-center space-y-6">
          <app-avatar/>

          <div class="space-y-2">
            <h1 class="text-4xl font-bold text-slate-900 dark:text-slate-100">
              Joep Dulk
            </h1>
            <p class="text-lg text-slate-600 dark:text-slate-300">
              Self Taught Developer
            </p>
            <p class="text-sm text-slate-500 dark:text-slate-400 max-w-md">
              Primarily a Java developer, currently expanding my skills in Angular and TypeScript. <br> I enjoy building clean, efficient code and learning new technologies along the way.
             <br> Outside of coding, I love cooking and playing video games.
            </p>
          </div>

          <div class="flex gap-3">
            <z-button zType="default" class="gap-2 cursor-pointer" (click)="openGitHub()">
              <img [ngSrc]="githubIcon" alt="GitHub" class="w-4 h-4" width="16" height="16">
              GitHub
            </z-button>
            <z-button zType="outline" class="gap-2 cursor-pointer" (click)="openDiscord()">
              <img [ngSrc]="discordIcon" alt="Discord" class="w-4 h-4" width="16" height="16">
              Discord
            </z-button>
          </div>
        </div>
      </header>

      <z-divider zSpacing="lg"></z-divider>

      <main class="container mx-auto px-6 py-8">
        <app-background/>
        <z-divider></z-divider>
      </main>

      <z-divider></z-divider>

      <app-tracks/>

      <footer class="container mx-auto px-6 py-8 text-center">
        <z-divider class="mb-6"></z-divider>
        <p class="text-slate-500 dark:text-slate-400">
          © 2025 Joep Dulk. Built with <3 in Angular, Tailwind CSS and ZardUI.
        </p>
      </footer>
    </div>
  `,

})
export class AppComponent implements OnInit {

  protected githubIcon = 'assets/github.svg';
  protected discordIcon = 'assets/discord.png';

  constructor(protected darkModeService: DarkModeService) {
  }

  public ngOnInit(): void {
    this.darkModeService.initTheme();

  }

  protected openGitHub(): void {
    window.open('https://github.com/JustReddy7397', '_blank', 'noopener,noreferrer');
  }

  protected openDiscord(): void {
    window.open('https://discord.com/users/729270256777953312', '_blank', 'noopener,noreferrer');
  }
}

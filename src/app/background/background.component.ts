import {Component, signal} from '@angular/core';
import {
  ZardPaginationComponent,
  ZardPaginationNextComponent,
  ZardPaginationPreviousComponent
} from '@shared/components/pagination/pagination.component';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-background',
  standalone: true,
  imports: [
    ZardPaginationComponent,
    NgOptimizedImage,
    ZardPaginationPreviousComponent,
    ZardPaginationNextComponent
  ],
  template: `
    <section class="mb-12">
      <h2 class="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-6 text-center">
        Experience, Education & Projects
      </h2>

      <div class="max-w-4xl mx-auto">
        <div class="transform transition-all duration-300 ease-out">
          <div class="flex items-center justify-center gap-4 mb-6">
            <div
              [class]="currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'"
              (click)="goToPrevious()">
              <z-pagination-previous></z-pagination-previous>
            </div>

            <z-pagination
              [zPageIndex]="currentPage"
              [zTotal]="totalPages"
              (zPageIndexChange)="onPageChange($event)">
            </z-pagination>

            <div
              [class]="currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'"
              (click)="goToNext()">
              <z-pagination-next></z-pagination-next>
            </div>
          </div>
        </div>

        <div
          class="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6 transition-all duration-500 ease-in-out transform"
          [class.opacity-0]="isTransitioning()"
          [class.translate-x-4]="isTransitioning()"
        >
          @switch (displayPage()) {
            @case (1) {
              <div class="space-y-6">
                @for (experience of experiences; track experience.name) {
                  <div
                    class="flex items-start space-x-4 border-l-4 border-blue-500 pl-4 rounded-lg p-3 transition-colors duration-200"
                    [class.cursor-pointer]="experience.url"
                    [class.hover:bg-slate-50]="experience.url"
                    [class.dark:hover:bg-slate-700]="experience.url"
                    (click)="experience.url ? openUrl(experience.url) : null"
                  >
                    <img
                      [ngSrc]="experience.logoUrl"
                      [alt]="experience.name"
                      width="96"
                      height="96"
                      class="w-24 h-24 rounded-lg object-contain flex-shrink-0 shadow-md p-2"
                    >
                    <div class="flex-1">
                      <div class="flex items-center space-x-2">
                        <h3 class="text-xl font-semibold text-slate-900 dark:text-slate-100">
                          {{ experience.name }}
                        </h3>
                        @if (experience.url) {
                          <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                          </svg>
                        }
                      </div>
                      <p class="text-slate-600 dark:text-slate-300">{{ experience.position }}
                        • {{ experience.duration }}</p>
                      <p class="text-slate-700 dark:text-slate-400 mt-2">
                        {{ experience.description }}
                      </p>
                      <div class="flex flex-wrap gap-2 mt-3">
                        @for (tech of experience.techStack; track tech) {
                          <span
                            class="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full">
                            {{ tech }}
                          </span>
                        }
                      </div>
                    </div>
                  </div>
                }
              </div>
            }
            @case (2) {
              <div class="space-y-6">
                @for (edu of education; track edu.name) {
                  <div
                    class="flex items-start space-x-4 border-l-4 border-purple-500 pl-4 rounded-lg p-3 transition-colors duration-200"
                    [class.cursor-pointer]="edu.url"
                    [class.hover:bg-slate-50]="edu.url"
                    [class.dark:hover:bg-slate-700]="edu.url"
                    (click)="edu.url ? openUrl(edu.url) : null"
                  >
                    <img
                      [ngSrc]="edu.logoUrl"
                      [alt]="edu.name"
                      width="96"
                      height="96"
                      class="w-24 h-24 rounded-lg object-contain flex-shrink-0 shadow-md p-1"
                    >
                    <div class="flex-1">
                      <div class="flex items-center space-x-2">
                        <h3 class="text-xl font-semibold text-slate-900 dark:text-slate-100">
                          {{ edu.position }}
                        </h3>
                        @if (edu.url) {
                          <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                          </svg>
                        }
                      </div>
                      <p class="text-slate-600 dark:text-slate-300">{{ edu.name }} • {{ edu.duration }}</p>
                      <p class="text-slate-700 dark:text-slate-400 mt-2">
                        {{ edu.description }}
                      </p>
                      <div class="flex flex-wrap gap-2 mt-3">
                        @for (tech of edu.techStack; track tech) {
                          <span
                            class="px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full">
                {{ tech }}
              </span>
                        }
                      </div>
                    </div>
                  </div>
                }
              </div>
            }
            @case (3) {
              <div class="space-y-6">
                @for (project of githubProjects; track project.name) {
                  <div
                    class="flex items-start space-x-4 border-l-4 border-indigo-500 pl-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg p-3 transition-colors duration-200"
                    (click)="openUrl(project.url)"
                  >
                    <div
                      class="w-16 h-16 rounded-lg bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-md">
                      <span class="text-white font-bold text-lg">{{ project.icon }}</span>
                    </div>
                    <div class="flex-1">
                      <div class="flex items-center space-x-2">
                        <h3 class="text-xl font-semibold text-slate-900 dark:text-slate-100">
                          {{ project.name }}
                        </h3>
                        <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                        </svg>
                      </div>
                      <p class="text-slate-600 dark:text-slate-300">{{ project.technologies }}</p>
                      <p class="text-slate-700 dark:text-slate-400 mt-2">
                        {{ project.description }}
                      </p>
                      <div class="flex flex-wrap gap-2 mt-3">
                        @for (tech of project.techStack; track tech) {
                          <span
                            class="px-2 py-1 text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full">
                            {{ tech }}
                          </span>
                        }
                      </div>
                    </div>
                  </div>
                }
              </div>
            }
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    z-pagination-button {
      transition: all 0.2s ease-in-out;
    }

    z-pagination-button:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    z-pagination-button[data-active="true"] {
      transform: scale(1.05);
      box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
    }

    img {
      transition: transform 0.2s ease-in-out;
    }

    img:hover {
      transform: scale(1.05);
    }

    .cursor-pointer:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    z-pagination-previous, z-pagination-next {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.5rem 1rem;
      border-radius: 0.375rem;
      background-color: var(--color-secondary);
      color: var(--color-secondary-foreground);
      font-weight: 500;
      transition: all 0.2s ease-in-out;
      border: 1px solid var(--color-border);
    }

    z-pagination-previous:hover:not([data-disabled="true"]),
    z-pagination-next:hover:not([data-disabled="true"]) {
      background-color: var(--color-accent);
      color: var(--color-accent-foreground);
      transform: translateY(-2px);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    z-pagination-previous[data-disabled="true"],
    z-pagination-next[data-disabled="true"] {
      background-color: var(--color-muted);
      color: var(--color-muted-foreground);
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
      opacity: 0.5;
    }

    .dark z-pagination-previous:hover:not([data-disabled="true"]),
    .dark z-pagination-next:hover:not([data-disabled="true"]) {
      box-shadow: 0 4px 6px rgba(255, 255, 255, 0.1);
    }
  `]
})
export class BackgroundComponent {
  protected currentPage = 1;
  protected totalPages = 3;

  readonly isTransitioning = signal(false);
  readonly displayPage = signal(1);

  protected readonly experiences = [
    {
      name: "Moonvive Entertainment",
      url: 'https://moonvive.com',
      position: "Java & Backend Developer",
      duration: "12/2024 - Present",
      description: "Contributed to the development of The Universe Minecraft server, focusing on Java and backend technologies.",
      logoUrl: 'assets/moonvive.png',
      technologies: 'Java, TypeScript, Redis, Sockets, MongoDB',
      techStack: ['Java', 'TypeScript', 'Redis', 'Sockets', "MongoDB"],
    },
    {
      name: "Ranked Network",
      url: "",
      position: "Lead Developer",
      duration: "2022 - 2024",
      description: "Led the development of custom plugins for a competitive Minecraft server, including the SkyWars plugin.",
      logoUrl: 'assets/ranked-network.png',
      technologies: 'Java, Spigot API, MySQL',
      techStack: ['Java', 'Spigot API', 'MySQL', 'MongoDB'],
    }
  ];

  protected readonly education = [
    {
      name: "MBO Rijnland",
      url: "https://www.mborijnland.nl",
      position: "MBO Niveau 2 - Kok (Cook)",
      duration: "08/2023 - 06/2024",
      description: "Completed a vocational training program (MBO Level 2) in culinary arts, specializing in food preparation, kitchen operations, and hygiene standards.",
      logoUrl: 'assets/mborijnland.png',
      technologies: "Food Preparation, Cooking, Hygiene",
      techStack: ["Culinary Arts", "Food Safety", "Kitchen Management"],
    },
    {
      name: "MBO Rijnland",
      url: "https://www.mborijnland.nl",
      position: "MBO Niveau 1 - Kok Assistant",
      duration: "08/2022 - 06/2023",
      description: "Completed a vocational training program (MBO Level 1) focusing on basic kitchen operations, food preparation, and hygiene standards.",
      logoUrl: "assets/mborijnland.png",
      technologies: "Basic Cooking, Food Prep, Hygiene",
      techStack: ["Kitchen Basics", "Food Safety", "Assisting in Culinary Tasks"],
    },
  ]

  protected readonly githubProjects = [
    {
      name: 'WhaleSkyWars',
      url: 'https://github.com/JustReddy7397/WhaleSkyWars',
      description: 'A Modern Minecraft plugin for the SkyWars mini-game, featuring custom arenas, kits, and matchmaking, entirely from scratch.',
      technologies: 'Java, Spigot API, MySQL, MongoDB, RabbitMQ',
      techStack: ['Java', 'Spigot API', 'MySQL', "MongoDB", 'RabbitMQ'],
      icon: '🐳',
    },
    {
      name: 'My Personal Website',
      url: 'https://github.com/JustReddy7397/PersonalWebsite',
      description: 'My personal website showcasing my portfolio, skills, and projects.',
      technologies: 'Angular, TypeScript, Tailwind CSS',
      techStack: ['Angular', 'TypeScript', 'Tailwind CSS'],
      icon: '🌐'
    },
    {
      name: 'Employee Management Site',
      url: 'https://github.com/JustReddy7397/EmployeeManagerSite',
      description: 'A WIP employee management site I\'m building for fun and to learn with Angular, Tailwind CSS, MongoDB and NestJS.',
      technologies: 'Angular, Tailwind CSS, NestJS, MongoDB',
      techStack: ['Angular', 'Tailwind CSS', 'NestJS', 'MongoDB'],
      icon: '👨‍💼',
    }
  ];

  protected onPageChange(page: number): void {
    if (page === this.currentPage) return;

    this.isTransitioning.set(true);

    setTimeout(() => {
      this.currentPage = page;
      this.displayPage.set(page);
      this.isTransitioning.set(false);
    }, 200);
  }

  protected openUrl(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  protected goToPrevious(): void {
    if (this.currentPage > 1) {
      this.onPageChange(this.currentPage - 1);
    }
  }

  protected goToNext(): void {
    if (this.currentPage < this.totalPages) {
      this.onPageChange(this.currentPage + 1);
    }
  }
}

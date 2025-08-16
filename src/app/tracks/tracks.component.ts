import {
  ZardPaginationComponent,
  ZardPaginationNextComponent,
  ZardPaginationPreviousComponent
} from '@shared/components/pagination/pagination.component';
import {NgOptimizedImage} from '@angular/common';
import {SpotifyService, Track} from '../service/spotify.service';
import {Component, OnInit, signal} from '@angular/core';

@Component({
  selector: 'app-tracks',
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
        Recently Played Tracks
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
          @if (isLoading) {
            <div class="flex items-center justify-center p-8">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          } @else if (currentPageTracks.length === 0) {
            <div class="text-center p-8">
              <p class="text-slate-600 dark:text-slate-400">No tracks found</p>
            </div>
          } @else {
            <div class="space-y-4">
              @for (track of currentPageTracks; track track.mbid || track.name) {
                <div
                  class="flex items-start space-x-4 border-l-4 border-green-500 pl-4 rounded-lg p-3 transition-colors duration-200 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700"
                  [class.border-orange-500]="track['@attr']?.nowplaying"
                  (click)="openUrl(track.url)"
                >
                  <img
                    [ngSrc]="getTrackImage(track)"
                    [alt]="track.name"
                    width="64"
                    height="64"
                    class="w-16 h-16 rounded-lg object-cover flex-shrink-0 shadow-md"
                  >
                  <div class="flex-1">
                    <div class="flex items-center space-x-2">
                      <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100">
                        {{ track.name }}
                      </h3>
                      @if (track['@attr']?.nowplaying) {
                        <span class="px-2 py-1 text-xs bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 rounded-full animate-pulse">
                      Now Playing
                    </span>
                      }
                      <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                      </svg>
                    </div>
                    <p class="text-slate-600 dark:text-slate-300">
                      {{ getArtistName(track) }}
                      @if (track.album?.['#text']) {
                        • {{ track.album['#text'] }}
                      }
                    </p>
                    @if (track.playcount) {
                      <p class="text-slate-500 dark:text-slate-400 text-sm mt-1">
                        Played {{ track.playcount }} times
                      </p>
                    }
                    @if (!track['@attr']?.nowplaying && track.date) {
                      <p class="text-slate-500 dark:text-slate-400 text-sm mt-1">
                        {{ formatDate(track.date.uts) }}
                      </p>
                    }
                  </div>
                </div>
              }
            </div>
          }
        </div>

        <div class="flex justify-center mt-8">
          <div class="relative group">
            <div class="absolute -inset-1 bg-gradient-to-r from-red-600 via-red-500 to-orange-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
            <a
              href="https://www.last.fm"
              target="_blank"
              rel="noopener noreferrer"
              class="relative flex items-center gap-3 px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 group"
            >
              <div class="flex items-center gap-2">
              <span class="text-sm font-medium text-slate-600 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors">
                Powered by
              </span>
                <div class="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full">
                  <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M10.584 17.21l-.88-2.392s-1.43 1.594-3.573 1.594c-1.897 0-3.244-1.649-3.244-4.288 0-3.382 1.704-4.591 3.381-4.591 2.42 0 3.189 1.567 3.849 3.574l.88 2.75c.88 2.728 2.53 4.924 7.287 4.924 3.382 0 5.67-1.018 5.67-3.711 0-2.178-1.238-2.948-3.516-3.382l-1.704-.317c-1.155-.22-1.485-.55-1.485-1.155 0-.715.55-1.129 1.463-1.129 1.012 0 1.54.385 1.623 1.293l2.255-.275c-.22-2.057-1.925-2.948-3.793-2.948-1.98 0-3.849.88-3.849 3.244 0 1.54.66 2.53 2.724 2.948l1.76.357c1.43.275 1.925.742 1.925 1.54 0 .962-.88 1.43-2.255 1.43-2.2 0-3.025-1.045-3.630-3.025l-.88-2.86C14.077 3.718 12.702 2 9.21 2 5.829 2 3 4.453 3 8.515c0 4.785 2.53 7.287 6.406 7.287 2.53 0 4.51-1.54 4.51-1.54l-.332-.052z"/>
                  </svg>
                  <span class="text-white font-bold text-sm tracking-wide">Last.fm</span>
                </div>
              </div>
              <svg class="w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
            </a>
          </div>
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
export class TracksComponent implements OnInit {
  protected currentPage = 1;
  protected totalPages = 1;
  protected tracksPerPage = 10;
  protected allTracks: Track[] = [];
  protected currentPageTracks: Track[] = [];
  protected isLoading = true;

  readonly isTransitioning = signal(false);

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.loadTracks();
  }

  private loadTracks(): void {
    this.isLoading = true;
    this.spotifyService.getRecentTracks(15).subscribe({
      next: (tracks) => {
        this.allTracks = tracks;
        this.totalPages = Math.ceil(tracks.length / this.tracksPerPage);
        this.updateCurrentPageTracks();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Failed to load tracks:', error);
        this.isLoading = false;
      }
    });
  }

  private updateCurrentPageTracks(): void {
    const startIndex = (this.currentPage - 1) * this.tracksPerPage;
    const endIndex = startIndex + this.tracksPerPage;
    this.currentPageTracks = this.allTracks.slice(startIndex, endIndex);
  }

  protected onPageChange(page: number): void {
    if (page === this.currentPage) return;

    this.isTransitioning.set(true);

    setTimeout(() => {
      this.currentPage = page;
      this.updateCurrentPageTracks();
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

  protected getTrackImage(track: Track): string {
    const image = track.image?.find(img => img.size === 'large' || img.size === 'extralarge')
      || track.image?.[track.image.length - 1];
    return image?.['#text'] || 'assets/default-album.png';
  }

  protected getArtistName(track: Track): string {
    return track.artist?.['#text'] || track.artist?.name || 'Unknown Artist';
  }

  protected formatDate(timestamp: string): string {
    if (timestamp === '0') return 'Now Playing';
    const date = new Date(parseInt(timestamp) * 1000);
    return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}

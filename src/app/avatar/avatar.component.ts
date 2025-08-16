import {Component, OnDestroy, OnInit, signal} from '@angular/core';
import {ZardAvatarComponent} from '@shared/components/avatar/avatar.component';

@Component({
  selector: 'app-avatar',
  standalone: true,
  template: `
    <div
      class="transition-transform duration-1000 ease-in-out"
      [style.transform]="'translate(' + avatarTransform().x + 'px, ' + avatarTransform().y + 'px)'">
      <z-avatar
        [zImage]="{ fallback: 'JR', url: 'assets/me_myself_and_i.png', alt: 'Profile Picture' }"
        zSize="lg"
        zShape="circle"
        [zBorder]="true">
      </z-avatar>
    </div>`,
  imports: [
    ZardAvatarComponent
  ]
})
export class AvatarComponent implements OnInit, OnDestroy {

  private animationInterval?: number;
  public readonly avatarTransform = signal({ x: 0, y: 0 });

  public ngOnInit() {
    this.startAvatarAnimation();
  }

  public ngOnDestroy(): void {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }
  }

  private startAvatarAnimation(): void {
    this.animationInterval = window.setInterval(() => {
      const maxOffset = 15;
      const x = (Math.random() - 0.5) * 2 * maxOffset;
      const y = (Math.random() - 0.5) * 2 * maxOffset;

      this.avatarTransform.set({ x, y });
    }, 2000);
  }


}

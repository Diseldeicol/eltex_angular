import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MenuItem } from '../../../types/menu-items';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { ViewportScroller } from '@angular/common';
import { inject } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header { 
  protected links: MenuItem[] = [
    {
      title: 'About me',
      linkHref: '/about',
    },
    {
      title: 'Blog',
      linkHref: '/blog'
    }
  ]
  private viewportScroller = inject(ViewportScroller);

  protected scrollToFooter(event: Event): void {
    event.preventDefault();
    this.viewportScroller.scrollToAnchor('footer');
  }
}

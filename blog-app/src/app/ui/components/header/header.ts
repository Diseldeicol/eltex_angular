import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MenuItem } from './menu-items';
import { RouterLink } from "@angular/router";
import { ViewportScroller } from '@angular/common';
import { inject } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header { 
  protected links: MenuItem[] = [
    {
      title: 'About me',
      linkHref: '/',
    },
    {
      title: 'Blog',
      linkHref: '/blog'
    }
  ]
  private viewportScroller = inject(ViewportScroller);

  scrollToFooter(event: Event): void {
    event.preventDefault();
    this.viewportScroller.scrollToAnchor('footer');
  }
}

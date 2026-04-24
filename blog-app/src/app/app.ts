import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './ui/components/header/header';
import { Footer } from "./ui/components/footer/footer";
import { Index } from "./ui/pages/index";
import { Blog } from './ui/pages/blog/blog';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('blog-app');
}

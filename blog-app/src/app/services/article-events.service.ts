import { Injectable } from '@angular/core';
import { Subject, type Observable } from 'rxjs';
import { io, type Socket } from 'socket.io-client';

import { environment } from '../../environments/environment';

export type ArticleEvent =
  | {
      type: 'COMMENT_CREATED';
      payload: {
        commentId: string;
        articleId: string;
        content: string;
        username: string;
        createdAt: string;
      };
    }
  | {
      type: 'COMMENT_RATING_CHANGED';
      payload: {
        commentId: string;
        articleId: string;
        rating: number;
        prevRating: number;
      };
    }
  | {
      type: 'ARTICLE_RATING_CHANGED';
      payload: {
        articleId: string;
        rating: number;
        prevRating: number;
      };
    };

@Injectable({ providedIn: 'root' })
export class ArticleEventsService {
  private readonly eventsSubject = new Subject<ArticleEvent>();
  private socket: Socket | null = null;

  public readonly events$: Observable<ArticleEvent> = this.eventsSubject.asObservable();

  public connect(): void {
    if (!environment.useWebSocket || !environment.wsUrl || this.socket) {
      return;
    }

    this.socket = io(environment.wsUrl, {
      autoConnect: false,
      transports: ['websocket'],
      reconnectionAttempts: 3,
    });

    this.socket.on('comment-created', (event: ArticleEvent) => this.emitEvent(event));
    this.socket.on('comment-rating-changed', (event: ArticleEvent) => this.emitEvent(event));
    this.socket.on('article-rating-changed', (event: ArticleEvent) => this.emitEvent(event));
    this.socket.on('connect_error', () => undefined);
    this.socket.on('error', () => undefined);

    try {
      this.socket.connect();
    } catch {
      this.disconnect();
    }
  }

  public subscribeArticle(articleId: string): void {
    this.connect();
    this.socket?.emit('subscribe-article', articleId);
  }

  public unsubscribeArticle(articleId: string): void {
    this.socket?.emit('unsubscribe-article', articleId);
  }

  public subscribeAll(): void {
    this.connect();
    this.socket?.emit('subscribe-all');
  }

  public disconnect(): void {
    this.socket?.disconnect();
    this.socket = null;
  }

  private emitEvent(event: ArticleEvent): void {
    if (!event?.type) {
      return;
    }

    this.eventsSubject.next(event);
  }
}

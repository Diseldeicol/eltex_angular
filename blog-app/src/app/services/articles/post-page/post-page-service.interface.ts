import type { Observable } from 'rxjs';

import type { ArticleComment } from '../../../types/article.comment.type';
import type { PostDetailsResponse } from '../../../types/post-details-response.type';

export interface PostPageServiceInterface {
  getPostWithComments(articleId: string): Observable<PostDetailsResponse>;

  addComment(
    articleId: string,
    comment: Pick<ArticleComment, 'author' | 'text'>,
  ): Observable<PostDetailsResponse>;

  changeArticleRating(articleId: string, delta: number): Observable<PostDetailsResponse>;

  changeCommentRating(
    articleId: string,
    commentId: string,
    delta: number,
  ): Observable<PostDetailsResponse>;
}

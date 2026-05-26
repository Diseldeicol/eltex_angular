import { Injectable, inject } from '@angular/core';
import { gql } from '@apollo/client';
import { Apollo } from 'apollo-angular';
import { catchError, forkJoin, map, of, switchMap, type Observable } from 'rxjs';

import type { ArticleComment } from '../../../types/article.comment.type';
import type { BackendArticle } from '../../../types/backend-article.type';
import type { BackendComment } from '../../../types/backend-comment.type';
import type { PostDetailsResponse } from '../../../types/post-details-response.type';
import { ArticleMapperService } from '../article-mapper.service';
import { CommentMapperService } from '../comment-mapper.service';
import type { PostPageServiceInterface } from './post-page-service.interface';

const ARTICLE_FIELDS = gql`
  fragment PostPageArticleFields on ArticleEntity {
    id
    title
    content
    createdAt
    imgSrc
    rating
    categoryId
    category {
      name
    }
  }
`;

const COMMENT_FIELDS = gql`
  fragment PostPageCommentFields on CommentEntity {
    id
    articleId
    content
    username
    createdAt
    rating
  }
`;

const GET_POST = gql`
  ${ARTICLE_FIELDS}
  ${COMMENT_FIELDS}
  query GetPost($articleId: ID!) {
    article(id: $articleId) {
      ...PostPageArticleFields
    }
    commentsByArticle(articleId: $articleId) {
      ...PostPageCommentFields
    }
  }
`;

const CREATE_COMMENT = gql`
  ${COMMENT_FIELDS}
  mutation CreateComment($articleId: String!, $content: String!, $username: String!) {
    createComment(
      createComment: {
        articleId: $articleId
        content: $content
        username: $username
      }
    ) {
      ...PostPageCommentFields
    }
  }
`;

const ARTICLE_RATING_UP = gql`
  ${ARTICLE_FIELDS}
  mutation ArticleRatingUp($id: ID!) {
    articleRatingUp(id: $id) {
      ...PostPageArticleFields
    }
  }
`;

const ARTICLE_RATING_DOWN = gql`
  ${ARTICLE_FIELDS}
  mutation ArticleRatingDown($id: ID!) {
    articleRatingDown(id: $id) {
      ...PostPageArticleFields
    }
  }
`;

const COMMENT_RATING_UP = gql`
  ${COMMENT_FIELDS}
  mutation CommentRatingUp($id: ID!) {
    commentRatingUp(id: $id) {
      ...PostPageCommentFields
    }
  }
`;

const COMMENT_RATING_DOWN = gql`
  ${COMMENT_FIELDS}
  mutation CommentRatingDown($id: ID!) {
    commentRatingDown(id: $id) {
      ...PostPageCommentFields
    }
  }
`;

type GetPostResponse = {
  article: BackendArticle | null;
  commentsByArticle: BackendComment[];
};

@Injectable()
export class PostPageGraphqlService implements PostPageServiceInterface {
  private readonly apollo = inject(Apollo);
  private readonly articleMapper = inject(ArticleMapperService);
  private readonly commentMapper = inject(CommentMapperService);

  public getPostWithComments(articleId: string): Observable<PostDetailsResponse> {
    return this.apollo
      .query<GetPostResponse>({
        query: GET_POST,
        variables: { articleId },
        fetchPolicy: 'network-only',
      })
      .pipe(
        map(({ data }) => ({
          article: data?.article ? this.articleMapper.toArticle(data.article) : null,
          comments: this.toComments(data?.commentsByArticle ?? []),
        })),
        catchError(() => of({ article: null, comments: [] })),
      );
  }

  public addComment(
    articleId: string,
    comment: Pick<ArticleComment, 'author' | 'text'>,
  ): Observable<PostDetailsResponse> {
    return this.apollo
      .mutate<{ createComment: BackendComment }>({
        mutation: CREATE_COMMENT,
        variables: {
          articleId,
          content: comment.text,
          username: comment.author,
        },
      })
      .pipe(switchMap(() => this.getPostWithComments(articleId)));
  }

  public changeArticleRating(
    articleId: string,
    delta: number,
  ): Observable<PostDetailsResponse> {
    return this.apollo
      .mutate<{ articleRatingUp?: BackendArticle; articleRatingDown?: BackendArticle }>({
        mutation: delta > 0 ? ARTICLE_RATING_UP : ARTICLE_RATING_DOWN,
        variables: { id: articleId },
      })
      .pipe(
        switchMap(({ data }) => {
          const article = data?.articleRatingUp ?? data?.articleRatingDown ?? null;

          return forkJoin({
            article: of(article ? this.articleMapper.toArticle(article) : null),
            comments: this.getComments(articleId),
          });
        }),
        catchError(() => this.getPostWithComments(articleId)),
      );
  }

  public changeCommentRating(
    articleId: string,
    commentId: string,
    delta: number,
  ): Observable<PostDetailsResponse> {
    return this.apollo
      .mutate<{ commentRatingUp?: BackendComment; commentRatingDown?: BackendComment }>({
        mutation: delta > 0 ? COMMENT_RATING_UP : COMMENT_RATING_DOWN,
        variables: { id: commentId },
      })
      .pipe(
        switchMap(() => this.getPostWithComments(articleId)),
        catchError(() => this.getPostWithComments(articleId)),
      );
  }

  private getComments(articleId: string): Observable<ArticleComment[]> {
    return this.apollo
      .query<{ commentsByArticle: BackendComment[] }>({
        query: gql`
          ${COMMENT_FIELDS}
          query GetComments($articleId: ID!) {
            commentsByArticle(articleId: $articleId) {
              ...PostPageCommentFields
            }
          }
        `,
        variables: { articleId },
        fetchPolicy: 'network-only',
      })
      .pipe(
        map(({ data }) => this.toComments(data?.commentsByArticle ?? [])),
        catchError(() => of([])),
      );
  }

  private toComments(comments: BackendComment[]): ArticleComment[] {
    return comments
      .map((comment) => this.commentMapper.toComment(comment))
      .sort((firstComment, secondComment) =>
        secondComment.date.localeCompare(firstComment.date),
      );
  }
}

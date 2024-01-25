export interface Post {
  _highlightResult: HighlightResult;
  _tags?: string[] | null;
  author: string;
  created_at: string;
  created_at_i: number;
  num_comments: number;
  objectID: string;
  points: number;
  story_id: number;
  title: string;
  updated_at: string;
  url: string;
}
export interface HighlightResult {
  author: AuthorOrTitleOrUrl;
  title: AuthorOrTitleOrUrl;
  url: AuthorOrTitleOrUrl;
}
export interface AuthorOrTitleOrUrl {
  matchLevel: string;
  matchedWords?: null[] | null;
  value: string;
}

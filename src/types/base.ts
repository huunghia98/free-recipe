export interface age<T> {
  data: T[];
  readonly meta: PageMeta;
}

export interface PageMeta {
  readonly page: number;
  readonly take: number;
  readonly itemCount: number;
  readonly pageCount: number;
}

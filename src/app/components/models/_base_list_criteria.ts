export class ListCriteria {
  constructor(
    public pageIndex: number,
    public pageSize: number,
    public sort: string | null,
    public sortAscending: boolean | null,
    public search: string | null,
    public lookups: string | null,
    public ranges: string | null,
    public id: number | null,
  ) {}

  static default(): ListCriteria {
    return new ListCriteria(1, 50, "1 DESC", true, null, null, null, null);
  }
}

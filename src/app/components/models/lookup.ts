export class Lookup {
  id: number | null = null;
  name: string = "";
  IdArr: number[] = [];
}

export class LookupParams {
  TableName!: string;
  Id!: string;
  Name!: string;
  SelectedIds?: number[];
}

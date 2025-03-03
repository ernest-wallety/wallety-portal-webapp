export class Lookup {
  Id: number | null = null;
  Name: string = "";
  IdArr: number[] = [];
}

export class LookupParams {
  TableName!: string;
  Id!: string;
  Name!: string;
  SelectedIds?: number[];
}

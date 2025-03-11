export class Lookup {
  Id!: any;
  Name?: string = "";
  IdArr: number[] = [];
  AltBoolValue?: boolean;
  PrimaryKey?: string;
}

export class LookupParams {
  TableName!: string;
  Id!: string;
  Name!: string;
  SelectedIds?: number[];
}

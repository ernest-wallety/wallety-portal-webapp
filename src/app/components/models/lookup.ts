export class Lookup {
  Id: any | null = null;
  Name: string = "";
  IdArr: number[] = [];
  AltBoolValue?: boolean;
}

export class LookupParams {
  TableName!: string;
  Id!: string;
  Name!: string;
  SelectedIds?: number[];
}

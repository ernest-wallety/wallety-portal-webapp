export class LookupModel {
  id!: any;
  name?: string = "";
  idArr: number[] = [];
  altBoolValue?: boolean;
  primaryKey?: string;
}

export class LookupParams {
  tableName!: string;
  id!: string;
  name!: string;
  selectedIds?: number[];
}

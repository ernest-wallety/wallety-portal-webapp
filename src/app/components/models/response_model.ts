export class ResponseModel {
   public Data?: any = Object.assign(new Object());

   public IsError: boolean = false;
   public IsException?: boolean;
   public ErrorList: Array<string> = new Array<string>();
}

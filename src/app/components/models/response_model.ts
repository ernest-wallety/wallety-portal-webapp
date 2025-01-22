/* eslint-disable @typescript-eslint/no-explicit-any */
export class ResponseModel {
   public Data?: any = Object.assign(new Object());

   public IsError = false;
   public IsException?: boolean;
   public ErrorList: string[] = new Array<string>();
}

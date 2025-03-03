import { EnumValidationDisplay } from "../enum/enum_validation_display";

export class ResponseModel {
  public Data?: any = Object.assign(new Object());
  public ResponseMessage?: string;
  public StatusCode?: number;

  public IsError = false;
  public IsException?: boolean;
  public ErrorList: string[] = new Array<string>();

  public ShowError = true;
  public ShowException = true;
  public ErrorDisplay: EnumValidationDisplay = 0;
  public ShowSuccess = true;

  public ErrorTitle?: string;
  public ErrorDetail?: string;
  public ErrorType?: string;
  public ErrorInstance?: string;
  public ErrorRaw?: string;
}

// API exception error
export class ProblemDetailModel {
  Type?: string;
  Title?: string;
  Status?: number;
  Detail?: string;
  Instance?: string;
  Extensions?: Extensions;
}

class Extensions {
  traceID?: string;
  raw?: string;
}

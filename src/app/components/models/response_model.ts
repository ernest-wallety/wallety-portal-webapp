import { EnumValidationDisplay } from "../enum/enum_validation_display";

export class ResponseModel {
  public data?: any = Object.assign(new Object());
  public showError = true;
  public statusCode?: number;
  public showSuccess = true;
  public responseMessage?: string;
  public errorDisplay: EnumValidationDisplay = 0;

  public isError = false;
  public isException?: boolean;
  public errorList: string[] = new Array<string>();
  public showException = true;

  public errorTitle?: string;
  public errorDetail?: string;
  public errorType?: string;
  public errorInstance?: string;
  public errorRaw?: string;
}

// API exception error
export class ProblemDetailModel {
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  instance?: string;
  traceID?: string;
  raw?: string;
  isError?: boolean;
  errorDisplay?: EnumValidationDisplay = 0;
  showException?: boolean;
  errorList?: string[];
  isException?: boolean;
}

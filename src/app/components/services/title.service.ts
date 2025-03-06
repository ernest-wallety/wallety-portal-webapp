import { Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { BehaviorSubject, Observable } from "rxjs";
import { ConfigHelper } from "../helpers/config_helper";

@Injectable({
  providedIn: "root",
})
export class TitleService {
  private defaultTitle = ConfigHelper.NG_APP_NAME;
  private titleSubject = new BehaviorSubject<string>(""); // Holds the current page title

  constructor(private title: Title) {}

  setTitle(pageTitle?: string) {
    const fullTitle = pageTitle
      ? `${pageTitle} | ${this.defaultTitle}`
      : this.defaultTitle;
    this.title.setTitle(fullTitle);

    // Extract and emit only the pageTitle (without default title)
    const extractedTitle = pageTitle || this.defaultTitle;
    this.titleSubject.next(extractedTitle);
  }

  getTitle(): string {
    return this.titleSubject.value; // Returns the current page title without the default title
  }

  getTitleObservable(): Observable<string> {
    return this.titleSubject.asObservable(); // Observable to subscribe to title changes
  }
}

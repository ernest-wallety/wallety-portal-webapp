import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { BaseComponent } from "./components/base/base.component";

@Component({
  selector: "app-root",
  imports: [RouterOutlet],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent extends BaseComponent implements OnInit {
  title = "wallety-portal";

  ngOnInit() {
    this.titleService.setTitle();

    this.data_service.Response_Emitter.subscribe((response: any) => {
      this.handle_response(response);
    });
  }
}

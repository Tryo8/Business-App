import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { ButtonModule } from 'primeng/button';
import { NgxSpinnerComponent } from "ngx-spinner";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'business-app';
}

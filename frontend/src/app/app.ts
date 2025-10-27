import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UploadCard } from "./upload-card/upload-card";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UploadCard],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('frontend');
}

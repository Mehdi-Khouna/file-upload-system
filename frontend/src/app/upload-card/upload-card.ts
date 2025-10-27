import { Component } from '@angular/core';

@Component({
  selector: 'app-upload-card',
  templateUrl: './upload-card.html',
  styleUrls: ['./upload-card.scss'],
})
export class UploadCard {
  filename: string | null = null;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.filename = input.files[0].name;
    }
  }
}

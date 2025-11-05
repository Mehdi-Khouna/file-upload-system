import { Component } from '@angular/core';
import { Upload } from '../services/upload';

@Component({
  selector: 'app-upload-card',
  templateUrl: './upload-card.html',
  styleUrls: ['./upload-card.scss'],
})
export class UploadCard {
  constructor(private readonly uploadService : Upload) {}
  filename: string | null = null;
  fileUrl : string | null = null;
  file : File | null = null;
  isUploading = false;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file = input.files[0];
      this.filename = this.file.name;
      this.fileUrl = null;
    }
  }

  onFileUpload() {
    if (!this.file) return ;
    this.isUploading = true;
    this.uploadService.uploadFile(this.file).subscribe({
      next: (response) => {
        this.uploadService.getFileUrl(response.key).subscribe({
          next : (res) => {
            this.fileUrl = res.url;
            this.isUploading = false;
          },
          error: () => (this.isUploading = false),
        });
      },
      error : () => (this.isUploading = false),
    });
  }
}

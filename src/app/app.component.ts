import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BackendService, Image } from './services/backend.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  
  constructor(private readonly backend: BackendService){}
  
  title = 'frontend-prj';

  data: Image[] = []
  fileInput: HTMLInputElement | undefined; 

  ngOnInit(): void {
      this.getFiles();
  }

   getFiles(): void {
    this.backend.getFiles().subscribe((res: { data: Image[] }) => {
      console.log(res);
      this.data = res.data;
    });
  }

   deleteImage(imageId: number) {
    this.backend.deleteFile(imageId).subscribe(
      response => {
        this.data = this.data.filter(image => image.id !== imageId);
      },
      error => {
        console.error('Error deleting image:', error);
      }
    );
  }

 onFileChange(event: any) {
    const files = event.target.files;
    if (files.length > 0) {
      const formData = new FormData();


      for (let i = 0; i < files.length; i++) {
        formData.append('file', files[i]); 
      }
      formData.append('description', 'Uploaded files'); 

      this.backend.uploadFiles(formData).subscribe((response) => {
        console.log('Upload response:', response);
        this.getFiles(); 
        if (this.fileInput) {
          this.fileInput.value = ''; 
        }
      }, (error) => {
        console.error('Upload error:', error);
      });
    }
  }
}

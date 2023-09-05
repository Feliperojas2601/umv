import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-plate',
  templateUrl: './plate.component.html',
  styleUrls: ['./plate.component.scss'],
})
export class PlateComponent  implements OnInit {

  public plateForm!: FormGroup; 

  public plateFormValue!: string;

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private photoService: PhotoService,
  ) { }

  ngOnInit() {
    this.plateForm = this.fb.group({
      plate: ['', Validators.required]
    });
  }

  public consultPlate(): void {
    this.plateFormValue = this.plateForm.value as string;
    this.router.navigate(['/umv/consult/plate-information', 1]);
  }

  public async addPhotoToGallery(): Promise<void> {
    await this.photoService.addNewToGallery();
  }
}

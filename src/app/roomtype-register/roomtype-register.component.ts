import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RoomTypeService } from '../roomtype.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-roomtype-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './roomtype-register.component.html',
  styleUrl: './roomtype-register.component.css'
})

export class RoomTypeRegisterComponent implements OnInit {

  roomTypeRegisterForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private roomTypeService: RoomTypeService) { }

  ngOnInit(): void {
    this.roomTypeRegisterForm = this.formBuilder.group({
      roomTypeName: ['', Validators.required]
    });
  }

  get roomType() {
    return this.roomTypeRegisterForm.get('roomTypeName');
  }

  onSubmit() {
    
    if (this.roomTypeRegisterForm.valid) {

      console.log(this.roomTypeRegisterForm.value);

      this.roomTypeService
        .postData(this.roomTypeRegisterForm.value)
        .subscribe((response) => {
          if (response.status === "Room Type Successfully Register In System"){
            Swal.fire({
              title: 'Success!',
              text: 'Room Type Successfully Register In System!',
              icon: 'success',
            });
          } else if (response.status === "Room Type Is Already In The System"){
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Room Type Is Already In The System!',
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            });
          }
        });
      
    } else {
      console.log('Form is invalid. Please enter a valid room type.');
    }
  }
}

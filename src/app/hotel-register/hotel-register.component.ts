import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { HotelService } from '../hotel.service';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hotel-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './hotel-register.component.html',
  styleUrl: './hotel-register.component.css'
})

export class HotelRegisterComponent implements OnInit {

  hotelRegisterForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private hotelService: HotelService) { }

  ngOnInit(): void {
    this.hotelRegisterForm = this.formBuilder.group({
      hotelName: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
    });
  }

  get hotelName() {
    return this.hotelRegisterForm.get('hotelName');
  }

  get address() {
    return this.hotelRegisterForm.get('address');
  }

  get email() {
    return this.hotelRegisterForm.get('email');
  }

  get telephone() {
    return this.hotelRegisterForm.get('telephone');
  }

  onSubmit() {
    if (this.hotelRegisterForm.valid) {

      console.log(this.hotelRegisterForm.value);

      this.hotelService
        .postData(this.hotelRegisterForm.value)
        .subscribe((response) => {
          if (response.status === "Hotel Register Successfully") {
            Swal.fire({
              title: 'Success!',
              text: 'Hotel Register Successfully!',
              icon: 'success',
            });
          } else if (response.status === "Hotel Already In System") {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Hotel Already In System!',
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
      console.log('Form is invalid. Please fill in all required fields.');
    }
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MarkupService } from '../markup.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-markup-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './markup-register.component.html',
  styleUrl: './markup-register.component.css'
})

export class MarkupRegisterComponent implements OnInit {

  markupRegisterForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private markupService: MarkupService) { }

  ngOnInit(): void {
    this.markupRegisterForm = this.formBuilder.group({
      markupPercentage: ['', [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  get markupPercentage() {
    return this.markupRegisterForm.get('markupPercentage');
  }

  onSubmit() {

    if (this.markupRegisterForm.valid) {

      console.log(this.markupRegisterForm.value);

      this.markupService
        .postData(this.markupRegisterForm.value)
        .subscribe((response) => {
          if (response.status === "Markup Register Successfully"){
            Swal.fire({
              title: 'Success!',
              text: 'Markup Register Successfully!',
              icon: 'success',
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            });
          }
        }
      )

    } else {
      console.log('Form is invalid. Please enter a valid markup percentage between 0 and 100.');
    }
  }
}

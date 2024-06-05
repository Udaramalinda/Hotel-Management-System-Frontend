import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AgentService } from '../agent.service';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agent-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './agent-register.component.html',
  styleUrl: './agent-register.component.css'
})

export class AgentRegisterComponent implements OnInit {

  agentRegisterForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private agentService: AgentService) { }
  

  ngOnInit(): void {
    this.agentRegisterForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      isAdmin: [false] // Assuming isAdmin is a boolean field with a checkbox
    });
  }

  get email() {
    return this.agentRegisterForm.get('email');
  }

  get name() {
    return this.agentRegisterForm.get('name');
  }

  get password() {
    return this.agentRegisterForm.get('password');
  }

  get isAdmin() {
    return this.agentRegisterForm.get('isAdmin');
  }

  onSubmit() {

    if (this.agentRegisterForm.valid) {
      
      console.log(this.agentRegisterForm.value);


      this.agentService
        .postData(this.agentRegisterForm.value)
        .subscribe((response) => {
          if (response.status === "Success") {
            Swal.fire({
              title: 'Success!',
              text: 'Agent Register Successfully!',
              icon: 'success',
            });
          } else if (response.status === "User Already Exists") {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'User Already Exists!',
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

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { ContractService } from '../contract.service';
import { HotelService } from '../hotel.service';
import { RoomTypeService } from '../roomtype.service';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contract-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './contract-register.component.html',
  styleUrl: './contract-register.component.css'
})

export class ContractRegisterComponent implements OnInit {

  contractRegisterForm!: FormGroup;

  // this place have to come back end hotel list and the room types
  hotels: string[] = [];
  roomTypes: string[] = [];

  constructor(
    private formBuilder: FormBuilder, 
    private contractService: ContractService, 
    private hotelService: HotelService,
    private roomTypeService: RoomTypeService) { }

  ngOnInit(): void {
    this.contractRegisterForm = this.formBuilder.group({
      hotelName: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', [Validators.required]],
      roomDetails: this.formBuilder.array([this.createRoomDetails()])
    });

  }

  get hotel() {
    return this.contractRegisterForm.get('hotelName');
  }

  get startDate() {
    return this.contractRegisterForm.get('startDate');
  }

  get endDate() {
    return this.contractRegisterForm.get('endDate');
  }

  get roomDetails() {
    return (this.contractRegisterForm.get('roomDetails') as FormArray).controls;
  }

  createRoomDetails(): FormGroup {
    return this.formBuilder.group({
      roomTypeName: ['', Validators.required],
      price: ['', Validators.required],
      numOfRooms: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      maxAdults: ['', [Validators.required, Validators.pattern(/^\d+$/)]]
    });
  }

  addRoomType() {
    const roomDetailsArray = this.contractRegisterForm.get('roomDetails') as FormArray; 
    roomDetailsArray.push(this.createRoomDetails());
  }

  removeRoomType(index: number) {
    const roomDetailsArray = this.contractRegisterForm.get('roomDetails') as FormArray; 
    roomDetailsArray.removeAt(index);
  }

  // validateEndDate(control: any) {
  //   const startDate = this.contractRegisterForm.get('startDate')?.value;
  //   const endDate = control.value;

  //   if (startDate && endDate) {
  //     const startDateObj = new Date(startDate);
  //     const endDateObj = new Date(endDate);

  //     if (startDateObj > endDateObj) {
  //       return { invalidEndDate: true };
  //     }
  //   }

  //   return null;
  // }

  getHotel(){

    this.hotelService.getHotelNames().subscribe(
      (response: string[]) => {
        this.hotels = response;
      },
      (error) => {
        console.error('Error fetching hotel names', error);
      }
    );
  }

  getRoomType(){
    this.roomTypeService.getRoomTypeNames().subscribe(
      (response: string[]) => {
        this.roomTypes = response;
      },
      (error) => {
        console.error('Error fetching roomType names', error);
      }
    );
  }

  onSubmit() {
    const sDate = new Date(this.contractRegisterForm.value.startDate);
    const eDate = new Date(this.contractRegisterForm.value.endDate);

    if ( sDate > eDate ){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Start Date Must Before The End Date',
      });
    }
    else if (this.contractRegisterForm.valid) {

      console.log(this.contractRegisterForm.value);

      this.contractService
        .postData(this.contractRegisterForm.value)
        .subscribe((response) => {
          console.log(response);
          if (response.status === "Contract Save Successfully") {
            Swal.fire({
              title: 'Success!',
              text: 'Contract Save Successfully!',
              icon: 'success',
            });
          } else if (response.status === "Hotel Has Contract On That Time Period") {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Hotel Has Contract On That Time Period!',
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
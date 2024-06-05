import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

import { ContractService } from '../contract.service';
import { HotelService } from '../hotel.service';
import { RouterModule } from '@angular/router';

export interface ContractRoom{
  roomType: string;
  price: string;
  numberOfRooms: string;
  maxAdults: string;
}

export interface ContractDetails {
  hotelName: string;
  startDate: string;
  endDate: string;
  contractRoomList: ContractRoom[];
}

@Component({
  selector: 'app-contract-view',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    MatCardModule,
    MatTableModule
  ],
  templateUrl: './contract-view.component.html',
  styleUrl: './contract-view.component.css'
})

export class ContractViewComponent implements OnInit {

  contractGetForm!: FormGroup;

  hotels: string[] = [];
  contracts: ContractDetails[] = [];

  displayedColumns: string[] = ['roomType', 'price', 'numberOfRooms', 'maxAdults'];

  constructor(
    private formBuilder: FormBuilder,
    private contractService: ContractService,
    private hotelService: HotelService,) {
  }

  ngOnInit(): void {
    this.contractGetForm = this.formBuilder.group({
      hotelName: ['', Validators.required]
    })
  }
  get hotel() {
    return this.contractGetForm.get('hotelName');
  }

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

  onSubmit() {
    if (this.contractGetForm.valid) {

      console.log(this.contractGetForm.value);

      this.contractService.getContract(this.contractGetForm.value).subscribe(
        (response) => {
          this.contracts = response;
          console.log('Response from backend: ', this.contracts);
        },
        (error) => {
          console.log('Error sending data to backend: ', error);
        }
      )

      alert("Get New Contract Successfully.");
      
    } else {
      console.log('Form is invalid. Please fill in all required fields.');
    }
  }

}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

import { SearchService } from '../search.service';

export interface SearchDetails {
  finalPrice: string;
  hotelName: string;
  rooms: Rooms[];
}

export interface Rooms {
  roomType: string;
  numberOfRooms: string;
  visitAdults: string;
  maxAdults: string;
  price: string;
}

@Component({
  selector: 'app-search-rooms',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    MatTableModule,
    MatCardModule,
    
  ],
  templateUrl: 'search-rooms.component.html',
  styleUrl: './search-rooms.component.css'
})

export class SearchRoomsComponent implements OnInit {

  searchRoomsForm!: FormGroup;

  results: SearchDetails[] = [];

  constructor(private formBuilder: FormBuilder, private searchService: SearchService) { }

  ngOnInit(): void {
    this.searchRoomsForm = this.formBuilder.group({
      checkInDate: ['', Validators.required],
      numberOfNights: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      guests: this.formBuilder.array([this.createGuest()]) // Initial guest field
    });
  }

  get checkInDate() {
    return this.searchRoomsForm.get('checkinDate');
  }

  get numberOfNights() {
    return this.searchRoomsForm.get('numberOfNights');
  }

  get guests() {
    return (this.searchRoomsForm.get('guests') as FormArray).controls;
  }

  createGuest() {
    return this.formBuilder.group({
      adults: ['', [Validators.required, Validators.min(0)]],
      rooms: ['', [Validators.required, Validators.min(0)]]
    });
  }

  addGuestField() {
    const guestsArray = this.searchRoomsForm.get('guests') as FormArray;
    guestsArray.push(this.createGuest());
  }

  removeGuestField(index: number) {
    const guestsArray = this.searchRoomsForm.get('guests') as FormArray;
    guestsArray.removeAt(index);
  }

  onSubmit() {
    if (this.searchRoomsForm.valid) {
      
      console.log(this.searchRoomsForm.value);
    
      this.searchService.postData(this.searchRoomsForm.value).subscribe(
        (response) => {
          this.results = response;
          console.log('Respnse from backend: ', this.results);
        },
        (error) => {
          console.log('Error sending data to backend: ', error);
        }
      )
    } else {
      console.log('Form is invalid. Please fill in all required fields.');
    }
  }
}
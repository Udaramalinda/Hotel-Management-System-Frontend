import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { of } from 'rxjs';
import { SearchService } from '../search.service';

import { SearchRoomsComponent } from './search-rooms.component';
import { HttpClientModule } from '@angular/common/http';

describe('SearchRoomsComponent', () => {
  let component: SearchRoomsComponent;
  let fixture: ComponentFixture<SearchRoomsComponent>;
  let searchService: SearchService;
  let formBuilder: FormBuilder;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatCardModule,
        MatTableModule,
        HttpClientModule,
      ],
      providers: [SearchService],
    }).compileComponents();

    searchService = TestBed.inject(SearchService);
    formBuilder = TestBed.inject(FormBuilder);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    expect(component.searchRoomsForm.value).toEqual({
      checkInDate: '',
      numberOfNights: '',
      guests: [{ adults: '', rooms: '' }],
    });
  });

  it('should add a guest field', () => {
    const initialGuestsLength = component.guests.length;
    component.addGuestField();
    expect(component.guests.length).toEqual(initialGuestsLength + 1);
  });

  it('should remove a guest field', () => {
    component.addGuestField(); // Add a guest field first
    const initialGuestsLength = component.guests.length;
    component.removeGuestField(0);
    expect(component.guests.length).toEqual(initialGuestsLength - 1);
  });

  it('should call searchService.postData and update results on form submission', () => {
    const mockResponse = [
      {
        finalPrice: '100',
        hotelName: 'Hotel A',
        rooms: [
          {
            roomType: 'Single',
            numberOfRooms: '1',
            visitAdults: '1',
            maxAdults: '2',
            price: '50',
          },
        ],
      },
    ];

    spyOn(searchService, 'postData').and.returnValue(of(mockResponse));

    component.searchRoomsForm.setValue({
      checkInDate: '2023-01-01',
      numberOfNights: '2',
      guests: [{ adults: '2', rooms: '1' }],
    });

    component.onSubmit();

    expect(searchService.postData).toHaveBeenCalledWith({
      checkInDate: '2023-01-01',
      numberOfNights: '2',
      guests: [{ adults: '2', rooms: '1' }],
    });

    expect(component.results).toEqual(mockResponse);
  });


});

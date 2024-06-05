import {
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
} from '@angular/core/testing';
import {
  ContractViewComponent,
  ContractDetails,
  ContractRoom,
} from './contract-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { of } from 'rxjs';
import { HotelService } from '../hotel.service';
import { ContractService } from '../contract.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ContractViewComponent', () => {
  let component: ContractViewComponent;
  let fixture: ComponentFixture<ContractViewComponent>;
  let hotelService: HotelService;
  let contractService: ContractService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatTableModule,
        MatCardModule,
        HttpClientModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
      ],
      providers: [HotelService, ContractService],
    }).compileComponents();

    hotelService = TestBed.inject(HotelService);
    contractService = TestBed.inject(ContractService);

    fixture = TestBed.createComponent(ContractViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should fetch hotel names on initialization', () => {
    const hotelNames = ['Hotel A', 'Hotel B'];
    component.hotels = hotelNames;

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.hotels).toEqual(hotelNames);
  });

  it('should set hotel form control as invalid if not selected', () => {
    const hotelFormControl = component.contractGetForm.get('hotelName');
    expect(hotelFormControl?.invalid).toBeTruthy();
  });

  it('should fetch contracts and display them on form submission', fakeAsync(() => {
    const contractRoom: ContractRoom[] = [
      {
        roomType: 'Single',
        price: '100',
        numberOfRooms: '10',
        maxAdults: '1',
      },
    ];
    const contractDetails: ContractDetails[] = [
      {
        hotelName: 'Hotel A',
        startDate: '2023-01-01',
        endDate: '2023-02-01',
        contractRoomList: contractRoom,
      },
    ];

    component.contracts = contractDetails;

    const submitButton = fixture.nativeElement.querySelector('button');
    submitButton.click();
    tick();
    fixture.detectChanges();

    expect(component.contracts).toEqual(contractDetails);
    const cardTitles = fixture.nativeElement.querySelector('mat-card-title');
    expect(cardTitles.textContent).toContain('Hotel A');
  }));
});

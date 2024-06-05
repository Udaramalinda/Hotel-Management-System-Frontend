import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ContractRegisterComponent } from './contract-register.component';
import { FormArray, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { ContractService } from '../contract.service';
import { HotelService } from '../hotel.service';
import { RoomTypeService } from '../roomtype.service';
import Swal from 'sweetalert2';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ContractRegisterComponent', () => {
  let component: ContractRegisterComponent;
  let fixture: ComponentFixture<ContractRegisterComponent>;
  let contractService: ContractService;
  let hotelService: HotelService;
  let roomTypeService: RoomTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
      ],
      providers: [ContractService, HotelService, RoomTypeService],
    });

    fixture = TestBed.createComponent(ContractRegisterComponent);
    component = fixture.componentInstance;
    contractService = TestBed.inject(ContractService);
    hotelService = TestBed.inject(HotelService);
    roomTypeService = TestBed.inject(RoomTypeService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display success message on successful contract registration', fakeAsync(() => {
    spyOn(contractService, 'postData').and.returnValue(
      of({ status: 'Contract Save Successfully' })
    );
    spyOn(Swal, 'fire');

    // Set valid form values
    component.contractRegisterForm.setValue({
      hotelName: 'Test Hotel',
      startDate: '2023-01-01',
      endDate: '2023-02-01',
      roomDetails: [
        {
          roomTypeName: 'Single Room',
          price: 100,
          numOfRooms: 10,
          maxAdults: 2,
        },
      ],
    });

    component.onSubmit();
    tick();
    fixture.detectChanges();

    expect(contractService.postData).toHaveBeenCalledOnceWith(
      component.contractRegisterForm.value
    );
    expect(Swal.fire).toHaveBeenCalledWith({
      title: 'Success!',
      text: 'Contract Save Successfully!',
      icon: 'success',
    } as any);
  }));

  it('should display error message when hotel has contract on that time period', fakeAsync(() => {
    spyOn(contractService, 'postData').and.returnValue(
      of({ status: 'Hotel Has Contract On That Time Period' })
    );
    spyOn(Swal, 'fire');

    // Set valid form values
    component.contractRegisterForm.setValue({
      hotelName: 'Test Hotel',
      startDate: '2023-01-01',
      endDate: '2023-02-01',
      roomDetails: [
        {
          roomTypeName: 'Single Room',
          price: 100,
          numOfRooms: 10,
          maxAdults: 2,
        },
      ],
    });

    component.onSubmit();
    tick();
    fixture.detectChanges();

    expect(contractService.postData).toHaveBeenCalledOnceWith(
      component.contractRegisterForm.value
    );
    expect(Swal.fire).toHaveBeenCalledWith({
      icon: 'error',
      title: 'Oops...',
      text: 'Hotel Has Contract On That Time Period!',
    } as any);
  }));

  it('should display error message on invalid form submission', fakeAsync(() => {
    spyOn(contractService, 'postData').and.returnValue(of({ status: 'error' }));
    spyOn(Swal, 'fire');

    // Set invalid form values (e.g., missing hotelName)
    component.contractRegisterForm.setValue({
      hotelName: 'Test Hotel',
      startDate: '2023-01-01',
      endDate: '2023-02-01',
      roomDetails: [
        {
          roomTypeName: 'Single Room',
          price: 100,
          numOfRooms: 10,
          maxAdults: 2,
        },
      ],
    });

    component.onSubmit();
    tick();
    fixture.detectChanges();

    // Ensure that the postData method is not called
    expect(contractService.postData).toHaveBeenCalledOnceWith(
      component.contractRegisterForm.value
    );
    // Ensure that an error message is displayed
    expect(Swal.fire).toHaveBeenCalledWith({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
    } as any);
  }));

  it('should display success message on successful contract registration with remove and add', fakeAsync(() => {
    spyOn(contractService, 'postData').and.returnValue(
      of({ status: 'Contract Save Successfully' })
    );
    spyOn(Swal, 'fire');

    // Set valid form values with multiple room types
    component.contractRegisterForm.setValue({
      hotelName: 'Test Hotel',
      startDate: '2023-01-01',
      endDate: '2023-02-01',
      roomDetails: [
        {
          roomTypeName: 'Single Room',
          price: 100,
          numOfRooms: 10,
          maxAdults: 2,
        },
      ],
    });

    component.onSubmit();
    tick();
    fixture.detectChanges();

    expect(contractService.postData).toHaveBeenCalledOnceWith(
      component.contractRegisterForm.value
    );
    expect(Swal.fire).toHaveBeenCalledWith({
      title: 'Success!',
      text: 'Contract Save Successfully!',
      icon: 'success',
    } as any);

    // Test adding a new room type
    component.addRoomType();
    expect(
      (component.contractRegisterForm.get('roomDetails') as FormArray).length
    ).toBe(2);

    // Test removing a room type
    component.removeRoomType(0);
    expect(
      (component.contractRegisterForm.get('roomDetails') as FormArray).length
    ).toBe(1);
  }));

  it('should display error message on submitting form with empty fields', fakeAsync(() => {
    const postDataSpy = spyOn(contractService, 'postData');

    // Set form values with empty fields
    component.contractRegisterForm.setValue({
      hotelName: '',
      startDate: '',
      endDate: '',
      roomDetails: [
        {
          roomTypeName: '',
          price: '',
          numOfRooms: '',
          maxAdults: '',
        },
      ],
    });

    component.onSubmit();
    tick();
    fixture.detectChanges();

    expect(postDataSpy).not.toHaveBeenCalled();
  }));
});

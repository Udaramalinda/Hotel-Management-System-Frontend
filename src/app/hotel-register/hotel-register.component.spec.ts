import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { HotelRegisterComponent } from './hotel-register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { HotelService } from '../hotel.service';
import Swal from 'sweetalert2';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HotelRegisterComponent', () => {
  let component: HotelRegisterComponent;
  let fixture: ComponentFixture<HotelRegisterComponent>;
  let hotelService: HotelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
      ],
      providers: [HotelService],
    });

    fixture = TestBed.createComponent(HotelRegisterComponent);
    component = fixture.componentInstance;
    hotelService = TestBed.inject(HotelService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display success message on successful hotel registration', fakeAsync(() => {
    spyOn(hotelService, 'postData').and.returnValue(
      of({ status: 'Hotel Register Successfully' })
    );
    spyOn(Swal, 'fire');

    // Set valid form values
    component.hotelRegisterForm.setValue({
      hotelName: 'Test Hotel',
      address: 'Test Address',
      email: 'test@example.com',
      telephone: '1234567890',
    });

    component.onSubmit();
    tick();
    fixture.detectChanges();

    expect(hotelService.postData).toHaveBeenCalledOnceWith(
      component.hotelRegisterForm.value
    );
    expect(Swal.fire).toHaveBeenCalledWith({
      title: 'Success!',
      text: 'Hotel Register Successfully!',
      icon: 'success',
    } as any);
  }));

  it('should display error message when hotel is already in the system', fakeAsync(() => {
    spyOn(hotelService, 'postData').and.returnValue(
      of({ status: 'Hotel Already In System' })
    );
    spyOn(Swal, 'fire');

    // Set valid form values
    component.hotelRegisterForm.setValue({
      hotelName: 'Test Hotel',
      address: 'Test Address',
      email: 'test@example.com',
      telephone: '1234567890',
    });

    component.onSubmit();
    tick();
    fixture.detectChanges();

    expect(hotelService.postData).toHaveBeenCalledOnceWith(
      component.hotelRegisterForm.value
    );
    expect(Swal.fire).toHaveBeenCalledWith({
      icon: 'error',
      title: 'Oops...',
      text: 'Hotel Already In System!',
    } as any);
  }));

  it('should display error message on invalid form submission', fakeAsync(() => {
    spyOn(hotelService, 'postData').and.returnValue(of({ status: 'error' }));
    spyOn(Swal, 'fire');

    // Set invalid form values (e.g., missing hotelName)
    component.hotelRegisterForm.setValue({
      hotelName: 'Test Hotel',
      address: 'Test Address',
      email: 'test@example.com',
      telephone: '1234567890',
    });

    component.onSubmit();
    tick();
    fixture.detectChanges();

    expect(hotelService.postData).toHaveBeenCalledOnceWith(
      component.hotelRegisterForm.value
    );

    expect(Swal.fire).toHaveBeenCalledWith({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
    } as any);
  }));

  it('should display error message on submitting form with empty fields', fakeAsync(() => {
    const postDataSpy = spyOn(hotelService, 'postData')

    // Set form values with empty fields
    component.hotelRegisterForm.setValue({
      hotelName: '',
      address: '',
      email: '',
      telephone: '',
    });

    component.onSubmit();
    tick();
    fixture.detectChanges();

    expect(postDataSpy).not.toHaveBeenCalled();

  }));

});

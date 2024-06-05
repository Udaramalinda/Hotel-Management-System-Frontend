import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { RoomTypeService } from '../roomtype.service';
import Swal from 'sweetalert2';
import { RoomTypeRegisterComponent } from './roomtype-register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RoomTypeRegisterComponent', () => {
  let component: RoomTypeRegisterComponent;
  let fixture: ComponentFixture<RoomTypeRegisterComponent>;
  let roomTypeService: RoomTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
      ],
      providers: [RoomTypeService],
    });

    fixture = TestBed.createComponent(RoomTypeRegisterComponent);
    component = fixture.componentInstance;
    roomTypeService = TestBed.inject(RoomTypeService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display success message on successful room type registration', fakeAsync(() => {
    spyOn(roomTypeService, 'postData').and.returnValue(
      of({ status: 'Room Type Successfully Register In System' })
    );
    spyOn(Swal, 'fire');

    // Set valid form value
    component.roomTypeRegisterForm.setValue({
      roomTypeName: 'Standard Room',
    });

    component.onSubmit();
    tick();
    fixture.detectChanges();

    expect(roomTypeService.postData).toHaveBeenCalledOnceWith(
      component.roomTypeRegisterForm.value
    );
    expect(Swal.fire).toHaveBeenCalledWith({
      title: 'Success!',
      text: 'Room Type Successfully Register In System!',
      icon: 'success',
    } as any);
  }));

  it('should display error message when room type is already in the system', fakeAsync(() => {
    spyOn(roomTypeService, 'postData').and.returnValue(
      of({ status: 'Room Type Is Already In The System' })
    );
    spyOn(Swal, 'fire');

    // Set form value with room type already in the system
    component.roomTypeRegisterForm.setValue({
      roomTypeName: 'Deluxe Room',
    });

    component.onSubmit();
    tick();
    fixture.detectChanges();

    // Ensure that the postData method is not called
    expect(roomTypeService.postData).toHaveBeenCalledOnceWith(
        component.roomTypeRegisterForm.value
    );

    // Ensure that an error message is displayed
    expect(Swal.fire).toHaveBeenCalledWith({
      icon: 'error',
      title: 'Oops...',
      text: 'Room Type Is Already In The System!',
    } as any);
  }));

  it('should display error message on submitting form with empty room type', fakeAsync(() => {
    const postDataSpy = spyOn(roomTypeService, 'postData');

    // Set form value with empty room type
    component.roomTypeRegisterForm.setValue({
      roomTypeName: '',
    });

    component.onSubmit();
    tick();
    fixture.detectChanges();

    // Ensure that the postData method is not called
    expect(postDataSpy).not.toHaveBeenCalled();
  }));
});

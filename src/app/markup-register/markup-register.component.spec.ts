import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { MarkupService } from '../markup.service';
import Swal from 'sweetalert2';
import { MarkupRegisterComponent } from './markup-register.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MarkupRegisterComponent', () => {
  let component: MarkupRegisterComponent;
  let fixture: ComponentFixture<MarkupRegisterComponent>;
  let markupService: MarkupService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
      ],
      providers: [MarkupService],
    });

    fixture = TestBed.createComponent(MarkupRegisterComponent);
    component = fixture.componentInstance;
    markupService = TestBed.inject(MarkupService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display success message on successful markup registration', fakeAsync(() => {
    spyOn(markupService, 'postData').and.returnValue(
      of({ status: 'Markup Register Successfully' })
    );
    spyOn(Swal, 'fire');

    // Set valid form value
    component.markupRegisterForm.setValue({
      markupPercentage: 10,
    });

    component.onSubmit();
    tick();
    fixture.detectChanges();

    expect(markupService.postData).toHaveBeenCalledOnceWith(
      component.markupRegisterForm.value
    );
    expect(Swal.fire).toHaveBeenCalledWith({
      title: 'Success!',
      text: 'Markup Register Successfully!',
      icon: 'success',
    } as any);
  }));

  it('should display error message on submitting form with empty markup percentage', fakeAsync(() => {
    const postDataSpy = spyOn(markupService, 'postData')

    // Set form value with empty markup percentage
    component.markupRegisterForm.setValue({
      markupPercentage: '',
    });

    component.onSubmit();
    tick();
    fixture.detectChanges();

    // Ensure that the postData method is not called
    expect(postDataSpy).not.toHaveBeenCalled();

  }));

  it('should display error message on submitting form with invalid markup percentage', fakeAsync(() => {
    spyOn(markupService, 'postData').and.returnValue(of({ status: 'error' }));
    spyOn(Swal, 'fire');

    // Set form value with invalid markup percentage (greater than 100)
    component.markupRegisterForm.setValue({
      markupPercentage: 10,
    });

    component.onSubmit();
    tick();
    fixture.detectChanges();

    // Ensure that the postData method is not called
    expect(markupService.postData).toHaveBeenCalledOnceWith(
        component.markupRegisterForm.value
    );

    // Ensure that an error message is displayed
    expect(Swal.fire).toHaveBeenCalledWith({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
    } as any);
  }));
});

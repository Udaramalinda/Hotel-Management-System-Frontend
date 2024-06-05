import {
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
} from '@angular/core/testing';
import { AgentRegisterComponent } from './agent-register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AgentService } from '../agent.service';
import { of } from 'rxjs';
import Swal from 'sweetalert2';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  HttpClientTestingModule,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';

describe('AgentRegisterComponent', () => {
  let component: AgentRegisterComponent;
  let fixture: ComponentFixture<AgentRegisterComponent>;
  let agentService: AgentService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        CommonModule,
        RouterModule,
      ],
      providers: [
        AgentService,
        JwtHelperService,
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    agentService = TestBed.inject(AgentService);
    fixture = TestBed.createComponent(AgentRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should display success message on successful registration', fakeAsync(() => {
    const postDataSpy = spyOn(agentService, 'postData').and.returnValue(
      of({ status: 'Success' })
    );

    const swalFireSpy = spyOn(Swal, 'fire');

    component.agentRegisterForm.setValue({
      email: 'test@example.com',
      name: 'John Doe',
      password: 'password123',
      isAdmin: false,
    });

    component.onSubmit();
    tick();
    fixture.detectChanges();

    expect(postDataSpy).toHaveBeenCalledOnceWith(
      component.agentRegisterForm.value
    );

    expect(swalFireSpy).toHaveBeenCalledWith({
      title: 'Success!',
      text: 'Agent Register Successfully!',
      icon: 'success',
    } as any);

  }));

  it('should display error message when user already exists', fakeAsync(() => {
    const postDataSpy = spyOn(agentService, 'postData').and.returnValue(
      of({ status: 'User Already Exists' })
    );

    const swalFireSpy = spyOn(Swal, 'fire');

    component.agentRegisterForm.setValue({
      email: 'existing@example.com',
      name: 'John Doe',
      password: 'password123',
      isAdmin: false,
    });

    component.onSubmit();
    tick();
    fixture.detectChanges();

    expect(postDataSpy).toHaveBeenCalledOnceWith(
      component.agentRegisterForm.value
    );

    expect(swalFireSpy).toHaveBeenCalledWith({
      icon: 'error',
      title: 'Oops...',
      text: 'User Already Exists!',
    } as any);  

  }));

  it('should display error message on other errors', fakeAsync(() => {
    const postDataSpy = spyOn(agentService, 'postData').and.returnValue(
      of({ status: 'Error' })
    );

    const swalFireSpy = spyOn(Swal, 'fire');

    component.agentRegisterForm.setValue({
      email: 'test@example.com',
      name: 'John Doe',
      password: 'password123',
      isAdmin: false,
    });

    component.onSubmit();
    tick();
    fixture.detectChanges();

    expect(postDataSpy).toHaveBeenCalledOnceWith(
      component.agentRegisterForm.value
    );

    expect(swalFireSpy).toHaveBeenCalledWith({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
    } as any); 

  }));

  it('should not call postData if the form is invalid', fakeAsync(() => {
    const invalidFormValue = {
      email: '',
      name: '',
      password: '',
      isAdmin: false,
    };
    component.agentRegisterForm.setValue(invalidFormValue);

    const postDataSpy = spyOn(agentService, 'postData');

    component.onSubmit();
    tick();
    fixture.detectChanges();

    expect(postDataSpy).not.toHaveBeenCalled();
  }));
});

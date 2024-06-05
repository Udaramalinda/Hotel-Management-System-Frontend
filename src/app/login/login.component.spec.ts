import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginService } from '../login.service';
import { of, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { HttpClientModule } from '@angular/common/http';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginService: LoginService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterModule.forRoot([]),
        HttpClientModule,
      ],
      providers: [LoginService],
    }).compileComponents();

    loginService = TestBed.inject(LoginService);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the login form', () => {
    component.ngOnInit();
    expect(component.loginForm).toBeDefined();
  });

  it('should set email and password as invalid when form is empty', () => {
    component.ngOnInit();
    expect(component.email?.invalid).toBeTruthy();
    expect(component.password?.invalid).toBeTruthy();
  });

  it('should set email and password as valid when form is filled', () => {
    component.ngOnInit();
    component.loginForm.patchValue({
      email: 'test@example.com',
      password: 'password',
    });
    expect(component.email?.valid).toBeTruthy();
    expect(component.password?.valid).toBeTruthy();
  });

  // it('should call loginService and display success message on successful login', fakeAsync(() => {
  //   const spy = spyOn(loginService, 'postData').and.returnValue(
  //     of({ token: 'test-token' })
  //   );
  //   const swalSpy = spyOn(Swal, 'fire').and.stub();

  //   component.ngOnInit();
  //   component.loginForm.setValue({
  //     email: 'test@example.com',
  //     password: 'password',
  //   });

  //   component.onSubmit();

  //   expect(spy).toHaveBeenCalled();
  //   expect(swalSpy).toHaveBeenCalledWith({
  //     title: 'Success!',
  //     text: 'Login Successfully!',
  //     icon: 'success',
  //   });
  //   expect(sessionStorage.getItem('access_token')).toEqual('test-token');
  // }));

  it('should display error message on failed login', () => {
    const spy = spyOn(loginService, 'postData').and.returnValue(
      throwError('Test Error')
    );
    const swalSpy = spyOn(Swal, 'fire').and.stub();

    component.ngOnInit();
    component.loginForm.patchValue({
      email: 'test@example.com',
      password: 'password',
    });
    component.onSubmit();

    expect(spy).toHaveBeenCalled();
    expect(swalSpy).toHaveBeenCalledWith({
      icon: 'error',
      title: 'Oops...',
      text: 'Login Failed',
    });
    expect(sessionStorage.getItem('access_token')).toBeNull();
  });
});

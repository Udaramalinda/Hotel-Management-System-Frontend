import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgentViewComponent, UserData } from './agent-view.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import {
  HttpClientTestingModule,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { of } from 'rxjs';
import { AgentService } from '../agent.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';

describe('AgentViewComponent', () => {
  let component: AgentViewComponent;
  let fixture: ComponentFixture<AgentViewComponent>;
  let agentService: AgentService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        HttpClientTestingModule,
        MatInputModule,
        MatFormFieldModule,
        HttpClientModule,
        BrowserAnimationsModule,
      ],
      providers: [
        AgentService,
        JwtHelperService,
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    agentService = TestBed.inject(AgentService);
    fixture = TestBed.createComponent(AgentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should display fetched agent data in the table', () => {
    const mockUserData: UserData[] = [
      { name: 'John Doe', email: 'johndoe@example.com', role: 'ADMIN' },
      { name: 'Jane Smith', email: 'janesmith@example.com', role: 'USER' },
    ];

    component.dataSource.data = mockUserData;
    fixture.detectChanges();

    const tableRows = fixture.nativeElement.querySelectorAll('tr');
    expect(tableRows.length).toBe(3);
    expect(tableRows[1].querySelector('td').textContent).toContain('John Doe');
    expect(tableRows[2].querySelector('td').textContent).toContain(
      'Jane Smith'
    );
  });

  it('should apply filtering on input change', () => {
    const mockUserData: UserData[] = [
      { name: 'John Doe', email: 'johndoe@example.com', role: 'ADMIN' },
      { name: 'Jane Smith', email: 'janesmith@example.com', role: 'USER' },
    ];
    component.dataSource.data = mockUserData;
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input');
    input.value = 'Jane';
    input.dispatchEvent(new Event('keyup'));
    fixture.detectChanges();

    const tableRows = fixture.nativeElement.querySelectorAll('tr');
    expect(tableRows.length).toBe(2);
    expect(tableRows[1].querySelector('td').textContent).toContain(
      'Jane Smith'
    );
  });
});

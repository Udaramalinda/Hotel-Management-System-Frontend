import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HotelViewComponent, UserData } from './hotel-view.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HotelService } from '../hotel.service';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('HotelViewComponent', () => {
  let component: HotelViewComponent;
  let fixture: ComponentFixture<HotelViewComponent>;
  let hotelService: HotelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        HttpClientModule,
      ],
      providers: [HotelService, provideHttpClientTesting()],
    });

    fixture = TestBed.createComponent(HotelViewComponent);
    component = fixture.componentInstance;
    hotelService = TestBed.inject(HotelService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set dataSource after fetching hotel details', () => {
    const mockUserData: UserData[] = [
      {
        hotelName: 'Hotel A',
        address: 'Address A',
        email: 'emailA@example.com',
        telephone: '1234567890',
      },
      {
        hotelName: 'Hotel B',
        address: 'Address B',
        email: 'emailB@example.com',
        telephone: '9876543210',
      },
    ];

    component.dataSource.data = mockUserData;
    fixture.detectChanges();

    const tableRows = fixture.nativeElement.querySelectorAll('tr');
    expect(tableRows.length).toBe(3);
    expect(tableRows[1].querySelector('td').textContent).toContain('Hotel A');
    expect(tableRows[2].querySelector('td').textContent).toContain('Hotel B');
  });

  it('should apply filtering on input change', () => {
    const mockHotelData: UserData[] = [
      {
        hotelName: 'Hotel A',
        address: 'Address A',
        email: 'emailA@example.com',
        telephone: '1234567890',
      },
      {
        hotelName: 'Hotel B',
        address: 'Address B',
        email: 'emailB@example.com',
        telephone: '9876543210',
      },
    ];

    component.dataSource.data = mockHotelData;
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input');
    input.value = 'Hotel A';
    input.dispatchEvent(new Event('keyup'));
    fixture.detectChanges();

    const tableRows = fixture.nativeElement.querySelectorAll('tr');
    expect(tableRows.length).toBe(2); // Header row + filtered data row
    expect(tableRows[1].querySelector('td').textContent).toContain('Hotel A');
  });

  it('should display "No data matching the filter" message when no data matches the filter', () => {
    const mockHotelData: UserData[] = [
      {
        hotelName: 'Hotel A',
        address: 'Address A',
        email: 'emailA@example.com',
        telephone: '1234567890',
      },
      {
        hotelName: 'Hotel B',
        address: 'Address B',
        email: 'emailB@example.com',
        telephone: '9876543210',
      },
    ];

    component.dataSource.data = mockHotelData;
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input');
    input.value = 'Non-existent Hotel';
    input.dispatchEvent(new Event('keyup'));
    fixture.detectChanges();

    const noDataRow = fixture.nativeElement.querySelector('.mat-row');
    expect(noDataRow.textContent).toContain(
      'No data matching the filter "Non-existent Hotel"'
    );
  });

  it('should display correct number of rows when filter is cleared', () => {
    const mockHotelData: UserData[] = [
      {
        hotelName: 'Hotel A',
        address: 'Address A',
        email: 'emailA@example.com',
        telephone: '1234567890',
      },
      {
        hotelName: 'Hotel B',
        address: 'Address B',
        email: 'emailB@example.com',
        telephone: '9876543210',
      },
    ];

    component.dataSource.data = mockHotelData;
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input');
    input.value = 'Hotel A';
    input.dispatchEvent(new Event('keyup'));
    fixture.detectChanges();

    // Clear the filter
    input.value = '';
    input.dispatchEvent(new Event('keyup'));
    fixture.detectChanges();

    const tableRows = fixture.nativeElement.querySelectorAll('tr');
    expect(tableRows.length).toBe(mockHotelData.length + 1); // Header row + data rows
  });
});

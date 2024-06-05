import { Component, AfterViewInit, Output } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { HotelService } from '../hotel.service';
import { EventEmitter } from '@angular/core';

export interface UserData {
  hotelName: string;
  address: string;
  email: string;
  telephone: string;
}

@Component({
  selector: 'app-hotel-view',
  standalone: true,
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    MatTableModule, 
    MatSortModule, 
    MatPaginatorModule,
  ],
  templateUrl: './hotel-view.component.html',
  styleUrl: './hotel-view.component.css'
})


export class HotelViewComponent implements AfterViewInit{
  displayedColumns: string[] = ['hotelName', 'address', 'email', 'telephone'];
  dataSource: MatTableDataSource<UserData> = new MatTableDataSource();

  constructor(private hotelService: HotelService ) {
    // const hotelDetails = hotelService.getHotelDetails();
    this.getData();

  }

  getData(){
    this.hotelService.getHotelDetails().subscribe(
      (response: UserData[]) => {
        this.dataSource = new MatTableDataSource(response);
      },
      (error) => {
        console.error('Error fetching hotel details', error);
      }
    );
  }
  ngAfterViewInit() {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

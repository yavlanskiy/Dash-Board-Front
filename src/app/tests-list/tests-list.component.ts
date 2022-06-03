import { Component, OnInit } from '@angular/core';
import {TestService} from "../test.service";
import {delay, of} from "rxjs";

@Component({
  selector: 'app-tests-list',
  templateUrl: './tests-list.component.html',
  styleUrls: ['./tests-list.component.css']
})
export class TestsListComponent implements OnInit {

  testData:Array<any> = []
  displayedColumns: any;
  projects: Project[] = [
    {value: '0', viewValue: 'B2_UA'},
    {value: '1', viewValue: 'B2_UZ'},
    {value: '2', viewValue: 'B2ng_UA'},
  ];
  isLoading = true;

  constructor(private testService:TestService) {
    this.testService.getAllTests().subscribe(
      (response)=>{
        console.log(response)
        this.testData = response;
        this.displayedColumns = ['Подсистема', 'Тест', 'Версия', 'Разработчик'];
        this.isLoading = false
      }
    )
  }

  ngOnInit(): void {
  }
}

interface Project {
  value: string;
  viewValue: string;
}

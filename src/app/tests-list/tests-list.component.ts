import { Component, OnInit } from '@angular/core';
import {TestService} from "../test.service";

@Component({
  selector: 'app-tests-list',
  templateUrl: './tests-list.component.html',
  styleUrls: ['./tests-list.component.css']
})
export class TestsListComponent implements OnInit {

  testData:Array<any> = []
  projectList:Array<any> = []

  displayedColumns: any;

  developer: string [] = [
   'Rowan','AVB','BAA'
  ];

  version: string[] = [
    '4800','4700'
  ];

  isLoading = true;

  constructor(private testService:TestService) {
    this.testService.getAllTests().subscribe(
      (response)=>{
        this.testData = response;
        this.displayedColumns = ['Подсистема', 'Тест', 'Версия', 'Разработчик'];
        this.isLoading = false
      }
    )
  }

  ngOnInit(): void {
    this.getAllProject()
  }

  getAllProject(){
    this.testService.getAllProject().subscribe((reponse)=>{
      this.projectList = reponse;
    })
  }
}



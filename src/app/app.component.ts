import { Component } from '@angular/core';
import {TestService} from "./test.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Dash-Board-Front';

  testData:Array<any> = []
  displayedColumns: any;

  constructor(private testService:TestService) {
    this.testService.getAllTests().subscribe(
      (response)=>{
        console.log(response)
        this.testData = response;
        this.displayedColumns = ['Подсистема', 'Тест', 'Версия', 'Разработчик'];
      }
    )
  }
}

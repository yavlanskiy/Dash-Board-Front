import {Component, OnInit, ViewChild} from '@angular/core';
import {Project, SubSystem, TestService, VersionList} from "../test.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import { MatAccordion } from '@angular/material/expansion';

export interface PeriodicElement {
  name: string;
  description: string;
}

@Component({
  selector: 'app-tests-list',
  templateUrl: './tests-list.component.html',
  styleUrls: ['./tests-list.component.css']
})
export class TestsListComponent implements OnInit {

  selectedProject = '';
  selectedVersion = 0;

  testData:Array<any> = []
  //dataSubsustem:Array<SubSystem> = []
  projectList:Project[] = []
  projectVersion:VersionList[] = []

  displayedColumns: any;

  isLoading = true;

  panelOpenState = false;

  @ViewChild('firstAccordion') firstAccordion: MatAccordion;

  constructor(private testService:TestService) {
    this.displayedColumns = ['Подсистема', 'Разработчик'];
  }

  ngOnInit(): void {
    this.getAllProject()
    this.getAllVersion()
  }

  getAllProject(){
    this.testService.getAllProject().subscribe((reponse) => {
      let values = [5,6,7,11]; //исключаем ненужные проекты
      this.projectList = reponse.filter(item => !values.includes(item.id));;
    })
  }

  getAllVersion(){
    this.testService.getAllVersion().subscribe((reponse) => {
      this.projectVersion = reponse;
    })
  }

  fetchTests() {
    this.isLoading = true
    this.testData = []

    this.testService.getAllTests(this.selectedVersion, this.selectedProject).subscribe((response) => {
      this.testData = response;
      const itemsObject = response.reduce((accumulator:any, currentValue:any) => {
        if (accumulator[currentValue.subsystemName]) {
          accumulator[currentValue.subsystemName].push(currentValue)
        } else {
          accumulator[currentValue.subsystemName] = [currentValue]
        }
        return accumulator
      }, {})

      this.testData = Object.keys(itemsObject).map(k => ({subsystemName: k, data: itemsObject[k]}));
      console.log(this.testData)
      this.isLoading = false
    })
  }

  // fetchSubsustem() {
  //   this.isLoading = true
  //   this.dataSubsustem = []
  //
  //   this.testService.getAllSubsustem(this.selectedProject).subscribe((response) => {
  //     this.dataSubsustem = response;
  //   });
  //   console.log(this.dataSubsustem)
  //   this.isLoading = false
  // }
}



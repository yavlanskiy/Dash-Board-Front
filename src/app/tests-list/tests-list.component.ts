import {Component, OnInit} from '@angular/core';
import {Project, TestService, VersionList} from "../test.service";
import {animate, state, style, transition, trigger} from "@angular/animations";

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
  projectList:Project[] = []
  projectVersion:VersionList[] = []

  displayedColumns: any;

  isLoading = true;

  constructor(private testService:TestService) {
    this.displayedColumns = ['Подсистема', 'Разработчик'];
  }

  ngOnInit(): void {
    this.getAllProject()
    this.getAllVersion()
  }

  getAllProject(){
    this.testService.getAllProject().subscribe((reponse) => {
      this.projectList = reponse;
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
}



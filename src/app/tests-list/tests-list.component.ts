import {Component, OnInit, ViewChild} from '@angular/core';
import {Produkt, Project, SubSystem, TestService, VersionList} from "../test.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import { MatAccordion } from '@angular/material/expansion';
import {FormControl, Validators} from "@angular/forms";

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
  customCollapsedHeight: string = '30px';
  customExpandedHeight: string = '30px';


  selectedProject = '';
  selectedVersion = 0;
  selectedProdukt = 0;

  testData:Array<any> = []
  //dataSubsustem:Array<SubSystem> = []
  projectList:Project[] = []
  projectVersion:VersionList[] = []
  produkts:Produkt[] = []

  displayedColumns: any;

  isLoading = true;

  panelOpenState = false;

  @ViewChild('firstAccordion') firstAccordion: MatAccordion;

  constructor(private testService:TestService) {
    this.displayedColumns = ['Подсистема', 'Разработчик'];
  }

  ngOnInit(): void {
    this.getAllProdukt()
    //this.getAllProject()
    //this.getAllVersion()
  }

  getAllProject(){
    this.testService.getAllProject().subscribe((reponse) => {
      let values = [5,6,7,11]; //исключаем ненужные проекты
      this.projectList = reponse.filter(item => !values.includes(item.id));;
    })
  }

  getAllVersion(produktId: number){
    this.testService.getVersion(produktId).subscribe((reponse) => {
      this.projectVersion = reponse;
    })
  }

  getAllProdukt(){
    this.testService.getAllProdukt().subscribe((reponse) => {
      this.produkts = reponse;
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



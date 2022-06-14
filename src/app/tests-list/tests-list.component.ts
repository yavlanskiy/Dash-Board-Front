import { Component, OnInit } from '@angular/core';
import {Project, TestService, VersionList} from "../test.service";

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
    this.displayedColumns = ['Подсистема', 'Тест', 'Версия', 'Разработчик'];
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
    this.testService.getAllTests(this.selectedVersion, this.selectedProject).subscribe((response) => {
      this.testData = []
      this.testData = response;
      this.isLoading = false
    })
  }
}



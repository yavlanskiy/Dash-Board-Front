import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export interface Project {
  id: string;
  name: string;
}

export interface VersionList {
  version:number;
  versionID:number;
}

export interface SubSystem {
  id:number;
  name:string;
  devid:number;
}

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http:HttpClient) {

  }
  //http://localhost:8090/test/allTest?projectid=3&versionid=182
  getAllTests(versionID:number, projectID:string):Observable<any> {
    return this.http.get(`http://localhost:8090/test/allTest?projectid=${projectID}&versionid=${versionID}`)
  }

  getAllSubsustem(projectID:string):Observable<SubSystem[]> {
    return this.http.get<SubSystem[]>(`http://localhost:8090/subsystem/allSubsystem?projectid=${projectID}`)
  }

  getAllProject():Observable<Project[]> {
    return this.http.get<Project[]>("http://localhost:8090/project/allProject")
  }

  getAllVersion():Observable<VersionList[]> {
    return this.http.get<VersionList[]>("http://localhost:8090/version/allVersion")
  }
}

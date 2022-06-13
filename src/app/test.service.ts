import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export interface Project {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http:HttpClient) { }

  getAllTests():Observable<any> {
    return this.http.get("http://localhost:8090/test/allTest")
  }

  getAllProject():Observable<Project[]> {
    return this.http.get<Project[]>("  http://localhost:8090/project/allProject")
  }
}

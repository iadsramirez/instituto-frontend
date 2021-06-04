import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_ENDPOINT } from '../config/app';
import { Asignatura } from '../model/asignatura';
import { Examen } from '../model/examen';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ExamenService extends CommonService<Examen>{


  protected baseEndPoint=BASE_ENDPOINT+'/examenes';


  constructor( http:HttpClient) {
    super(http);
   }


   public findAllAsignatura():Observable<Asignatura[]>{
     return this.http.get<Asignatura[]>(`${this.baseEndPoint}/asignaturas`);
   }




}

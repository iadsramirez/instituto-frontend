import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_ENDPOINT } from '../config/app';
import { Alumno } from '../model/alumno';
import { Curso } from '../model/curso';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class CursoService extends CommonService<Curso>{


  protected baseEndPoint=BASE_ENDPOINT+'/cursos';

  constructor(http:HttpClient) {
    super(http);

  }

  asignarAlumnos(curso:Curso,alumno:Alumno[]):Observable<Curso>{
    return this.http.put<Curso>(`${this.baseEndPoint}/${curso.id}/asignar-alumnos`,
    alumno,{headers:this.cabeceras});
  }



}

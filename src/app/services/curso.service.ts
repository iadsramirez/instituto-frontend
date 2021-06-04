import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_ENDPOINT } from '../config/app';
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



}

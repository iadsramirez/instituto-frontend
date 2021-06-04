import {Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'
import { Generic } from '../model/generic';
import { CommonService } from '../services/common.service';

@Injectable()
export abstract class CommonFormComponent<E extends Generic,S extends CommonService<E>> implements OnInit {
  titulo:string;
  model: E;
  error:any;
  protected redirect:string;
  protected nombreModel:string;

  constructor(protected service: S,protected route:ActivatedRoute,protected router:Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params=>{
        const id=+params.get('id');

        if(id){
          this.service.ver(id).subscribe( m=> {
            this.model=m;
            this.titulo='Editar'+this.nombreModel;
          });
        }
      }
    );
  }

  public crear(): void {
    this.service.crear(this.model).subscribe((m) => {
      console.log(m);
      Swal.fire('Nuevo:',`${this.nombreModel} ${m.nombre} creado con exito`,'success');
      this.router.navigate([this.redirect]);
    },
    err=>{
        if(err.status==400){
          this.error=err.error;
          console.log(this.error);
        }
    }
    );
  }




  public editar(): void {
    this.service.editar(this.model).subscribe((m) => {
      console.log(m);
      Swal.fire('Modificar:',`${this.nombreModel} ${this.model.nombre} Actualizado con exito`,'success');
      this.router.navigate([this.redirect]);
    },
    err=>{
        if(err.status==400){
          this.error=err.error;
          console.log(this.error);
        }
    }
    );
  }



}

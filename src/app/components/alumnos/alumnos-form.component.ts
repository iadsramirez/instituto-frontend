import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alumno } from 'src/app/model/alumno';
import { AlumnoService } from 'src/app/services/alumno.service';
import Swal from 'sweetalert2'
import { CommonFormComponent } from '../common-form.component';

@Component({
  selector: 'app-alumnos-form',
  templateUrl: './alumnos-form.component.html',
  styleUrls: ['./alumnos-form.component.css'],
})
export class AlumnosFormComponent extends CommonFormComponent<Alumno, AlumnoService> implements OnInit {
  private fotoSeleccionada: File;


  constructor(service: AlumnoService, route: ActivatedRoute, router: Router) {
    super(service, route, router);
    this.titulo = 'Crear Alumnos';
    this.model = new Alumno();
    this.redirect = '/alumnos';
    this.nombreModel = Alumno.name;

  }


  public seleccionarFoto(event): void {

    this.fotoSeleccionada = event.target.files[0];
    console.info(this.fotoSeleccionada);


  }


  public crear(): void {
    if (!this.fotoSeleccionada) {
      super.crear();
    }else{
      this.service.crearConFoto(this.model,this.fotoSeleccionada).subscribe((alumno) => {
        console.log(alumno);
        Swal.fire('Nuevo:',`${this.nombreModel} ${alumno.nombre} creado con exito`,'success');
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


  public editar(): void {
    if (!this.fotoSeleccionada) {
      super.editar();
    }else{
      this.service.editarConFoto(this.model,this.fotoSeleccionada).subscribe((alumno) => {
        console.log(alumno);
        Swal.fire('Modificado:',`${this.nombreModel} ${alumno.nombre} actualizado con exito`,'success');
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

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Asignatura } from 'src/app/model/asignatura';
import { Examen } from 'src/app/model/examen';
import { Pregunta } from 'src/app/model/pregunta';
import { ExamenService } from 'src/app/services/examen.service';
import Swal from 'sweetalert2';
import { CommonFormComponent } from '../common-form.component';

@Component({
  selector: 'app-examen-form',
  templateUrl: './examen-form.component.html',
  styleUrls: ['./examen-form.component.css'],
})
export class ExamenFormComponent
  extends CommonFormComponent<Examen, ExamenService>
  implements OnInit
{
  asignaturaPadre: Asignatura[] = [];
  asignaturaHija: Asignatura[] = [];
  errorPreguntas:string;

  constructor(service: ExamenService, route: ActivatedRoute, router: Router) {
    super(service, route, router);
    this.titulo = 'Crear Examen';
    this.model = new Examen();
    this.nombreModel = Examen.name;
    this.redirect = '/examenes';
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = +params.get('id');

      if (id) {
        console.log(id);
      this.service.ver(id).subscribe((m) => {

        console.log('ingreso al servicio');
          this.model = m;

          this.titulo = 'Editar' + this.nombreModel;
          this.cargarHijos();
          /*this.service.findAllAsignatura().subscribe(asignaturas=>{
            this.asignaturaHija=asignaturas.filter(  a=>a.padre && a.padre.id===this.model.asignaturaPadre.id

              );});*/


        });


      }
    });

    this.service
      .findAllAsignatura()
      .subscribe(
        (asignatura) =>
          (this.asignaturaPadre = asignatura.filter((a) => !a.padre))
      );
  }


  public crear(): void {

    if(this.model.preguntas.length===0){
    //  Swal.fire('Error preguntas','Examen debe contener pregunta','error');
    this.errorPreguntas='Examen debe contener pregunta';
      return ;
    }

    this.errorPreguntas=undefined;

    this.eliminarPreguntasVacias();
    super.crear();
  }


  public editar(): void {

    if(this.model.preguntas.length===0){
     // Swal.fire('Error preguntas','Examen debe contener pregunta','error');
     this.errorPreguntas='Examen debe contener pregunta';
      return ;
    }
    this.errorPreguntas=undefined;

    this.eliminarPreguntasVacias();
    super.editar();
  }

  cargarHijos(): void {
    this.asignaturaHija = this.model.asignaturaPadre
      ? this.model.asignaturaPadre.hijos
      : [];
  }

  compararAsignatura(a1: Asignatura, a2: Asignatura): boolean {
    if (a1 === undefined && a2 === undefined) {
      return true;
    }

    return a1 === null || a2 === null || a1 === undefined || a2 === undefined
      ? false
      : a1.id === a2.id;
  }


  agregarPregunta():void{
    this.model.preguntas.push(new Pregunta());
  }

  asignarTexto(pregunta:Pregunta,event:any):void{
    pregunta.texto=event.target.value as string;
  }

  eliminarPreguntas(pregunta):void{
    this.model.preguntas=this.model.preguntas.filter(p=>pregunta.texto !==p.texto);
  }


eliminarPreguntasVacias():void{
  this.model.preguntas=this.model.preguntas.filter(p=>p.texto !=null && p.texto.length >0);
}

}

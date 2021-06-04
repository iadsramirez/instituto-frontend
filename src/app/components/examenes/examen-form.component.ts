import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Asignatura } from 'src/app/model/asignatura';
import { Examen } from 'src/app/model/examen';
import { ExamenService } from 'src/app/services/examen.service';
import { CommonFormComponent } from '../common-form.component';

@Component({
  selector: 'app-examen-form',
  templateUrl: './examen-form.component.html',
  styleUrls: ['./examen-form.component.css']
})
export class ExamenFormComponent extends CommonFormComponent<Examen,ExamenService> implements OnInit {

  asignaturaPadre:Asignatura[]=[];
  asignaturaHija:Asignatura[]=[];


  constructor(service:ExamenService,route:ActivatedRoute,router:Router) {
    super(service,route,router);
    this.titulo='Crear Examen';
    this.model=new Examen();
    this.nombreModel=Examen.name;
    this.redirect='/examenes';
   }



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

    this.service.findAllAsignatura()
    .subscribe(asignatura => this.asignaturaPadre=asignatura.filter(a=>!a.padre));
  }

  cargarHijos():void{
this.asignaturaHija=this.model.asignaturaPadre ? this.model.asignaturaPadre.hijos:[];
  }



}

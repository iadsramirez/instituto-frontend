import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Alumno } from 'src/app/model/alumno';
import { Curso } from 'src/app/model/curso';
import { AlumnoService } from 'src/app/services/alumno.service';
import { CursoService } from 'src/app/services/curso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asignar-alumnos',
  templateUrl: './asignar-alumnos.component.html',
  styleUrls: ['./asignar-alumnos.component.css']
})
export class AsignarAlumnosComponent implements OnInit {
  curso: Curso;
  alumnosAsignar: Alumno[] = [];
  alumnos: Alumno[] = [];
  mostrarColumnas: string[] = ['nombre', 'apellido', 'seleccion'];
  mostrarColumnasAlumnos: string[] = ['id','nombre', 'apellido', 'email'];
  seleccion: SelectionModel<Alumno> = new SelectionModel<Alumno>(true, []);
  tabIndex:number=0;


  constructor(private route: ActivatedRoute,
    private cursoService: CursoService, private alumnoService: AlumnoService) {


  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(
      params => {
        const id: number = +params.get('id');
        this.cursoService.ver(id).subscribe(
          c => {
            this.curso = c;
            this.alumnos=this.curso.alumnos;
          }
        );

      }
    );


  }

  filtrar(nombre: string): void {
    nombre = nombre !== undefined ? nombre.trim() : '';
    if (nombre !== '') {
      this.alumnoService.filtrarPorNombre(nombre)
        .subscribe(alumnos => this.alumnosAsignar = alumnos.filter(a => {
            let filtrar=true;

            this.alumnos.forEach(ca=>{
              if(a.id===ca.id){
                filtrar=false;
              }
            });

            return filtrar;
        }));
    }

  }


  seleccionarDesSeleccionarTodos(): void {

    this.estanTodosSeleccionados() ? this.seleccion.clear() :
      this.alumnosAsignar.forEach(a => this.seleccion.select(a));

  }

  estanTodosSeleccionados(): boolean {
    const seleccionados = this.seleccion.selected.length;
    const numAlumnos = this.alumnosAsignar.length;
    return (seleccionados === numAlumnos);

  }


  asignar(): void {
    this.cursoService.asignarAlumnos(this.curso, this.seleccion.selected)
      .subscribe(c => {
        this.tabIndex=2;
        Swal.fire('Asignados:',
          `Alumnos Asignados con exito al curso ${this.curso.nombre}`, 'success');
          this.alumnos=this.alumnos.concat(this.seleccion.selected);
          this.alumnosAsignar = [];
          this.seleccion.clear();

      },

      e=>{
        if(e.status===500){
          const mensaje=e.error.message as string;
          if(mensaje.indexOf('ConstraintViolationException')>-1){
            Swal.fire('Cuidado:',
            'No se puede asignar al alumno ya esta asignado a otro curso',
            'error');
          }

        }
      });

  }


}

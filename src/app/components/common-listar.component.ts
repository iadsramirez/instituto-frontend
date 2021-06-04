import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { Generic } from '../model/generic';
import { CommonService } from '../services/common.service';
@Injectable()
export abstract class CommonListarComponent<E extends Generic,S extends CommonService<E>> implements OnInit {
  @ViewChild(MatPaginator) matPaginator: MatPaginator;

  titulo: string;
  protected nombreModel:string;
  totalRegistros = 0;
  paginaActual = 0;
  totalPorPagina = 4;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  lista: E[];
  constructor(protected service:S ) { }

  ngOnInit(): void {
    this.calcularRangos();
  }

  paginar(event: PageEvent): void {
    this.paginaActual = event.pageIndex;
    this.totalPorPagina = event.pageSize;

    this.calcularRangos();
  }

  private calcularRangos() {
    this.service
      .listarPaginas(
        this.paginaActual.toString(),
        this.totalPorPagina.toString()
      )
      .subscribe((p) => {
        this.lista = p.content as E[];
        this.totalRegistros = p.totalElements as number;
        if(this.matPaginator){
          this.matPaginator._intl.itemsPerPageLabel = 'Registro por Paginas';
        }

      });
  }

  public eliminar(e: E): void {
    Swal.fire({
      title: 'Cuidado',
      text: `Seguro que desea eliminar al ${this.nombreModel} ${e.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.eliminar(e.id).subscribe(() => {
          // this.alumnos=this.alumnos.filter(a=>a !==alumno);

          this.calcularRangos();
          Swal.fire(
            'Eliminar:',
            `${this.nombreModel} ${e.nombre} eliminado con exito`,
            'success'
          );
        });
      }
    });
  }
}

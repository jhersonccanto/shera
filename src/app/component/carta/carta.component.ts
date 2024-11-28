import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { FiltrosComponent } from "./filtros/filtros.component";
import { CartaDialogComponent } from './carta-dialog/carta-dialog.component';
import { ButtonModule } from 'primeng/button';



@Component({
  selector: 'app-carta',
  standalone: true,
  imports: [CommonModule, FormsModule, FiltrosComponent, CartaDialogComponent,ButtonModule],
  templateUrl: './carta.component.html',
  styleUrl: './carta.component.css'
})
export class CartaComponent implements OnInit  {
  solicitudes = [
    {
      practicante: 'Justin Septimus',
      email: 'example@email.com',
      fecha: '14/APR/2020',
      codigo: '202367458',
      empresa: 'Justin Septimus',
      documento: 'documento1.pdf',
      estado: 'Aprobado'
    },
    {
      practicante: 'Justin Septimus',
      email: 'example@email.com',
      fecha: '14/APR/2020',
      codigo: '202367458',
      empresa: 'Justin Septimus',
      documento: 'documento2.pdf',
      estado: 'Pendiente'
    },
    // Agrega más datos aquí
  ];

  filteredSolicitudes = [...this.solicitudes];
  searchQuery = '';
  filtros: MenuItem[] = [];
  constructor() {}

  ngOnInit(): void {

    this.filtros = [
      {
        label: 'ESTADO',
        items: [
          {
            label: 'Enviado',
            command: () => this.filterByEstado('Enviado')
          },
          {
            label: 'Pendiente',
            command: () => this.filterByEstado('Pendiente')
          }
        ]
      },
      {
        label: 'FECHA',
        items: [
          {
            label: 'Recientes',
            command: () => this.filterByFecha('recientes')
          },
          {
            label: 'Antiguos',
            command: () => this.filterByFecha('antiguos')
          }
        ]
      }
    ];
  }

  filterSolicitudes(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredSolicitudes = [...this.solicitudes];
    } else {
      this.filteredSolicitudes = this.solicitudes.filter((solicitud) =>
        Object.values(solicitud).some((val) =>
          val.toString().toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      );
    }
  }

  visualizarArchivo(documento: string): void {
    // Lógica para abrir el archivo (puede ser en una nueva pestaña)
    console.log(`Visualizar archivo: ${documento}`);
    window.open(`http://localhost:8080/api/files/${documento}`, '_blank');
  }

  descargarArchivo(documento: string): void {
    // Lógica para descargar el archivo
    console.log(`Descargar archivo: ${documento}`);
    const link = document.createElement('a');
    link.href = `http://localhost:8080/api/files/${documento}`;
    link.download = documento;
    link.click();
  }
  filterByEstado(estado: string): void {
    this.filteredSolicitudes = this.solicitudes.filter(
      (solicitud) => solicitud.estado === estado
    );
  }

  filterByFecha(tipo: string): void {
    this.filteredSolicitudes.sort((a, b) => {
      const fechaA = new Date(a.fecha).getTime();
      const fechaB = new Date(b.fecha).getTime();

      if (tipo === 'recientes') {
        return fechaB - fechaA;
      } else {
        return fechaA - fechaB;
      }
    });
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-filtros',
  standalone: true,
  imports: [FormsModule, CommonModule,MenuModule,ButtonModule],
  templateUrl: './filtros.component.html',
  styleUrl: './filtros.component.css'
})
export class FiltrosComponent implements OnInit {
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
      fecha: '12/APR/2020',
      codigo: '202367458',
      empresa: 'Justin Septimus',
      documento: 'documento2.pdf',
      estado: 'Pendiente'
    }
    // Agrega más datos si es necesario
  ];

  filteredSolicitudes = [...this.solicitudes];
  searchQuery = '';
  filtros: MenuItem[] = [];

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
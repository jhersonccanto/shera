import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-validar-documentos',
  standalone: true,
  imports: [TableModule, CommonModule,FormsModule,ButtonModule],
  templateUrl: './validar-documentos.component.html',
  styleUrl: './validar-documentos.component.css'
})
export class ValidarDocumentosComponent {
  searchQuery: string = '';

  documentos = [
    {
      numero: '001',
      nombre: 'Justin Septimus',
      email: 'example@email.com',
      fecha: '14/APR/2020',
      codigo: '202367458',
      supervisor: 'Justin Septimus',
      estado: 'Aprobado'
    },
    {
      numero: '002',
      nombre: 'Justin Septimus',
      email: 'example@email.com',
      fecha: '14/APR/2020',
      codigo: '202367458',
      supervisor: 'Justin Septimus',
      estado: 'Pendiente'
    }
    // Agrega más documentos aquí
  ];

  filterDocumentos() {
    console.log('Filtro aplicado:', this.searchQuery);
    // Agregar lógica de filtrado si es necesario
  }

  toggleFilter() {
    console.log('Filtro desplegado');
    // Lógica para mostrar u ocultar filtros
  }
}

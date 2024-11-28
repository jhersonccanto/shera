import { CommonModule, NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PracticaService } from '../../services/practica.service';
import { PracticaDetalleComponent } from '../practica-detalle/practica-detalle.component';

@Component({
  selector: 'app-practica',
  standalone: true,
  imports: [PracticaDetalleComponent,CommonModule,NgIf,NgFor,FormsModule, InputTextModule, ButtonModule,NgStyle],
  templateUrl: './practica.component.html',
  styleUrl: './practica.component.css'
})
export class PracticaComponent implements OnInit {
  practicas: any[] = []; // Variable tipada como un arreglo de Practica
  value: string = ''; // Variable vinculada con ngModel para el campo de búsqueda
  mostrarDetalle: boolean = false; // Controla la visibilidad del modal
  idSeleccionado: number | null = null; // Permitir que sea null
 // Almacena el ID seleccionado

  constructor(private practicaService: PracticaService) {}

  

  ngOnInit(): void {
    this.practicaService.getPracticas().subscribe((data) => {
      console.log('Listado de prácticas:', data); // Verifica que cada práctica tenga un atributo id
      this.practicas = data; // La respuesta del backend se asigna a 'practicas'
    });
  }

  // Método para buscar por código
  buscarPorCodigo(): void {
    const codigo = this.value.trim(); // Código ingresado por el usuario
    if (codigo) {
      this.practicaService.buscarSolicitudesPorCodigo(codigo).subscribe({
        next: (data) => {
          this.practicas = data; // Actualiza la tabla con los resultados de búsqueda
        },
        error: (err) => {
          console.error('Error al buscar las solicitudes:', err);
          this.practicas = []; // Limpia la tabla si no hay resultados
        }
      });
    } else {
      this.loadPractices(); // Si no hay código ingresado, carga todas las solicitudes
    }
  }
  

  verDetalle(id: number): void {
    console.log('ID seleccionado:', id); // Verifica el ID
    this.idSeleccionado = id; // Asigna el ID seleccionado
    this.mostrarDetalle = true; // Muestra el modal
  }

  cerrarModal(): void {
    this.mostrarDetalle = false; // Oculta el modal
    this.idSeleccionado = null; // Limpia el ID seleccionado
  }

  loadPractices(): void {
    this.practicaService.getPracticas().subscribe({
      next: (data) => {
        this.practicas = data;
      },
      error: (err) => {
        console.error('Error al cargar las prácticas:', err);
      }
    });
  }
}

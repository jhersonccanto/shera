import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { tap } from 'rxjs';
import { PracticaDetalleService } from '../../services/practica-detalle.service';

@Component({
  selector: 'app-practica-detalle',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './practica-detalle.component.html',
  styleUrl: './practica-detalle.component.css'
})
export class PracticaDetalleComponent implements OnInit{
  @Input() id: number | null = null; // Permite que sea null // Recibe el ID de la práctica seleccionada
  @Output() close = new EventEmitter<void>(); // Emite un evento al cerrar el modal
  
  empresa: any = {}; // Datos de la empresa
  representante: any = {}; // Datos del representante legal

  estadoSeleccionado: string = ''; // Almacena si es aprobado o desaprobado
  showModal: boolean = true; // Controla la visibilidad del modal principal
  showConfirmation: boolean = false; // Controla la visibilidad del modal de confirmación
  showNotification: boolean = false; // Controla el modal de notificación
  notificationMessage: string = ''; // Mensaje para la notificación

  constructor(private practicaDetalleService: PracticaDetalleService) {}

  ngOnInit(): void {
    console.log('ID recibido en el modal:', this.id);
    if (this.id !== null && this.id !== undefined) {
      this.practicaDetalleService.getDetalleSolicitudById(this.id).subscribe({
        next: (data) => {
          this.empresa = {
            nombre: data.nombreEmpresa,
            ruc: data.rucEmpresa,
            direccion: data.direccionEmpresa,
            correo: data.correoEmpresa,
            lineaTrabajo: data.nombreLinea,
          };
          this.representante = {
            /*nombreCompleto: `${data.nombrePersona} ${data.apellidoPersona}`,*/
            nombre: data.nombreRepresentante,
            cargo: data.cargoRepresentante,
            correo: data.correoRepresentante,
            telefono: data.telefonoRepresentante,
          };
        },
        error: (err) => {
          console.error('Error al cargar los datos:', err);
        },
      });
    } else {
      console.error('ID inválido:', this.id);
    }
  }
  
  guardar(): void{
    if (!this.estadoSeleccionado) {
      this.notificationMessage = 'Por favor selecciona una opción antes de guardar.';
      this.showNotification = true;
      return;
    }

    // Mostrar el modal de confirmación según la selección
    this.showConfirmation = true;
    this.showModal = false;
  }

  @Output() estadoActualizado = new EventEmitter<void>(); // Evento para notificar el cambio

  continuar(): void{
    if (this.id !== null && this.estadoSeleccionado) {
      const idEstadoPPP = this.estadoSeleccionado === 'aprobado' ? 2 : 1;
  
      this.practicaDetalleService.actualizarEstado(this.id, idEstadoPPP).subscribe({
        next: (response) => {
          console.log('Estado actualizado:', response);
          this.notificationMessage = response.message;
          this.showNotification = true;
          this.showConfirmation = false;
  
          this.estadoActualizado.emit(); // Emite el evento para notificar al componente padre
        },
        error: (err) => {
          console.error('Error al actualizar el estado:', err);
          this.notificationMessage = 'Error al actualizar el estado. Intente nuevamente.';
          this.showNotification = true;
          this.showConfirmation = false;
        },
      });
    }
  }

  cancelar(): void {
    this.showConfirmation = false; // Cierra el modal de confirmación
  }

  closeNotification(): void {
    this.showNotification = false; // Cierra el modal de notificación
  this.close.emit(); // Cierra el modal principal
  }
  
  closeModal(): void {
    this.showModal = false;
    this.close.emit();
  }

  save(): void {
    console.log('Datos guardados');
  }

  cerrarModal(): void {
    this.close.emit(); // Emite el evento para cerrar el modal
  }
}
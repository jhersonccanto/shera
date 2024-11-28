import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, NgModule, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownItem, DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { Practica } from '../../../models/practica';

import { LineaService } from '../../../services/linea.service';
import { EstadosService } from '../../../services/estados.service';
import { EmpresaService } from '../../../services/empresa.service';
import { PracticaService } from '../../../services/practica.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RepresentanteLegal } from '../../../models/representante-legal';
import { PlanCarrera } from '../../../models/plancarrera';
import { InputGroupModule } from 'primeng/inputgroup';
@Component({
  selector: 'app-practica-forms',
  standalone: true,
  imports: [DividerModule,FormsModule,AutoCompleteModule,CommonModule,DialogModule,InputGroupModule,  ConfirmDialogModule, ToastModule, DropdownModule,],
  templateUrl: './practica-forms.component.html',
  styleUrl: './practica-forms.component.css'
})
export class PracticaFormsComponent implements OnInit {
  @Input() titulos: string = 'Crear Práctica'; // Título del modal
  @Input() practica: Practica = new Practica(); // Objeto de práctica
  @Input() modalVisible: boolean = false; // Visibilidad del modal
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  empresas: any[] = []; // Lista de empresas
  lineas: any[] = []; // Lista de líneas

  currentDate: string = new Date().toISOString().split('T')[0]; // Fecha actual
  defaultEndDate: string = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]; // Fecha de fin: un año después
  defaultHorasPlan: number = 700; // Horas planificadas predeterminadas
  defaultNota: number = 0; // Notas predeterminadas

  constructor(
    private practicaService: PracticaService,
    private empresaService: EmpresaService,
    private lineaService: LineaService
  ) {}

  ngOnInit(): void {
    this.loadEmpresas();
    this.loadLineas();
  }

  // Cargar empresas para el dropdown
  loadEmpresas(): void {
    this.empresaService.getEmpresaList().subscribe((data) => {
      this.empresas = data;
    });
  }

  // Cargar líneas para el dropdown
  loadLineas(): void {
    this.lineaService.getLineaList().subscribe((data) => {
      this.lineas = data;
    });
  }

  // Guardar práctica
  guardarPractica(): void {
    // this.practicaService.crearPractica(this.practica).subscribe({
    //   next: () => {
    //     console.log('Práctica guardada exitosamente.');
    //     this.cerrarPractica(); // Cerrar modal después de guardar
    //   },
    //   error: (err) => console.error('Error al guardar práctica:', err),
    // });
  }

  // Cerrar el modal
  cerrarPractica(): void {
    this.modalVisible = false;
    this.closeModal.emit(); // Emitir evento para cerrar el modal
  }
}
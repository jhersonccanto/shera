
import { RepresentanteLegal } from '../../models/representante-legal';
import { Empresa } from '../../models/empresa';
import { Linea } from '../../models/linea';
import { Estado } from '../../models/estados';
import { Ubigeo } from '../../models/ubigeo';
import { Practica } from '../../models/practica';
import { UbigeoService } from '../../services/ubigeo.service';
import { LineaService } from '../../services/linea.service';
import { RepresentanteLegalService } from '../../services/representante-legal.service';
import { EstadosService } from '../../services/estados.service';
import { EmpresaService } from '../../services/empresa.service';
import { PracticaService } from '../../services/practica.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { FormBuilder, FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { PracticaFormsComponent } from './practica-forms/practica-forms.component';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { PracticaDetalleService } from '../../services/practica-detalle.service';


@Component({
  selector: 'app-listar-practica',
  standalone: true,
  imports: [PracticaFormsComponent,DividerModule, TableModule, ButtonModule, InputTextModule,
    CommonModule, ConfirmDialogModule, ToastModule, DropdownModule,FormsModule],
  templateUrl: './listar-practica.component.html',
  styleUrl: './listar-practica.component.css'
})
export class ListarPracticaComponent implements OnInit {
  practicas: Practica[] = []; // Array to hold practices
  isPracticaFormVisible: boolean = false;

  constructor(
    private practicaService: PracticaService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.fetchPracticas();
  }

  fetchPracticas(): void {
    // this.practicaService.getPracticaList().subscribe({
    //   next: (data) => {
    //     this.practicas = data; // Assign data to the practicas array
    //   },
    //   error: (err) => {
    //     this.messageService.add({
    //       severity: 'error',
    //       summary: 'Error',
    //       detail: 'Failed to fetch practices.',
    //     });
    //     console.error('Error fetching practices:', err);
    //   },
    // });
  }

  abrirFormularioEmpresa(): void {
    console.log('Open modal for registering a new company.');
    // Implement modal logic
  }

  abrirFormularioPractica(): void {
    this.isPracticaFormVisible = true; // Show the modal
  }

  cerrarFormularioPractica(): void {
    this.isPracticaFormVisible = false; // Hide the modal
  }

  editarPractica(practica: Practica): void {
    console.log('Edit practice:', practica);
    // Implement edit logic
  }
  

  eliminarPractica(id: number): void {
    // if (confirm('Are you sure you want to delete this practice?')) {
    //   this.practicaService.deletePractica(id).subscribe({
    //     next: () => {
    //       this.fetchPracticas(); // Refresh the table
    //       this.messageService.add({
    //         severity: 'success',
    //         summary: 'Deleted',
    //         detail: 'Practice deleted successfully.',
    //       });
    //     },
    //     error: (err) => {
    //       this.messageService.add({
    //         severity: 'error',
    //         summary: 'Error',
    //         detail: 'Failed to delete practice.',
    //       });
    //       console.error('Error deleting practice:', err);
    //     },
    //   });
    // }
  }
}
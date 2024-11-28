import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { TiposDocumentos } from '../../models/tipodocumento';
import { EstadosService } from '../../services/estados.service';
import { Estado } from '../../models/estados';
import { TipoDocumentoService } from '../../services/tipo_documento.service';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-documentos',
  standalone: true,
  imports: [TableModule, ButtonModule,CommonModule, FormsModule,ButtonModule],
  templateUrl: './documentos.component.html',
  styleUrl: './documentos.component.css'
})
export class DocumentosComponent {
  documentos = [
    {
      id: '001',
      nombre: 'Constancia de PPP',
      fecha: '14/APR/2020',
      estado: 'Aprobado'
    },
    {
      id: '002',
      nombre: 'Informe de PPP',
      fecha: '14/APR/2020',
      estado: 'Pendiente'
    },
    {
      id: '003',
      nombre: 'Evaluación de Empresa',
      fecha: '14/APR/2020',
      estado: 'Rechazado'
    }
  ];

  supervisor = {
    nombre: '',
    email: '',
    telefono: ''
  };

  onFileSelected(event: any, documento: any) {
    const file = event.target.files[0];
    if (file) {
      console.log(`Archivo seleccionado para ${documento.nombre}:`, file.name);
    }
  }

  uploadFile(documento: any) {
    const fileInput = document.querySelector(`#fileInput`) as HTMLElement;
    fileInput?.click();
  }

  saveDocuments() {
    console.log('Guardando documentos y supervisor:', {
      documentos: this.documentos,
      supervisor: this.supervisor
    });
    // Lógica adicional para guardar
  }
}

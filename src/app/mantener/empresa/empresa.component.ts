import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';

import { MenuItem, MessageService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { Empresa } from '../../models/empresa';
import { EmpresaService } from '../../services/empresa.service';
import { ExcelService } from '../../services/excel.service';
import { RepresentanteLegalService } from '../../services/representante-legal.service';

@Component({
  selector: 'app-empresa',
  standalone: true,
  imports: [ButtonModule,ToastModule,ToolbarModule,FileUploadModule,TableModule, ButtonModule, DialogModule, RouterModule, InputTextModule,
    FormsModule, ConfirmDialogModule,SplitButtonModule,MatButtonModule,MatMenuModule,MatIconModule],
  templateUrl: './empresa.component.html',
  styleUrl: './empresa.component.css'
})
export class EmpresaComponent {
  empresas: Empresa[] = [];
  selectedEmpresas: Empresa[] = [];
  deleteEmpresaDialog: boolean = false;
  deleteEmpresasDialog: boolean = false;
  visible: boolean = false;
  empresa: Empresa = new Empresa();
  @ViewChild('fileInput') fileInput!: any;
  titulo: string = '';
  opc: string = '';
  op: number = 0;
  menuItems: MenuItem[] = [];
  selectedFile: File | null = null;

  @ViewChild('dt') dt: Table | undefined;

  constructor(
    private empresaService: EmpresaService,
    private excelService: ExcelService,
    private representanteService: RepresentanteLegalService,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.listarEmpresas();
    this.menuItems = [
      {
        label: 'Importar',
        icon: 'pi pi-file-import',
        command: () => this.uploadFile(),
      },
      {
        label: 'Exportar',
        icon: 'pi pi-upload',
        command: () => this.exportData(),
      },
    ];
  }

  listarEmpresas() {
    this.empresaService.getEmpresaList().subscribe(
      (data) => {
        this.empresas = data;
        console.log(this.empresas);
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error al cargar empresas',
          detail: error.message || 'Error al cargar las empresas',
        });
      }
    );
  }

  showDialogCreate() {
    this.titulo = 'Crear Empresa';
    this.opc = 'Guardar';
    this.op = 0;
    this.empresa = new Empresa();
    this.visible = true;
  }

  showDialogEdit(id_empresa: number) {
    this.titulo = 'Editar Empresa';
    this.opc = 'Editar';
    this.empresaService.getEmpresaById(id_empresa).subscribe(
      (data) => {
        this.empresa = { ...data };
        this.op = 1;
        this.visible = true;
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error al cargar la empresa',
          detail: error.message || 'No se pudo cargar la empresa',
        });
      }
    );
  }

  showDialogDelete(empresa: Empresa): void {
    this.empresa = { ...empresa };
    this.deleteEmpresaDialog = true;
  }

  deleteSelectedEmpresas(): void {
    this.deleteEmpresasDialog = true;
  }

  confirmDeleteSelected(): void {
    const idsToDelete = this.selectedEmpresas.map((empresa) => empresa.id_empresa);

    this.empresaService.deleteEmpresasBatch(idsToDelete).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: response.message || 'Empresas eliminadas exitosamente.',
        });
        this.listarEmpresas();
        this.selectedEmpresas = [];
        this.deleteEmpresasDialog = false;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error?.details || 'No se pudieron eliminar las empresas.',
        });
      },
    });
  }

  deleteEmpresa(id_empresa: number) {
    this.empresaService.deleteEmpresa(id_empresa).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Empresa eliminada',
        });
        this.listarEmpresas();
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar la empresa: ' + error.message,
        });
      },
    });
  }

  opcion() {
    if (this.op === 0) {
      this.addEmpresa();
    } else if (this.op === 1) {
      this.editEmpresa();
    }
  }

  addEmpresa() {
    this.empresaService.crearEmpresa(this.empresa).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Empresa Registrada',
        });
        this.listarEmpresas();
        this.visible = false;
        this.empresa = new Empresa();
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo agregar la empresa: ' + error.message,
        });
      },
    });
  }
  editEmpresa() {
    // Asegúrate de pasar 'this.empresa' como el primer parámetro (objeto Empresa)
    // y 'this.empresa.id_empresa' como el segundo parámetro (ID de tipo number)
    this.empresaService.updateEmpresa(this.empresa, this.empresa.id_empresa).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Empresa Editada Correctamente',
        });
        this.listarEmpresas();
        this.visible = false;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo editar la empresa: ' + error.message,
        });
      },
    });
  }
  

  limpiar() {
    this.titulo = '';
    this.opc = '';
    this.op = 0;
    this.empresa = new Empresa();
    this.visible = false;
  }

  confirmDelete(empresa: Empresa): void {
    if (!empresa || !empresa.id_empresa) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudo encontrar la empresa para eliminar.',
      });
      return;
    }

    this.empresaService.deleteEmpresa(empresa.id_empresa).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: `Empresa ${empresa.razon_social} eliminada exitosamente.`,
        });
        this.listarEmpresas();
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `No se pudo eliminar la empresa: ${error.message}`,
        });
      },
    });

    this.deleteEmpresaDialog = false;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  onSelectionChange(): void {
    this.cdr.detectChanges();
  }
 ////////////////////////////////////////////////////////////////
  //**IMPORTAR**//
  ///////////////
  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  showFileUploadDialog() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.xlsx';

    fileInput.addEventListener('change', (event: any) => {
      const file = event.target.files[0];
      if (file) {
        this.selectedFile = file; // Guarda el archivo en la propiedad
        this.uploadFile();       // Llama a uploadFile sin argumentos
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'No se seleccionó ningún archivo.' });
      }
    });

    fileInput.click();
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadFile(): void {
    if (!this.selectedFile) {
      this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Por favor, selecciona un archivo' });
      return;
    }

    this.excelService.uploadExcel(this.selectedFile).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Archivo importado correctamente' });
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
      }
    });
  }

  
  exportData() {
    if (this.dt) {
      this.dt.exportCSV();
    } else {
      console.error('La referencia a la tabla no está definida.');
    }
  }
}

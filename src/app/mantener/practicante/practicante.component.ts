import { Component, ViewChild } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Practicante } from '../../models/practicante';
import { Persona } from '../../models/persona';
import { PracticanteService } from '../../services/practicante.service';
import { ExcelService } from '../../services/excel.service';
import { PersonaService } from '../../services/persona.service';

@Component({
  selector: 'app-practicante',
  standalone: true,
  imports: [ButtonModule,ToastModule,ToolbarModule,FileUploadModule,TableModule, ButtonModule, DialogModule, RouterModule, InputTextModule,
    FormsModule, ConfirmDialogModule,SplitButtonModule,MatButtonModule,MatMenuModule,MatIconModule],
  templateUrl: './practicante.component.html',
  styleUrl: './practicante.component.css'
})
export class PracticanteComponent {
  practicantes: Practicante[] = [];
  personas: Persona[] = [];
  deletePracticanteDialog: boolean = false;
  visible: boolean = false;
  selectedPracticante: Practicante[] = [];
  deletePersonasDialog: boolean = false;
  @ViewChild('dt') dt: any;
  @ViewChild('fileInput') fileInput!: any;
  menuItems: MenuItem[] = [];
  items: MenuItem[] = [];
 practicante: Practicante = new Practicante();
  persona: Persona = new Persona();
  titulo: string = '';
  opc: string = '';
  op = 0;
  selectedFile: File | null = null;

  constructor(
    private practicanteService: PracticanteService,
    private excelService: ExcelService,
    private personaService: PersonaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.listarPracticantes();
    this.menuItems = [
      {
        label: 'Importar',
        icon: 'pi pi-file-import',
        command: () => this.showFileUploadDialog(),
      },
      {
        label: 'Exportar',
        icon: 'pi pi-upload',
        command: () => this.exportData(),
      },
    ];
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

  ///////////////////////////////////////////////////////////////

  listarPracticantes() {
    this.practicanteService.getPracticanteList().subscribe(
      (data) => {
        this.practicantes = data;
        console.log(this.practicantes);
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error al cargar practicantes',
          detail: error.message || 'Error al cargar los practicantes',
        });
      }
    );
  }

  listarPersonas() {
    this.personaService.getPersonas().subscribe(
      (data) => {
        this.personas = data;
        console.log(this.personas);
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error al cargar personas',
          detail: error.message || 'Error al cargar las personas',
        });
      }
    );
  }

  showDialogCreate() {
    this.prepareDialog('Crear practicante', 'Guardar', 0);
  }

  showDialogEdit(id_practicante: number) {
    this.titulo = 'Editar Practicante';
    this.opc = 'Actualizar';

    this.practicanteService.getPracticanteById(id_practicante).subscribe({
      next: (data) => {
        this.practicante = { ...data };
        this.persona = { ...this.practicante.persona };
        this.visible = true;
      },
      error: (error) => this.handleError(error, 'Error al cargar el practicante'),
    });
  }

  deleteSelectedPersonas(): void {
    this.deletePersonasDialog = true;
  }

  prepareDialog(title: string, buttonText: string, opValue: number) {
    this.titulo = title;
    this.opc = buttonText;
    this.op = opValue;
    this.practicante = new Practicante();
    this.persona = new Persona();
    this.visible = true;
  }

  opcion() {
    if (this.op === 0) {
      this.addPersonaAndPracticante();
    } else if (this.op === 1) {
      this.updatePersonaAndEstudiante();
    }
  }

  showDialogDelete(id: number): void {
    this.practicanteService.getPracticanteById(id).subscribe({
      next: (data) => {
        this.practicante = { ...data };
        this.persona = { ...this.practicante.persona };
        this.deletePracticanteDialog = true;
      },
      error: (error) => this.handleError(error, 'Error al cargar el estudiante'),
    });
  }

  deleteSelectedPracticantes(): void {
    this.deletePersonasDialog = true;
  }

  confirmDeleteSelected(): void {
    const idsToDelete = this.selectedPracticante.map(
      (practicante) => practicante.id_practicante
    );

    this.practicanteService.deletePracticanteBatch(idsToDelete).subscribe({
      next: (response) => {
        console.log('Respuesta del backend:', response);
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: response.message || 'Practicantes eliminados exitosamente.',
        });
        this.listarPracticantes();
        this.selectedPracticante = [];
        this.deletePracticanteDialog = false;
      },
      error: (error) => {
        console.error('Error al eliminar practicante:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail:
            error.error?.details ||
            'No se pudieron eliminar los practicante. Revisa los detalles del error.',
        });
      },
    });
  }

  deletePracticante(id_practicante: number) {
    this.practicanteService.deletePracticante(id_practicante).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Practicante Eliminado',
        });
        this.listarPracticantes();
      },
      error: (error) =>
        this.handleError(error, 'No se pudo eliminar el practicante'),
    });
  }

  addPersonaAndPracticante() {
    if (this.isValid()) {
      this.personaService.createPersona(this.persona).subscribe({
        next: (persona) => {
          this.practicante.persona = persona;
          this.createPracticante();
        },
        error: (error) => this.handleError(error, 'No se pudo agregar la persona'),
      });
    }
  }

  updatePersonaAndEstudiante() {
    if (this.isValid()) {
      this.personaService.updatePersona(this.persona, this.persona.id_persona).subscribe({
        next: (updatedPersona) => {
          this.practicante.persona = updatedPersona;
          this.updatePracticante();
        },
        error: (error) =>
          this.handleError(error, 'No se pudo actualizar la persona'),
      });
    }
  }

  createPracticante() {
    this.practicanteService.crearPracticante(this.practicante).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Practicante Registrado',
        });
        this.listarPracticantes();
        this.closeDialog();
      },
      error: (error) => this.handleError(error, 'No se pudo agregar el practicante'),
    });
  }

  updatePracticante() {
    this.practicanteService.editarPracticante(this.practicante, this.practicante.id_practicante).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Practicante Actualizado',
        });
        this.listarPracticantes();
        this.closeDialog();
      },
      error: (error) => {
        console.error('Error updating practicante:', error); // Para depurar en consola
        this.handleError(error, 'No se pudo actualizar el practicante');
      }
    }
      );
  }
  isValid(): boolean {
    if (
      !this.persona.nombre ||
      !this.persona.apellido ||
      !this.persona.dni ||
      !this.persona.email ||
      !this.persona.telefono ||
      !this.persona.pais || // Validación del campo nuevo
      !this.persona.religion || // Validación del campo nuevo
      !this.persona.estado ||
      !this.persona.codigo ||
      !this.practicante.ciclo || // Validación para nuevo campo
      !this.practicante.grupo || // Validación para nuevo campo
      !this.practicante.correo_institucional ||// Validación para nuevo campo
      !this.practicante.horas_acumuladas ||
      !this.practicante.horas_ps ||
      !this.practicante.plancarrera
    ) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Todos los campos son obligatorios',
      });
      return false;
    }
    return true;
  }

  closeDialog() {
    this.visible = false;
    this.practicante = new Practicante();
    this.persona = new Persona();
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  handleError(error: any, defaultMessage: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: error.message || defaultMessage,
    });
  }

  exportData() {
    if (this.dt) {
      this.dt.exportCSV();
    } else {
      console.error('La referencia a la tabla no está definida.');
    }
  }
  onSelectionChange(): void {
    this.cdr.detectChanges();
  }
  confirmDelete(practicante: Practicante): void {
    if (!practicante || !practicante.id_practicante) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudo encontrar el practicante para eliminar.',
      });
      return;
    }
  }
  limpiar() {
    this.titulo = '';
    this.opc = '';
    this.op = 0;
    this.practicante = new Practicante();
    this.visible = false;
  }
}

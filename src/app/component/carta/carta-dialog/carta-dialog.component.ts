import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-carta-dialog',
  standalone: true,
  imports: [DialogModule, ButtonModule],
  templateUrl: './carta-dialog.component.html',
  styleUrl: './carta-dialog.component.css'
})
export class CartaDialogComponent {
  displayCartaDialog: boolean = false;

  practicante = {
    nombre: 'Justin Septimus',
    dni: '12345678',
    codigo: '202367458',
    correo: 'example@email.com'
  };

  empresa = {
    nombre: 'Justin Septimus',
    ruc: '20100123456',
    representante: 'John Doe',
    correo: 'empresa@email.com',
    direccion: 'Av. Principal 123'
  };

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      console.log('Archivo seleccionado:', file.name);
      // Lógica para manejar el archivo
    }
  }

  uploadFile() {
    const fileInput = document.querySelector('#fileInput') as HTMLElement;
    fileInput?.click();
  }

  saveAndSubmit() {
    console.log('Guardar y enviar la carta');
    // Lógica para guardar los datos y enviar
  }
}

import { Routes } from '@angular/router';

import { ConfigComponent } from './config/config.component';
import { LoginComponent } from './AUTH/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ListarPracticaComponent } from './component/listar-practica/listar-practica.component';
import { PracticaComponent } from './component/practica/practica.component';
import { CartaComponent } from './component/carta/carta.component';
import { DocumentosComponent } from './component/documentos/documentos.component';
import { ValidarDocumentosComponent } from './component/validar-documentos/validar-documentos.component';
import { AuthGuard } from './services/auth.guard';
import { LayoutComponent } from './layout/layout.component';
import { EmpresaComponent } from './mantener/empresa/empresa.component';
import { PracticanteComponent } from './mantener/practicante/practicante.component';

export const routes: Routes = [
  // Ruta de redirección a login si no se está autenticado
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  // Ruta para login
  {
    path: 'login',
    component: LoginComponent
  },
  // Ruta principal protegida con guardia de autenticación
  {
    path: 'layout',
    component: LayoutComponent,
     // Protegida por AuthGuard
    children: [
      // Ruta principal dentro del layout
      {
        path: 'dashboard',
        component: DashboardComponent,
      
      },
      // Rutas protegidas para las secciones
      {
        path: 'practica',
        component: ListarPracticaComponent,
     
      },
      {
        path: 'validar',
        component: PracticaComponent,
      
      },
      {
        path: 'empresa',
        component: EmpresaComponent,
      
      },
      {
        path: 'practicante',
        component: PracticanteComponent,
      
      },
      {
        path: 'carta',
        component: CartaComponent,
      
      },
      {
        path: 'documentos',
        component: DocumentosComponent,
    
      },
      {
        path: 'validardoc',
        component: ValidarDocumentosComponent,
        },
  
      {
        path: 'configuracion',
        component: ConfigComponent,
    
      },
    ]
  },
  // Ruta comodín para redirigir a login si la ruta no existe
  {
    path: '**',
    redirectTo: 'login'
  }
];

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'deers/:id',
    loadChildren: () => import('./deers/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'd_logs/:id',
    loadChildren: () => import('./d_logs/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'adddeer/:id',
    loadChildren: () => import('./adddeer/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./deers/folder.module').then( m => m.FolderPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForumModule } from './pages/forum/forum.module';

const routes: Routes = [
    {
        path: 'forum',
        loadChildren: (): Promise<ForumModule> =>
            import('./pages/forum/forum.module').then(m => m.ForumModule),
    },
    {
        path: '',
        redirectTo: 'forum',
        pathMatch: 'full',
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

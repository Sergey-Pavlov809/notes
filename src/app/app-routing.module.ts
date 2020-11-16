import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainerComponent } from './sections/container/container.component';

const routes: Routes = [{
        path: 'home/:lang',
        component: ContainerComponent
    },{
        path: '**',
        component: ContainerComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ClientPendingCollectionListComponent } from './client-pending-collection-list/client-pending-collection-list.component'
import { CollectionFormComponent } from './collection-form/collection-form.component'

const routes: Routes = [
	{ path: '', component: ClientPendingCollectionListComponent },
	{ path: 'cobro-form', component: CollectionFormComponent },
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class CobroRoutingModule {}

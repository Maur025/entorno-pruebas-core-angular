import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ClientPendingCollectionListComponent } from './client-pending-collection-list/client-pending-collection-list.component'

const routes: Routes = [
	{ path: '', component: ClientPendingCollectionListComponent },
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class CobroRoutingModule {}

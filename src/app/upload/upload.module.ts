import {NgModule} from '@angular/core';
import {UploadComponent} from './upload.component';
import {SharedModule} from 'shared/shared.module';
import {RouterModule} from '@angular/router';
import {AuthGuardService} from '../auth/auth-guard.service';

@NgModule({
	declarations: [UploadComponent],
	imports: [
		SharedModule,
		RouterModule.forChild([{path: '', component: UploadComponent, canActivate: [AuthGuardService]}])
	]
})
export class UploadModule {}

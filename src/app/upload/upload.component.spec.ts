import {ComponentFixture, TestBed} from '@angular/core/testing';
import {UploadComponent} from './upload.component';
import {ObliqueTestingModule} from '@oblique/oblique';

describe('UploadComponent', () => {
	let component: UploadComponent;
	let fixture: ComponentFixture<UploadComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ObliqueTestingModule],
			declarations: [UploadComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(UploadComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

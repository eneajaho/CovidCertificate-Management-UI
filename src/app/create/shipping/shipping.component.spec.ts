import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ShippingComponent} from './shipping.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ObliqueTestingModule} from '@oblique/oblique';

describe('ShippingComponent', () => {
	let component: ShippingComponent;
	let fixture: ComponentFixture<ShippingComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ObliqueTestingModule, ReactiveFormsModule],
			declarations: [ShippingComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ShippingComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('Handling of goBack()', () => {
		it('should emit back', () => {
			const backSpy = jest.spyOn(component.back, 'emit');

			component.goBack();

			expect(backSpy).toHaveBeenCalledTimes(1);
		});
	});

	describe('Handling of goNext()', () => {
		it('should emit back', () => {
			const nextSpy = jest.spyOn(component.next, 'emit');

			component.goNext();

			expect(nextSpy).toHaveBeenCalledTimes(1);
		});
	});
});

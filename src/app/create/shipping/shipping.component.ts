import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {CreationDataService} from '../utils/creation-data.service';

@Component({
	selector: 'ec-shipping',
	templateUrl: './shipping.component.html',
	styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit {
	@Output() back = new EventEmitter<void>();
	@Output() next = new EventEmitter<void>();

	@ViewChild('formDirective') formDirective: FormGroupDirective;

	shippingForm: FormGroup;

	constructor(private readonly formBuilder: FormBuilder, private readonly dataService: CreationDataService) {}

	ngOnInit(): void {
		this.createForm();
		this.dataService.resetCalled.subscribe(() => {
			this.resetForm();
		});
		this.dataService.certificateTypeChanged.subscribe(() => {
			this.resetForm();
		});
	}

	goBack(): void {
		this.back.emit();
	}

	goNext(): void {
		if (this.shippingForm.valid) {
			this.next.emit();
		}
	}

	private createForm(): void {
		this.shippingForm = this.formBuilder.group({
			appDeliverySelected: [false, Validators.required],
			appDeliveryCode: ['', [Validators.required, Validators.maxLength(9), Validators.minLength(9)]]
		});

		this.shippingForm.get('appDeliverySelected').valueChanges.subscribe(newValue => {
			if (newValue) {
				this.shippingForm.get('appDeliveryCode').enable();
			} else {
				this.shippingForm.get('appDeliveryCode').setValue('');
				this.shippingForm.get('appDeliveryCode').disable();
			}
		});
	}

	private resetForm(): void {
		this.formDirective.resetForm();
		this.shippingForm.reset({
			appDeliverySelected: false
		});
	}
}

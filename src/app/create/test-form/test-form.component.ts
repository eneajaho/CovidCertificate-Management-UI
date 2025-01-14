import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {ValueSetsService} from '../utils/value-sets.service';
import {TranslateService} from '@ngx-translate/core';
import {Patient, ProductInfo, ProductInfoWithGroup} from 'shared/model';
import {DateValidators} from '../utils/date-validators';
import {CreationDataService} from '../utils/creation-data.service';
import {DateMapper} from '../utils/date-mapper';

@Component({
	selector: 'ec-test-form',
	templateUrl: './test-form.component.html'
})
export class TestFormComponent implements OnInit {
	@Output() back = new EventEmitter<void>();
	@Output() next = new EventEmitter<void>();

	@ViewChild('formDirective') formDirective: FormGroupDirective;

	testForm: FormGroup;

	private readonly PCR_TEST_CODE: string = 'LP6464-4';

	constructor(
		private readonly formBuilder: FormBuilder,
		private readonly valueSetsService: ValueSetsService,
		private readonly translateService: TranslateService,
		private readonly dataService: CreationDataService
	) {}

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
		if (this.testForm.valid) {
			this.dataService.setNewPatient(this.mapFormToPatientData());
			this.next.emit();
		}
	}

	getCertificateLanguages(): ProductInfo[] {
		return this.valueSetsService.getCertificateLanguages();
	}

	getCountriesOfTest(): ProductInfo[] {
		return this.valueSetsService.getCountryOptions();
	}

	getTypesOfTest(): ProductInfo[] {
		return this.valueSetsService.getTypeOfTests();
	}

	getManufacturerOfTest(): ProductInfoWithGroup[] {
		return this.valueSetsService.getManufacturerOfTest();
	}

	private createForm(): void {
		this.testForm = this.formBuilder.group({
			firstName: ['', [Validators.required, Validators.maxLength(50)]],
			surName: ['', [Validators.required, Validators.maxLength(50)]],
			birthdate: [
				'',
				[Validators.required, DateValidators.dateLessThanToday(), DateValidators.dateMoreThanMinDate()]
			],
			certificateLanguage: [this.getDefaultCertificateLanguage(), Validators.required],
			typeOfTest: ['', Validators.required],
			manufacturer: ['', Validators.required],
			sampleDate: ['', [Validators.required, DateValidators.dateTimeLessThanToday()]],
			center: ['', [Validators.required, Validators.maxLength(50)]],
			countryOfTest: [this.getDefaultCountryOfTest(), Validators.required]
		});

		this.testForm.get('typeOfTest').valueChanges.subscribe(newValue => {
			if (newValue?.code === this.PCR_TEST_CODE) {
				this.testForm.get('manufacturer').setValue('');
				this.testForm.get('manufacturer').disable();
			} else {
				this.testForm.get('manufacturer').enable();
			}
		});
	}

	private getDefaultCertificateLanguage(): ProductInfo {
		return this.translateService.currentLang === 'en'
			? this.getCertificateLanguages().find(lang => lang.code === 'de')
			: this.getCertificateLanguages().find(lang => lang.code === this.translateService.currentLang);
	}

	private getDefaultCountryOfTest(): ProductInfo {
		return this.getCountriesOfTest().find(countryCode => countryCode.code === 'CH');
	}

	private mapFormToPatientData(): Patient {
		return {
			firstName: this.testForm.value.firstName,
			surName: this.testForm.value.surName,
			birthdate: DateMapper.getDate(this.testForm.value.birthdate),
			language: this.testForm.value.certificateLanguage.code,
			test: {
				center: this.testForm.value.center,
				countryOfTest: this.testForm.value.countryOfTest,
				manufacturer: this.testForm.value.manufacturer,
				sampleDate: DateMapper.getDate(this.testForm.value.sampleDate),
				typeOfTest: this.testForm.value.typeOfTest
			}
		};
	}

	private resetForm(): void {
		this.formDirective.resetForm();
		this.testForm.reset({
			certificateLanguage: this.getDefaultCertificateLanguage(),
			countryOfTest: this.getDefaultCountryOfTest()
		});
	}
}

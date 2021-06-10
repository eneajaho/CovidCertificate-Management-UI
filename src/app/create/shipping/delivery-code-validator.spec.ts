import {FormControl} from '@angular/forms';
import {DeliveryCodeValidatorValidators} from './delivery-code-validator';

describe('DeliveryCodeValidatorValidators', () => {
	const control = new FormControl('input');

	// TODO CSA FIX AND EXTEND TESTS
	describe('validateAppDeliveryCode', () => {
		it('should validate null value correctly', () => {
			control.setValue(null);
			const test = DeliveryCodeValidatorValidators.validateAppDeliveryCode();
			expect(test(control)).toBe('adasdasd');
		});
	});
});

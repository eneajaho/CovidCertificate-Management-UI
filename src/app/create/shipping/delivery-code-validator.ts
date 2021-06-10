import {AbstractControl} from '@angular/forms';

export class DeliveryCodeValidatorValidators {
	private static readonly codePoints: string = '0123456789ABCDEFHKMNPRSTUWYZ';

	// TODO CSA CLEAN UP
	// static validateAppDeliveryCode: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
	static validateAppDeliveryCode() {
		return (control: AbstractControl): {[key: string]: boolean} | null => {
			const appDeliveryCode: string = control?.value;

			if (!appDeliveryCode) {
				return {invalidAppDeliveryCode: true};
			}

			let factor = 1;
			let sum = 0;
			const n = DeliveryCodeValidatorValidators.numberOfValidInputCharacters();

			for (let i = appDeliveryCode.length - 1; i >= 0; i--) {
				const codePoint = DeliveryCodeValidatorValidators.codePointFromCharacter(appDeliveryCode.charAt(i));
				let addend = factor * codePoint;

				factor = factor === 2 ? 1 : 2;

				addend = Math.floor(addend / n) + (addend % n);
				sum += addend;
			}
			const remainder = sum % n;

			if (remainder === 0) {
				return {invalidAppDeliveryCode: true};
			}

			return null;
		};
	}

	private static numberOfValidInputCharacters() {
		return DeliveryCodeValidatorValidators.codePoints.length;
	}

	private static codePointFromCharacter(character) {
		return DeliveryCodeValidatorValidators.codePoints.indexOf(character);
	}
}

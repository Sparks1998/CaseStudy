import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'eventDate', async: false })
export class CustomDateValidator implements ValidatorConstraintInterface {
  validate(
    value: string,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> | boolean {
    if (!value) {
      return false;
    }

    const date = new Date(value);
    return !isNaN(date.getTime());
  }

  defaultMessage?(validationArguments?: ValidationArguments): string {
    return 'Event Date must be a valid date';
  }
}

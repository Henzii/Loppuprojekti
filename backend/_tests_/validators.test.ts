import { validString, validInt } from '../utils/validators';
describe('Validators', () => {
  test('validString validates', () => {
    expect(validString('This is as valid string')).toBeTruthy();
    expect(validString(123)).toBeFalsy();
    expect(validString('')).toBeFalsy();
    expect(validString('', true)).toBeTruthy();
  });

  test('validInt validates', () => {
    expect(validInt(123)).toBeTruthy();
    expect(validInt('Im a string yo!')).toBeFalsy();

    //Range test
    expect(validInt(50, { min: 1, max: 100 })).toBeTruthy();
    expect(validInt(100, { min: 10, max: 20 })).toBeFalsy();
    expect(validInt(90, { min: 100, max: 200 })).toBeFalsy();
  });
})

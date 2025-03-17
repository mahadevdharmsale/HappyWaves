

export default class Validation {

  static validateEmail(email: string) {
    return !!String(email).toLowerCase().match(/^[a-zA-Z]+[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
  }

  static validateString(string: string) {
    const regex = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
    return regex.test(string);
  }

  static validateStringWithDigits(string: string) {
    const regex = /^[A-Za-z0-9]+(?:[-+\s][A-Za-z0-9]+)*$/;
    return regex.test(string);
  }

  static validateIFSC(ifsc: string) {
    return !!String(ifsc).toLowerCase().match(/^[A-Za-z]{4}\d{7}$/);
  }

  static validateVehRegNo(regNo: string) {
    return !!String(regNo).match(/^[A-Za-z]{2}[0-9]{2}[A-Za-z]{0,2}[0-9]{4}$/);
  }

  static validateChassis(chassis: string) {
    return !!String(chassis).match(/^[A-Za-z]{2}[A-Za-z0-9]{10}[0-9]{5}$/);
  }
  static validatePolicyNo(policyNo: string) {
    return !!String(policyNo).match(/^(?=.*\d)[A-Za-z0-9\-/]+$/);
  }

  static validateNumber(number: string) {
    const regex = /^[0-9]+$/
    return regex.test(number);
  }
}

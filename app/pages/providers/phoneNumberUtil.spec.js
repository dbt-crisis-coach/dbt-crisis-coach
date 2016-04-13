import * as PhoneNumberUtil from './phoneNumberUtil'

describe("Comparing a phone number", () => {
  it("should be equal to number with '+'", () => {

    const number1 = '+272345678'
    const number2 = '0272345678'

    const result = PhoneNumberUtil.compare(number1, number2)
    expect(result).toBe(true);
  })
  
  it('should be equal to number with spaces', () => {
    
  })
  
  it('should be equal to number with parentheses', () => {
    
  })
})
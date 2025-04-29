import { it, expect, describe } from 'vitest'
import { getCoupons, max } from "../src/intro"; 
import { calculateDiscount } from "../src/core"
import { validateUserInput } from '../src/core';
import { isPriceInRange } from '../src/core';
import { isValidUsername } from '../src/core';
import { canDrive } from '../src/core';

describe('test suit', () => {
    it('test case', () => {
        const result = { name: 'Victorine' };
        expect(result).toEqual({ name: 'Victorine'  })
    })
})


describe('getCoupons', ()  => {

    it('should return an array of coupons'), () => {
        const coupons = getCoupons();
        expect(Array.isArray(coupons)).toBe(true);
    }

    it('should return and array with discount of type number'), () => {
        const coupons = getCoupons();
        expect(typeof coupons.discount).toBe('number');
    }

    it('should return an array with a length greater than 0'), () => {
        const coupons = getCoupons();
        coupons.forEach(coupon => {
            expect(coupon).toHaveProperty('code');
            expect(typeof coupon.code).toBe('string');
            expect(coupon.code).toBeTruthy();
        });
    }

    it('should return an array with valid discount'), () => {
        const coupons = getCoupons();
        coupons.forEach(coupon => {
            expect(coupon).toHaveProperty('discount');
            expect(typeof coupon.discount).toBe('number');
            expect(coupon.discount).toBeGreaterThan(0);
            expect(coupon.discount).toBeLessThanOrEqual(1);
        });
    }

     
})

describe('calculateDiscount', () => {
    it('Should return discounted price if given valid code', () => {
        expect(calculateDiscount( 10, 'SAVE10')).toBe(9);
    })

    it(' Should handle non-numeric price', () => {
        expect(calculateDiscount('10', 'SAVE10')).toMatch(/invalid/i)
    })

    it(' Should handle negative price', () => {
        expect(calculateDiscount('-10', 'SAVE10')).toMatch(/invalid/i)
    })

    it(' Should handle none-string discount code', () => {
        expect(calculateDiscount(10, 10)).toMatch(/invalid/i)
    })

    it(' Should handle invalid discount code', () => {
        expect(calculateDiscount(10, 'INVALID')).toBe(10)
    })
})

describe('validateUserInput', () => {
    it('should retuen success if given valid input', () => {
        expect(validateUserInput('vicky', 21)).toMatch(/success/i)
    })

    it('should return an error if user name is not a string', () => {
        expect(validateUserInput(2, 25)).toMatch(/invalid/i)
    })

    it('should return an error if user name is less than three characters  ', () => {
        expect(validateUserInput('vi', 21)).toMatch(/invalid/i)
    })
    it('should return an error if user name is longer than 255 characters  ', () => {
        expect(validateUserInput('A'.repeat(256), 21)).toMatch(/invalid/i)
    })
    it('should return an error if age is not a number', () => {
        expect(validateUserInput('vicky', "21")).toMatch(/invalid/i)
    })
    it('should return an error if age is less than 18', () => {
        expect(validateUserInput('vicky', 17)).toMatch(/invalid/i)
    })
    it('should return an error if age is greater than 100', () => {
        expect(validateUserInput('vicky', 101)).toMatch(/invalid/i)
    })
    it('should return an error if oth username and age are ivalid', () => {
        expect(validateUserInput('', 0)).toMatch(/invalid username/i)
        expect(validateUserInput('', 0)).toMatch(/invalid age/i)
    })
})

describe('isPriceInRange', () => {
    it('should return false if price is out of the range', () => {
        expect(isPriceInRange(-10, 0, 100)).toBe(false);
        expect(isPriceInRange(200, 0, 100)).toBe(false);
    })
    it('should return true if price is equal to the min or to the max', () => {
        expect(isPriceInRange(0, 0, 100)).toBe(true);
        expect(isPriceInRange(100, 0, 100)).toBe(true);
    })
    it('should return true if price is within the range', () => {
        expect(isPriceInRange(50, 0, 100)).toBe(true);
    })
})

describe('isValidUsername', () => {
    const minLength = 5;
    const maxLength = 15;
    it('should return true if username is too short', () => {
        expect(isValidUsername('a'.repeat(minLength-1))).toBe(false);
    })
    it('should return true if username is too long', () => {
        expect(isValidUsername('a'.repeat(maxLength+1))).toBe(false);
    })
    it('should return true if username is at the min or max length', () => {
        expect(isValidUsername('a'.repeat(minLength))).toBe(true);
        expect(isValidUsername('a'.repeat(maxLength))).toBe(true);
    })
    it('should return false for invalid input types', () => {
        expect(isValidUsername(null)).toBe(false);
        expect(isValidUsername(undefined)).toBe(false);
        expect(isValidUsername(1)).toBe(false);
    })
    
}) 

describe('canDrive', () => {
    it('should return error for inavlid country code', () => {
        expect(canDrive(20, 'FR')).toMatch(/invalid/i)
    });

    it('should return error for under age in the US', () => {
        expect(canDrive(15, 'US')).toBe(false)
    });

    it('should return true for min age in the US', () => {
        expect(canDrive(16, 'US')).toBe(true)
    });

    it('should return true for eligible in the US', () => {
        expect(canDrive(17, 'US')).toBe(true)
    });

    it('should return error for under age in the UK', () => {
        expect(canDrive(16, 'US')).toBe(false)
    });
    it('should return true for min age in the US', () => {
        expect(canDrive(16, 'US')).toBe(true)
    });
    it('should return true for eligible in the US', () => {
        expect(canDrive(17, 'US')).toBe(true)
    });
})
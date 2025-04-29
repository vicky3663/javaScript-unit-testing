import {vi, it, expect, describe} from 'vitest';

describe('test suite', () => {
    it('test case', () => {
        const sendText = vi.fn()
        sendText.mockReturnValue('ok');

        //call the mock function
        const result = sendText('message');
        //Assert that the mock function is called
        expect(sendText).toHaveBeenCalledWith('message');

        //Assert that the result is 'ok'
        expect(result).toBe('ok');
    });
});
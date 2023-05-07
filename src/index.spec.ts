import Person from '.';

describe('teste operacoes aritmeticas', () => {
  test('testa soma', () => {
    const person = new Person();
    expect(1 + 2).toBe(3);
    expect(person.sayName()).toBe('Skinner');
  });
});

import Person from '@/index';

describe('teste operacoes aritmeticas', () => {
  test('testa soma', () => {
    expect(1 + 2).toBe(3);
  });
});

describe('teste operacoes Pessoa', () => {
  test('testa Pessoa', () => {
    const person = new Person();
    expect(person.sayName()).toBe('Skinner');
  });
});

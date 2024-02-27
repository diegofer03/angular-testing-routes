import { Person } from "./person.model";

describe('Test for person', () => {
  let person : Person

  beforeEach(() => {
    person = new Person('diego', 'efe', 32, 85, 178)
  })

  it('should set atributes', () => {
    expect(person.name).toEqual('diego')
    expect(person.age).toEqual(32)
    expect(person.lastName).toEqual('efe')
    expect(person.heigth).toEqual(178)
    expect(person.weigth).toEqual(85)
  })

  describe('test for calcIMC', () => {
    it('should return a string: overweigth level 2', () => {
      // Arrange
      person.weigth = 120;
      person.heigth = 1.78;
      // Act
      const rta = person.calcIMC();
      // Assert
      expect(rta).toEqual('overweigth level 2');
    });

    it('should return a string: not found', () => {
      // Arrange
      person.weigth = -10;
      person.heigth = 1.78;
      // Act
      const rta = person.calcIMC();
      // Assert
      expect(rta).toEqual('not found');
    });

    it('should return a string: down', () => {
      // Arrange
      person.weigth = 40;
      person.heigth = 1.78;
      // Act
      const rta = person.calcIMC();
      // Assert
      expect(rta).toEqual('down');
    });

    it('should return a string: normal', () => {
      // Arrange
      person.weigth = 70;
      person.heigth = 1.78;
      // Act
      const rta = person.calcIMC();
      // Assert
      expect(rta).toEqual('normal');
    });

    it('should return a string: overweigth', () => {
      // Arrange
      person.weigth = 80;
      person.heigth = 1.78;
      // Act
      const rta = person.calcIMC();
      // Assert
      expect(rta).toEqual('overweigth');
    });

    it('should return a string: overweigth level 1', () => {
      // Arrange
      person.weigth = 90;
      person.heigth = 1.78;
      // Act
      const rta = person.calcIMC();
      // Assert
      expect(rta).toEqual('overweigth level 1');
    });

    it('should return a string: overweigth level 3', () => {
      // Arrange
      person.weigth = 150;
      person.heigth = 1.78;
      // Act
      const rta = person.calcIMC();
      // Assert
      expect(rta).toEqual('overweigth level 3');
    });
  });
})

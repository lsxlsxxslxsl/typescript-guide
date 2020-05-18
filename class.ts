class Animal {
  public name;
  protected constructor (name) {
      this.name = name;
}
}
class Cat extends Animal {
  constructor (name) {
      super(name);
  }
}

let a = new Cat('Jack');

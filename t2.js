function People(name,age){
  this.name = name;
  this.age = name;
  this.sayName = () => console.log(this.name);
}

const getPeople = (name,age) => {
  return new People(name,age);
};

getPeople('hutao',35).sayName();

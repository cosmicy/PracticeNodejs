var age = 29;
function sayAge(){
    alert(this.age);
}
alert(window.age);
sayAge();
window.sayAge();
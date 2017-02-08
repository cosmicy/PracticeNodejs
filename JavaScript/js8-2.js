var age = 29;
window.color = "red";
delete window.age; //false
delete window.color; //return true

alert(window.age); //29
alert(window.color); //undefine

var newValue = oldValue; //error
var newValue2 = window.oldValue; //no error
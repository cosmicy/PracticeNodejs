function cy() {
	//alert("fewfe");
	var
	body = document.getElementById('body'),
	list = document.createElement('div'),
	step1 = document.createElement('div'),
	step2 = document.createElement('div');
	
	list.id = 'impress';

	body.appendChild(list);

	step1.setAttribute('class', 'step');
	step1.setAttribute('data-x', '0');
	step1.setAttribute('data-y', '0');

	step1.innerText = 'Haskell1';
	list.appendChild(step1);

	step2.setAttribute('class', 'step');
	step2.setAttribute('data-x', '1000');
	step2.setAttribute('data-y', '800');
	step2.innerText = 'Haskell2';
	list.appendChild(step2);

	impress().init();
}

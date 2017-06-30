function cy() {
	//alert("fewfe");
	var
	body = document.getElementById('body'),
	list = document.createElement('div'),
	step1 = document.createElement('div'),
	step2 = document.createElement('div'),

	img1 = document.createElement('img'),
	img2 = document.createElement('img');

	
	list.id = 'impress';

	body.appendChild(list);

	//第一个step
	step1.setAttribute('class', 'step');
	step1.setAttribute('data-x', '0');
	step1.setAttribute('data-y', '0');

	step1.innerText = 'Haskell1';
	list.appendChild(step1);

	//第二个step
	step2.setAttribute('class', 'step');
	step2.setAttribute('data-x', '1000');
	step2.setAttribute('data-y', '800');
	
	//图片居中div
	var div = document.createElement('div');
	div.setAttribute('align', 'center');

	//图片src
	img2.setAttribute('src', 'img/temp_ppt/temp_ppt_1.jpg');
	div.appendChild(img2);
	step2.appendChild(div)

	//step2.innerText = 'Haskell2';
	list.appendChild(step2);

	impress().init();
}

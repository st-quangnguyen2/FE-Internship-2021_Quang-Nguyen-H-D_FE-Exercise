var inp = document.createElement('input');
var attrInp = document.createAttribute('placeholder');
attrInp.value = 'nhập năm sinh';
inp.setAttributeNode(attrInp);

var btn = document.createElement('button');
var textBtn = document.createTextNode("Tính tuổi");
btn.appendChild(textBtn);
btn.addEventListener('click', function () {
  p.innerHTML = 'Tuổi của bạn là: ' + (new Date().getFullYear() - +inp.value);
})

var p = document.createElement('p');

document.body.appendChild(inp);
document.body.appendChild(btn);
document.body.appendChild(p);

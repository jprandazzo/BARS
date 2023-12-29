console.log('test1');

window.addEventListener('DOMContentLoaded', () => {
  console.log('loaded');
  
  const child = document.createElement('p');
  const text = document.createTextNode('hello children');
  child.appendChild(text);
  
  document.querySelector('h1').appendChild(child)
});



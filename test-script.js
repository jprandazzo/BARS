<script>
  let child = document.createElement('p');
  const text = document.createTextNode('hello children');
  child.appendChild(text);

  document.querySelector('h1').appendChild(child)
</script>

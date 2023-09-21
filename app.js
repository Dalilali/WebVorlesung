async function chco() {
  const res = await fetch('https://dummyjson.com/products/categories');
  const data = await res.json();
  document.getElementById('panelsStayOpen-collapseOne').innerHTML = JSON.stringify(data);
  return result_1;
}
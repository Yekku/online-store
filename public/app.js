document.querySelectorAll('.price').forEach(node => {
  node.textContent = new Intl.NumberFormat('eur-EUR', {
    currency: 'eur',
    style: 'currency'
  }).format(node.textContent)
})
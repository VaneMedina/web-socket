const socketProduct = {}
socketProduct.socket = io()
// socketProduct.socket.on("product", renderProduct)

const titleInput = document.getElementById("title-input")
const priceInput = document.getElementById("price-input")
const thumbnailInput = document.getElementById("thumbnail")
const table = document.getElementById("table")
const form = document.getElementById("form")
const sendProduct = document.getElementById("send-product-btn")
titleInput.value = ""
priceInput.value = ""
thumbnailInput.value = ""

socketProduct.socket.on("newUser", ()=>{
  renderProduct()
})
form.addEventListener("submit", async (e) =>{
    e.preventDefault()
    const formData = new FormData(form)
    renderTitle(formData)
    renderPrice(formData)
    renderFile(formData)
    console.log(form)
    await fetch(`${form.baseURI}`, {
      method: 'POST',
      body: formData
  })
  socketProduct.socket.emit('reload', null)
  })


//renderizar productos
function renderProduct(){
  fetch('/static/database/products.json')
        .then((res) => {
            return res.json()
        })
        .then((data) => {
          data.forEach(producto => {
              table.innerHTML += `
              <tbody>
                  <tr>
                      <td>${producto.title}</td>
                      <td>${producto.price}</td>
                      <td>${producto.thumbnail}</td>
                  </tr>
              </tbody>`
          })
        })
      
  }


  socketProduct.socket.on("refresh", () =>{
    clearInput()
    renderProduct()
  })

  function clearInput(){
    table.innerHTML = ""
  }













  function renderTitle(formData){
    const title = formData.get('title')
    titleInput.textContent = title
  }
  function renderPrice(formData){
    const price = formData.get('price')
    priceInput.textContent = price
  }
  function renderFile(formData) {
    const fileFd = formData.get('thumbnail')

    thumbnailInput.textContent = fileFd
}
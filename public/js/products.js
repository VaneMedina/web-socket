const socketProduct = {}
socketProduct.socket = io()
socketProduct.socket.on("product", renderProduct)

const titleInput = document.getElementById("title-input")
const priceInput = document.getElementById("price-input")
const table = document.getElementById("table")
const form = document.getElementById("form")
const sendProduct = document.getElementById("send-product-btn")
titleInput.value = ""
priceInput.value = ""


form.addEventListener("submit", (e) =>{
    e.preventDefault()
    const formData = new FormData(form)
    renderTitle(formData)
    renderPrice(formData)
    const product = {
      title : titleInput.value,
      price : priceInput.value
    }
    socketProduct.socket.emit("product", product)
    renderProduct(product)
  })

  function renderTitle(formData){
    const title = formData.get('title')
    titleInput.textContent = title
  }
  function renderPrice(formData){
    const price = formData.get('price')
    priceInput.textContent = price
  }


//renderizar productos
function renderProduct(data){
    table.innerHTML += `
    <tbody>
        <tr>
            <td>${data.title}</td>
            <td>${data.price}</td>
            <td>URL DE LA IMAGEN</td>
        </tr>
    </tbody>`
  }
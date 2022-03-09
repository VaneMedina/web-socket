const modalEl = document.getElementById("modal-full")
const inputNameEl = document.getElementById("input-name")
const inputUser = document.getElementById("input-user")
const chatContainerEl = document.getElementById("chat-container")
const messageInput = document.getElementById("message-input")
const userList = document.getElementById("user-list")
const sendBtn = document.getElementById("send-btn")
const msgPool = document.getElementById("message-pool")
const buttonChat = document.getElementById("chat")
const validateText = document.getElementById("validate-text")
sendBtn.disabled = true
const user = {}
const users = []


inputNameEl.value = ""
    //Inicio socket
    user.socket = io()
    //se envia nombre de usuario
    user.socket.emit("I am", user.name)
 
    user.socket.on("users", renderUser)

    user.socket.on("message", render)


inputNameEl.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
      e.preventDefault();
      if (!e.target.value) {
        return
      }
      validarEmail(e.target.value)
      user.name = e.target.value
      
    }
})

function validate(validacion){
  const textSuccess = "Email correcto. Puedes unirte al chat."
  const textDanger = "Ingrese un email correcto. Vuelva a intentar."
  const classCss =  validacion == true ? "green-text" : "red-text"
  validateText.innerHTML = `
    <p class="${classCss}">
      ${validacion == true ? textSuccess : textDanger}
    </p>
  `
  if (validacion){
    inputNameEl.classList.toggle("border-green")
    inputNameEl.classList.remove("border-red")
  }else{
    inputNameEl.classList.toggle("border-red")
    inputNameEl.classList.remove("border-green")
  }
  inputUser.appendChild(validateText)
}


function validarEmail( email ) {
    let regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if(regex.test(email)){
      validarInput()
      validate(regex.test(email))
      inputNameEl.disabled = true
    }else{
      validate(regex.test(email))
    }
    

}

function validarInput(){
  if (inputNameEl.value !== ""){
    sendBtn.disabled = false
  }
}

sendBtn.addEventListener("click", async(e) =>{
  e.preventDefault()
  if (!messageInput.value){
    return
  }
  const message = {
    message : messageInput.value,
    date : Date.now(),
    user: user.name
  }
  user.socket.emit("message", message)
  render(message)
  // messageInput.value = null
})

function render(data){
  const msgElement = document.createElement("div")
  const cssClass = data.user == user.name ? "local" : "remote"
  msgElement.classList.toggle(cssClass)
  msgElement.innerHTML = `
  <div class="message-data uk-text-small ${cssClass == "local" ? "align-right" : "" }">
      <span class="user">${data.user}</span>
      <span class="date-time">${new Date(data.date).toLocaleString()}</span> &nbsp;
  </div>
  <div class="message-body">${data.message}</div>`
  msgPool.appendChild(msgElement)
  msgPool.scrollTop = msgPool.scrollHeight
}

function renderUser(u){
  if (u.name == user.name) {
    return
  }
  users.push(u)
  addList(user)
}

function addList(u){
  const liEl = document.createElement("li")
  liEl.innerHTML = u.name
  userList.append(liEl)
}

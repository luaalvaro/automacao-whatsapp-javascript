import {
  GZAPPY_API_TOKEN,
  GZAPPY_INSTANCE_ID,
  GZAPPY_URL,
} from "./constants.js";

const inpName = document.getElementById("username");
const inpWhatsapp = document.getElementById("whatsapp");
const inpText = document.getElementById("message");
const btnSubmit = document.getElementById("submit");

const handleSubmitForm = async () => {
  const name = inpName.value;
  const whatsapp = inpWhatsapp.value;
  const message = inpText.value;

  if (name === "" || whatsapp === "" || message === "") {
    alert("Preencha todos os campos");
    return;
  }

  // ENVIO DA MENSAGEM
  try {
    btnSubmit.disabled = true;
    btnSubmit.innerHTML = "Enviando mensagem...";

    const response = await fetch(GZAPPY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GZAPPY_API_TOKEN}`,
      },
      body: JSON.stringify({
        instance_id: GZAPPY_INSTANCE_ID,
        message: [message],
        phone: [whatsapp],
      }),
    });

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log("Error sending message", error);
  } finally {
    btnSubmit.disabled = false;
    btnSubmit.innerHTML = "Enviar mensagem";
  }
};

btnSubmit.addEventListener("click", handleSubmitForm);

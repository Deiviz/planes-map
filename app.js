// ---------- SPLASH ----------
const startButton = document.getElementById("start-button");
const SECRET_PLAN_CODE = "planes";
const SECRET_PHONE_GUESS = "662906911";

function startApp(){
  document.getElementById("splash").style.display = "none";
}

startButton.addEventListener("click", startApp);

// ---------- MAP ----------
const map = L.map('map').setView([40.4168,-3.7038], 10);

L.tileLayer(
  'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
).addTo(map);

// ---------- ICON ----------
function icon(){
  return L.divIcon({
    html:'<div class="pulse"></div>',
    iconSize:[20,20]
  });
}

function greenIcon(){
  return L.divIcon({
    html:'<div class="pulse pulse-green"></div>',
    iconSize:[20,20]
  });
}

// ---------- DATA ----------
const plans = [
  {id:0, lat:40.468562177565275, lng:-3.452372366435212, title:"Tirolina", icon:"🪂", text:"Agarrarte fuerte 😏"},
  {id:1, lat:40.43, lng:-3.71, title:"Ruta de cocktails por varias coctelerías", icon:"🍸", text:"Esto empieza suave…"},
  {id:2, lat:40.35342671260164, lng:-3.5205658318265614, title:"Strip Poker", icon:"🃏", text:"La gran revancha !! (esta vez sin trampas)"},
  {id:3, lat:40.470357292646895, lng:-3.615808673703998, title:"Saona", icon:"🍽️", text:"y todo con mucha salsa"},
  {id:4, lat:40.46258592801547, lng:-3.59182591648099, title:"Mexicano y Margaritas", icon:"🌮", text:"Picante en todos los sentidos"},
  {id:5, lat:40.47256385155101, lng:-3.4416879318222278, title:"cine de terror y palomitas", icon:"🎬", text:"No vale taparse los ojos"},
  {id:6, lat:40.49354622408591, lng:-3.356658004667446, title:"Lasaña o Risotto en mi casa", icon:"🍝", text:"hay que acabar con la tripa como un balón"},
  {id:7, lat:40.34507946414065, lng:-3.5298937867861944, title:"Preparación de cocktails en tu casa ( o en la mia )", icon:"🍹", text:"Esta vez se mezcla antes de beberse"},
  {id:8, lat:40.42955776835014, lng:-3.622656933888387, title:"Plan SECRETO", icon:"🤫", text:"risas y competición", locked:true},
  {id:9, lat:40.485666255386974, lng:-3.3835283008026735, title:"Regalo absurdo Temu/Ali Express", icon:"🎁", text:"Hay que comprar algo de ahí (max 5 euros) absurdo pero con sentido!!! Y un día nos los damos previo varias copas de vino blanco. jajjaj"},
  {id:10, lat:40.442986336668916, lng:-3.556024366886425, title:"Karaoke", icon:"🎤", text:"No valen canciones en frances!!!"},
  {id:11, lat:40.384788077530736, lng:-3.647727429653734, title:"Competición de dardos", icon:"🎯", text:"Quien pierda invida a cena"},
  {
    id:12,
    lat:40.4185,
    lng:-3.699,
    title:"Recordatorio de seguridad",
    icon:"🟢",
    markerType:"green",
    html:`
      <p>Recordatorio de seguridad.</p>
      <ul class="modal-list">
        <li>Quitar camiseta vieja de la cámara</li>
        <li>Pulsera roja ( aunque mola cuando se olvida )</li>
        <li>Mochila con todo.</li>
        <li>Abrir para airear</li>
      </ul>
    `,
  },
];

// ---------- MODAL ----------
const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");

function openModal(p){
  if (p.locked) {
    document.getElementById("content").innerHTML = `
      <div class="icon">${p.icon}</div>
      <h2>${p.title}</h2>
      <p>Introduce el código para desbloquear</p>
      <div class="secret-form">
        <input id="secret-code-input" class="secret-input" type="password" placeholder="Código secreto">
        <button id="secret-code-button" class="secret-button" type="button">Desbloquear</button>
      </div>
      <p id="secret-feedback" class="secret-feedback"></p>
    `;

    const secretButton = document.getElementById("secret-code-button");
    const secretInput = document.getElementById("secret-code-input");

    function unlockSecretPlan() {
      const feedback = document.getElementById("secret-feedback");
      const normalizedSecretInput = secretInput.value.replace(/\s+/g, "");

      if (normalizedSecretInput === SECRET_PHONE_GUESS) {
        document.getElementById("content").innerHTML = `
          <div class="icon">${p.icon}</div>
          <h2>${p.title}</h2>
          <p>Si claro...mi número de teléfono va a ser !!! no eres tan lista parece !!! jajajajjajaj</p>
        `;
        return;
      }

      if (normalizedSecretInput.toLowerCase() === SECRET_PLAN_CODE.toLowerCase()) {
        document.getElementById("content").innerHTML = `
          <div class="icon">${p.icon}</div>
          <h2>${p.title}</h2>
          <p>${p.text}</p>
        `;
        return;
      }

      feedback.textContent = "Código incorrecto";
    }

    secretButton.addEventListener("click", unlockSecretPlan);
    secretInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        unlockSecretPlan();
      }
    });
  } else {
    document.getElementById("content").innerHTML = `
      <div class="icon">${p.icon}</div>
      <h2>${p.title}</h2>
      ${p.html || `<p>${p.text}</p>`}
    `;
  }

  modal.classList.add("active");
  overlay.classList.add("active");
}

function closeModal(){
  modal.classList.remove("active");
  overlay.classList.remove("active");
}

overlay.addEventListener("click", closeModal);

// ---------- MARKERS ----------
function renderPlans(plans){
  plans.forEach(plan=>{
    const marker = L.marker([plan.lat, plan.lng],{
      icon: plan.markerType === "green" ? greenIcon() : icon()
    }).addTo(map);

    marker.on("click",(e)=>{
      L.DomEvent.stopPropagation(e);

      openModal(plan);
    });
  });
}

renderPlans(plans);

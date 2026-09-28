(() => {
  "use strict";
  const $ = id => document.getElementById(id);
  const types = ["Parada temporal","Camino bloqueado","Servicio interrumpido"];
  const samples = [
    ["movieron la parada frente a la farmacia","parada ahora enfrente del mercado","ya no suben en esta esquina","temporalmente abordamos una cuadra adelante","cambio de punto de ascenso","la parada se cambió de lugar","recoger pasajeros en la otra acera","nuevo punto temporal para subir","no hay ascenso en la parada habitual","esperar frente al hospital"],
    ["calle cerrada por obra","el camino está bloqueado","no se puede pasar por avenida","hay cierre de calle","obras impiden el paso","bloquearon el tramo","valla en la avenida","desvío por calle cerrada","el puente está bloqueado","no circula por el segmento cerrado"],
    ["servicio suspendido por ahora","no salen unidades","interrupción del servicio","colectivos dejaron de circular","pausa temporal de operaciones","sin servicio en la ruta","viajes detenidos","se suspendieron salidas","operación interrumpida","no hay unidades disponibles"]
  ];
  const normalize = s => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").match(/[a-zñ]+/g)||[];
  const training = samples.map(group => group.map(normalize));
  const vocab = new Set(training.flat(2));
  function classify(sentence) {
    const words = normalize(sentence);
    if (words.length < 3) return null;
    const scores = training.map(group => {
      const counts = new Map();
      group.flat().forEach(w => counts.set(w,(counts.get(w)||0)+1));
      const total = group.flat().length;
      return words.reduce((sum,w) => sum+Math.log(((counts.get(w)||0)+1)/(total+vocab.size)),Math.log(1/3));
    });
    const ranked = scores.map((score,i)=>({score,i})).sort((a,b)=>b.score-a.score);
    const overlap = words.some(w => training[ranked[0].i].flat().includes(w) && w.length>3);
    return overlap && ranked[0].score-ranked[1].score>0.7 ? types[ranked[0].i] : null;
  }
  const state = {report:null, decision:null};
  function el(tag,cls,text){const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n}
  function show(view) {
    for (const name of ["passenger","driver","operator"]) {$(name).classList.toggle("hidden",name!==view)}
    document.querySelectorAll(".tab").forEach(b=>{b.classList.toggle("active",b.dataset.tab===view);b.setAttribute("aria-selected",String(b.dataset.tab===view))});
  }
  document.querySelectorAll(".tab").forEach(b=>b.addEventListener("click",()=>show(b.dataset.tab)));
  const initial = {category:"Parada temporal",segment:"Plaza Central – Mercado",description:"La parada Mercado cambió de lugar en este caso inventado.",alternative:"Acera norte, frente a Farmacia Ejemplo (lugar ficticio)",expires:Date.now()+60*60*1000,status:"verified",demo:true};
  state.report=initial;
  function current(){return state.report && state.report.status==="verified" && state.report.expires>Date.now()?state.report:null}
  function format(t){return new Date(t).toLocaleString("es-MX",{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"})}
  function render(){
    const pub=$("public-alerts");pub.replaceChildren();
    const active=current();
    $("event-dot").style.display=active?"":"none";
    $("alternate").disabled=!active;
    $("original").disabled=!active;
    $("alternate").title=active?"":"Disponible cuando exista un aviso vigente";
    $("original").title=active?"":"Disponible cuando exista un aviso vigente";
    if(!active) state.decision=null;
    if(active){
      const card=el("article","alert");card.append(el("span","status","Confirmado para esta simulación"),el("h3","",active.category));
      card.append(el("p","",active.description),el("p","",`Tramo: ${active.segment}`),el("p","",`Parada alternativa: ${active.alternative}`));
      card.append(el("p","detail",`Vigente hasta ${format(active.expires)} · Verificación humana simulada · Fuente ficticia`));pub.append(card);
    } else pub.append(el("div","empty","No hay cambios confirmados y vigentes en esta demo. Confirma en la parada antes de viajar."));
    $("decision-result").textContent=state.decision?(`Decisión de prueba: ${state.decision}. Esto no demuestra impacto real.`):"";
    const mine=$("my-report");mine.replaceChildren();const queue=$("queue");queue.replaceChildren();
    if(!state.report){queue.append(el("div","empty","Sin reportes pendientes."));return}
    const r=state.report;
    const summary=el("div","pending");summary.append(el("h3","",`${r.category} · ${r.status==="verified"?"verificado":r.status==="pending"?"pendiente":r.status==="rejected"?"rechazado":"retirado"}`),el("p","",r.description),el("p","",`Tramo: ${r.segment} · Alternativa: ${r.alternative}`),el("p","",`Vence: ${format(r.expires)} · ${r.demo?"Caso inicial inventado":"Reporte creado en esta pestaña"}`));
    if(r.status==="pending"){
      const actions=el("div","actions");
      for(const [label,fn,cl] of [["Verificar (simulado)",()=>{r.status="verified";render()},""],["Rechazar",()=>{r.status="rejected";render()},"secondary"],["Pedir corrección",()=>{r.status="rejected";render()},"secondary"]]){const b=el("button",cl,label);b.onclick=fn;actions.append(b)}
      summary.append(actions);queue.append(summary);
    } else queue.append(el("div","empty","No hay reportes pendientes. El responsable debe comprobar cada cambio antes de verificarlo."));
    const driver=el("div","pending");driver.append(el("h3","","Tu último reporte"),el("p","",`${r.category} · ${r.status==="verified"?"verificado":r.status==="pending"?"pendiente":r.status==="rejected"?"requiere corrección":"retirado"}`));
    if(r.status!=="withdrawn"){const b=el("button","danger","Retirar reporte");b.onclick=()=>{r.status="withdrawn";render()};driver.append(b)}
    if(r.status==="pending"||r.status==="rejected"){const b=el("button","secondary","Corregir en formulario");b.onclick=()=>{ $("description").value=r.description;$("segment").value=r.segment;$("category").value=r.category;$("alternative").value=r.alternative;r.status="withdrawn";render();$("description").focus()};driver.append(b)}
    mine.append(driver);
  }
  $("description").addEventListener("input",()=>{
    const guess=classify($("description").value);
    $("suggestion").textContent=guess?`Sugerencia automática (ML): ${guess}. Revísala y elige el tipo tú.`:"No se pudo clasificar. Elige el tipo manualmente.";
    if(guess && !$("category").value) $("category").value=guess;
  });
  $("report-form").addEventListener("submit",e=>{
    e.preventDefault();const description=$("description").value.trim(),alternative=$("alternative").value.trim(),segment=$("segment").value,category=$("category").value,minutes=Number($("expiry").value);
    const error=!["Plaza Central – Mercado","Mercado – Hospital"].includes(segment)?"Elige un tramo válido.":!types.includes(category)?"Elige un tipo válido.":description.length<8||description.length>180?"Describe el cambio entre 8 y 180 caracteres.":alternative.length<5||alternative.length>90?"Indica una parada alternativa de 5 a 90 caracteres.":![15,30,60].includes(minutes)?"Elige un vencimiento válido.":"";
    $("form-error").textContent=error;if(error)return;
    state.report={description,alternative,segment,category,expires:Date.now()+minutes*60000,status:"pending",demo:false};state.decision=null;render();$("report-form").reset();$("suggestion").textContent="Escribe el cambio para obtener una sugerencia. La clasificación puede equivocarse.";show("driver");
  });
  $("voice").onclick=()=>{
    const Speech=window.SpeechRecognition||window.webkitSpeechRecognition;
    if(!Speech){$("voice-status").textContent="El dictado no está disponible aquí. Puedes escribir el reporte.";return}
    const recognition=new Speech();recognition.lang="es-MX";recognition.onresult=e=>{$("description").value=String(e.results[0][0].transcript).slice(0,180);$("description").dispatchEvent(new Event("input"));$("voice-status").textContent="Transcripción lista. Revísala antes de enviar."};recognition.onerror=()=>{$("voice-status").textContent="No se pudo dictar. Escribe el reporte.";};recognition.start();$("voice-status").textContent="Escuchando; di solo el cambio, sin datos personales.";
  };
  $("alternate").onclick=()=>{state.decision="ir a la parada alternativa";render()};
  $("original").onclick=()=>{state.decision="mantener el punto habitual";render()};
  $("refresh").onclick=render;setInterval(render,30000);render();
  window.RutaClaraTest={classify,normalize,getState:()=>state};
})();

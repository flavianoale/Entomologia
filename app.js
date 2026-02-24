
function loadAtlas(){
document.getElementById("app").innerHTML=`
<div class='section'>
<h3>Atlas Morfológico</h3>
<p>Clique nas estruturas abaixo:</p>
<ul>${MORFOLOGIA.map(m=>"<li>"+m+"</li>").join("")}</ul>
</div>`;
}

function loadKey(){
document.getElementById("app").innerHTML=`
<div class='section'>
<h3>Chave Dicotômica Simplificada</h3>
<p>1. Metamorfose completa → 2</p>
<p>1'. Metamorfose incompleta → Hemiptera/Orthoptera</p>
<p>2. Élitros presentes → Coleoptera</p>
<p>2'. Escamas nas asas → Lepidoptera</p>
</div>`;
}

function loadFamilies(){
let html="<div class='section'><h3>Ordens & Famílias</h3>";
for(let ordem in ORDENS){
html+=`<h4>${ordem}</h4><ul>`;
ORDENS[ordem].forEach(f=> html+=`<li>${f}</li>`);
html+="</ul>";
}
html+="</div>";
document.getElementById("app").innerHTML=html;
}

function loadExam(){
document.getElementById("app").innerHTML=`
<div class='section'>
<h3>Simulado Prática</h3>
<p>Inseto apresenta élitros rígidos. Qual a ordem?</p>
<button onclick="alert('Correto: Coleoptera')">Coleoptera</button>
<button onclick="alert('Incorreto')">Lepidoptera</button>
</div>`;
}

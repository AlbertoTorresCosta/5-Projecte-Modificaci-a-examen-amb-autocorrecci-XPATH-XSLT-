var formElement=null;
var respuestaSecreta=null;
var respuestaSelect=null;
var respuestaSelectM= [];
var respuestaRadio= [];
var respuestasCheckbox = [];
var nota = 0;  //nota de la prueba
var xmlDoc = null;
var xslDoc = null;

//**************************************************************************************************** 
//Después de cargar la página (onload) se definen los eventos sobre los elementos entre otras acciones.
window.onload = function(){ 

 //CORREGIR al apretar el botón
 formElement=document.getElementById('myform');
 formElement.onsubmit=function(){
     
   inicializar();
   if (comprobar()){
    corregirText();
    corregirSelect();
    corregirCheckbox();
    corregirSelectM();
    corregirRadio();
    presentarNota();
   }
   return false;
 }

 //LEER XML de xml/Preguntes.xml
 var xhttp = new XMLHttpRequest();
 xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
   gestionarXml(this);
  }
 };
 xhttp.open("GET", "xml/Preguntes.xml", true);
 xhttp.send();
 
 //LEER XSL de xml/Questions.xsl
 var xhttp2 = new XMLHttpRequest();
 xhttp2.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
   xslDoc=this.responseXML;
  }
 };
 xhttp2.open("GET", "xml/Questions.xsl", true);
 xhttp2.send();
 
} 


//****************************************************************************************************
// Recuperamos los datos del fichero XML xml/Preguntes.xml
// xmlDOC es el documento leido XML. 
 function gestionarXml(dadesXml){
 var xmlDoc = dadesXml.responseXML; //Parse XML to xmlDoc
 
 //TEXT
 //Recuperamos el título y la respuesta correcta de Input, guardamos el número secreto
 var tituloInput=xmlDoc.getElementsByTagName("title")[0].innerHTML;
 var tituloInput2=xmlDoc.getElementsByTagName("title")[8].innerHTML;
 ponerDatosInputHtml(tituloInput, tituloInput2);
 //respuestaSecreta=parseInt(xmlDoc.getElementById("alum001","alum009").getElementsByTagName("answer")[0].innerHTML); 
    
 
 //SELECT
 //Recuperamos el título y las opciones, guardamos la respuesta correcta     
 var tituloSelect=xmlDoc.getElementsByTagName("title")[1].innerHTML;
 var tituloSelect2=xmlDoc.getElementsByTagName("title")[5].innerHTML;
 var opcionesSelect = [];
 var nopt = xmlDoc.getElementById("alum002","alum006").getElementsByTagName('option').length;
 for (i = 0; i < nopt; i++) { 
    opcionesSelect[i] = xmlDoc.getElementById("alum002","alum006").getElementsByTagName("option")[i].innerHTML;
 }
 ponerDatosSelectHtml(tituloSelect, tituloSelect2, opcionesSelect);
// respuestaSelectM=parseInt(xmlDoc.getElementsByTagName("answer")[1].innerHTML);
     respuestaSelectM=parseInt(xmlDoc.getElementsByTagName("answer")[5].innerHTML);

 //CHECKBOX
 //Recuperamos el título y las opciones, guardamos las respuestas correctas
 var tituloCheckbox = xmlDoc.getElementsByTagName("title")[3].innerHTML;
 var tituloCheckbox2 = xmlDoc.getElementsByTagName("title")[6].innerHTML;
 var opcionesCheckbox = [];
 var nopt = xmlDoc.getElementById("alum004", "alum007").getElementsByTagName("option").length;
 for (i = 0; i < nopt; i++) { 
    opcionesCheckbox[i]=xmlDoc.getElementById("alum004","alum007").getElementsByTagName("option")[i].innerHTML;
 }  
 ponerDatosCheckboxHtml(tituloCheckbox, tituloCheckbox2, opcionesCheckbox);
 var nres = xmlDoc.getElementById("alum004", "alum007").getElementsByTagName("answer").length;
 for (i = 0; i < nres; i++) { 
 // respuestasCheckbox[i]=xmlDoc.getElementById("alum004", "alum007").getElementsByTagName("answer")[i].innerHTML;
     
 }


//SELECT MULTIPLE 
 //Recuperamos el título y las opciones, guardamos las respuestas correctas
 var tituloSelectM = xmlDoc.getElementsByTagName("title")[2].innerHTML;
 var tituloSelectM2 = xmlDoc.getElementsByTagName("title")[9].innerHTML;
 var opcionesSelectM = [];
 var nopt = xmlDoc.getElementById("alum003", "alum010").getElementsByTagName("option").length;
 for (i = 0; i < nopt; i++) { 
  opcionesSelectM[i]=xmlDoc.getElementById("alum003","alum010").getElementsByTagName("option")[i].innerHTML;
 }       
 ponerDatosSelectMHtml(tituloSelectM,tituloSelectM2,opcionesSelectM);
 var nres = xmlDoc.getElementById("alum003", "alum010").getElementsByTagName("answer").length;
 for (i = 0; i < nres; i++) { 
 //respuestasSelectM[i]=xmlDoc.getElementById("alum003", "alum010").getElementsByTagName("answer")[i].innerHTML;
 
 }


//RADIO
//Recuperamos el título y las opciones, guardamos las respuestas correctas
 var tituloRadio = xmlDoc.getElementsByTagName("title")[4].innerHTML;
 var tituloRadio2 = xmlDoc.getElementsByTagName("title")[7].innerHTML;
 var opcionesRadio = [];
 var nopt = xmlDoc.getElementById("alum005","alum008").getElementsByTagName("option").length;
 for (i = 0; i < nopt; i++) { 
    opcionesRadio[i]=xmlDoc.getElementById("alum005","alum008").getElementsByTagName("option")[i].innerHTML;
 }  
 ponerDatosRadioHtml(tituloRadio,tituloRadio2,opcionesRadio);
 var nres = xmlDoc.getElementById("alum005","alum008").getElementsByTagName("answer").length;
 for (i = 0; i < nres; i++) { 
  //respuestasRadio[i]=xmlDoc.getElementById("alum005","alum008").getElementsByTagName("answer")[i].innerHTML;
 }
}


//****************************************************************************************************
//implementación de la corrección

function corregirText(){
  //Vosotros debéis comparar el texto escrito con el texto que hay en el xml
  //en este ejemplo hace una comparación de números enteros[Cambiado a Texto]
  var s=formElement.elements[0].value;     
  if (s==corregirText) {
   darRespuestaHtml("P1: Has acertado!");
   nota +=1;
  }
  else 
    if (s>corregirText) darRespuestaHtml("P1: Correcto");
    else darRespuestaHtml("P1: Has fallado");
  
}

function corregirSelect(){
  //Compara el índice seleccionado con el valor del íncide que hay en el xml (<answer>2</answer>)
  //para implementarlo con type radio, usar value para enumerar las opciones <input type='radio' value='1'>...
  //luego comparar ese value con el value guardado en answer
  var sel = formElement.elements[1];  
  if (sel.selectedIndex-1==respuestaSelect) { //-1 porque hemos puesto una opción por defecto en el select que ocupa la posición 0
   darRespuestaHtml("P2: Correcto");
   nota +=1;
  }
  else darRespuestaHtml("P2: Incorrecto");
}

//Si necesitáis ayuda para hacer un corregirRadio() decirlo, lo ideal es que a podáis construirla modificando corregirCheckbox
function corregirCheckbox(){
  //Para cada opción mira si está checkeada, si está checkeada mira si es correcta y lo guarda en un array escorrecta[]
  var f=formElement;
  var escorrecta = [];
  for (i = 0; i < f.color.length; i++) {  //"color" es el nombre asignado a todos los checkbox
   if (f.color[i].checked) {
    escorrecta[i]=false;     
    for (j = 0; j < respuestasCheckbox.length; j++) {
     if (i==respuestasCheckbox[j]) escorrecta[i]=true;
    }
    //si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
    if (escorrecta[i]) {
     nota +=1.0/respuestasCheckbox.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("P3: "+i+" correcta");    
    } else {
     nota -=1.0/respuestasCheckbox.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("P3: "+i+" incorrecta");
    }   
   } 
  }
}

//****************************************************************************************************
// poner los datos recibios en el HTML
function ponerDatosInputHtml(t,t2){
 document.getElementById("tituloInput").innerHTML = t;
 document.getElementById("tituloInput2").innerHTML = t2;
}

function ponerDatosSelectHtml(t,t2,opt){
  document.getElementById("tituloSelect").innerHTML=t;
  document.getElementById("tituloSelect2").innerHTML=t2;
  var select = document.getElementsByTagName("select")[0];
  for (i = 0; i < opt.length; i++) { 
    var option = document.createElement("option");
    option.text = opt[i];
    option.value=i+1;
    select.options.add(option);
      
 }  
}

function ponerDatosCheckboxHtml(t,t2,opt){
 var checkboxContainer=document.getElementById("checkboxDiv");
 document.getElementById("tituloCheckbox").innerHTML = t;
 document.getElementById("tituloCheckbox2").innerHTML = t2;
 for (i = 0; i < opt.length; i++) { 
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.innerHTML=opt[i];
    label.setAttribute("for", "tituloCheckbox","tituloCheckbox2"+i);
    input.type="checkbox";
    input.name="tituloCheckbox","tituloCheckbox2";
    input.id="tituloCheckbox","tituloCheckbox2"+i;    
    checkboxContainer.appendChild(input);
    checkboxContainer.appendChild(label);
 }  
}

//ponerDatosSelectMHtml !!
function ponerDatosSelectMHtml(t,t2,opt){
 var selectMultiple=document.getElementById("SelectMDiv");
 document.getElementById("tituloSelectM").innerHTML = t;
 document.getElementById("tituloSelectM2").innerHTML = t2;
 for (i = 0; i < opt.length; i++) { 
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.innerHTML=opt[i]; 
    label.setAttribute("for", "tituloSelectM","tituloSelectM2"+i);
    input.type="selectM";
    selectMultiple.appendChild(input);
    selectMultiple.appendChild(label);
    selectMultiple.appendChild(document.createElement("br"));
    
 }  
}

//PonerDatosRadio
function ponerDatosRadioHtml(t,t2,opt){
 var radio=document.getElementById("RadioDiv");
 document.getElementById("tituloRadio").innerHTML = t;
 document.getElementById("tituloRadio2").innerHTML = t2;
 for (i = 0; i < opt.length; i++) { 
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.innerHTML=opt[i];
    label.setAttribute("for", "tituloRadio","tituloRadio2"+i);
    input.type="radio";  
    radio.appendChild(input);
    radio.appendChild(label);
    radio.appendChild(document.createElement("br"));
    
 }  
}





//****************************************************************************************************
//Gestionar la presentación de las respuestas
function darRespuestaHtml(r){
 var p = document.createElement("p");
 var node = document.createTextNode(r);
 p.appendChild(node);
 document.getElementById('resultadosDiv').appendChild(p);
}

function presentarNota(){
   darRespuestaHtml("Nota: "+nota+" puntos sobre 10");
}

function inicializar(){
   document.getElementById('resultadosDiv').innerHTML = "";
   nota=0.0;
}

//Comprobar que se han introducido datos en el formulario
function comprobar(){
   var f=formElement;
   var checked=false;
   for (i = 0; i < f.color.length; i++) {  //"color" es el nombre asignado a todos los checkbox
      if (f.color[i].checked) checked=true;
   }
   if (f.elements[0].value=="") {
    f.elements[0].focus();
    alert("Escribe un número");
    return false;
   } else if (f.elements[1].selectedIndex==0) {
    f.elements[1].focus();
    alert("Selecciona una opción");
    return false;
   } if (!checked) {    
    document.getElementsByTagName("h3")[2].focus();
    alert("Selecciona una opción del checkbox");
    return false;
   } else  return true;
}
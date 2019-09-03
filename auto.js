$('body').append(`
<div id="curto"> <iframe id="icurto" src="http://apl.utfpr.edu.br/extensao/certificados/listaPublica"></iframe> </div>
`);
$('body').append(`
<div id="curtoprox">  <button type="button" onClick="proximoCert()">PROXIMO EVENTO!</button>  </div>
`);

$('#curto iframe').css('width','100%');
$('#curto iframe').css('height','100%');
$('#curto').css('width','80%');
$('#curto').css('top','0');
$('#curto').css('position','fixed');
$('#curto').css('padding-left','10%');
$('#curto').css('height','90%');
$('#curto').css('background-color','white');

$('#curtoprox').css('position','fixed');
$('#curtoprox').css('bottom','10px');
$('#curtoprox').css('left','40%');

let auxi = {
url: "http://apl.utfpr.edu.br/extensao/certificados/listaPublica",
target: "icurto"
};
let allEvents = [];
$('select[name="txtEvento"] option').each(function()
{
    // Add $(this).val() to your list
	allEvents.push( $(this).val() );//pega todos eventos
});
let t = {txtCampus: 13,
txtAno: $("#"+auxi.target).contents().find('select[name="txtAno"] option:selected').val(),//pega ano
txtEvento: allEvents.pop()
};

function proximoCert(){
//pega todos ids


if(allEvents.length == 0 || $("#"+auxi.target).contents().find('select[name="txtAno"] option:selected').length > 0 ){
	allEvents = [];
	t.txtAno = $("#"+auxi.target).contents().find('select[name="txtAno"] option:selected').val();
	t.txtCampus = $("#"+auxi.target).contents().find('select[name="txtCampus"] option:selected').val();
	alert("Pesquisando em "+t.txtAno);
	$("#"+auxi.target).contents().find('select[name="txtEvento"] option').each(function(){
		// Add $(this).val() to your list
		allEvents.push( $(this).val() );
	});
}
t.txtEvento= allEvents.pop();

$.post(auxi.url, t, function(data) {//https://stackoverflow.com/questions/5784638/replace-entire-content-of-iframe
    $("#"+auxi.target).contents().find('html').html(data);
	
	setTimeout(function(){
		
		let textoSemCert = "Não foram encontrados";
		str = $("#"+auxi.target).contents().find('tr.linha_par b').text();
		//str.search(/Não foram encontrados/);
		//if(str.search(/Não foram encontrados/) == -1){
		if(str.search(textoSemCert) != -1){ 
			console.log("PASSOU");
			proximoCert();
		}else{
			console.log("ACHOU");
		}
		
	}, 1);
	
}, 'html');

}

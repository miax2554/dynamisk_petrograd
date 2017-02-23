window.addEventListener("load", sidenVises);

function sidenVises() {
	console.log("siden vises");

	//Læs data ind fra fil/JSON
	$.getJSON("http://petlatkea.dk/2017/dui/api/productlist?callback=?", visProduktListe);

	visProdukt();
}

function visProduktListe(listen) {
	console.table(listen);
	listen.forEach(visProdukt);

}

function visProdukt(produkt) {
	console.log(produkt);
	// klon produkt template
	var klon = document.querySelector("#produkt_template").content.cloneNode(true);
	//indsæt data i klon
	//appen klon til produkt_liste
	document.querySelector(".produktliste").appendChild(klon);
}

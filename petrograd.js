window.addEventListener("load", sidenVises);

function sidenVises() {
	console.log("siden vises");
	visProdukt();
}

function visProdukt() {
	// klon produkt template
	var klon = document.querySelector("#produkt_template").content.cloneNode(true);
	//indsæt data i klon
	//appen klon til produkt_liste
	document.querySelector(".produktliste").appendChild(klon);
}

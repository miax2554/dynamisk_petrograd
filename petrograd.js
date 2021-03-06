window.addEventListener("load", sidenVises);

function sidenVises() {
	console.log("siden vises");

	//Læs data ind fra fil/JSON
	$.getJSON("http://petlatkea.dk/2017/dui/api/productlist?callback=?", visProduktListe);
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
	klon.querySelector(".data_navn").innerHTML = produkt.navn;
	klon.querySelector(".data_pris").innerHTML = produkt.pris;

	var rabatpris = Math.ceil(produkt.pris - (produkt.pris * produkt.rabatsats / 100));
	klon.querySelector(".data_rabatpris").innerHTML = rabatpris;

	klon.querySelector(".data_billede").src = "/imgs/medium/" + produkt.billede + "-md.jpg";

	//console.log (klon.querySelector("button").dataset.id
	klon.querySelector("button").dataset.id = produkt.id;
	klon.querySelector("button").addEventListener("click", knapKlikketPå);


	if (produkt.udsolgt == false) {
		//produktet er ikke udsolgt
		//udsolgttekst skal fjernes
		var udsolgttekst = klon.querySelector(".udsolgttekst");
		udsolgttekst.parentNode.removeChild(udsolgttekst);
	} else {
		klon.querySelector(".pris").classList.add("udsolgt");
	}

	if (produkt.udsolgt == true || produkt.rabatsats == 0) {
		var rabatpris = klon.querySelector(".rabatpris");
		rabatpris.parentNode.removeChild(rabatpris);
	} else {
		klon.querySelector(".pris").classList.add("rabat");
	}

	//append klon til produkt_liste: en korte vej til at inddele produkterne i kategorier
	document.querySelector("." + produkt.kategori).appendChild(klon);
}

function knapKlikketPå(oplysningerOmEventet) {
	document.querySelector("#myModalLabel").textContent = "loade...";
	document.querySelector("#myModal .modal-body p").textContent = "...";

	var produktId = oplysningerOmEventet.target.dataset.id;

	$.getJSON("http://petlatkea.dk/2017/dui/api/product?callback=?&id=" + produktId, visModalIndhold);

}

function visModalIndhold(mereInfo) {
	console.log("mereInfo")

	document.querySelector("#myModalLabel").textContent = mereInfo.navn;
	document.querySelector("#myModal .modal-body p").textContent = mereInfo.langbeskrivelse;
	document.querySelector(".data_oprindelsesregion").textContent = mereInfo.oprindelsesregion;
	//document.querySelector(".data_billede").src = "/imgs/small/" + mereInfo.billede + "-sm.jpg";
}









//append klon til produkt_liste den lange vej
//document.querySelector(".produktliste").appendChild(klon);
/*if (produkt.kategori == "forretter") {
	document.querySelector(".forretter").appendChild(klon);
} else if (produkt.kategori == "hovedretter") {
	document.querySelector(".hovedretter").appendChild(klon);
} else if (produkt.kategori == "desserter") {
	document.querySelector(".desserter").appendChild(klon);
} else if (produkt.kategori == "sideorders") {
	document.querySelector(".sideorders").appendChild(klon);
} else if (produkt.kategori == "drikkevarer") {
	document.querySelector(".drikkevarer").appendChild(klon);
}*/

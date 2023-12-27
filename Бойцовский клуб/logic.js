class Boyets {
    constructor(imya, zdorovye, bronya, uron, vynoslivost, khitrnost, lovkost) {
      this.imya = imya;
      this.zdorovye = zdorovye + vynoslivost * 5;
      this.bronya = bronya;
      this.uron = uron + lovkost * 3;
      this.vynoslivost = vynoslivost;
      this.khitrnost = khitrnost;
      this.lovkost = lovkost;
      this.maxKhitrnost = 8;
    }
  
    pokazatStatistiku() {
      console.log(`${this.imya}: Здоровье - ${this.zdorovye}, Броня - ${this.bronya}, Урон - ${this.uron}`);
    }
  
    pokazatTekushcheeZdorovye() {
      console.log(`${this.imya}: Текущее здоровье - ${this.zdorovye}`);
    }
  
    poluchitPovrezhdeniye(uron) {
      const skorrektnoePovrezhdeniye = uron * (1 - this.skorrektnayaBronya());
      this.zdorovye -= skorrektnoePovrezhdeniye;
    }
  
    nachatBoi(sopernik) {
      let raundy = 1;
      while (this.zdorovye > 0 && sopernik.zdorovye > 0) {
        console.log(`Раунд ${raundy}`);
        this.provestiAtaku(sopernik);
        if (sopernik.zdorovye <= 0) {
          console.log(`${this.imya} одерживает победу!`);
        } else {
          sopernik.provestiAtaku(this);
          if (this.zdorovye <= 0) {
            console.log(`${sopernik.imya} одерживает победу!`);
          }
        }
        raundy++;
      }
    }
  
    provestiAtaku(sopernik) {
      const nanosimoePovrezhdeniye = this.korrektsiyaUrona();
      sopernik.poluchitPovrezhdeniye(nanosimoePovrezhdeniye);
      console.log(`${this.imya} атакует ${sopernik.imya} и наносит ${nanosimoePovrezhdeniye} урона.`);
      sopernik.pokazatTekushcheeZdorovye();
    }
  
    skorrektnayaBronya() {
      let skorrektnayaZashchita = this.bronya - this.khitrnost * 0.25;
      if (skorrektnayaZashchita < 0) {
        skorrektnayaZashchita = 0;
      }
      return skorrektnayaZashchita / 100;
    }
  
    korrektsiyaUrona() {
      return this.uron * (1 + this.lovkost / 100);
    }
  }
  
  const boytsy = [
    boets1 = new Boyets("Боец 1", 120, 30, 15, 3, 8, 1),
    boets2 = new Boyets("Боец 2", 140, 20, 16, 6, 17, 2),
  ];
  
  const konteynerBoytsy = document.getElementById('spisokBoyev');
  const konteynerVybrannykhBoyev = document.getElementById('vybrannyeBoytsy');
  const konteynerZapisiBoya = document.getElementById('zapisiBoya');
  
  function pokazatSpisokBoyev() {
    boytsy.forEach(boyets => boyets.pokazatStatistiku());
    const konteynerBoytsy = document.getElementById('spisokBoyev');
    if (konteynerBoytsy) {
      konteynerBoytsy.innerHTML = "<h3>Список бойцов:</h3>";
      boytsy.forEach((boyets, indeks) => {
        konteynerBoytsy.innerHTML += `<p>${indeks + 1}. ${boyets.imya} - Здоровье: ${boyets.zdorovye}, Броня: ${boyets.bronya}, Урон: ${boyets.uron}</p>`;
      });
    }
  }
  
  let vybrannyeBoytsy = [];

  function vybratBoytsov() {
    vybrannyeBoytsy = [];
  
    const boets1Imya = prompt("Введите имя первого воина:");
    const boets2Imya = prompt("Введите имя второго воина:");
  
    const boets1 = boytsy.find(boets => boets.imya === boets1Imya);
    const boets2 = boytsy.find(boets => boets.imya === boets2Imya);
  
    if (boets1 && boets2) {
      vybrannyeBoytsy = [boets1, boets2];
      alert(`${vybrannyeBoytsy[0].imya} против ${vybrannyeBoytsy[1].imya}`);
    } else {
      alert("Выбор воинов отменен или введены неверные имена.");
    }
  }
  
  function monitorBoya() {
    if (vybrannyeBoytsy.length === 2) {
      const boets1 = vybrannyeBoytsy[0];
      const boets2 = vybrannyeBoytsy[1];
      konteynerZapisiBoya.innerHTML += `<p>Бой между ${boets1.imya} и ${boets2.imya} начинается!</p>`;
      boets1.nachatBoi(boets2);
    } else {
      konteynerZapisiBoya.innerHTML += "<p>Выберите двух воинов перед началом боя!</p>";
    }
  }
  
  const Sluchaynoe = {
    getTselayeSluchaynoe(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
  };
  
  function sozdatSluchaynogoBoytsa() {
    const imya = prompt("Введите имя нового воина:");
    const poluchitSluchaynoeZnachenie = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
    const zdorovye = poluchitSluchaynoeZnachenie(80, 120);
    const bronya = poluchitSluchaynoeZnachenie(30, 70);
    const uron = poluchitSluchaynoeZnachenie(18, 24);
    const vynoslivost = poluchitSluchaynoeZnachenie(3, 8);
    const lovkost = poluchitSluchaynoeZnachenie(7, 15);
    const khitrnost = poluchitSluchaynoeZnachenie(1, 8);
  
    const novyyBoets = new Boyets(imya, zdorovye, bronya, uron, vynoslivost, lovkost, khitrnost);
    boytsy.push(novyyBoets);
  
    const table = document.getElementById('table1');
    const rowBoets2 = table.rows[1]; 
    const newCell = rowBoets2.insertCell(-1); 
  
    newCell.innerHTML = `
      <td><img src="fighter2.png" width="100%" height="100%"></td>
      <td id="IMYA${boytsy.length}">Имя: ${imya}</td>
      <td id="zdorovye${boytsy.length}">Здоровье: <span id="health${boytsy.length}">${novyyBoets.zdorovye}</span></td>
      <td id="bronya${boytsy.length}">Броня: <span id="armor${boytsy.length}">${novyyBoets.bрonya}</span></td>
      <td id="uron${boytsy.length}">Урон: <span id="damage${boytsy.length}">${novyyBoets.uron}</span></td>
      <td id="vynoslivost${boytsy.length}">Выносливость: <span id="endurance${boytsy.length}">${novyyBoets.vynoslivost}</span></td>
      <td id="khitrnost${boytsy.length}">Хитрость: <span id="cunning${boytsy.length}">${novyyBoets.khitrnost}</span></td>
      <td id="lovkost${boytsy.length}">Ловкость: <span id="agility${boytsy.length}">${novyyBoets.lovkost}</span></td>
    `;
  
    displayCharacteristics(); 
  }

  function perezagruzitStranitsu() {
    location.reload();
  }
  
  function resetITsNachatNovyyBoy() {
    vybrannyeBoytsy = [];
    konteynerBoytsy.innerHTML = "";
    konteynerVybrannykhBoyev.innerHTML = "";
    konteynerZapisiBoya.innerHTML = "";
    pokazatSpisokBoyev();
  
    const vybratBoytsovKnopka = document.createElement("button");
    vybratBoytsovKnopka.textContent = "Выбрать воинов";
    vybratBoytsovKnopka.onclick = vybratBoytsov;
    konteynerVybrannykhBoyev.appendChild(vybratBoytsovKnopka);
  }
  
  function resetBoytsy() {
    vybrannyeBoytsy = [];
    if (konteynerVybrannykhBoyev) {
      konteynerVybrannykhBoyev.innerHTML = "";
      pokazatSpisokBoyev();
      const vybratBoytsovKnopka = document.createElement("button");
      vybratBoytsovKnopka.textContent = "Выбрать воинов";
      vybratBoytsovKnopka.onclick = vybratBoytsov;
      konteynerVybrannykhBoyev.appendChild(vybratBoytsovKnopka);
    } 
  }
  
  function nachaloBoya() {
    if (vybrannyeBoytsy.length === 2) {
        const boets1 = vybrannyeBoytsy[0];
        const boets2 = vybrannyeBoytsy[1];

        const nachalnoeZdorovye1 = boets1.zdorovye;
        const nachalnoeZdorovye2 = boets2.zdorovye;

        boets1.nachatBoi(boets2);

        boets1.zdorovye = nachalnoeZdorovye1;
        boets2.zdorovye = nachalnoeZdorovye2;
        resetBoytsy();
    } else {
        console.log("Выберите двух воинов перед началом боя!");
    }
}

function displayCharacteristics() {
  document.getElementById('health1').textContent = boets1.zdorovye;
  document.getElementById('health2').textContent = boets2.zdorovye;
  document.getElementById('armor1').textContent = boets1.bronya;
  document.getElementById('armor2').textContent = boets2.bronya;
  document.getElementById('damage1').textContent = boets1.uron;
  document.getElementById('damage2').textContent = boets2.uron;
  document.getElementById('endurance1').textContent = boets1.vynoslivost;
  document.getElementById('endurance2').textContent = boets2.vynoslivost;
  document.getElementById('cunning1').textContent = boets1.khitrnost;
  document.getElementById('cunning2').textContent = boets2.khitrnost;
  document.getElementById('agility1').textContent = boets1.lovkost;
  document.getElementById('agility2').textContent = boets2.lovkost;
}

window.onload = function () {
  displayCharacteristics();
};
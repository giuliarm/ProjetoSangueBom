import { Component, OnInit, Inject, Injectable, AfterViewInit } from '@angular/core';
import { GeocodeService } from 'src/app/services/geocodeService';
import { Utils } from 'src/app/utils/functions/Utils';

import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'], 
  standalone: false
})

@Injectable()
export class MapsComponent implements OnInit  {
  searchTerm: string;

  public focus;
  infoWindow?: any;
  map: any;

  constructor(private geocodeService: GeocodeService, private utils: Utils, @Inject(DOCUMENT) private document: Document) { }

  ngOnInit (): void {
      this.initMap();
  }

  initMap(){
    let lat = -23.5505;
    let lng = -46.6333;
    var myLatlng = new google.maps.LatLng(lat, lng);
    var mapOptions = {
        streetViewControl: false,
        zoom: 12, // Ajuste o zoom conforme necessário
        scrollwheel: false,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
          {
              "featureType": "all",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "simplified"
                  },
                  {
                      "hue": "#ff0000"
                  }
              ]
          },
          {
              "featureType": "poi",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "on"
                  }
              ]
          },
          {
              "featureType": "poi",
              "elementType": "labels.icon",
              "stylers": [
                  {
                      "visibility": "on"
                  }
              ]
          },
          {
              "featureType": "poi.attraction",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "poi.business",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "poi.park",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "on"
                  }
              ]
          },
          {
              "featureType": "poi.place_of_worship",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "poi.school",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "poi.sports_complex",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          }
      ]
    };
     this.infoWindow = new google.maps.InfoWindow();
    this.map = new google.maps.Map(this.document.getElementById('map-canvas'), mapOptions);
    this.showMarkers();
  }

  showMarkers() {
    this.getPontosDoacao().forEach((hemocentro) => {
      const marker = new google.maps.Marker({
        position: { lat: hemocentro.latitude, lng: hemocentro.longitude },
        map: this.map,
        title: hemocentro.nome,
      });
  
      marker.addListener('click', () => {
        this.openInfoWindow(hemocentro);
      });
    });
  }
  
  submitSearch() {
    this.geocodeService.geocodeAddress(this.searchTerm)
      .then(coordinates => {
        const nearestHemocentro = this.findNearestHemocentro(coordinates);
        if (nearestHemocentro) {
          this.openInfoWindow(nearestHemocentro);
          this.map.setCenter({ lat: coordinates.lat, lng: coordinates.lng });
        } else {
          console.error('Hemocentro mais próximo não encontrado.');
        }
      })
      .catch(error => {
        console.error('Erro ao geocodificar o endereço:', error);
      });
  }

  openInfoWindow(hemocentro: any) {
    this.infoWindow.close();
    this.infoWindow.setContent(`
      <div>
        <h3>${hemocentro.nome}</h3>
        <p>Endereço: ${hemocentro.endereco}</p>
        <p>Contato: ${hemocentro.contato}</p>
        <p><a href="${hemocentro.link}" target="_blank">Mais informações</a></p>
      </div>
    `);
    this.infoWindow.setPosition({ lat: hemocentro.latitude, lng: hemocentro.longitude });
    this.infoWindow.open(this.map);
  }

  findNearestHemocentro(coordinates): any {
    let nearestHemocentro;
    let minDistance = Infinity;
    this.getPontosDoacao().forEach(hemocentro => {
      const distance = this.utils.calcularDistancia(coordinates.lat, coordinates.lng, hemocentro.latitude, hemocentro.longitude);
      if (distance < minDistance) {
        minDistance = distance;
        nearestHemocentro = hemocentro;
      }
    });
    return nearestHemocentro;
  }
  
  getPontosDoacao() {
    return [
      {
          nome: "Hemocentro de Osasco",
          endereco: "Rua Ari Barroso, 355 - Jardim das Flores, Osasco - SP, 06110-095",
          latitude: -23.5373,
          longitude: -46.7829,
          contato: "(11) 3686-1399",
          link: "https://prosangue.hubglobe.com/entrar"
      },
      {
          nome: "Hemocentro de Barueri",
          endereco: "Rua Ângela Mirella, 354 - Vila Porto, Barueri - SP, 06422-030",
          latitude: -23.5118,
          longitude: -46.8741,
          contato: "(11) 4198-7450",
          link: "https://prosangue.hubglobe.com/entrar"
      },
      {
          nome: "Hemocentro de Cotia",
          endereco: "Avenida Rotary, 509 - Atalaia Nova, Cotia - SP, 06700-090",
          latitude: -23.6029,
          longitude: -46.9189,
          contato: "(11) 4616-3770",
          link: "https://www.cotia.sp.gov.br/"
      },
      {
          nome: "Hemocentro de Itapevi",
          endereco: "Rua Armando Sales de Oliveira, 474 - Centro, Itapevi - SP, 06653-210",
          latitude: -23.5463,
          longitude: -46.9357,
          contato: "(11) 4141-6977",
          link: "https://www.itapevi.sp.gov.br/"
      },
      {
          nome: "Hemocentro de Carapicuíba",
          endereco: "Rua dos Jasmins, 101 - Vila Gustavo Correia, Carapicuíba - SP, 06317-270",
          latitude: -23.5217,
          longitude: -46.8529,
          contato: "(11) 4184-7064",
          link: "https://www.carapicuiba.sp.gov.br/"
      },
      {
          nome: "Hemocentro de São Paulo (Fundação Pró-Sangue)",
          endereco: "Av. Dr. Enéas Carvalho de Aguiar, 155 - 1º Andar, São Paulo - SP, 05403-000",
          latitude: -23.5588,
          longitude: -46.6662,
          contato: "(11) 4573-7800",
          link: "https://www.prosangue.sp.gov.br/"
      },
      {
          nome: "Hemocentro de São Paulo (Hospital das Clínicas da FMUSP)",
          endereco: "Av. Dr. Enéas Carvalho de Aguiar, 155 - 1º Andar, São Paulo - SP, 05403-000",
          latitude: -23.5588,
          longitude: -46.6662,
          contato: "(11) 2661-0000",
          link: "https://www.hc.fm.usp.br/"
      },
      {
          nome: "Hemocentro de São Paulo (Hospital do Servidor Público Estadual)",
          endereco: "Rua Pedro de Toledo, 1800 - 1º Andar - Vila Clementino, São Paulo - SP, 04039-901",
          latitude: -23.5937,
          longitude: -46.6527,
          contato: "(11) 5088-8000",
          link: "http://www.hospitaldocoracao.com.br/"
      },
      {
          nome: "Hemocentro de São Paulo (Hospital Albert Einstein)",
          endereco: "Av. Albert Einstein, 627/701 - Morumbi, São Paulo - SP, 05652-900",
          latitude: -23.5977,
          longitude: -46.7265,
          contato: "(11) 2151-1233",
          link: "https://www.einstein.br/"
      },
      {
          nome: "Hemocentro de São Paulo (Hospital São Camilo - Unidade Pompeia)",
          endereco: "Rua Barão do Bananal, 720 - Pompeia, São Paulo - SP, 05024-000",
          latitude: -23.5314,
          longitude: -46.6793,
          contato: "(11) 3677-4327",
          link: "https://www.saocamilosp.org/"
      }
  ]};

}

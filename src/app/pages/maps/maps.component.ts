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
        zoom: 12, 
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
        },
        {
            nome: "Irmandade Santa Casa de São Carlos",
            endereco: "Rua Paulino Botelho de Abreu Sampaioi, 535 - Jardim Pureza - São Carlos, São Paulo - SP, 13561-060",
            latitude: -22.01106,
            longitude: -47.90129,
            contato: "(16) 3509-1230",
            link: "https://www.santacasasaocarlos.com.br/"
        },
        {
            nome: "Hemocentro De Ribeirão Preto",
            endereco: "Rua Tenente Catão Roxo,R. Prof. Hélio Lourenço, 2501 - Vila Monte Alegre - Ribeirão Preto, São Paulo - SP, 14051-140",
            latitude: -21.16186,
            longitude: -47.84935,
            contato: "(16) 2101-9300",
            link: "https://www.hemocentro.fmrp.usp.br/"
        },
        {
            nome: "Colsan - Posto de Coleta Santos",
            endereco: "Rua Oswaldo Cruz, 197 - Boqueirão - Santos, São Paulo - SP, 11045-904",
            latitude: -23.96218,
            longitude: -46.32118,
            contato: "(11) 5055-1250",
            link: "https://colsan.org.br/site/"
        },
        {
            nome: "Hemonúcleo de Bauru",
            endereco: "Rua Monsenhor Claro, 888 - Centro - Bauru, São Paulo - SP, 17015-130",
            latitude: -22.32972,
            longitude: -49.07693,
            contato: "(14) 3231-4771",
            link: "https://www.saopaulo.sp.gov.br/spnoticias/hemonucleo-de-bauru-reune-recordistas-de-doacao-de-sangue/"
        },
        {
            nome: "Hospital Amaral Carvalho",
            endereco: "Rua Dona Silveria, 150 - Chácara Braz Miraglia - Jaú , São Paulo - SP, 17210-070",
            latitude: -22.29130,
            longitude: -48.55003,
            contato: "(14) 3602-1200",
            link: "http://www.amaralcarvalho.org.br/"
        },
        {
            nome: "Hospital de Câncer de Barretos",
            endereco: "Rua Antenor Duarte Viléla, 1331 - Dr. Paulo Prata - Barretos , São Paulo - SP, 14784-400",
            latitude: -20.58224,
            longitude: -48.56929,
            contato: "(17) 3321-6600",
            link: "http://www.hcancerbarretos.com.br/"
        },
        {
            nome: "Nucleo de Atendimento a Comunidade Fármacia Araraquara",
            endereco: "Rua Expedicionários do Brasil, 1621 - Centro - Araraquara, São Paulo - SP, 14801-360",
            latitude: -21.79333,
            longitude: -48.18142,
            contato: "(16) 3301-6102",
            link: "https://www2.fcfar.unesp.br/#!/hemonucleo"
        },
        {
            nome: "Colsan - Posto de Coleta Sorocaba",
            endereco: "Av. Comendador Pereira Inácio, 564 - Jardim Vergueiro - Sorocaba, São Paulo - SP, 18030-005",
            latitude: -23.51057,
            longitude: -47.45665,
            contato: "(15) 3224-2930",
            link: "http://www.colsan.org.br/"
        },
        {
            nome: "Fundação Faculdade Regional de Medicina de São José do Rio Preto",
            endereco: "Av. Brigadeiro Faria Lima, 5544 - Vila São José - São José do Rio Preto, São Paulo - SP, 15090-000",
            latitude: -20.82882,
            longitude: -49.39727,
            contato: "(17) 3201-5000",
            link: "http://www.hospitaldebase.com.br/"
        },
        {
            nome: "Hemocentro da Faculdade de Medicina de Marilia",
            endereco: "Rua Lourival freire, 240 - Fragata - Marília, São Paulo - SP, 17519-050",
            latitude: -22.22472,
            longitude: -49.93797,
            contato: "(14) 3434-2541",
            link: "http://hc.famema.br/hemocentro/"
        },
        {
            nome: "Hemocentro de Botucatu",
            endereco: "Campus de Avenida Rubião Jr - Botucatu, São Paulo - SP, 18600-400",
            latitude: -22.88895,
            longitude: -48.49560,
            contato: "(14) 3811-6041",
            link: "https://hcfmb.unesp.br/hemocentro/"
        },
        {
            nome: "Hemocentro de Campinas/ Unicamp",
            endereco: "Universidade Estadual de Campinas - Rua Carlos Chagas, 480 - Cidade universitária - Campinas, São Paulo - SP, 13083-878",
            latitude: -22.82641,
            longitude: -47.06260,
            contato: "0800 722 8432",
            link: "https://www.hemocentro.unicamp.br/"
        },
        {
            nome: "Hemocentro Da Santa Casa De São Paulo/laboratório De Histocompatibilidade",
            endereco: "Rua Marquês de Itu, 579 - Vila Buarque, São Paulo - SP, 01223-001",
            latitude: -23.54365,
            longitude: -46.64997,
            contato: "(11) 2176-7155",
            link: "http://www.santacasasp.org.br/doesangue"
        },
        {
            nome: "Hemocentro Mario Gatti",
            endereco: "Av. Prefeito Faria Lima, 200 - Parque Italia - Campinas, São Paulo - SP, 13036-220",
            latitude: -22.89912,
            longitude: -47.05507,
            contato: "(19) 32725501-",
            link: "http://www.hemocentro.unicamp.br/index.php"
        },
        {
            nome: "Centro de Hematologia e Hemoterapia Campinas",
            endereco: "Av. Júlio de Mesquita, 571 - Cambuí - Campinas, São Paulo - SP, 13010-140",
            latitude: -22.89884,
            longitude: -47.05484,
            contato: "(19) 2514-1555",
            link: "http://www.centrodehematologia.med.br/"
        },
        {
            nome: "Banco de Sangue de Ourinhos",
            endereco: "Rua Joaquim, 604 - Vila de Moraes - Ourinhos, São Paulo - SP, 19900-280",
            latitude: -22.98484,
            longitude: -49.86507,
            contato: "(14) 3302-2245",
            link: "http://www.bsoh.com.br/"
        },
        {
            nome: "Hemocentro RP - Centro Regional de Hemorerapia",
            endereco: "Rua Quintino Bocaiuva, 470 - Centro - Ribeirão Preto, São Paulo - SP,14015-160",
            latitude: -21.18677,
            longitude: -47.80801,
            contato: "(16) 3610-1515",
            link: "https://www.doesanguedoevida.com.br/doar-sangue-ribeirao-preto"
        },
        {
            nome: "Banco de Sangue da Santa Casa de Limeira",
            endereco: "Av. Antonio Ometto, 675 - Vila Claudia - Limeira, São Paulo - SP, 13480-470",
            latitude: -22.57925,
            longitude: -47.40024,
            contato: "(19) 3446-6115",
            link: "http://www.santacasalimeira.com.br/site/"
        },
        {
            nome: "Banco de Sangue da Santa Casa de Misericórdia de Santos",
            endereco: "Av. Dr. Cláudio Luiz da Costa, 50 - Jabaquara - Santos , São Paulo - SP, 11075-900",
            latitude: -23.94455,
            longitude: -46.33648,
            contato: "(13) 3202-0600",
            link: "https://santacasadesantos.org.br/portal/para-voce/banco-de-sangue"
        },
        {
            nome: "Banco de sangue da Santa Casa de Misericórdia - Rio Claro",
            endereco: "Rua Dois, 297 - Centro - Rio Claro, São Paulo - SP, 13500-330",
            latitude: -22.29603,
            longitude: -47.59525,
            contato: "(19) 3535-7000",
            link: "http://santacasaderioclaro.com.br/"
        },
        {
            nome: "Hemocentro Da Santa Casa de São Paulo",
            endereco: "Rua Marquês de Itu, 579 - Vila Buarque, São Paulo - SP, 01223-001",
            latitude: -23.53947,
            longitude: -46.65168,
            contato: "(11) 2176-7155",
            link: "http://www.santacasasp.org.br/doesangue"
        },
        {
            nome: "Banco de Sangue - Santa Casa Limeira",
            endereco: "Rua Sergipe, 840 - Vila Cristovam - Limeira , São Paulo - SP, 13480-530",
            latitude: -22.57271,
            longitude: -47.39941,
            contato: "(19) 3446-6115",
            link: "https://www.salvovidas.com/doacao-de-sangue-na-santa-casa-limeira-sp/"
        },
        {
            nome: "Banco de Sangue de São Paulo",
            endereco: "Rua Dr. Tomás Carvalhal, 711 - Paraiso, São Paulo - SP, 04006-002",
            latitude: -23.57146,
            longitude: -46.64780,
            contato: "(11) 3373-2050",
            link: "https://www.doesanguedoevida.com.br/"
        },
        {
            nome: "Banco de Sangue de Araçatuba",
            endereco: "Rua Gaspar de Lemos, 02 - Alvorada - Araçatuba, São Paulo - SP, 16013-800",
            latitude: -21.22850,
            longitude: -50.41600,
            contato: "(18) 3607-3935",
            link: "http://www.doesanguedoevida.com.br/"
        },
        {
            nome: "Núcleo de Hemoterapia de Araçatuba",
            endereco: "Rua Arthur Ferreira da Costa, 330 - Aviacao - Araçatuba, São Paulo - SP, 16055-500",
            latitude: -21.19121,
            longitude: -50.43166,
            contato: "(18) 2102-9400",
            link: "https://www.hemocentro.fmrp.usp.br/"
        },
        {
            nome: "Banco de Sangue do Hospital Albert Einstein",
            endereco: "Av. Albert Einstein, 701 - Morumbi, São Paulo - SP, 05652-900",
            latitude: -23.60011,
            longitude: -46.71649,
            contato: "(11) 2151-1233",
            link: "http://www.einstein.br/estrutura/banco-sangue"
        },
        {
            nome: "Banco de Sangue do Hospital Ana Costa",
            endereco: "Rua Pedro Américo, 60 - Campo Grande - Santos, São Paulo - SP, 11075-400",
            latitude: -23.95703,
            longitude: -46.33352,
            contato: "(13) 3228-9000",
            link: "http://www.anacosta.com.br/"
        },
        {
            nome: "Banco de Sangue do Hospital Estadual",
            endereco: "Rua José Bonifácio, 1641 - serraria - Diadema, São Paulo - SP, 09960-120",
            latitude: -23.70628,
            longitude: -46.60890,
            contato: "(11) 3583-1400",
            link: "http://hed.spdmafiliadas.org.br/"
        },
        {
            nome: "Colsan - Posto de Coleta Mário Covas (Hospital Mário Covas",
            endereco: "Rua Dr. Herinque Calderazzo, 321 - Paraiso, São Paulo - SP, ",
            latitude: -23.67097,
            longitude: -46.53371,
            contato: "(11) 22829-5144",
            link: "https://www.colsan.org.br/site/doador/locais-para-doacao-de-sangue/"
        },
        {
            nome: "Banco de Sangue Paulista - Grupo H.Hemo",
            endereco: "Rua Dr. Alceu de Campos Rodrigues, 46 - Vila Nova Conceição, São Paulo - SP, 04544-000",
            latitude: -23.58602,
            longitude: -46.67322,
            contato: "(11) 99340-4585",
            link: "http://www.bancodesanguepaulista.com.br/"
        },
        {
            nome: "Banco de Sangue Paulista Santo Amaro - Grupo H.Hemo",
            endereco: "Rua Iguatinga, 382 - Santo Amaro, São Paulo - SP, 04744-040",
            latitude: -23.65308,
            longitude: -46.70522,
            contato: "(11) 99340-4585",
            link: "https://www.bancodesanguepaulista.com.br/"
        },
        {
            nome: "Banco de Sangue de São Paulo e Serviços de Hemoterapia",
            endereco: "Rua Alamenda Santos, 764 - Jardim Paulista, São Paulo - SP, 01418-100",
            latitude: -23.56451,
            longitude: -46.64990,
            contato: "(11) 3175-2660",
            link: "Não consta"
        },
        {
            nome: "Banco de Sangue",
            endereco: "Rua Peixoto Gomide, 613 - Jardim Paulista, São Paulo - SP, 01409-001",
            latitude: -23.55609,
            longitude: -46.65664,
            contato: "(11) 3147-9797",
            link: "Não consta"
        },
        {
            nome: "Centro de Hematologia e Hemoterapia - Campinas",
            endereco: "Av. Júlio de Mesquita, 571 - Cambuí - Campinas, São Paulo - SP, 13010-140",
            latitude: -22.89547,
            longitude: -47.05596,
            contato: "(19) 2514-1555",
            link: "http://www.centrodehematologia.med.br/"
        },
        {
            nome: "Centro de Hematologia de São Paulo",
            endereco: "Av. Brigadeiro Luís Antônio, 2533 - Jardim Paulista, São Paulo - SP, 01401-000",
            latitude: -23.56344,
            longitude: -46.65152,
            contato: "(11) 3372-6611",
            link: "http://www.chsp.org.br/"
        },
        {
            nome: "COLSAN - São Bernado do Campo",
            endereco: "Rua Pedro Jacobucci, 440 - Ila Euclides - São Bernado do Campo, São Paulo - SP, 09752-750",
            latitude: -23.69244,
            longitude: -46.55473,
            contato: "(11) 4332-3900",
            link: "http://www.colsan.org.br/"
        },
        {
            nome: "COLSAN - São Caetano do Sul",
            endereco: "Rua Maranhão, 685 - Santa Paula, Andar 1, Nucleo Regional de Hemoterapia Dr. Aguinaldo Quaresma - São Caetano do Sul, São Paulo - SP, 09541-001",
            latitude: -23.61571,
            longitude: -46.56846,
            contato: "(11) 2759-0888",
            link: "http://www.colsan.org.br/"
        },
        {
            nome: "COLSAN - Administrartivo",
            endereco: "Av. Ceci, 2206 - Planalto Paulista, São Paulo - SP, 04065-004",
            latitude: -23.62187,
            longitude: -46.65826,
            contato: "(11) 5906-7700",
            link: "http://www.colsan.org.br/"
        },
        {
            nome: "Banco de Sangue HSPM COLSAN",
            endereco: "Rua Castro Alves, 60 - 4º andar - Aclimação, São Paulo - SP, 01532-001",
            latitude: -23.56678,
            longitude: -46.63930,
            contato: "(11) 3277-5303",
            link: "http://www.colsan.org.br/"
        },
        {
            nome: "COLSAN - Posto de Coleta Tatuapé",
            endereco: "Av. Celso Garcia, 4815 - Parque São Jorge, São Paulo - SP, 03063-000",
            latitude: -23.53324,
            longitude: -46.56590,
            contato: "(11) 2942-8094",
            link: "http://www.colsan.org.br/"
        },
        {
            nome: "COLSAN - Coleta Ermelino Matarazzo",
            endereco: "Rua Alamedda Rodrdigo de Brum, 1989 - Vila Paranagua, São Paulo - SP, 03807-230",
            latitude: -23.49945,
            longitude: -46.47256,
            contato: "(11) 2545-4652",
            link: "http://www.colsan.org.br/"
        },
        {
            nome: "COLSAN – Jundiaí – SP",
            endereco: "Rua XV de Novembro, 1848 - Vila Mun. - Jundiaí, São Paulo - SP, 13201-305",
            latitude: -23.18155,
            longitude: -46.88405,
            contato: "(11) 4521-4025",
            link: "http://www.colsan.org.br/"
        },
        {
            nome: "COLSAN – Posto de Coleta Mauá",
            endereco: "Rua Luís Lacava, 229 - Vila Bocaina - Mauá, São Paulo - SP, 09310-080",
            latitude: -23.66866,
            longitude: -46.45797,
            contato: "(11) 2564-1200",
            link: "http://www.colsan.org.br/"
        },
        {
            nome: "COLSAN Sociedade Beneficente Coleta de Sangue ",
            endereco: "Av. João Ramaçho, 326 - Vila Assunção- Santo André, São Paulo - SP, 09030-320",
            latitude: -23.66569,
            longitude: -46.52755,
            contato: "(55) 4433-3718",
            link: "http://www.colsan.org.br/"
        },
        {
            nome: "FAMEMA – Marília – SP",
            endereco: "Rua Monte Carmelo, 800 - Fragata - Marília, São Paulo - SP, 17519-030",
            latitude: -22.22651,
            longitude: -49.93665,
            contato: "(14) 3311-2929",
            link: "http://www.famema.br/"
        },
        {
            nome: "GSH Banco de Sangue de Ribeirão Preto",
            endereco: "Rua Quintino Bocaiuva, 975 - Vila Seixas - Ribeirão Preto, São Paulo - SP, 14015-160",
            latitude: -21.18940,
            longitude: -47.80410,
            contato: "(16) 3610-1515",
            link: "http://www.grupogsh.com/"
        },
        {
            nome: "Hemocentro - São José do Rio Preto",
            endereco: "Av. Jamil Feres Kfouri, 80 - Jardim Panorama - São José do Rio Preto, São Paulo - SP, 15091-240",
            latitude: -20.82750,
            longitude: -49.40011,
            contato: "(17) 3201-5078",
            link: "http://www.hemocentroriopreto.com.br/"
        },
        {
            nome: "Hemocentro Guarulhos Hospital Stella Maris - Guarulhos",
            endereco: "R. Maria Cândida Pereira, 568 - Vila Sao Joao, Guarulhos - SP, 07041-020",
            latitude: -23.47866,
            longitude: -46.55152,
            contato: "(11) 4573-7800",
            link: "http://www.prosangue.sp.gov.br/"
        },
        {
            nome: "HEMOCENTRO RP – Ribeirão Preto (Campus USP)",
            endereco: "Rua Tenente Catão Roxo, 2501 - Vila Monte Alegre, Ribeirão Preto - SP, 14051-140",
            latitude: -21.16031,
            longitude: -47.84855,
            contato: "(16) 2101-9352",
            link: "http://salvovidas.com/doacao-de-sangue-no-hemocentro-de-ribeirao-preto-sp/"
        },
        {
            nome: "Hemocentro São Lucas - Guarulhos",
            endereco: "R. Santo Antônio, 95 - Centro, Guarulhos - SP, 07110-110",
            latitude: -23.46778,
            longitude: -46.52484,
            contato: "(11) 3660-6040",
            link: "http://www.hemocentrosaolucas.com.br/"
        },
        {
            nome: "Hemocentro São Lucas - São Bernardo",
            endereco: "R. Coral, 369 - Jardim das Americas, São Bernardo do Campo - SP, 09725-730",
            latitude: -23.69361,
            longitude: -46.55657,
            contato: "(11) 3660-6000",
            link: "http://www.hemocentrosaolucas.com.br/"
        },
        {
            nome: "Hemonúcleo - Catanduva",
            endereco: "R. Treze de Maio, 974 - Centro, Catanduva - SP, 15800-010",
            latitude: -21.14020,
            longitude: -48.97623,
            contato: "(17) 3522-7722",
            link: "http://www.hemocentroriopreto.com.br/hemocentro-catanduva"
        },
        {
            nome: "Hemonúcleo de Piracicaba",
            endereco: "Av. Independência, 953 - Bairro Alto (santa casa), Piracicaba - SP, 13419-155",
            latitude: -22.73630,
            longitude: -47.64290,
            contato: "(19) 3422-2019",
            link: "http://www.facebook.com/hemonucleo.piracicaba"
        },
        {
            nome: "Hemonúcleo do Hospital de Base - Bauru",
            endereco: "R. Monsenhor Claro, 8-88 - Centro, Bauru - SP, 17015-130",
            latitude: -22.32989,
            longitude: -49.07689,
            contato: "(14) 3231-4771",
            link: "https://www.saopaulo.sp.gov.br/spnoticias/hemonucleo-de-bauru-reune-recordistas-de-doacao-de-sangue/"
        },
        {
            nome: "Hemonúcleo Regional de Araraquara",
            endereco: "Av. da Saudade, 58 - Centro, Araraquara - SP, 14801-360",
            latitude: -21.79408,
            longitude: -48.18178,
            contato: "(16) 3301-6102",
            link: "https://www.fcfar.unesp.br/hemonucleo"
        },
        {
            nome: "Hospital Estadual - Sumaré",
            endereco: "Av. da Amizade, 2400 - Jardim Bela Vista, Sumaré - SP, 13175-490",
            latitude: -22.81666,
            longitude: -47.24163,
            contato: "(19) 3883-8900",
            link: "http://www.hes.unicamp.br/"
        },
        {
            nome: "Hospital Municipal Doutor Waldemar Tebaldi",
            endereco: "R. Goiânia, 64 - Vila Nossa Sra. de Fatima, Americana - SP, 13478-660",
            latitude: -22.74167,
            longitude: -47.30857,
            contato: "Não consta",
            link: "Não consta"
        },
        {
            nome: "Hospital Municipal de Americana – Americana",
            endereco: "Av. da Saúde, 415 - Vila Nossa Sra. de Fatima, Americana - SP, 13478-640",
            latitude: -22.74245,
            longitude: -47.30880,
            contato: "(19) 3471-6750",
            link: "http://www.fusame.com.br/"
        },
        {
            nome: "Hospital Municipal Dr. Mário Gatti - Campinas",
            endereco: "Av. Pref. Faria Lima, 340 - Parque Italia, Campinas - SP, 13036-902",
            latitude: -22.91610,
            longitude: -47.06855,
            contato: "(19) 3772-5700",
            link: "http://www.hmmg.sp.gov.br/"
        },
        {
            nome: "Núcleo de Hemoterapia - Taubaté",
            endereco: "Av. Inglaterra, 190 - Jardim das Nações, Taubaté - SP, 12030-450",
            latitude: -23.03138,
            longitude: -45.57075,
            contato: "(12) 3624-1273",
            link: "http://www.hemocentro.fmrp.usp.br/"
        },
        {
            nome: "Núcleo de Hemoterapia de Araçatuba",
            endereco: "Rua Arthur Ferreira da Costa, 330 - Aviacao, Araçatuba - SP, 16055-500",
            latitude: -21.19294,
            longitude: -50.43143,
            contato: "(18) 2102-9400",
            link: "https://www.hemocentro.fmrp.usp.br/"
        },
        {
            nome: "Núcleo de Hemoterapia de Fernandópolis ",
            endereco: "R. Simão dos Santos Gomes, 266 - Jardim Santista, Fernandópolis - SP, 15600-000",
            latitude: -20.29481,
            longitude: -50.24733,
            contato: "(17) 3442-5544",
            link: "http://www.hemocentro.fmrp.usp.br/"
        },
        {
            nome: "Núcleo de Hemoterapia de Franca",
            endereco: "Av. Dr. Hélio Palermo, 4181 - Recanto do Itambé, Franca - SP, 14409-045",
            latitude: -20.51936,
            longitude: -47.39426,
            contato: "(16) 3402-5000",
            link: "http://www.hemocentro.fmrp.usp.br/"
        },
        {
            nome: "Núcleo de Hemoterapia de Presidente Prudente",
            endereco: "R. Wenceslau Braz, 05 - Instituto do coração - Vila Euclides, Pres. Prudente - SP, 19014-030",
            latitude: -22.12988,
            longitude: -51.39247,
            contato: "(18) 3223-3511",
            link: "http://www.hemocentro.fmrp.usp.br/"
        },
        {
            nome: "Pró-Sangue - Hemocentro de São Paulo",
            endereco: "Av. Dr. Enéas Carvalho de Aguiar, 155 - 1° andar - Cerqueira César, São Paulo - SP, 05403-000",
            latitude: -23.55738,
            longitude: -46.66869,
            contato: "(11) 4573-7800",
            link: "http://www.prosangue.sp.gov.br/"
        },
        {
            nome: "Pró-Sangue - Barueri",
            endereco: "Rua Ângela Mirella, 354 - Jardim Barueri, Barueri - SP, 06411-330",
            latitude: -23.49671,
            longitude: -46.87206,
            contato: "(11) 4573-7800",
            link: "http://www.prosangue.sp.gov.br/"
        },
        {
            nome: "Santa Casa - São Carlos",
            endereco: "R. Paulino Botelho de Abreu Sampaio, 573 - Jardim Pureza, São Carlos - SP, 13561-060",
            latitude: -22.01115,
            longitude: -47.90131,
            contato: "(16) 3509-1100",
            link: "https://www.santacasasaocarlos.com.br/"
        },
        {
            nome: "Serviço de Hematologia e Hemoterapia de São José dos Campos",
            endereco: "R. Antônio Saes, 425 - Centro, São José dos Campos - SP, 12210-040",
            latitude: -23.18723,
            longitude: -45.88175,
            contato: "(12) 3519-3766",
            link: "http://www.shhsjc.com.br/"
        },
        {
            nome: "Unidade de Hemoterapia - Bebedouro",
            endereco: "Anexo ao Hospital Municipal de Bebedouro - Av. Raul Furquim, 2010 - Jardim Julia, Bebedouro - SP, 14706-045",
            latitude: -20.93472,
            longitude: -48.49584,
            contato: "(17) 3342-8817",
            link: "https://www.hemocentro.fmrp.usp.br/"
        },
        {
            nome: "Unidade de Hemoterapia de Olímpia",
            endereco: "R. Síria, 190 - Centro, Olímpia - SP, 15400-000",
            latitude: -20.73658,
            longitude: -48.91805,
            contato: "(17) 3281-9080",
            link: "https://www.hemocentro.fmrp.usp.br/"
        },
        {
            nome: "Banco de Sangue de Itapeva",
            endereco: "R. Mario Prandini, 935 - Centro, Itapeva - SP, 18400-170",
            latitude: -23.98904,
            longitude: -48.87755,
            contato: "(15) 3522-",
            link: "https://www.santacasadeitapeva.org.br/unidades/banco-de-sangue/"
        },
        {
            nome: "Banco de Sangue de Sertãozinho - SP",
            endereco: "R. Epitácio Pessoa, 1401 - 1º Andar - Centro, Sertãozinho - SP, 14160-180",
            latitude: -21.13737,
            longitude: -47.99354,
            contato: "(16) 3942-3404",
            link: "http://www.bssdoesangue.com.br/"
        },
        {
            nome: "Banco de Sangue HSA - Guarujá",
            endereco: "R. Quinto Bertoldi, 40 - Vila Maia, Guarujá - SP, 11410-010",
            latitude: -23.99057,
            longitude: -46.25325,
            contato: "(13) 3389-1515",
            link: "http://www.hsamaro.org.br/"
        },
        {
            nome: "Bioclínica Banco de Sangue - São João da Boa Vista",
            endereco: "Av. João Osório, 701 - Centro, São João da Boa Vista - SP, 13870-251",
            latitude: -21.98227,
            longitude: -46.79568,
            contato: "(19) 3633-7036",
            link: "https://www.grupobioclinica.com.br/"
        },
        {
            nome: "Bioclínica Serviços Hemoterapia",
            endereco: "R. Carolina Malheiros, 92 - Vila Conrado, São João da Boa Vista - SP, 13870-720",
            latitude: -21.97825,
            longitude: -46.79026,
            contato: "(19) 3633-7036",
            link: "https://www.grupobioclinica.com.br/"
        },
        {
            nome: "Hemac - Ribeirão Preto - SP",
            endereco: "R. Altíno Arantes, 656 - Jardim Sumare, Ribeirão Preto - SP, 14025-120",
            latitude: -21.18619,
            longitude: -47.81473,
            contato: "(16) 2138-3590",
            link: "https://www.hapvida.com.br/site/"
        },
        {
            nome: "Hemocentro da Santa Casa de São Paulo",
            endereco: "R. Marquês de Itu, 579 - Vila Buarque, São Paulo - SP, 01223-001",
            latitude: -23.54382,
            longitude: -46.64998,
            contato: "(11) 2176-7155",
            link: "http://www.santacasasp.org.br/doesangue"
        },
        {
            nome: "Hemocentro De Botucatu - HCFMB",
            endereco: "Campus de Avenida Rubião Jr, Botucatu - SP, 18600-400",
            latitude: -22.88911,
            longitude: -48.49559,
            contato: "(14) 3811-6041",
            link: "https://hcfmb.unesp.br/hemocentro/"
        },
        {
            nome: "Unidade De Coleta De Sangue",
            endereco: "Av. da Saudade, 2603 - Cidade Nova, Votuporanga - SP, 15501-405",
            latitude: -20.42701,
            longitude: -49.98142,
            contato: "(17) 3423-2986",
            link: "Não consta"
        },
        {
            nome: "Hemocentro HSP Unifesp - São Paulo",
            endereco: "R. Dr. Diogo de Faria, 824 - Vila Clementino, São Paulo - SP, 04037-002",
            latitude: -23.59547,
            longitude: -46.64481,
            contato: "(11) 5576-4240",
            link: "https://hemocentro.unifesp.br/"
        },
        {
            nome: "Hemocentro Suzano",
            endereco: "Av. Antônio Marques Figueira - Vila Figueira, Suzano - SP, 08676-000",
            latitude: -23.55184,
            longitude: -46.30645,
            contato: "(11) 4752-9999",
            link: "http://www.transfusao.srv.br/"
        },
        {
            nome: "Bioclínica Análises Clínicas - Jundiaí",
            endereco: "R. Anchieta, 66 - Vila Boaventura, Jundiaí - SP, 13201-804",
            latitude: -23.18675,
            longitude: -46.88820,
            contato: "(11) 4431-2228",
            link: "http://www.grupobioclinica.com.br/"
        },
        {
            nome: "Bioclínica Análises Clínicas ",
            endereco: "R. Anchieta, 342 - Centro, Jundiaí - SP, 13214-804",
            latitude: -23.18475,
            longitude: -46.88959,
            contato: "(11) 4586-3600",
            link: "http://www.grupobioclinica.com.br/"
        },
        {
            nome: "Unidade de Coleta e Transfusão do Hospital Regional Famema - Assis",
            endereco: "Praça Dr. Symphronio Alves dos Santos, s/n - Centro, Assis - SP, 19800-000",
            latitude: -22.66020,
            longitude: -50.41011,
            contato: "(18) 3302-6000",
            link: "Não consta"
        },
        {
            nome: "UCT Tupã - Santa Casa da Misericórdia",
            endereco: "R. Manoel Ferreira Damião, 426 - Vila Frias, Tupã - SP, 17601-901",
            latitude: -21.92441,
            longitude: -50.51841,
            contato: "(14) 3404-5555",
            link: "http://www.santacasatupa.org.br/"
        },
        {
            nome: "Santa Casa de Mogi das Cruzes",
            endereco: "R. Barão de Jaceguai, 1148 - Centro, Mogi das Cruzes - SP, 08780-906",
            latitude: -23.52143,
            longitude: -46.18669,
            contato: "(11) 4728-4700",
            link: "http://www.santacasamc.com.br/"
        },
        {
            nome: "Instituto Rh Hematologia e Hemoterapia - Presidente Prudente",
            endereco: "Av. Cel. José Soares Marcondes, 2063 - Uep1-S.1, Pres. Prudente - SP, 19013-050",
            latitude: -22.12897,
            longitude: -51.39166,
            contato: "(18) 3226-1555",
            link: "https://www.facebook.com/institutorh"
        },
        {
            nome: "Instituto HOC - Bela Vista",
            endereco: "R. João Julião, 331 - Bela Vista, São Paulo - SP, 01323-020",
            latitude: -23.56856,
            longitude: -46.64329,
            contato: "(11) 3286-7372",
            link: "http://www.institutohoc.com.br/"
        },
        {
            nome: "Iamspe - (HSPE) Banco de Sangue do Hospital do Servidor Público Estadual",
            endereco: "Rua Pedro de Toledo, 1800 - Vila Clementino, São Paulo - SP, 04039-000",
            latitude: -23.59736,
            longitude: -46.65447,
            contato: "(11) 5589-7001",
            link: "https://www.iamspe.sp.gov.br/banco-de-sangue-2/"
        },
        {
            nome: "Hospital Sírio-Libanês - Bela Vista",
            endereco: "Rua Dona Adma Jafet, 91 - Bela Vista, São Paulo - SP, 01308-050",
            latitude: -23.55712,
            longitude: -46.65465,
            contato: "(11) 3394-5260/(11) 3394-0200",
            link: "https://hospitalsiriolibanes.org.br/unidades/bela-vista/"
        },
        {
            nome: "Hospital Santa Marcelina - São Paulo",
            endereco: "R. Santa Marcelina, 177 - Vila Carmosina, São Paulo - SP, 08270-070",
            latitude: -23.55399,
            longitude: -46.46089,
            contato: "(11) 2070-6000",
            link: "http://santamarcelina.org/"
        },
        {
            nome: "Hospital Samaritano Higienópolis - São Paulo",
            endereco: "R. Conselheiro Brotero, 1486 - Higienópolis, São Paulo - SP, 01232-010",
            latitude: -23.53911,
            longitude: -46.66183,
            contato: "(11) 3821-5300",
            link: "http://www.samaritano.com.br/"
        },
        {
            nome: "Hospital Municipal Ermelino Matarazzo",
            endereco: "Alameda Rodrigo de Brum, 1989 - Ermelino Matarazzo, São Paulo - SP, 03807-230",
            latitude: -23.49957,
            longitude: -46.47253,
            contato: "(11) 3394-8030",
            link: "http://www.prefeitura.sp.gov.br/cidade/secretarias/saude/autarquia_hospitalar_municipal/unidades_da_ahm/index.php?p=189616"
        },
        {
            nome: "Hospital Municipal Doutor Carmino Caricchio de Tatuapé - São Paulo",
            endereco: "Av. Celso Garcia, 4815 - Tatuapé, São Paulo - SP, 03085-030",
            latitude: -23.53317,
            longitude: -46.56636,
            contato: "(11) 3394-6980",
            link: "https://www.prefeitura.sp.gov.br/cidade/secretarias/saude/autarquia_hospitalar_municipal/unidades_da_ahm/index.php?p=298279"
        },
        {
            nome: "Hospital Geral de Pirajussara - Taboão da Serra",
            endereco: "Av. Ibirama, 1214 - Parque Industrial Daci, Taboão da Serra - SP, 06785-300",
            latitude: -23.64047,
            longitude: -46.80988,
            contato: "(11) 3583-9400",
            link: "http://hgp.spdmafiliadas.org.br/"
        },
        {
            nome: "Hospital do Servidor Publico Municipal - São Paulo",
            endereco: "R. Castro Alves, 60 - Aclimação, São Paulo - SP, 01532-000",
            latitude: -23.56679,
            longitude: -46.63927,
            contato: "(11) 3397-7700",
            link: "https://www.prefeitura.sp.gov.br/cidade/secretarias/saude/hospital_do_servidor_publico_municipal"
        },
        {
            nome: "Hospital de Cubatão",
            endereco: "Av. Henry Borden, s/n - Vila Santa Rosa, Cubatão - SP, 11515-000",
            latitude: -23.89035,
            longitude: -46.42098,
            contato: "(13) 3388-4887",
            link: "Não consta"
        },
        {
            nome: "Hospital Beneficência Portuguesa de São Paulo",
            endereco: "R. Maestro Cardim, 637 - Bela Vista, São Paulo - SP, 01323-001",
            latitude: -23.56661,
            longitude: -46.64193,
            contato: "(11) 3505-1000",
            link: "http://www.bp.org.br/"
        },
        {
            nome: "Hospital Beneficência Portuguesa de São José do Rio Preto",
            endereco: "R. Luíz Vaz de Camões, 3150 - Vila Redentora, São José do Rio Preto - SP, 15015-750",
            latitude: -20.82247,
            longitude: -49.39024,
            contato: "(17) 2139-1800",
            link: "https://beneriopreto.com.br/"
        },
        {
            nome: "Hospital Beneficência Portuguesa Mirante",
            endereco: "R. Martiniano de Carvalho, 965 - Bela Vista, São Paulo - SP, 01323-001",
            latitude: -23.56746,
            longitude: -46.64284,
            contato: "(11) 3505-1000",
            link: "http://www.bp.org.br/mirante/"
        },
        {
            nome: "Hospital Amaral Carvalho - Jaú",
            endereco: "R. Doná Silvéria, 150 - Chácara Braz Miraglia, Jaú - SP, 17210-070",
            latitude: -22.29150,
            longitude: -48.55002,
            contato: "(14) 3602-1200",
            link: "http://www.amaralcarvalho.org.br/"
        },
        {
            nome: "Hospital A.C. Camargo - São Paulo",
            endereco: "Rua Tamandaré, 753 - Liberdade, São Paulo - SP, 01525-001",
            latitude: -23.56558,
            longitude: -46.63553,
            contato: "(11) 2189-5000",
            link: "https://www.accamargo.org.br/"
        },
        {
            nome: "Hospital A.C. Camargo - Unidade Antônio Prudente",
            endereco: "R. Prof. Antônio Prudente, 211 - Liberdade, São Paulo - SP, 01509-010",
            latitude: -23.56544,
            longitude: -46.63756,
            contato: "(11) 2189-5000",
            link: "https://www.accamargo.org.br/"
        },
        {
            nome: "Hemonúcleo Regional USF - Hospital Universitário São Francisco de Assis - Bragança Paulista",
            endereco: "Av. São Francisco de Assis, 260 - Cidade Universitária, Bragança Paulista - SP, 12916-542",
            latitude: -22.97972,
            longitude: -46.53442,
            contato: "(11) 2490-1240",
            link: "http://www.husf.com.br/"
        },
        {
            nome: "Hemonúcleo de Bauru",
            endereco: "R. Monsenhor Claro, 8-88 - Centro, Bauru - SP, 17015-130",
            latitude: -22.32989,
            longitude: -49.07688,
            contato: "(14) 3231-4771",
            link: "https://www.saopaulo.sp.gov.br/spnoticias/hemonucleo-de-bauru-reune-recordistas-de-doacao-de-sangue/"
        }
  ]};

}

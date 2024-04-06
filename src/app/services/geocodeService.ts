import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeocodeService {
  private apiKey = 'AIzaSyBRTifW4jDH09jijTRaU4qlARgikVf31RI';

  constructor() { }

  public geocodeAddress(address: string): Promise<any> {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${this.apiKey}`;
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.status === 'OK') {
          const location = data.results[0].geometry.location;
          return location;
        } else {
          throw new Error('Erro ao geocodificar o endereço');
        }
      })
      .catch(error => {
        console.error('Erro:', error);
        throw error;
      });
  }
}

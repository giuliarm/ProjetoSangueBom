import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Utils {

  constructor() { }

  public calcularDistancia(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Raio da Terra em quilômetros
    const dLat = this.grausParaRadianos(lat2 - lat1);
    const dLon = this.grausParaRadianos(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(this.grausParaRadianos(lat1)) * Math.cos(this.grausParaRadianos(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distancia = R * c; // Distância em quilômetros
    return distancia;
}

public grausParaRadianos(graus: number): number {
    return graus * (Math.PI / 180);
}
}

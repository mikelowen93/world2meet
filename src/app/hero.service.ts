import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Hero } from './hero.model';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroes: Hero[] = [
    { id: 1, name: 'Spiderman' },
    { id: 2, name: 'Iron Man' },
    { id: 3, name: 'Wonder Woman' }
    // Agrega más héroes según sea necesario
  ];

  constructor() {}

  /** 
  *Simulación de datos: Se utiliza una matriz de héroes heroes como fuente de datos simulados. 
  Esto permite que tu aplicación funcione sin depender de una API real, lo que facilita el 
  desarrollo y las pruebas.

  *Conexión con una API real: Aunque actualmente no estás conectando a una API real, el diseño 
  de tu servicio facilita la transición a una API real en el futuro. Los métodos del servicio 
  (getHeroes, getHero, createHero, updateHero, deleteHero) están diseñados para trabajar con 
  observables, lo que significa que puedes cambiar la implementación para que haga solicitudes 
  HTTP a una API real en lugar de trabajar con datos simulados.

  *Simulación de llamadas a la API mediante observables: Se utilizan observables para simular las
   llamadas a la API. Los métodos getHeroes, getHero, createHero, updateHero, deleteHero devuelven 
   observables que emiten datos (o completan) cuando se realizan las operaciones correspondientes. 
   Esto permite que los componentes de tu aplicación se suscriban a estos observables y reaccionen 
   a los cambios en los datos.
  */
  getHeroes(): Observable<Hero[]> {
    return of(this.heroes);
  }

  getHero(id: number): Observable<Hero> {
    const hero = this.heroes.find(hero => hero.id === id);
    if (hero) {
      return of(hero);
    } else {
      // Manejar el caso en el que no se encuentra ningún héroe con el ID especificado
      // Por ejemplo, lanzar un error o devolver un héroe por defecto
      throw new Error(`No se encontró ningún héroe con el ID ${id}`);
    }
  }

  createHero(hero: Hero): Observable<void> {
    hero.id = this.heroes.length + 1;
    this.heroes.push(hero);
    return of(undefined);
  }

  updateHero(hero: Hero): Observable<void> {
    const index = this.heroes.findIndex(h => h.id === hero.id);
    if (index !== -1) {
      this.heroes[index] = hero;
    }
    return of(undefined);
  }

  deleteHero(id: number): Observable<void> {
    this.heroes = this.heroes.filter(hero => hero.id !== id);
    return of(undefined);
  }
}
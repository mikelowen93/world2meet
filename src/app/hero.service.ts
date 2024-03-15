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

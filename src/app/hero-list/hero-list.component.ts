import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable,of, timer } from 'rxjs';
import { Hero } from '../hero.model';
import { HeroService } from '../hero.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { delay, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss']
})

export class HeroListComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  searchTerm: string = '';
  loading: boolean = false;

  constructor(private heroService: HeroService, private router: Router, private snackBar: MatSnackBar) {
    this.heroes$ = this.heroService.getHeroes();
  }

  ngOnInit(): void {
    this.loadHeroes();
  }

  loadHeroes(): void {
    // Activar el loader solo al principio de la carga de la vista
    if (!this.loading) {
        this.loading = true;

        timer(300).pipe(
            switchMap(() => this.heroService.getHeroes()),
            delay(30) // Simula un retraso adicional para mostrar el loader
        ).subscribe({
            next: (heroes) => {
                this.heroes$ = of(heroes.filter(hero => hero.name.toLowerCase().includes(this.searchTerm.toLowerCase())));
                this.loading = false; // Desactivar el loader después de cargar los héroes
            },
            error: (error) => {
                console.error('Error al cargar los héroes:', error);
                this.loading = false; // Desactivar el loader en caso de error
            }
        });
    }
}

  editHero(id: number): void {
    this.router.navigate(['/heroes/edit', id]);
  }

  deleteHero(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este héroe?')) {
      this.heroService.deleteHero(id).subscribe(() => {
        this.snackBar.open('Héroe eliminado correctamente', 'Cerrar', {
          duration: 3000
        });
        this.heroes$ = this.heroService.getHeroes(); // Actualiza la lista de héroes después de eliminar
      });
    }
  }

  showNotification(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 2000 // Duración en milisegundos
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Hero } from '../hero.model';
import { HeroService } from '../hero.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';

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
    this.loading = true;
    this.heroes$ = this.heroService.getHeroes().pipe(
      map(heroes => heroes.filter(hero => hero.name.toLowerCase().includes(this.searchTerm.toLowerCase())))
    );
    this.heroes$.subscribe(() => {
      this.loading = false;
    });
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

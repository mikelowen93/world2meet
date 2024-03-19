import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Hero } from '../hero.model';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-edit',
  templateUrl: './hero-edit.component.html',
  styleUrls: ['./hero-edit.component.scss']
})
export class HeroEditComponent implements OnInit {
  hero$: Observable<Hero> | undefined;
  heroId: number | undefined;
  errorMessage: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private heroService: HeroService
  ) {
    this.heroId = 0;
  }

  ngOnInit(): void {
    this.hero$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.heroId = +params.get('id')!;
        return this.heroService.getHero(this.heroId);
      })
    );
  // Manejar el caso en el que el héroe con el ID proporcionado no existe
  this.hero$.subscribe(
    () => {},
    error => {
      this.errorMessage = `El héroe con ID ${this.heroId} no existe`;
    }
  );
  
  
  }

  saveChanges(hero: Hero): void {
    this.heroService.updateHero(hero).subscribe(() => {
      this.router.navigate(['/heroes']);
    });
  }
}

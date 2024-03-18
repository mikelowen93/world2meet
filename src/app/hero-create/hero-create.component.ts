import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Hero } from '../hero.model';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-create',
  templateUrl: './hero-create.component.html',
  styleUrls: ['./hero-create.component.scss']
})
export class HeroCreateComponent {
  newHeroForm: FormGroup;
  hero: Hero = { id: 0, name: '' }; // Define hero como un objeto de tipo Hero
  minCharsRequired: number = 4; // Definir el mínimo de caracteres requerido

  constructor(private fb: FormBuilder, private heroService: HeroService, private router: Router) {
    this.newHeroForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(this.minCharsRequired)]]
      // Agrega más campos y validadores según sea necesario
    });
  }

  createHero(): void {
    if (this.newHeroForm.valid) {
      const newHero: Hero = this.newHeroForm.value; // Utiliza el tipo Hero para newHero
      this.heroService.createHero(newHero).subscribe(() => {
        this.router.navigate(['/heroes']);
      });
    }
  }
}
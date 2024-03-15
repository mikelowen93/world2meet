import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroCreateComponent } from './hero-create.component';
import { HeroService } from '../hero.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Hero } from '../hero.model';


describe('HeroCreateComponent', () => {
  let component: HeroCreateComponent;
  let fixture: ComponentFixture<HeroCreateComponent>;
  let heroService: jasmine.SpyObj<HeroService>;
  let router: Router;

  beforeEach(async () => {
    heroService = jasmine.createSpyObj('HeroService', ['createHero']);
    router = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      declarations: [ HeroCreateComponent ],
      providers: [
        { provide: HeroService, useValue: heroService },
        { provide: Router, useValue: router }
      ],
      imports: [FormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroCreateComponent);
    component = fixture.componentInstance;
    heroService = TestBed.inject(HeroService) as jasmine.SpyObj<HeroService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create a new hero', () => {
    const newHero: Hero = { id: 1, name: 'Test Hero' };
    component.newHeroForm.setValue(newHero);
    component.createHero();
    expect(heroService.createHero).toHaveBeenCalledWith(newHero);
    expect(router.navigate).toHaveBeenCalledWith(['/heroes']);
  });
});

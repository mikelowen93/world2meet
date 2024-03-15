import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroListComponent } from './hero-list.component';
import { HeroService } from '../hero.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeroListComponent', () => {
  let component: HeroListComponent;
  let fixture: ComponentFixture<HeroListComponent>;
  let heroService: jasmine.SpyObj<HeroService>;

  beforeEach(async () => {
    heroService = jasmine.createSpyObj('HeroService', ['getHeroes', 'deleteHero']);
    await TestBed.configureTestingModule({
      declarations: [HeroListComponent],
      providers: [{ provide: HeroService, useValue: heroService }],
      imports: [RouterTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch heroes on init', () => {
    const heroes = [{ id: 1, name: 'Hero 1' }, { id: 2, name: 'Hero 2' }];
    heroService.getHeroes.and.returnValue(of(heroes));
    fixture.detectChanges();
    expect(component.heroes$).toEqual(of(heroes));
  });

  it('should delete a hero', () => {
    const heroId = 1;
    spyOn(window, 'confirm').and.returnValue(true);
    heroService.deleteHero.and.returnValue(of(undefined));
    component.deleteHero(heroId);
    expect(heroService.deleteHero).toHaveBeenCalledWith(heroId);
    // You can also test if the heroes list gets updated after deletion
  });
});


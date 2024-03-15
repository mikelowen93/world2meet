import { TestBed } from '@angular/core/testing';

import { HeroService } from './hero.service';

describe('HeroService', () => {
  let service: HeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return heroes', () => {
    service.getHeroes().subscribe(heroes => {
      expect(heroes.length).toBeGreaterThan(0);
    });
  });

  it('should return a specific hero by id', () => {
    const heroId = 1;
    service.getHero(heroId).subscribe(hero => {
      expect(hero).toBeTruthy();
      expect(hero.id).toBe(heroId);
    });
  });

  it('should create a new hero', () => {
    const newHero = { id: 4, name: 'New Hero' };
    service.createHero(newHero).subscribe(() => {
      service.getHero(newHero.id).subscribe(hero => {
        expect(hero).toEqual(newHero);
      });
    });
  });

  it('should update an existing hero', () => {
    const updatedHero = { id: 1, name: 'Updated Hero' };
    service.updateHero(updatedHero).subscribe(() => {
      service.getHero(updatedHero.id).subscribe(hero => {
        expect(hero).toEqual(updatedHero);
      });
    });
  });

  it('should delete a hero', () => {
    const heroId = 1;
    service.deleteHero(heroId).subscribe(() => {
      service.getHero(heroId).subscribe(hero => {
        expect(hero).toBeFalsy();
      });
    });
  });
});
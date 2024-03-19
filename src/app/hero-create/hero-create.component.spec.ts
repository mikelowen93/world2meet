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

  // Configuración inicial antes de cada prueba
  beforeEach(async () => {
    // Crear un SpyObj para HeroService
    heroService = jasmine.createSpyObj('HeroService', ['createHero']);
    // Crear un SpyObj para Router
    router = jasmine.createSpyObj('Router', ['navigate']);
    // Configurar el módulo de pruebas
    await TestBed.configureTestingModule({
      declarations: [ HeroCreateComponent ],
      providers: [
        { provide: HeroService, useValue: heroService }, // Usar el HeroService falso
        { provide: Router, useValue: router } // Usar el Router falso
      ],
      imports: [FormsModule] // Importar FormsModule para el formulario
    })
    .compileComponents(); // Compilar los componentes
  });

  // Configuración antes de cada prueba
  beforeEach(() => {
    // Crear el componente y obtener el fixture
    fixture = TestBed.createComponent(HeroCreateComponent);
    component = fixture.componentInstance;
    // Obtener instancias de HeroService y Router para las pruebas
    heroService = TestBed.inject(HeroService) as jasmine.SpyObj<HeroService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    // Detectar cambios en el componente
    fixture.detectChanges();
  });

  // Prueba: debería crear un nuevo héroe
  it('should create a new hero', () => {
    // Definir un nuevo héroe para la prueba
    const newHero: Hero = { id: 1, name: 'Test Hero' };
    // Establecer el valor del formulario del componente al nuevo héroe
    component.newHeroForm.setValue(newHero);
    // Llamar a la función para crear un héroe
    component.createHero();
    // Afirmar que el método createHero de HeroService fue llamado con el nuevo héroe
    expect(heroService.createHero).toHaveBeenCalledWith(newHero);
    // Afirmar que la función navigate de Router fue llamada con la ruta '/heroes'
    expect(router.navigate).toHaveBeenCalledWith(['/heroes']);
  });
});

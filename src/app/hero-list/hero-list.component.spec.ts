import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroListComponent } from './hero-list.component';
import { HeroService } from '../hero.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeroListComponent', () => {
  let component: HeroListComponent;
  let fixture: ComponentFixture<HeroListComponent>;
  let heroService: jasmine.SpyObj<HeroService>;

  // Configuración inicial antes de cada prueba
  beforeEach(async () => {
    // Crear un SpyObj para HeroService
    heroService = jasmine.createSpyObj('HeroService', ['getHeroes', 'deleteHero']);
    // Configurar el módulo de pruebas
    await TestBed.configureTestingModule({
      declarations: [HeroListComponent], // Declarar el componente bajo prueba
      providers: [{ provide: HeroService, useValue: heroService }], // Proporcionar el HeroService falso
      imports: [RouterTestingModule] // Importar RouterTestingModule
    }).compileComponents(); // Compilar los componentes
  });

  // Configuración antes de cada prueba
  beforeEach(() => {
    // Crear el componente y obtener el fixture
    fixture = TestBed.createComponent(HeroListComponent);
    component = fixture.componentInstance;
  });

  // Prueba: debería crear el componente
  it('should create', () => {
    // Afirmar que el componente se creó exitosamente
    expect(component).toBeTruthy();
  });

  // Prueba: debería obtener héroes al inicializar
  it('should fetch heroes on init', () => {
    // Definir los héroes a ser retornados por el método getHeroes
    const heroes = [{ id: 1, name: 'Hero 1' }, { id: 2, name: 'Hero 2' }];
    // Configurar el comportamiento del método getHeroes del HeroService falso
    heroService.getHeroes.and.returnValue(of(heroes));
    // Detectar cambios en el componente
    fixture.detectChanges();
    // Afirmar que la propiedad heroes$ del componente es igual al observable de héroes
    expect(component.heroes$).toEqual(of(heroes));
  });

  // Prueba: debería eliminar un héroe
  it('should delete a hero', () => {
    // Definir el ID del héroe a ser eliminado
    const heroId = 1;
    // Simular la confirmación del usuario al eliminar un héroe
    spyOn(window, 'confirm').and.returnValue(true);
    // Configurar el comportamiento del método deleteHero del HeroService falso
    heroService.deleteHero.and.returnValue(of(undefined));
    // Llamar a la función para eliminar un héroe
    component.deleteHero(heroId);
    // Afirmar que el método deleteHero de HeroService fue llamado con el ID del héroe
    expect(heroService.deleteHero).toHaveBeenCalledWith(heroId);
    // También puedes comprobar si la lista de héroes se actualiza tras la eliminación
  });
});
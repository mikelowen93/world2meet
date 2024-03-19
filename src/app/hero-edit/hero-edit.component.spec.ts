import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroEditComponent } from './hero-edit.component';

describe('HeroEditComponent', () => {
  let component: HeroEditComponent;
  let fixture: ComponentFixture<HeroEditComponent>;

  // Configuración antes de cada prueba
  beforeEach(() => {
    // Configurar el módulo de pruebas
    TestBed.configureTestingModule({
      declarations: [HeroEditComponent] // Declarar el componente bajo prueba
    });
    // Crear el componente y obtener el fixture
    fixture = TestBed.createComponent(HeroEditComponent);
    component = fixture.componentInstance;
    // Detectar cambios en el componente
    fixture.detectChanges();
  });

  // Prueba: debería crear el componente
  it('should create', () => {
    // Afirmar que el componente se creó exitosamente
    expect(component).toBeTruthy();
  });
});

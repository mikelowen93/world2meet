import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoaderComponent } from './loader.component';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;

  // Configuración antes de cada prueba
  beforeEach(() => {
    // Configurar el módulo de pruebas
    TestBed.configureTestingModule({
      declarations: [LoaderComponent] // Declarar el componente bajo prueba
    });
    // Crear el componente y obtener el fixture
    fixture = TestBed.createComponent(LoaderComponent);
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

import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  standalone: true,
  template: `
    <h1>EMF Tools</h1>
    <div style="margin: 20px 0">
      <h2>Umrechnung zwischen magnetischer Flussdichte B & magnetischer Feldstärke H:</h2>
      <div style="margin: 10px 0">
        <label>
          B (mT) = 
          <input type="number" [(ngModel)]="bFieldMilliTesla" (ngModelChange)="calculateH()" style="width: 100px">
        </label>
      </div>
      <div style="margin: 10px 0">
        <label>
          H (A/m) = 
          <input type="number" [(ngModel)]="hField" (ngModelChange)="calculateB()" style="width: 100px">
        </label>
      </div>
      <p style="color: #666; font-size: 0.9em">
        Formel: B = μ₀ × H <br>
        μ₀ = 4π × 10⁻⁷ Vs/Am (magnetische Feldkonstante) <br>
        1 mT = 0.001 T
      </p>
    </div>

    <div style="margin: 20px 0">
      <h2>Magnetfeld eines Einzelleiters:</h2>
      <div style="margin: 10px 0">
        <label>
          Strom I (A) = 
          <input type="number" [(ngModel)]="current" (ngModelChange)="calculateSingleWireField()" style="width: 100px">
        </label>
      </div>
      <div style="margin: 10px 0">
        <label>
          Abstand r (m) = 
          <input type="number" [(ngModel)]="distance" (ngModelChange)="calculateSingleWireField()" style="width: 100px">
        </label>
      </div>
      <div style="margin: 10px 0">
        Magnetische Flussdichte B = {{ singleWireFieldMilliTesla.toFixed(3) }} mT
      </div>
      <p style="color: #666; font-size: 0.9em">
        Formel: B = (μ₀ × I) / (2π × r) <br>
        μ₀ = 4π × 10⁻⁷ Vs/Am (magnetische Feldkonstante)
      </p>
    </div>

    <div style="margin: 20px 0">
      <h2>Magnetfeld einer Helmholtzspule:</h2>
    </div>
  `,
})
export class App {
  bFieldMilliTesla: number = 0;
  hField: number = 0;
  current: number = 0;
  distance: number = 0;
  singleWireFieldMilliTesla: number = 0;
  μ0: number = 4 * Math.PI * 1e-7; // magnetische Feldkonstante

  calculateH() {
    if (this.bFieldMilliTesla != null) {
      // Umrechnung von mT in T und dann Berechnung von H
      const bFieldTesla = this.bFieldMilliTesla * 0.001;
      this.hField = bFieldTesla / this.μ0;
    }
  }

  calculateB() {
    if (this.hField != null) {
      // Berechnung in Tesla und Umrechnung in mT
      const bFieldTesla = this.hField * this.μ0;
      this.bFieldMilliTesla = bFieldTesla * 1000;
    }
  }

  calculateSingleWireField() {
    if (this.current != null && this.distance != null && this.distance !== 0) {
      // B = (μ0 × I) / (2π × r)
      const bFieldTesla = (this.μ0 * this.current) / (2 * Math.PI * this.distance);
      this.singleWireFieldMilliTesla = bFieldTesla * 1000; // Umrechnung in mT
    } else {
      this.singleWireFieldMilliTesla = 0;
    }
  }
}

bootstrapApplication(App, {
  providers: [
    provideAnimations()
  ]
}).catch(err => console.error(err));
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
      <h2>Umrechnung zwischen elektrischem (E) und magnetischem Feld (H) im Fernfeld:</h2>
      <div style="display: flex; gap: 20px; margin-bottom: 20px">
        <div style="flex: 1">
          <div style="margin: 10px 0">
            <label>
              E (V/m) = 
              <input type="number" [(ngModel)]="eField" (ngModelChange)="calculateHFromE()" style="width: 100px">
            </label>
          </div>
          <div style="margin: 10px 0">
            <label>
              H (A/m) = 
              <input type="number" [(ngModel)]="hFieldWave" (ngModelChange)="calculateEFromH()" style="width: 100px">
            </label>
          </div>
          <p style="color: #666; font-size: 0.9em">
            Formeln: <br>
            E = Z₀ × H <br>
            H = E / Z₀ <br>
            Z₀ = √(μ₀/ε₀) ≈ 377 Ω (Wellenwiderstand des Vakuums)
          </p>
        </div>
        <div style="flex: 1">
          <svg viewBox="0 0 400 300" style="width: 100%; max-width: 400px;">
            <!-- Koordinatensystem -->
            <line x1="50" y1="150" x2="350" y2="150" stroke="black" stroke-width="1"/> <!-- x-Achse -->
            <line x1="200" y1="50" x2="200" y2="250" stroke="black" stroke-width="1"/> <!-- y-Achse -->
            <line x1="200" y1="150" x2="300" y2="50" stroke="black" stroke-width="1" stroke-dasharray="4"/> <!-- z-Achse -->
            
            <!-- Achsenbeschriftungen -->
            <text x="340" y="140" font-size="12">x (E)</text>
            <text x="210" y="60" font-size="12">y (H)</text>
            <text x="290" y="60" font-size="12">z</text>

            <!-- E-Feld Vektor (rot) -->
            <line x1="200" y1="150" x2="300" y2="150" stroke="red" stroke-width="2" marker-end="url(#arrowheadRed)"/>
            <text x="250" y="140" fill="red" font-size="12">E</text>

            <!-- H-Feld Vektor (blau) -->
            <line x1="200" y1="150" x2="200" y2="80" stroke="blue" stroke-width="2" marker-end="url(#arrowheadBlue)"/>
            <text x="190" y="110" fill="blue" font-size="12">H</text>

            <!-- Ausbreitungsrichtung (grün) -->
            <line x1="200" y1="150" x2="270" y2="80" stroke="green" stroke-width="2" marker-end="url(#arrowheadGreen)"/>
            <text x="250" y="100" fill="green" font-size="12">k</text>

            <!-- Pfeilspitzen-Definitionen -->
            <defs>
              <marker id="arrowheadRed" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="red"/>
              </marker>
              <marker id="arrowheadBlue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="blue"/>
              </marker>
              <marker id="arrowheadGreen" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="green"/>
              </marker>
            </defs>
          </svg>
          <p style="color: #666; font-size: 0.9em">
            Legende:<br>
            E : Elektrisches Feld (rot)<br>
            H : Magnetisches Feld (blau)<br>
            k : Ausbreitungsrichtung (grün)
          </p>
        </div>
      </div>
    </div>

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
      <div style="display: flex; gap: 20px; margin-bottom: 20px">
        <div style="flex: 1">
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
            Magnetische Flussdichte B im Abstand r = {{ singleWireFieldMilliTesla.toFixed(3) }} mT
          </div>
          <p style="color: #666; font-size: 0.9em">
            Formel: B = (μ₀ × I) / (2π × r) <br>
            μ₀ = 4π × 10⁻⁷ Vs/Am (magnetische Feldkonstante)
          </p>
        </div>
        <div style="flex: 1">
          <svg viewBox="0 0 400 300" style="width: 100%; max-width: 400px;">
            <!-- Koordinatensystem -->
            <line x1="50" y1="150" x2="350" y2="150" stroke="black" stroke-width="1"/>
            <line x1="200" y1="50" x2="200" y2="250" stroke="black" stroke-width="1"/>
            
            <!-- Leiter -->
            <!-- <line x1="200" y1="50" x2="200" y2="250" stroke="blue" stroke-width="4"/> -->
            
            <!-- Magnetfeldlinien (konzentrische Kreise) -->
            <circle cx="200" cy="150" r="30" stroke="red" stroke-width="1" fill="none"/>
            <circle cx="200" cy="150" r="60" stroke="red" stroke-width="1" fill="none"/>
            <circle cx="200" cy="150" r="90" stroke="red" stroke-width="1" fill="none"/>
            
            <!-- Pfeile für Magnetfeldrichtung -->
            <path d="M 170 150 A 30 30 1 0 0 200 180" stroke="red" stroke-width="1" fill="none" marker-end="url(#arrowhead)"/>
            <path d="M 140 150 A 60 60 1 0 0 200 210" stroke="red" stroke-width="1" fill="none" marker-end="url(#arrowhead)"/>
            <path d="M 110 150 A 90 90 1 0 0 200 240" stroke="red" stroke-width="1" fill="none" marker-end="url(#arrowhead)"/>
            
            <!-- Strompfeil -->
            <circle cx="200" cy="150" r="15" stroke="green" stroke-width="1" fill="none"/>
            <text x="200" y="155" text-anchor="middle" font-size="16">•</text>
            
            <!-- Beschriftungen -->
            <text x="220" y="140" font-size="12">r</text>
            <text x="260" y="170" font-size="12">B</text>
            <text x="180" y="150" text-anchor="end" font-size="12">I</text>
            
            <!-- Abstandsmarkierung -->
            <line x1="200" y1="150" x2="260" y2="150" stroke="black" stroke-width="1" stroke-dasharray="4"/>
            
            <!-- Pfeilspitzen-Definition -->
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="red"/>
              </marker>
            </defs>
          </svg>
        </div>
      </div>
      <p style="color: #666; font-size: 0.9em">
        Legende:<br>
        • : Strom fließt aus der Ebene heraus<br>
        r : Abstand vom Leiter<br>
        B : Magnetische Flussdichte (Feldlinien)<br>
        Rote Pfeile zeigen die Richtung des Magnetfelds
      </p>
    </div>

    <div style="margin: 20px 0">
      <h2>Magnetfeld einer Helmholtzspule:</h2>
      <div style="display: flex; gap: 20px; margin-bottom: 20px">
        <div style="flex: 1">
          <div style="margin: 10px 0">
            <label>
              Windungszahl N = 
              <input type="number" [(ngModel)]="turns" (ngModelChange)="calculateHelmholtzField()" style="width: 100px">
            </label>
          </div>
          <div style="margin: 10px 0">
            <label>
              Strom I (A) = 
              <input type="number" [(ngModel)]="helmholtzCurrent" (ngModelChange)="calculateHelmholtzField()" style="width: 100px">
            </label>
          </div>
          <div style="margin: 10px 0">
            <label>
              Radius r (m) = 
              <input type="number" [(ngModel)]="radius" (ngModelChange)="calculateHelmholtzField()" style="width: 100px">
            </label>
          </div>
          <div style="margin: 10px 0">
            Magnetische Flussdichte B im Zentrum = {{ helmholtzFieldMilliTesla.toFixed(3) }} mT
          </div>
          <p style="color: #666; font-size: 0.9em">
            Formel: B = (8 × μ₀ × N × I) / (5√5 × r) <br>
            μ₀ = 4π × 10⁻⁷ Vs/Am (magnetische Feldkonstante)
          </p>
        </div>
        <div style="flex: 1">
          <svg viewBox="0 0 400 300" style="width: 100%; max-width: 400px;">
            <!-- Koordinatensystem -->
            <line x1="50" y1="150" x2="350" y2="150" stroke="black" stroke-width="1"/>
            <line x1="200" y1="50" x2="200" y2="250" stroke="black" stroke-width="1"/>
            
            <!-- Spulen -->
            <ellipse cx="125" cy="150" rx="30" ry="75" stroke="blue" stroke-width="2" fill="none"/>
            <ellipse cx="275" cy="150" rx="30" ry="75" stroke="blue" stroke-width="2" fill="none"/>
            
            <!-- Windungen andeuten -->
            <path d="M 125 75 q 5 5 0 10" stroke="blue" stroke-width="2" fill="none"/>
            <path d="M 125 85 q 5 5 0 10" stroke="blue" stroke-width="2" fill="none"/>
            <path d="M 125 205 q 5 5 0 10" stroke="blue" stroke-width="2" fill="none"/>
            <path d="M 125 215 q 5 5 0 10" stroke="blue" stroke-width="2" fill="none"/>
            
            <path d="M 275 75 q 5 5 0 10" stroke="blue" stroke-width="2" fill="none"/>
            <path d="M 275 85 q 5 5 0 10" stroke="blue" stroke-width="2" fill="none"/>
            <path d="M 275 205 q 5 5 0 10" stroke="blue" stroke-width="2" fill="none"/>
            <path d="M 275 215 q 5 5 0 10" stroke="blue" stroke-width="2" fill="none"/>
            
            <!-- Beschriftungen -->
            <text x="135" y="185" text-anchor="end" font-size="12">r</text>
            <text x="285" y="185" text-anchor="end" font-size="12">r</text>
            <text x="210" y="165" text-anchor="end" font-size="12">r</text>
            <text x="125" y="60" text-anchor="middle" font-size="12">N Windungen</text>
            <text x="275" y="60" text-anchor="middle" font-size="12">N Windungen</text>            
            <text x="190" y="140" text-anchor="end" font-size="12">B</text>
            
            <!-- Radius-Markierung -->
            <line x1="125" y1="150" x2="275" y2="150" stroke="red" stroke-width="1" stroke-dasharray="4"/>
            <line x1="125" y1="150" x2="125" y2="225" stroke="red" stroke-width="1" stroke-dasharray="4"/>
            <line x1="275" y1="150" x2="275" y2="225" stroke="red" stroke-width="1" stroke-dasharray="4"/>
            
            <!-- Strompfeile -->
            <circle cx="125" cy="90" r="15" stroke="green" stroke-width="1" fill="none"/>
            <text x="125" y="95" text-anchor="middle" font-size="16">×</text>
            
            <circle cx="275" cy="90" r="15" stroke="green" stroke-width="1" fill="none"/>
            <text x="275" y="95" text-anchor="middle" font-size="16">•</text>
            
            <text x="100" y="90" text-anchor="end" font-size="12">I</text>
            <text x="300" y="90" text-anchor="start" font-size="12">I</text>
          </svg>
        </div>
      </div>
      <p style="color: #666; font-size: 0.9em">
        Legende:<br>
        × : Strom fließt in die Ebene hinein<br>
        • : Strom fließt aus der Ebene heraus<br>
        r : Radius der Spulen und deren Abstand<br>
        B : Magnetische Flussdichte im Zentrum
      </p>
    </div>
  `,
})
export class App {
  bFieldMilliTesla: number = 0;
  hField: number = 0;
  current: number = 0;
  distance: number = 0;
  singleWireFieldMilliTesla: number = 0;
  
  // Helmholtz-Spule Variablen
  turns: number = 0;
  helmholtzCurrent: number = 0;
  radius: number = 0;
  helmholtzFieldMilliTesla: number = 0;

  // E-H-Feld Variablen
  eField: number = 0;
  hFieldWave: number = 0;
  
  μ0: number = 4 * Math.PI * 1e-7; // magnetische Feldkonstante
  Z0: number = 376.730313668; // Wellenwiderstand des Vakuums

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

  calculateHFromE() {
    if (this.eField != null) {
      this.hFieldWave = this.eField / this.Z0;
    }
  }

  calculateEFromH() {
    if (this.hFieldWave != null) {
      this.eField = this.hFieldWave * this.Z0;
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

  calculateHelmholtzField() {
    if (this.turns != null && this.helmholtzCurrent != null && this.radius != null && this.radius !== 0) {
      // B = (8 × μ0 × N × I) / (5√5 × r)
      const bFieldTesla = (8 * this.μ0 * this.turns * this.helmholtzCurrent) / (5 * Math.sqrt(5) * this.radius);
      this.helmholtzFieldMilliTesla = bFieldTesla * 1000; // Umrechnung in mT
    } else {
      this.helmholtzFieldMilliTesla = 0;
    }
  }
}

bootstrapApplication(App, {
  providers: [
    provideAnimations()
  ]
}).catch(err => console.error(err));
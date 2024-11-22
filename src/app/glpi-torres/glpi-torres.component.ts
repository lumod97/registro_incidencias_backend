import { Component, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';  // Asegúrate de importar FormsModule

@Component({
  selector: 'app-glpi-torres',
  standalone: true,
  imports: [ FormsModule],

  templateUrl: './glpi-torres.component.html',
  styleUrl: './glpi-torres.component.css'
})
export class GlpiTorresComponent implements OnInit {
  torres: any[] = []; // Lista de torres
  currentTorre: any = { id: null, nombre: '' };
  isEditing: boolean = false;

  ngOnInit(): void {
    this.loadTorres();
  }

  loadTorres(): void {
    // Simula una API call para cargar torres
    this.torres = [
      { id: 1, nombre: 'Torre A' },
      { id: 2, nombre: 'Torre B' },
    ];
  }

  saveTorre(): void {
    if (this.isEditing) {
      // Actualizar torre existente
      const index = this.torres.findIndex((t) => t.id === this.currentTorre.id);
      this.torres[index] = { ...this.currentTorre };
      this.isEditing = false;
    } else {
      // Agregar nueva torre
      this.currentTorre.id = this.torres.length + 1;
      this.torres.push({ ...this.currentTorre });
    }
    this.currentTorre = { id: null, nombre: '' };
  }

  editTorre(torre: any): void {
    this.currentTorre = { ...torre };
    this.isEditing = true;
  }

  deleteTorre(id: number): void {
    this.torres = this.torres.filter((torre) => torre.id !== id);
  }
}
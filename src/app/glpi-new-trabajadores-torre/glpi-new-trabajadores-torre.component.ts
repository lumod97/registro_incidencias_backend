import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Asegúrate de importar FormsModule

@Component({
  selector: 'app-glpi-new-trabajadores-torre',
  standalone: true,
  imports: [FormsModule],

  templateUrl: './glpi-new-trabajadores-torre.component.html',
  styleUrl: './glpi-new-trabajadores-torre.component.css'
})
export class GlpiTrabajadoresTorreComponent implements OnInit {
  trabajadoresTorre: any[] = []; // Lista de trabajadores por torre
  currentItem: any = { id: null, trabajador: '', torre: '' };
  isEditing: boolean = false;

  ngOnInit(): void {
    this.loadTrabajadoresTorre();
  }

  loadTrabajadoresTorre(): void {
    // Simula una API call para cargar trabajadores por torre
    this.trabajadoresTorre = [
      { id: 1, trabajador: 'Trabajador 1', torre: 'Torre A' },
      { id: 2, trabajador: 'Trabajador 2', torre: 'Torre B' },
    ];
  }

  saveItem(): void {
    if (this.isEditing) {
      // Actualizar trabajador existente
      const index = this.trabajadoresTorre.findIndex((t) => t.id === this.currentItem.id);
      this.trabajadoresTorre[index] = { ...this.currentItem };
      this.isEditing = false;
    } else {
      // Agregar nuevo trabajador
      this.currentItem.id = this.trabajadoresTorre.length + 1;
      this.trabajadoresTorre.push({ ...this.currentItem });
    }
    this.currentItem = { id: null, trabajador: '', torre: '' };
  }

  editItem(item: any): void {
    this.currentItem = { ...item };
    this.isEditing = true;
  }

  deleteItem(id: number): void {
    this.trabajadoresTorre = this.trabajadoresTorre.filter((item) => item.id !== id);
  }
}

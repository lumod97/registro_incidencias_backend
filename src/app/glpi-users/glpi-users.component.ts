import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Asegúrate de importar FormsModule


@Component({
  selector: 'app-glpi-users',
  standalone: true,
  imports: [ FormsModule],
  templateUrl: './glpi-users.component.html',
  styleUrl: './glpi-users.component.css'
})
export class GlpiUsersComponent implements OnInit {
  users: any[] = []; // Lista de usuarios
  currentUser: any = { id: null, name: '', email: '' };
  isEditing: boolean = false;

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    // Simula una API call para cargar usuarios
    this.users = [
      { id: 1, name: 'Usuario 1', email: 'user1@example.com' },
      { id: 2, name: 'Usuario 2', email: 'user2@example.com' },
    ];
  }

  saveUser(): void {
    if (this.isEditing) {
      // Actualizar usuario existente
      const index = this.users.findIndex((u) => u.id === this.currentUser.id);
      this.users[index] = { ...this.currentUser };
      this.isEditing = false;
    } else {
      // Agregar nuevo usuario
      this.currentUser.id = this.users.length + 1;
      this.users.push({ ...this.currentUser });
    }
    this.currentUser = { id: null, name: '', email: '' };
  }

  editUser(user: any): void {
    this.currentUser = { ...user };
    this.isEditing = true;
  }

  deleteUser(id: number): void {
    this.users = this.users.filter((user) => user.id !== id);
  }
}
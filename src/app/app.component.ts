import { Component, OnInit, NgZone, ViewChild, ElementRef, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { NotificationModalComponent } from "./notification-modal/notification-modal.component";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NotificationModalComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  logout(): void {
    // Eliminar el token del almacenamiento
    localStorage.removeItem('token');

    // Redirigir a la página de login
    this.router.navigate(['/login']);

  }
  currentTime: string = '';

  @ViewChild(NotificationModalComponent) notificationModal!: NotificationModalComponent;
  constructor(private ngZone: NgZone, @Inject(PLATFORM_ID) private platformId: Object, private router: Router) { } // Inyecta NgZone y PLATFORM_ID

  ngOnInit(): void {
    this.updateTime();
  }

  updateTime(): void {
    this.ngZone.runOutsideAngular(() => {
      setInterval(() => {
        const now = new Date();
        this.ngZone.run(() => {
          this.currentTime = now.toLocaleTimeString();
        });
      }, 1000);
    });
  }

  // Método que verifica si la ruta actual es /login
  isLoginRoute(): boolean {

    return this.router.url === '/login';
  }

  openNotificationModal() {
    if (this.notificationModal) {
      this.notificationModal.openModal();
    }
  }
  // ngAfterViewInit() {
  //   // Verifica si estamos en el navegador
  //   if (isPlatformBrowser(this.platformId)) {
  //     import('bootstrap').then((bootstrap) => {
  //       const modalElement = this.exampleModal.nativeElement;
  //       const modal = new bootstrap.Modal(modalElement);
  //     });
  //   }
  // }


  // openModal() {
  //   if (this.exampleModal) {
  //     const modal = new bootstrap.Modal(this.exampleModal.nativeElement);
  //     modal.show();
  //   }
  // }

  title = 'frontend_catics';
}

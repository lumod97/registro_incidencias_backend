import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { ImageService } from '../image.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import axiosInstance from '../axios-config';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  activeForm = false;
  error = '';
  imageUrl: string = '';
  imageService = new ImageService();
  loading: boolean = false;
  

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    
    // Si el token existe y no está expirado, redirigir a home
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      this.router.navigate(['dashboard']);
    }else{
      this.loadRandomImage();
    }
  }

  async onSubmit() {
    const { username, password } = this.loginForm.value;
    const params = { username, password };
  
    try {

      const {data} = await axiosInstance.post('/api/auth/login', params);
      localStorage.setItem('token', data.token);
      this.router.navigate(['/dashboard']);
    } catch (error) {
      this.error = 'Usuario o contraseña incorrectos';
    }
  }  

  changeForm() {
    this.activeForm = !this.activeForm;
    console.log(this.activeForm);
  }

  async loadRandomImage(): Promise<void> {
    // const {data}  = await axiosInstance.get('/random-image')
    this.imageUrl = 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    // console.log(data)
  }
}

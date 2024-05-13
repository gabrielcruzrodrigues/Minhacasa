import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { HttpResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ModalAlertComponent } from '../layout/modal-alert/modal-alert.component';
import { CommonModule } from '@angular/common';
import { ModalTextComponent } from '../layout/modal-text/modal-text.component';

@Component({
  selector: 'app-registerpage',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, ModalAlertComponent, CommonModule, ModalTextComponent],
  templateUrl: './registerpage.component.html',
  styleUrl: './registerpage.component.scss'
})
export class RegisterpageComponent {
  form: FormGroup;
  formData = new FormData();

  //modal alert
  showModal: boolean = false;
  field: string = '';

  //modal text
  showModalText: boolean = false;
  message: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      imagem_de_perfil: [null, Validators.required],
      nome: ['', Validators.required],
      email: ['', Validators.required],
      nacionalidade: ['', Validators.required],
      telefone: ['', Validators.required],
      whatsapp: ['', Validators.required],
      data_de_nascimento: ['', Validators.required],
      cidade: ['', Validators.required],
      gênero: ['', Validators.required],
      verificação_de_senha: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }

  submit() {
    this.populateFormData();
    this.userService.registerUser(this.formData).subscribe({
      next: (response: HttpResponse<any>) => {
        this.authService.configureLocalStorage(response.body)
        alert("Cadastro realizado com sucesso!");
        this.router.navigate(["/"]);
      },
      error: (error) => {
        alert("Erro ao tentar realizar cadastro! Erro: " + error.message);
        console.log(error);
      }
    })
  }

  verifyFields() {
    const invalidFields = this.getInvalidFields();
    
    if (invalidFields[0]) {
      this.showModal = false;
      setTimeout(() => {
        this.field = this.field = invalidFields[0];
        this.showModal = true;
        this.cdr.detectChanges();
      });
    } else {
      if (this.verifyPassword()) {
        this.submit();
      }
    }
  }

  getInvalidFields(): string[] {
    const invalidFields: string[] = [];

    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      if (control && control.invalid) {
        invalidFields.push(key);
      }
    });

    return invalidFields;
  }

  populateFormData():void {
    this.formData.set('name', this.form.get('nome')?.value);
    this.formData.set('email', this.form.get('email')?.value);
    this.formData.set('nationality', this.form.get('nacionalidade')?.value);
    this.formData.set('phone', this.form.get('telefone')?.value);
    this.formData.set('whatsapp', this.form.get('whatsapp')?.value);
    this.formData.set('dateOfBirth', this.form.get('data_de_nascimento')?.value);
    this.formData.set('city', this.form.get('cidade')?.value);
    this.formData.set('gender', this.form.get('gênero')?.value);
    this.formData.set('password', this.form.get('senha')?.value);
  }

  verifyPassword(): boolean {
    const firstPassword = this.form.get('verificação_de_senha')?.value;
    const password = this.form.get('senha')?.value;
   
    if (firstPassword != password) {
      this.showModalText = false;
      setTimeout(() => {
        this.message = 'As senhas não são iguais!';
        this.showModalText = true;
        this.cdr.detectChanges();
      });
      return false;
    } else {
      return true;
    }
  }

  onFileSelect(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let file: File | null = element.files ? element.files[0] : null;
    if (file) {
      this.formData.append('imageProfile', file);
    }
  }
}

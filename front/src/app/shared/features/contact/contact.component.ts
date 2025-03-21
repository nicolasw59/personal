import { Component } from '@angular/core'
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { Button } from 'primeng/button'

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, Button],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  private emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  public contactForm: FormGroup = this.fb.group({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(this.emailPattern),
    ]),
    message: new FormControl('', [
      Validators.required,
      Validators.maxLength(299),
    ]),
  })

  constructor(private fb: FormBuilder) {}

  submit() {
    if (this.contactForm.valid) {
      console.log('submit')
    }
  }
}

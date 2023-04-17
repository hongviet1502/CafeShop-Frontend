import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { GlobalConstants } from '../shared/global-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  loginForm!:FormGroup

  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private userService:UserService,
    private dialogRef:MatDialogRef<LoginComponent>,
    private ngxService:NgxUiLoaderService,
    private snackbarService:SnackbarService) {}

    ngOnInit(): void {
      this.loginForm = this.formBuilder.group({
        email:[null,[Validators.required,Validators.pattern(GlobalConstants.emailRegex)]],
        password:[null,[Validators.required]]
      })
    }

    handleLoginSubmit(){
      this.ngxService.start()
      var formData = this.loginForm.value
      var data = {
        email:formData.email,
        password:formData.password
      }
      
      this.userService.login(data).subscribe((response)=>{
        this.ngxService.stop()
        this.dialogRef.close()
        console.log(response);
        localStorage.setItem('token',response.token)
        this.router.navigate(['/cafe/dashboard'])
      },(error) =>{
        this.ngxService.stop()
        console.log(error);
        
      }
      )
    }

}

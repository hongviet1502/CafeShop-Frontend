import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { SnackbarService } from '../services/snackbar.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from '../shared/global-constants';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{
  signupForm!: FormGroup
  responseMessage:any

  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private userService:UserService,
    private snackbarService:SnackbarService,
    private dialogRef:MatDialogRef<SignupComponent>,
    private ngxService:NgxUiLoaderService) {

    }
  
  ngOnInit(): void {
      this.signupForm = this.formBuilder.group({
        name:[null,[Validators.required,Validators.pattern(GlobalConstants.nameRegex)]],
        email:[null,[Validators.required,Validators.pattern(GlobalConstants.emailRegex)]],
        contactNumber:[null,[Validators.required,Validators.pattern(GlobalConstants.contactNumberRegex)]],
        password:[null,Validators.required]
      })
  }

  handleSubmit(){
    this.ngxService.start()
    var formData = this.signupForm.value
    var data = {
      name:formData.name,
      email:formData.email,
      contactNumber:formData.contactNumber,
      password:formData.password
    }
    console.log(data);
    
    this.userService.signUp(data).subscribe((response)=>{
      this.ngxService.stop()
      this.dialogRef.close()
      console.log(response);
      this.snackbarService.openSnackbar(response.message,"")
      this.router.navigate(['/'])
    },(error) =>{
      this.ngxService.stop()
      console.log(error);
      
    }
    )
  }
}

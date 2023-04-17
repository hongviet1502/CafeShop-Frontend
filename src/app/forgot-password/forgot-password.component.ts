import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { GlobalConstants } from '../shared/global-constants';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!:FormGroup

  
  constructor(private formBuilder:FormBuilder,
    private userService:UserService,
    private dialogRef:MatDialogRef<ForgotPasswordComponent>,
    private ngxService:NgxUiLoaderService,
    private snackbarService:SnackbarService,
    ) {}
    
    
    ngOnInit(): void {
      this.forgotPasswordForm = this.formBuilder.group({
        email:[null,[Validators.required,Validators.pattern(GlobalConstants.emailRegex)]]
      })
    }

    handleSubmit(){
      this.ngxService.start()
      var formData = this.forgotPasswordForm.value
      var data = {
        email:formData.email,
      }
      console.log(data);
      this.userService.forgotPassword(data).subscribe((response:any)=>{
        this.ngxService.stop()
        this.dialogRef.close()
        console.log(response);
        this.snackbarService.openSnackbar(response.message,"")
      },(error) =>{
        this.ngxService.stop()
        console.log(error);
        
      }
      )
    }

}

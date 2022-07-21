import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ItemDto } from 'src/app/objects-exporter';
import { ItemsServiceService } from 'src/app/services/items-service.service';
import { Edokati, ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.css']
})
export class CreateItemComponent implements OnInit {

  constructor(private fb: FormBuilder,private itemService:ItemsServiceService,public dialogRef: MatDialogRef<ProfileComponent>,@Inject(MAT_DIALOG_DATA) public data2: Edokati) { }

  ngOnInit(): void {
  }
  itemForm = this.fb.group({
    itemName: ['', Validators.required],
    itemStartPrice: [, Validators.required],
  })
  onSubmit(){
    this.itemService.createItem(this.data2.data2,this.itemForm.value).subscribe((res)=>{
      window.location.reload()
      console.log(res)
    },(err)=>{
      console.log(err)
    })
  }

}

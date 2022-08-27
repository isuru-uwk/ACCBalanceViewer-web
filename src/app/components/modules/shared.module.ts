import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';


@NgModule({
    declarations: [],
    imports: [MaterialModule, ReactiveFormsModule, FormsModule, CommonModule],
    exports: [MaterialModule, ReactiveFormsModule, FormsModule, CommonModule],
    providers: []
})
export class SharedModule { }
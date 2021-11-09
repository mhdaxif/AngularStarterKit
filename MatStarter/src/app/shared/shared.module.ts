import { NgModule } from '@angular/core';
import { MaterialModule } from './materail-modules/material.module';

const _modules = [
    MaterialModule,
]

@NgModule({
    declarations: [],
    imports: [_modules],
    exports: [_modules]
})

export class SharedModule { } 
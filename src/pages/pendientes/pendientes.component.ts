import { Component } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Lista } from '../../models/lista.model';
import { NavController, AlertController } from 'ionic-angular';
import { AgregarPage } from '../agregar/agregar.component';

@Component({
    selector: 'page-pendientes',
    templateUrl: 'pendientes.component.html'
})
export class PendientesPage {
    
    constructor(public deseosService: DeseosService, 
                private navCrtl: NavController,
                private alertCrl: AlertController) {
        
    }

    public agregarLista() { 
        const alerta = this.alertCrl.create({
            title: 'Nueva lista',
            message: 'Nombre de la nueva lista que desea',
            inputs: [{
                name: 'titulo',
                placeholder: 'Nombre de la lista',
            }],
            buttons: [{
                text: 'Cancelar'
            }, {
                text: 'Agregar',
                handler: data => {
                    if (data.titulo.length === 0) {
                        return ;
                    }
                    this.navCrtl.push( AgregarPage, {
                        titulo: data.titulo
                    });
                    console.log(data);
                }
            }]
        });
        alerta.present();
    }
}
import { Component, Input } from "@angular/core";
import { DeseosService } from '../../services/deseos.service';
import { NavController, AlertController, ItemSliding } from 'ionic-angular';
import { Lista } from '../../models/lista.model';
import { AgregarPage } from '../../pages/agregar/agregar.component';

@Component({
    selector: 'app-listas',
    templateUrl: 'listas.component.html'
})
export class ListasComponent {
    
    @Input() public listasCompletadas: boolean;

    constructor(public deseosService: DeseosService, 
        private navCrtl: NavController,
        private alertCrl: AlertController) {
        
    }

    public listaSeleccionada(lista: Lista) {
        this.navCrtl.push(AgregarPage, {
            titulo: lista.titulo,
            lista: lista
        });
    }

    public borrarLista(lista: Lista) {
        this.deseosService.borrarLista(lista);
        this.deseosService.guardarStorage();
    }

    public actualizarLista(lista: Lista, itemSliding: ItemSliding) {
        itemSliding.close();
        const alerta = this.alertCrl.create({
            title: 'Editar Lista',
            message: 'Cambia el nombre de la lista',
            inputs: [{
                name: 'titulo',
                placeholder: 'Nombre de la lista',
                value: lista.titulo
            }],
            buttons: [{
                text: 'Cancelar'
            }, {
                text: 'Actualizar',
                handler: data => {
                    if (data.titulo.length === 0) {
                        return ;
                    }
                    lista.titulo = data.titulo;
                    this.deseosService.guardarStorage();
                }
            }]
        });
        alerta.present();
    }
}
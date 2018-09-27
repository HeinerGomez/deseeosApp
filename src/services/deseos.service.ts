import { Injectable } from "@angular/core";
import { Lista, ListaItem } from '../models';

@Injectable()
export class DeseosService {
    
    listas: Lista[] = [];

    constructor() {
        this.cargarStorage();
    }

    public agregarLista(lista: Lista) {
        this.listas.push(lista);
        this.guardarStorage();
    }

    public borrarLista(lista: Lista) {
        this.listas = this.listas.filter( listaData => {
            return listaData.id !== lista.id;
        });
    }

    public guardarStorage() {
        localStorage.setItem('data', JSON.stringify(this.listas));
    }

    public cargarStorage() {
        if (localStorage.getItem('data')) {
            this.listas = JSON.parse(localStorage.getItem('data'));
        }
    }

}
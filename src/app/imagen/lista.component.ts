import { Component, OnInit } from '@angular/core';
import { Imagen } from '../modelos/imagen';
import { ImagenService } from '../servicios/imagen.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetalleComponent } from './detalle.component';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  imagenes: Imagen[] = [];
/**
 * 
 * @param imagenService 
 * @param spinner 
 * @param modalService 
 */
  constructor(
    private imagenService: ImagenService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.cargarImagenes();
  }

  cargarImagenes(): void {
    this.imagenService.list().subscribe(
      data => {
        this.imagenes = data;
      }
    );
  }
/**
 * 
 * @param id 
 */
  borrar(id: number): void {
    this.spinner.show();
    this.imagenService.delete(id).subscribe(
      data => {
        this.spinner.hide();
        this.cargarImagenes();
      },
      err => {
        this.spinner.hide();
        console.log(err);
      }
    );
  }
/**
 * 
 * @param i 
 */
  abrirModal(i: number): void {
    const modalRef = this.modalService.open(DetalleComponent);
    modalRef.componentInstance.index = i;
  }

  downloadPDF() {
    const DATA = document.getElementById('htmlData');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}galeria.pdf`);
    });
  }

}
import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import { Membership } from '../../models/memberships/memberships.interface';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

  generateInvoice(membership: Membership) {
    const doc = new jsPDF();

    // Agregar título
    doc.setFontSize(18);
    doc.text('Factura de Membresía', 14, 20);

    // Agregar detalles de la membresía
    doc.setFontSize(12);
    doc.text(`Fecha de Compra: ${membership.saleDate}`, 14, 30);
    doc.text(`Precio Pagado: ${membership.paidAmount} COP`, 14, 50);

    // Finalizar el PDF y abrir para descarga
    doc.save('factura_membresia.pdf');
  }
}

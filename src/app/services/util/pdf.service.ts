import { inject, Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import { Membership } from '../../models/memberships/memberships.interface';
import jsPDFInvoiceTemplate, { OutputType } from "jspdf-invoice-template";
import { UserService } from '../users/users.service';
import { User } from '../../models/users/users.interface';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  private userService = inject(UserService);

  generateInvoice(membership: Membership) {
    this.userService.get(membership.userDocument).subscribe((user: User) => {
      var props = {
        outputType: OutputType.Save,
        returnJsPDFDocObject: true,
        fileName: "factura_de_venta",
        orientationLandscape: false,
        compress: true,
        logo: {
            src: "https://i.imgur.com/LJyan8J.png",
            type: 'PNG', //optional, when src= data:uri (nodejs case)
            width: 53.33, //aspect ratio = width/height
            height: 26.66,
            margin: {
                top: 0, //negative or positive num, from the current position
                left: 0 //negative or positive num, from the current position
            }
        },
        stamp: {
            inAllPages: true, //by default = false, just in the last page
            src: "https://i.imgur.com/Vrrq9OP.png",
            type: 'JPG', //optional, when src= data:uri (nodejs case)
            width: 20, //aspect ratio = width/height
            height: 20,
            margin: {
                top: 0, //negative or positive num, from the current position
                left: 0 //negative or positive num, from the current position
            }
        },
        business: {
            name: "Active Gym SAS",
            address: "Avenida Pastrana Borrero, Carrera 1",
            phone: "+57 3024449362",
            email: "carlosestc0911@gmail.com",
            website: "https://activegym.vercel.app/",
        },
        contact: {
            label: "Factura generada para:",
            name: user.firstName + " " + user.lastName,
            phone: user.phone,
            email: user.email,
            otherInfo: user.document.toString(),
        },
        invoice: {
            label: "Orden # ",
            num: membership.id,
            invDate: "Fecha de compra: " + membership.saleDate,
            headerBorder: false,
            tableBodyBorder: false,
            header: [
              {
                title: "#",
                style: {
                  width: 10
                }
              },
              {
                title: "Tipo de membresía",
                style: {
                  width: 35
                }
              },
              { title: "Precio"},
              { title: "Cantidad"},
              { title: "Inicia"},
              { title: "Finaliza"}
            ],
            table: Array.from(Array(1), (item, index)=>([
                index + 1,
                membership.membershipTypeName,
                membership.paidAmount,
                1,
                membership.startDate,
                membership.endDate
            ])),
            additionalRows: [{
                col1: 'Total:',
                col2: membership.paidAmount.toString(),
                style: {
                    fontSize: 14 //optional, default 12
                }
            },
            {
                col1: 'IVA: ',
                col2: '19%',
                style: {
                    fontSize: 10 //optional, default 12
                }
            },
            {
                col1: 'SubTotal:',
                col2: (membership.paidAmount * 0.19).toString(),
                style: {
                    fontSize: 10 //optional, default 12
                }
            }],
        },
        footer: {
            text: "Factura generada automáticada por Active Gym SAS",
        },
        pageEnable: true,
        pageLabel: "Página ",
      };
      const doc = jsPDFInvoiceTemplate(props);
    });
  }
}

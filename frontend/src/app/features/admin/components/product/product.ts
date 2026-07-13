import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface IProduct {
  id: number;
  name: string;
  sku: string;
}
@Component({
  selector: 'app-product',
  imports: [FormsModule],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product {
  showModal = false;
  isEdit = false;

  currentProduct: IProduct = {
    id: 0,
    name: '',
    sku: '',
  };

  products: IProduct[] = [
    { id: 1, name: 'Laptop', sku: 'LP1001' },
    { id: 2, name: 'Keyboard', sku: 'KB1002' },
    { id: 3, name: 'Mouse', sku: 'MS1003' },
    { id: 4, name: 'Monitor', sku: 'MN1004' },
    { id: 5, name: 'Printer', sku: 'PR1005' },
  ];

  openCreate() {
    this.isEdit = false;

    this.currentProduct = {
      id: 0,
      name: '',
      sku: '',
    };

    this.showModal = true;
  }

  openEdit(product: IProduct) {
    this.isEdit = true;

    this.currentProduct = { ...product };

    this.showModal = true;
  }

  saveProduct() {
    if (this.isEdit) {
      const index = this.products.findIndex((p) => p.id === this.currentProduct.id);

      this.products[index] = { ...this.currentProduct };
    } else {
      this.products.unshift({
        ...this.currentProduct,
        id: Date.now(),
      });
    }

    this.closeModal();
  }

  closeModal() {
    this.showModal = false;
  }
}

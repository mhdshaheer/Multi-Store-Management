import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Product {
  id: number;
  name: string;
}

interface Store {
  id: number;
  name: string;
}

interface IStock {
  id: number;
  productId: number;
  storeId: number;
  productName: string;
  storeName: string;
  quantity: number;
  threshold: number;
}
@Component({
  selector: 'app-stock',
  imports: [FormsModule],
  templateUrl: './stock.html',
  styleUrl: './stock.css',
})
export class Stock {
  showModal = false;
  isEdit = false;
  showTransferModal = false;
  validationMessage = '';
  selectedStock!: IStock;
  transfer = {
    toStoreId: '',

    quantity: 0,
  };

  selectedProduct = '';
  selectedStore = '';

  products: Product[] = [
    { id: 1, name: 'Laptop' },
    { id: 2, name: 'Mouse' },
    { id: 3, name: 'Keyboard' },
    { id: 4, name: 'Monitor' },
  ];

  stores: Store[] = [
    { id: 1, name: 'Calicut Store' },
    { id: 2, name: 'Kochi Store' },
    { id: 3, name: 'Kannur Store' },
  ];

  stocks: IStock[] = [
    {
      id: 1,
      productId: 1,
      storeId: 1,
      productName: 'Laptop',
      storeName: 'Calicut Store',
      quantity: 12,
      threshold: 5,
    },
    {
      id: 2,
      productId: 2,
      storeId: 1,
      productName: 'Mouse',
      storeName: 'Calicut Store',
      quantity: 3,
      threshold: 5,
    },
    {
      id: 3,
      productId: 3,
      storeId: 2,
      productName: 'Keyboard',
      storeName: 'Kochi Store',
      quantity: 25,
      threshold: 10,
    },
    {
      id: 4,
      productId: 4,
      storeId: 3,
      productName: 'Monitor',
      storeName: 'Kannur Store',
      quantity: 2,
      threshold: 5,
    },
  ];

  currentStock: IStock = {
    id: 0,
    productId: 0,
    storeId: 0,
    productName: '',
    storeName: '',
    quantity: 0,
    threshold: 0,
  };

  filteredStocks(): IStock[] {
    return this.stocks.filter((stock) => {
      const productMatch =
        !this.selectedProduct || stock.productId === Number(this.selectedProduct);
      const storeMatch = !this.selectedStore || stock.storeId === Number(this.selectedStore);

      return productMatch && storeMatch;
    });
  }

  openCreate() {
    this.isEdit = false;
    this.currentStock = {
      id: 0,
      productId: 0,
      storeId: 0,
      productName: '',
      storeName: '',
      quantity: 0,
      threshold: 0,
    };

    this.showModal = true;
  }

  openEdit(stock: IStock) {
    this.isEdit = true;
    this.currentStock = {
      ...stock,
    };
    this.showModal = true;
  }

  saveStock() {
    const product = this.products.find((p) => p.id == this.currentStock.productId);
    const store = this.stores.find((s) => s.id == this.currentStock.storeId);
    this.currentStock.productName = product?.name || '';
    this.currentStock.storeName = store?.name || '';

    if (this.isEdit) {
      const index = this.stocks.findIndex((s) => s.id === this.currentStock.id);

      this.stocks[index] = {
        ...this.currentStock,
      };
    } else {
      this.stocks.unshift({
        ...this.currentStock,
        id: Date.now(),
      });
    }

    this.closeModal();
  }

  closeModal() {
    this.showModal = false;
  }

  openTransfer(stock: IStock) {
    this.selectedStock = stock;
    this.transfer = {
      toStoreId: '',
      quantity: 0,
    };

    this.validationMessage = '';
    this.showTransferModal = true;
  }

  closeTransfer() {
    this.showTransferModal = false;
  }

  transferStock() {
    this.validationMessage = '';

    if (!this.transfer.toStoreId) {
      this.validationMessage = 'Please select a destination store.';

      return;
    }

    if (this.transfer.quantity <= 0) {
      this.validationMessage = 'Transfer quantity must be greater than zero.';

      return;
    }

    if (this.transfer.quantity > this.selectedStock.quantity) {
      this.validationMessage = 'Transfer quantity cannot exceed available stock.';

      return;
    }

    // API Call

    console.log({
      productId: this.selectedStock.productId,
      fromStoreId: this.selectedStock.storeId,
      toStoreId: this.transfer.toStoreId,
      quantity: this.transfer.quantity,
    });

    this.closeTransfer();
  }
}

import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IStock } from '../../../../core/models/stock.model';
import { StockService } from '../../../../core/services/stock.service';
import { StoreService } from '../../../../core/services/store.service';
import { ProductService } from '../../../../core/services/product.service';

interface ProductList {
  _id: string;
  name: string;
}

interface StoreList {
  _id: string;
  name: string;
}

@Component({
  selector: 'app-stock',
  imports: [FormsModule],
  templateUrl: './stock.html',
  styleUrl: './stock.css',
})
export class Stock {
  // ================================
  private _stockService = inject(StockService);
  private _storeService = inject(StoreService);
  private _productService = inject(ProductService);
  private _cdr = inject(ChangeDetectorRef);
  products: ProductList[] = [];
  ngOnInit() {
    this.getProducts();
    this.getStores();
  }
  addStock() {}
  getProducts() {
    this._productService.getProducts().subscribe({
      next: (res) => {
        res.data?.forEach((item) => {
          if (item._id) {
            this.products.push({ _id: item._id, name: item.name! });
          }
        });
        this._cdr.markForCheck();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getStores() {
    this._storeService.getStores().subscribe({
      next: (res) => {
        res.data?.forEach((item) => {
          if (item._id) {
            this.stores.push({ _id: item._id, name: item.name });
          }
        });
        this._cdr.markForCheck();
      },
    });
  }
  // ================================
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

  stores: StoreList[] = [];

  stocks: IStock[] = [];

  currentStock: IStock = {
    _id: '',
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
      _id: '',
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
    const product = this.products.find((p) => String(p._id) == String(this.currentStock.productId));
    const store = this.stores.find((s) => String(s._id) == String(this.currentStock.storeId));
    this.currentStock.productName = product?.name || '';
    this.currentStock.storeName = store?.name || '';

    if (this.isEdit) {
      const index = this.stocks.findIndex((s) => s._id === this.currentStock._id);

      this.stocks[index] = {
        ...this.currentStock,
      };
    } else {
      // create stock ui
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

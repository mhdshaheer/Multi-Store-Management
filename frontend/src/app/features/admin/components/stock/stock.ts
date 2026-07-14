import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IStock, ITransferStock } from '../../../../core/models/stock.model';
import { StockService } from '../../../../core/services/stock.service';
import { StoreService } from '../../../../core/services/store.service';
import { ProductService } from '../../../../core/services/product.service';
import { AuthService } from '../../../../core/services/auth.service';
import { ICurrentUser } from '../../../../core/models/auth.model';

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
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './stock.html',
  styleUrl: './stock.css',
})
export class Stock {
  // ================================
  private _stockService = inject(StockService);
  private _storeService = inject(StoreService);
  private _productService = inject(ProductService);
  private _authService = inject(AuthService);
  private _cdr = inject(ChangeDetectorRef);
  products: ProductList[] = [];
  stockForm!: FormGroup;
  transferForm!: FormGroup;

  private fb = inject(FormBuilder);

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
    productId: '',
    storeId: '',
    productName: '',
    storeName: '',
    quantity: 0,
    threshold: 0,
  };
  currentUser: ICurrentUser | null = null;
  ngOnInit() {
    this.stockForm = this.fb.group({
      productId: ['', Validators.required],
      storeId: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]],
      threshold: [0, [Validators.required, Validators.min(0)]],
    });
    this.transferForm = this.fb.group({
      toStoreId: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
    });
    this.getProducts();
    this.getStores();
    this.getStocks();
    this.getUser();
  }
  addStock(stock: IStock) {
    this._stockService.addCreate(stock).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getUser() {
    this._authService.getUser().subscribe({
      next: (res) => {
        this.currentUser = { _id: res.data?._id!, role: res.data?.role! };
        this._cdr.markForCheck();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
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
  getStocks() {
    this._stockService.getStocks().subscribe({
      next: (res) => {
        res.data?.forEach((item) => {
          this.stocks.push({
            _id: String(item._id),
            productId: String(item.product._id),
            storeId: item.store._id!,
            quantity: item.quantity,
            threshold: item.threshold,
            productName: item.product.name!,
            storeName: item.store.name,
          });
        });
        this._cdr.markForCheck();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  openTransfer(stock: IStock) {
    this.selectedStock = stock;
    this.transferForm.reset({
      toStoreId: '',
      quantity: '',
    });
    this.validationMessage = '';
    this.showTransferModal = true;
  }
  transferStock() {
    this.validationMessage = '';

    if (this.transferForm.invalid) {
      this.transferForm.markAllAsTouched();
      return;
    }

    const value = this.transferForm.value;

    if (value.quantity > this.selectedStock.quantity) {
      this.validationMessage = 'Transfer quantity cannot exceed available stock.';
      return;
    }

    const productId = this.selectedStock.productId;
    const fromStoreId = this.selectedStock.storeId;
    const toStoreId = value.toStoreId;
    const quantity = value.quantity;
    this.stockTransfer({ productId, fromStoreId, toStoreId, quantity });

    this.closeTransfer();
  }
  closeTransfer() {
    this.showTransferModal = false;
    this.transferForm.reset();
  }

  stockTransfer(transferData: ITransferStock) {
    this._stockService.transferStock(transferData).subscribe({
      next: (res) => {
        console.log('stock is updated successfully.');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  updateStock(stockId: string, stockData: IStock) {
    this._stockService.updateStock(stockId, stockData).subscribe({
      next: (res) => {
        this.stocks = [...this.stocks, res.data!];
        this._cdr.markForCheck();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  get f() {
    return this.stockForm.controls;
  }
  get tf() {
    return this.transferForm.controls;
  }
  // ================================

  filteredStocks(): IStock[] {
    return this.stocks.filter((stock) => {
      const productMatch = !this.selectedProduct || stock.productId === this.selectedProduct;
      const storeMatch = !this.selectedStore || stock.storeId === this.selectedStore;

      return productMatch && storeMatch;
    });
  }

  openCreate() {
    this.isEdit = false;
    this.stockForm.reset({
      productId: '',
      storeId: '',
      quantity: 0,
      threshold: 0,
    });
    this.showModal = true;
  }

  openEdit(stock: IStock) {
    this.isEdit = true;
    this.selectedStock = stock;
    this.stockForm.patchValue({
      productId: stock.productId,
      storeId: stock.storeId,
      quantity: stock.quantity,
      threshold: stock.threshold,
    });
    this.showModal = true;
  }

  saveStock() {
    if (this.stockForm.invalid) {
      this.stockForm.markAllAsTouched();
      return;
    }

    const value = this.stockForm.value;
    const product = this.products.find((p) => String(p._id) === String(value.productId));
    const store = this.stores.find((s) => String(s._id) === String(value.storeId));
    const stock: IStock = {
      _id: this.isEdit ? this.selectedStock._id : '',
      productId: value.productId,
      storeId: value.storeId,
      quantity: value.quantity,
      threshold: value.threshold,
      productName: product?.name ?? '',
      storeName: store?.name ?? '',
    };
    if (this.isEdit) {
      this.updateStock(String(stock._id), stock);
    } else {
      this.addStock(stock);
    }
    this.closeModal();
  }

  closeModal() {
    this.stockForm.reset();
    this.showModal = false;
  }
}

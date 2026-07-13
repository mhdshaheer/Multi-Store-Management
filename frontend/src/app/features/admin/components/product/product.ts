import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IProduct } from '../../../../core/models/product.model';
import { ProductService } from '../../../../core/services/product.service';

@Component({
  selector: 'app-product',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product {
  // ================== API =======================
  private _fb = inject(FormBuilder);
  private _productService = inject(ProductService);
  private _cdr = inject(ChangeDetectorRef);
  products: IProduct[] = [];
  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this._productService.getProducts().subscribe({
      next: (res) => {
        this.products = res.data!;
        this._cdr.markForCheck();
      },
      error: () => {
        console.log('error while product fetching');
      },
    });
  }
  createProduct(product: IProduct) {
    this._productService.addProduct(product).subscribe({
      next: (res) => {
        console.log(res);
        this.products = [...this.products, product];
        this._cdr.markForCheck();
      },
      error: (err) => {
        console.log('error while create product ', err);
      },
    });
  }
  // ==============================================
  isEdit = false;
  currentProductId: string | null = null;
  productForm = this._fb.group({
    name: ['', [Validators.required]],
    sku: ['', [Validators.required]],
  });

  openCreateModal() {
    this.isEdit = false;
    this.currentProductId = null;
    this.productForm.reset();
  }

  openEditModal(product: any) {
    this.isEdit = true;
    this.currentProductId = product._id;

    this.productForm.patchValue({
      name: product.name,
      sku: product.sku,
    });
  }

  saveProduct() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const product = this.productForm.getRawValue();

    if (this.isEdit) {
      console.log('Update Product', this.currentProductId, product);

      // call update API
    } else {
      console.log('Create Product', product);

      this.createProduct(product);
    }
    this.showModal = false;
  }

  closeModal() {
    this.productForm.reset();
    this.showModal = false;
  }
  // ==============================================
  showModal = false;
  currentProduct: IProduct = {
    name: '',
    sku: '',
  };

  openCreate() {
    this.isEdit = false;
    this.currentProduct = {
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
}

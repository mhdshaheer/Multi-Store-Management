import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { StoreService } from '../../../../core/services/store.service';
import { IStore } from '../../../../core/models/store.model';
import { AuthService } from '../../../../core/services/auth.service';
import { ICurrentUser } from '../../../../core/models/auth.model';

@Component({
  selector: 'app-store',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './store.html',
  styleUrl: './store.css',
})
export class Store {
  // ===================================================
  private _storeService = inject(StoreService);
  private _authService = inject(AuthService);
  private _cdr = inject(ChangeDetectorRef);
  showModal = false;
  isEdit = false;
  currentStoreId = '';
  storeForm: FormGroup;
  stores: IStore[] = [];
  currentUser: ICurrentUser | null = null;

  constructor(private fb: FormBuilder) {
    this.storeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
    });
  }
  ngOnInit() {
    this.getStores();
    this.getUser();
  }
  getStores() {
    this._storeService.getStores().subscribe({
      next: (res) => {
        console.log(res);
        this.stores = res.data!;
        this._cdr.markForCheck();
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
  createStore(store: IStore) {
    this._storeService.createStore(store).subscribe({
      next: (res) => {
        this.stores = [...this.stores, store];
        this._cdr.markForCheck();
      },
      error: (err) => {
        console.log('error while creating store', err);
      },
    });
  }

  openCreate() {
    this.isEdit = false;
    this.currentStoreId = '';
    this.storeForm.reset();
    this.showModal = true;
  }

  openEdit(store: IStore) {
    this.isEdit = true;
    this.currentStoreId = store._id!;
    this.storeForm.patchValue({
      name: store.name,
      address: store.address,
    });

    this.showModal = true;
  }

  saveStore() {
    if (this.storeForm.invalid) {
      this.storeForm.markAllAsTouched();
      return;
    }

    const store: IStore = {
      ...this.storeForm.value,
    };

    if (this.isEdit) {
      const index = this.stores.findIndex((s) => s._id === this.currentStoreId);

      this.stores[index] = store;
    } else {
      this.createStore(store);
    }

    this.closeModal();
  }

  closeModal() {
    this.showModal = false;
    this.storeForm.reset();
  }

  get f() {
    return this.storeForm.controls;
  }
}

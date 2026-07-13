import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface IStore {
  id: number;
  name: string;
  address: string;
}

@Component({
  selector: 'app-store',
  imports: [FormsModule],
  templateUrl: './store.html',
  styleUrl: './store.css',
})
export class Store {
  showModal = false;
  isEdit = false;

  currentStore: IStore = {
    id: 0,
    name: '',
    address: '',
  };

  stores: IStore[] = [
    {
      id: 1,
      name: 'Calicut Store',
      address: 'Mavoor Road',
    },
    {
      id: 2,
      name: 'Kochi Store',
      address: 'MG Road',
    },
    {
      id: 3,
      name: 'Kannur Store',
      address: 'Talap',
    },
    {
      id: 4,
      name: 'Trivandrum Store',
      address: 'Kowdiar',
    },
  ];

  openCreate() {
    this.isEdit = false;

    this.currentStore = {
      id: 0,
      name: '',
      address: '',
    };

    this.showModal = true;
  }

  openEdit(store: IStore) {
    this.isEdit = true;

    this.currentStore = { ...store };

    this.showModal = true;
  }

  saveStore() {
    if (this.isEdit) {
      const index = this.stores.findIndex((s) => s.id === this.currentStore.id);

      this.stores[index] = { ...this.currentStore };
    } else {
      this.stores.unshift({
        ...this.currentStore,
        id: Date.now(),
      });
    }

    this.closeModal();
  }

  closeModal() {
    this.showModal = false;
  }
}

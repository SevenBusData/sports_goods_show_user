import { defineStore } from 'pinia';

export const useProductStore = defineStore('product', {
    state: () => ({
        products: [],
    }),
    actions: {
        async fetchProducts() {
            // 假设后端接口为 /api/products
            const res = await fetch('/api/products');
            this.products = await res.json();
        },
    },
});

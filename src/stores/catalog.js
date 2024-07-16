import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import { getProducts } from "@/components/serverFetches";

export const useCatalogStore = defineStore('catalog', () => {
    const catalog = reactive([]);
    const isLoading = ref(true);

    async function loadCatalog() {
        // isLoading.value = true;
        return new Promise((resolve, reject) => {
            getProducts()
                .then(data => {
                    catalog.length = 0;
                    resolve(data);
                    catalog.push(...data);
                })
                .catch(err => {
                    reject(err);
                });
            isLoading.value = false;
        });
    };

    const isEmpty = computed(() => catalog.length == 0);

    return { catalog, loadCatalog, isLoading, isEmpty };
});
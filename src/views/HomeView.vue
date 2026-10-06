<script setup lang="ts">
import { ref, computed } from 'vue'
import { products, type Product } from '@/data/products'
import ProductCard from '@/components/ProductCard.vue'

// Товар в корзине = товар + количество
interface CartItem extends Product {
  quantity: number
}

// ---------- Каталог ----------

const search = ref('')
const category = ref('Все')
const sortOrder = ref('none') // 'none' | 'asc' | 'desc'

// Список категорий для фильтра (Set убирает повторы)
const categories = ['Все', ...new Set(products.map((p) => p.category))]

// Товары, которые показываем: поиск -> фильтр по категории -> сортировка
const filteredProducts = computed(() => {
  let result = products.filter((p) =>
    p.name.toLowerCase().includes(search.value.toLowerCase()),
  )

  if (category.value !== 'Все') {
    result = result.filter((p) => p.category === category.value)
  }

  // sort меняет массив на месте, поэтому сортируем копию
  if (sortOrder.value === 'asc') {
    result = [...result].sort((a, b) => a.price - b.price)
  } else if (sortOrder.value === 'desc') {
    result = [...result].sort((a, b) => b.price - a.price)
  }

  return result
})

// ---------- Корзина ----------

const cart = ref<CartItem[]>([])

function addToCart(product: Product) {
  const item = cart.value.find((i) => i.id === product.id)
  if (item) {
    item.quantity++
  } else {
    cart.value.push({ ...product, quantity: 1 })
  }
}

function decrease(item: CartItem) {
  if (item.quantity > 1) {
    item.quantity--
  } else {
    removeFromCart(item.id)
  }
}

function removeFromCart(id: number) {
  cart.value = cart.value.filter((i) => i.id !== id)
}

function clearCart() {
  cart.value = []
}

const totalCount = computed(() => cart.value.reduce((sum, i) => sum + i.quantity, 0))
const totalPrice = computed(() => cart.value.reduce((sum, i) => sum + i.price * i.quantity, 0))

function formatPrice(value: number) {
  return value.toLocaleString('ru-RU') + ' ₽'
}
</script>

<template>
  <div class="page">
    <h1>Магазин</h1>

    <div class="layout">
      <!-- Каталог -->
      <section class="catalog">
        <div class="filters">
          <input v-model="search" type="text" placeholder="Поиск товара..." />

          <select v-model="category">
            <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
          </select>

          <select v-model="sortOrder">
            <option value="none">Без сортировки</option>
            <option value="asc">Сначала дешёвые</option>
            <option value="desc">Сначала дорогие</option>
          </select>
        </div>

        <div v-if="filteredProducts.length" class="grid">
          <ProductCard
            v-for="product in filteredProducts"
            :key="product.id"
            :product="product"
            @add="addToCart"
          />
        </div>
        <p v-else>Ничего не найдено</p>
      </section>

      <!-- Корзина -->
      <aside class="cart">
        <h2>Корзина ({{ totalCount }})</h2>

        <p v-if="cart.length === 0">Корзина пуста</p>

        <template v-else>
          <ul class="cart-list">
            <li v-for="item in cart" :key="item.id" class="cart-item">
              <img :src="item.image" :alt="item.name" />
              <div class="cart-info">
                <p class="cart-name">{{ item.name }}</p>
                <p>{{ formatPrice(item.price) }}</p>
                <div class="quantity">
                  <button @click="decrease(item)">−</button>
                  <span>{{ item.quantity }}</span>
                  <button @click="item.quantity++">+</button>
                </div>
              </div>
              <button class="remove" @click="removeFromCart(item.id)">✕</button>
            </li>
          </ul>

          <p class="total">Итого: {{ formatPrice(totalPrice) }}</p>
          <button class="clear" @click="clearCart">Очистить корзину</button>
        </template>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.layout {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.catalog {
  flex: 1;
}

.filters {
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
}

.filters input {
  flex: 1;
}

.filters input,
.filters select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

.cart {
  width: 320px;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff;
  position: sticky;
  top: 20px;
}

.cart h2 {
  margin-top: 0;
}

.cart-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.cart-item {
  display: flex;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.cart-item img {
  width: 60px;
  height: 60px;
  object-fit: contain;
}

.cart-info {
  flex: 1;
}

.cart-info p {
  margin: 0 0 4px;
}

.cart-name {
  font-weight: bold;
}

.quantity {
  display: flex;
  align-items: center;
  gap: 8px;
}

.quantity button {
  width: 26px;
  height: 26px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
}

.remove {
  align-self: flex-start;
  border: none;
  background: none;
  color: #999;
  cursor: pointer;
}

.remove:hover {
  color: #d33;
}

.total {
  font-size: 18px;
  font-weight: bold;
}

.clear {
  width: 100%;
  padding: 8px;
  border: 1px solid #d33;
  border-radius: 6px;
  background: #fff;
  color: #d33;
  cursor: pointer;
}

.clear:hover {
  background: #d33;
  color: #fff;
}

@media (max-width: 800px) {
  .layout {
    flex-direction: column;
  }

  .cart {
    width: 100%;
    box-sizing: border-box;
    position: static;
  }

  .filters {
    flex-wrap: wrap;
  }
}
</style>

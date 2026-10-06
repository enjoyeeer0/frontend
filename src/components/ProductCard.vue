<script setup lang="ts">
import type { Product } from '@/data/products'

// Карточка получает товар от родителя через props
defineProps<{
  product: Product
}>()

// и сообщает родителю о нажатии кнопки через событие "add"
const emit = defineEmits<{
  add: [product: Product]
}>()
</script>

<template>
  <div class="card">
    <img :src="product.image" :alt="product.name" class="card-image" />
    <p class="card-category">{{ product.category }}</p>
    <h3 class="card-name">{{ product.name }}</h3>
    <p class="card-price">{{ product.price.toLocaleString('ru-RU') }} ₽</p>
    <button class="card-button" @click="emit('add', product)">В корзину</button>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff;
}

.card-image {
  width: 100%;
  height: 160px;
  object-fit: contain;
  margin-bottom: 8px;
}

.card-category {
  margin: 0;
  font-size: 13px;
  color: #777;
}

.card-name {
  margin: 4px 0;
  font-size: 16px;
}

.card-price {
  margin: 0 0 12px;
  font-weight: bold;
}

.card-button {
  margin-top: auto;
  padding: 8px;
  border: none;
  border-radius: 6px;
  background: #42b883;
  color: #fff;
  cursor: pointer;
}

.card-button:hover {
  background: #369870;
}
</style>

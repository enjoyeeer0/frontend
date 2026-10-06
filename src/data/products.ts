export interface Product {
  id: number
  name: string
  price: number
  category: string
  image: string
}

// Картинки лежат в папке public/images, поэтому путь начинается с /images/
export const products: Product[] = [
  { id: 1, name: 'Ноутбук Pro 14', price: 89990, category: 'Электроника', image: '/images/laptop.jpg' },
  { id: 2, name: 'Механическая клавиатура', price: 7500, category: 'Электроника', image: '/images/keyboard.jpg' },
  { id: 3, name: 'Кружка разработчика', price: 690, category: 'Аксессуары', image: '/images/mug.jpg' },
  { id: 4, name: 'Худи "Vue Master"', price: 3200, category: 'Одежда', image: '/images/hoodie.jpg' },
  { id: 5, name: 'Мышь беспроводная', price: 2400, category: 'Электроника', image: '/images/mouse.jpg' },
  { id: 6, name: 'Стикерпак с логотипом', price: 150, category: 'Аксессуары', image: '/images/stickers.jpg' },
  { id: 7, name: 'Монитор 27"', price: 24990, category: 'Электроника', image: '/images/monitor.jpg' },
  { id: 8, name: 'Кепка "Frontend"', price: 1100, category: 'Одежда', image: '/images/cap.jpg' },
]

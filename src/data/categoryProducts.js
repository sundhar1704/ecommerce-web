import milk from '../assets/product1.png'
import orange from '../assets/product2.png'
import garlic from '../assets/product3.png'
import meat from '../assets/product7.png'
import potato from '../assets/grocery img. 4.png'
import watermelon from '../assets/product5.png'
import carrot from '../assets/product6.png'
import cheese from '../assets/product4.png'
import chicken from '../assets/product8.png'

const defaultReviews = [
  { name: 'Maheshwari', text: 'The Vegetable was so fresh its receive perfectly', stars: 4 },
  { name: 'Maheshwari', text: 'The Vegetables was so freash its receive perfectly', stars: 4 },
]

export const categoryProducts = {
  'dairy-products': [
    { id: 'fresh-milk', image: milk, name: 'Fresh Milk', subtitle: 'Avain milk', price: '8.99', rating: 4, description: 'Fresh dairy milk sourced daily from local farms. Rich, creamy, and perfect for everyday use.', reviews: defaultReviews },
    { id: 'fresh-cheese', image: cheese, name: 'Fresh Cheese', subtitle: 'Avain milk', price: '8.99', rating: 4, description: 'Smooth and creamy cheese made from fresh milk, great for sandwiches and snacks.', reviews: defaultReviews },
  ],
  'fruits': [
    { id: 'fresh-orange', image: orange, name: 'Fresh Orange', subtitle: 'Avain milk', price: '8.99', rating: 4, description: 'Juicy, vitamin-C rich oranges picked at peak ripeness.', reviews: defaultReviews },
    { id: 'fresh-watermelon', image: watermelon, name: 'Fresh Watermelon', subtitle: 'Avain milk', price: '8.99', rating: 4, description: 'Sweet, hydrating watermelon — perfect for hot days.', reviews: defaultReviews },
  ],
  'vegetables': [
    { id: 'fresh-garlic', image: garlic, name: 'Fresh Garlic', subtitle: 'Avain milk', price: '8.99', rating: 4, description: 'Aromatic garlic bulbs, essential for flavoring any dish.', reviews: defaultReviews },
    { id: 'fresh-potato', image: potato, name: 'Fresh Potato', subtitle: 'Avain milk', price: '8.99', rating: 4, description: 'Farm-fresh potatoes, versatile for boiling, frying, or roasting.', reviews: defaultReviews },
    { id: 'fresh-carrot', image: carrot, name: 'Fresh Carrot', subtitle: 'Avain milk', price: '8.99', rating: 4, description: 'Crunchy, sweet carrots packed with nutrients.', reviews: defaultReviews },
  ],
  'fresh-meats': [
    { id: 'fresh-meat', image: meat, name: 'Fresh Meat', subtitle: 'Avain milk', price: '8.99', rating: 4, description: 'Premium quality fresh meat, cut and packed daily.', reviews: defaultReviews },
    { id: 'fresh-chicken', image: chicken, name: 'Fresh Chicken', subtitle: 'Avain milk', price: '8.99', rating: 4, description: 'Tender, farm-raised chicken, cleaned and ready to cook.', reviews: defaultReviews },
  ],
}
import { useState ,
  useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ProductList } from './components/ProductList'
import { Basket } from './components/Basket'
import { BasketItem } from './components/BasketItem'

function App() {
  const [count, setCount] = useState(0)
  const [basket, setBasket]=useState([])
  const [products,setProducts]=useState([])
  const [totalValue, setTotalValue] = useState(0);
  useEffect(() => {
    fetch("http://localhost:3004/products")
      .then(res => res.json())
      .then(res => {
        setProducts(res)
      })
  }, [])
  useEffect(() => {
    const total = basket.reduce((acc, item) => acc + item.price * item.count, 0);
    setTotalValue(total);
  }, [basket]);

    const moveToCart = id => {
      let found = products.find(x => x.id == id);
      let basketItem = basket.find(x => x.id == id);
    
      if (basketItem) {
        setBasket(
          basket.map(x => x.id == id ? { ...x, count: x.count + 1 } : x
          )
        );
      } else {
        setBasket([...basket, { ...found, count: 1 }]);
      }
    }
   const deleteItem=id=>{
    setBasket(basket.filter(item => item.id !== id));
   }

   const minusItem=id=>{
    
      setBasket(basket=>{
       return basket.map(item=>
         item.id===id && item.count>1?{...item,count:item.count-1}:item)

     
   })
   }
   

  return (
    <>
      <div className='row'>
   <ProductList
   items={products} onMove={moveToCart}
   />
   <Basket
   
   items={basket} onPlus={moveToCart}
   onDelete={deleteItem}
   onMinus={minusItem}
 
   
   />
     <strong className='total'>
        <h3>Total:{totalValue}USD</h3>
      </strong>
  
      </div>
    </>
  )
}

export default App

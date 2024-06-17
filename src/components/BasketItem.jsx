export const BasketItem=({title,price,id,count,onPlus,onDelete,onMinus})=>{
    return <tr>
            <td>{title}</td>
            <td>{price}</td>
            <td> {count}</td>
            <td>{price*count}</td>
            <td> 
                <button onClick={()=>onPlus(id)}>+</button>
                <button onClick={()=>onMinus(id)}>-</button>
                <button onClick={()=>onDelete(id)}>x</button>
            </td>
        </tr>
        
}
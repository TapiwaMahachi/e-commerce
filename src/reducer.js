 import {db} from './firebase';

export const initialState ={
    basket: [],
    user: null,
};
// getting the total value of items in the basket
 export const getBasketTotal = (basket) =>
   basket?.reduce((amount, prod) => (prod.price * prod.quantity) + amount, 0);

function reducer(state, action) {
        
        if(action.type === "SET_USER"){
        
            return {
                ...state,
                user: action.user,
            }
        }

        if(action.type === "ADD_TO_CART"){
              //check if the id matches and edit the quantity
              const found = state.basket.find(prod => prod.id === action.payload.id)
                console.log("Same id product: ", found )
                if(found){
                    //update the product
                    const updated = { ...found, quantity: action.payload.quantity + found.quantity }
                    console.log("Updated quantity: ", (action.payload.quantity + found.quantity) )
                    //remove the old product from  basket 
                    const removed = state.basket.filter(prop => prop.id !==action.payload.id)
                    // add the updated product
                   return { ...state, basket: [...removed, updated] }
                }
                //add the product
                return { ...state, basket: [...state.basket, action.payload] }
        }
        if(action.type ==="DELETE"){
            //check the id and remove from basket product that matches the id
            const updated = state.basket.filter(prod => prod.id !== action.payload)
            return{...state, basket: updated}
        }
        
     
}
export default reducer;


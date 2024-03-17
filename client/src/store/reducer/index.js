const initialState = {
    originalProducts: [],
    products: []
}

export default function reducer(state = initialState, action){
 switch (action.type){
    case "GET_PRODUCTS":
        //console.log(action.payload, "AAAAREDUCER")
        return{
            ...state,
             originalProducts: action.payload,
             products: action.payload
        };
        default:
            return state;

}}
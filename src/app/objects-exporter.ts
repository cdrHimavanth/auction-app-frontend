export class LoginObject{
    constructor(
        customerName:string,
        customerPassword:string
    ){

    }
}
export class SignupObject{
    constructor(
    customerName:string,
    customerPassword:string,
    customerMail:string
    ){

    }
}
// export class ItemObject{

// }
export class BidObject{
    constructor(
        public bidAmount:number
    ){}
}
export class ItemDto{
    constructor(
        public itemName:string,
        public itemStartPrice:number
    ){}
}
export class Item{
    constructor(
        public itemId:number,
        public itemName:string,
        public itemStartPrice:number,
        public owner:Customer
    ){}
}
export class Wallet{
    constructor(
        public walletId:number,
        public walletBalance:number
    ){}
}
export class Customer{
    constructor(
        public customerId:number,
        public customerMail:string,
        public customerPassword:string,
        public customerName:string,
        public wallet:Wallet
    ){}
}
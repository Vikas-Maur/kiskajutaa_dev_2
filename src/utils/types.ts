export type CartItem = {
    id: string,
    quantity: number,
    size: number,
    price: number,
    imageSrc: string
}

export type ExistingDesignOrderCollection = {
    email: string,
    fullname: string,
    productid: Array<string>,
    quantity: Array<number>,
    size: Array<number>,
    price: Array<number>,
    imageSrc: Array<string>,
    address: string,
    message: string,
}

export type NewDesignOrderCollection = {
    email: string,
    size: number,
    image: string,
    address: string,
    message: string,
    imageSrc: string
}

export type Address = {
    fullname: string,
    address: string,
    city: string,
    state: string,
    pincode: string
}
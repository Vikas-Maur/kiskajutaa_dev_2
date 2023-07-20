export type CartItem = {
    pId: string,
    price: number,
    quantity: number,
    size: number,
}

export type CartType = {
    email: string,
    productIds: Array<string>,
    price: Array<number>,
    quantity: Array<number>,
    size: Array<number>,
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

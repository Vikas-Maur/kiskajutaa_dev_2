export type CartItem = {
    id: string,
    quantity: number,
    size: number,
    price: number,
    imageSrc: string
}

export type ExistingDesignOrderCollection = {
    email: string,
    productIds: Array<string>,
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

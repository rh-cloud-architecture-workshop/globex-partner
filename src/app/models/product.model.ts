
export class PaginatedProductsList {
    products: Product[] =[];
    totalPages: number =0;
    totalElements: number =0;
    size: number = 0;
    number: number =0;
    numberOfElements: number =0;
}


export class Product {
    itemId: string ='';
    name: string ='';
    category: string ='';
    desc: string ='';
    price: number =0;
    quantity: number =0;
}



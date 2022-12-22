import { faker } from '@faker-js/faker/locale/es';

const createProduct = ()=> {
    return{
        name: faker.commerce.product(),
        price: faker.commerce.price(),
        photo: faker.image.business()
    }
}


export default createProduct
/**
 * order controller
 */

const stripe = require("stripe")("sk_test_51PYz6LGqK8jvpq8gaaHBYSxPb1NqTN3ZbryQTW9dDlM4MshCe5QwnjzIRo4XsDHe0GughcI8S4BcV0J5BcqNMx6V00zdcHU5Hd")

type Product = {
    attributes: {
        price: number
        discount: number
    },
    quantity: number
}

function calcDiscountPrice(price: number, discount: number) {
    if (!discount) return price;

    const discountAmount = (price * discount) / 100;
    const result = price - discountAmount

    return result.toFixed(2)
}
import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::order.order', ({ strapi }) => ({
    async paymentOrder(ctx) {

        //Mandamos la información
        const { token, products, idUser, addressShipping } = ctx.request.body;

        //Calculamos el total que va a costar
        let totalPayment = 0;
        products.forEach((product: Product) => {
            const priceTemp = calcDiscountPrice(
                product.attributes.price,
                product.attributes.discount
            );

            totalPayment += Number(priceTemp) * product.quantity
        });

        //Ejecutamos el pago sobre Stripe
        const charge = await stripe.charges.create({
            amount: Math.round(totalPayment * 100),
            currency: "USD",
            source: token.id,
            description: `User ID: ${idUser}`,
        })

        //Creamos la información que se va a guardar en base de datos 
        const data = {
            products,
            user: idUser,
            totalPayment,
            idPayment: charge.id,
            addressShipping,
        };

        //Obtenemos el modelo sobre el que guardamos los datos
        const model = strapi.contentTypes["api::order.order"];

        //Comprobamos que el modelo y la data a guardar son iguales
        const validData = await strapi.entityValidator.validateEntityCreation(
            model,
            data as any
        );

        //Guardamos los datos en base de datos
        const entry = await strapi.db
            .query("api::order.order")
            .create({ data: validData });

        //Retornamos el resultado al cliente
        return entry
    }
}));

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Product {
    @Prop({required: true})
    name: string;

    @Prop({required: true})
    description: string;

    @Prop({required: true})
    price: number;

    @Prop()
    image: string;

    @Prop({required: true})
    idUser: string;

    @Prop()
    category: string;

    @Prop({default: false})
    vendido: boolean;

    @Prop()
    sellTo: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product).set('versionKey', false);
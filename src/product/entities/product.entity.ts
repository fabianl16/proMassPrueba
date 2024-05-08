import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Product {


    @Prop({ required: true, unique:true })
    name: string;

    @Prop({ required: true, default: 0 })
    price: number;

}

export const ProductSchema = SchemaFactory.createForClass( Product );
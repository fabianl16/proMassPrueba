import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Model } from 'mongoose';
import { Product } from './entities/product.entity';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class ProductService {

  constructor(
    @InjectModel( Product.name ) 
    private productModel: Model<Product>
  ){}
  async create(createProductDto: CreateProductDto): Promise<Product> {
    
    try {

      const { price, ...productData } = createProductDto;

      console.log(price);
      
      const newProduct = new this.productModel( createProductDto );

      await newProduct.save();

      return newProduct;
    } catch (error) {
      if( error.code === 11000){
        throw new BadRequestException(`${createProductDto.name} already exists`);
      }

      throw new InternalServerErrorException('Fatal error, check server logs');

      
    }


  }

  async findAll( paginationDto: PaginationDto ) {
    const { limit = 10, offset = 1 } = paginationDto;
    const skip = (offset - 1) * limit;

    return this.productModel.find()
      .limit(limit)
      .skip(skip)
      .exec();
  }

  async findProductByTerm(term: string): Promise<Product> {
    
    let product: Product | null; 
    if( term.length === 24){
      product = await this.productModel.findById(term).exec();
    }

    if (!product){
      product = await this.productModel.findOne({ name: term }).exec();
    }

   return product;
  
  }

  async update(id: string, updateProductDto: UpdateProductDto):Promise<Product> {
    const updateProduct = await this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true }).exec();
    return updateProduct;
  }

  async remove(id: string) {
    const deletedProduct = await this.productModel.findByIdAndDelete(id).exec();
    
    if (!deletedProduct) {
      throw new NotFoundException('Product not found');
    }
  }

  async runSeed(){
    await this.insertNewProducts();
    return 'Seed executed!!!';
  }
  
  
  private async insertNewProducts() {
    await this.productModel.deleteMany({}).exec();

    const productsToSeed = 100;
    const products = [];

    for (let i = 0; i < productsToSeed; i++) {
      const randomName = `Product ${i + 1}`;
      const randomPrice = Math.floor(Math.random() * 1000) + 1;
      products.push({ name: randomName, price: randomPrice });
    }

    await this.productModel.insertMany(products);
  }

}

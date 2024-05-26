import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {

  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) { }

  async create(createProductDto: CreateProductDto) {
    const createdProduct = await this.productModel.create(createProductDto);
    return createdProduct;
  }

  async findAllPaginated(page: number, pageSize: number, category?: string, minPrice?: number, maxPrice?: number, sold?: boolean) {
    let filter: any = {};

    if (category) {
      filter.category = category;
    }

    if (minPrice !== undefined && maxPrice !== undefined) {
      filter.price = { $gte: minPrice, $lte: maxPrice };
    } else if (minPrice !== undefined) {
      filter.price = { $gte: minPrice };
    } else if (maxPrice !== undefined) {
      filter.price = { $lte: maxPrice };
    }

    if (sold !== undefined) {
      filter.vendido = sold;
    }

    const skip = (page - 1) * pageSize;
    const totalItems = await this.productModel.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / pageSize);

    const products = await this.productModel.find(filter).skip(skip).limit(pageSize);

    let nextPage = "nada";
    if (page < totalPages) {
      nextPage = `?page=${page + 1}&pageSize=${pageSize}`;
    }

    let previousPage = "nada";
    if (page > 1) {
      previousPage = `?page=${page - 1}&pageSize=${pageSize}`;
    }

    return { nextPage, previousPage, products };
  }

  async findByNamePaginated(letters: string, page: number, pageSize: number, category?: string, minPrice?: number, maxPrice?: number, sold?: boolean) {
    const skip = (page - 1) * pageSize;

    let filter: any = { name: { $regex: letters, $options: 'i' } };

    if (category) {
      filter.category = category;
    }
    if (minPrice !== undefined && maxPrice !== undefined) {
      filter.price = { $gte: minPrice, $lte: maxPrice };
    } else if (minPrice !== undefined) {
      filter.price = { $gte: minPrice };
    } else if (maxPrice !== undefined) {
      filter.price = { $lte: maxPrice };
    }
    if (sold !== undefined) {
      filter.vendido = sold;
    }

    const totalItems = await this.productModel.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / pageSize);

    const products = await this.productModel
      .find(filter)
      .skip(skip)
      .limit(pageSize);

    let nextPage = "nada";
    if (page < totalPages) {
      nextPage = `${letters}?page=${page + 1}&pageSize=${pageSize}`;
    }

    let previousPage = "nada";
    if (page > 1) {
      previousPage = `${letters}?page=${page - 1}&pageSize=${pageSize}`;
    }

    return { nextPage, previousPage, products };
  }

  async findByIdUserPaginated(id: string, page: number, pageSize: number, sold?: boolean) {
    const skip = (page - 1) * pageSize;

    let filter: any = { idUser: id };

    if (sold !== undefined) {
      filter.vendido = sold;
    }

    const totalItems = await this.productModel.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / pageSize);

    const products = await this.productModel
      .find(filter)
      .skip(skip)
      .limit(pageSize);

    let nextPage = "nada";
    if (page < totalPages) {
      nextPage = `/user/${id}?page=${page + 1}&pageSize=${pageSize}`;
    }

    let previousPage = "nada";
    if (page > 1) {
      previousPage = `/user/${id}?page=${page - 1}&pageSize=${pageSize}`;
    }

    return { nextPage, previousPage, products };
  }

  async findSellToPaginated(id: string, page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;

    let filter: any = { sellTo: id };

    const totalItems = await this.productModel.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / pageSize);

    const products = await this.productModel
      .find(filter)
      .skip(skip)
      .limit(pageSize);

    let nextPage = "nada";
    if (page < totalPages) {
      nextPage = `/sellto/${id}?page=${page + 1}&pageSize=${pageSize}`;
    }

    let previousPage = "nada";
    if (page > 1) {
      previousPage = `/sellto/${id}?page=${page - 1}&pageSize=${pageSize}`;
    }

    return { nextPage, previousPage, products };
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    console.log(updateProductDto);
    console.log(id);

    const updatedCoso = await this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true });

    console.log(updatedCoso);


    if (!updatedCoso) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return updatedCoso;
  }

  async remove(id: string) {
    const deletedCoso = await this.productModel.findByIdAndDelete(id);

    if (!deletedCoso) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return deletedCoso;
  }
}

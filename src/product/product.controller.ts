import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UploadedFiles,
  UseInterceptors
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { CreateProductDto } from './create-product.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // Create Product Route (with image upload)
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [{ name: 'images', maxCount: 5 }],
      {
        storage: diskStorage({
          destination: './uploads',  // Ensure the uploads folder is in the root directory
          filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname);
            cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
          },
        }),
      }
    )
  )
  create(@Body() product: CreateProductDto, @UploadedFiles() files: { images?: Express.Multer.File[] }) {
    const imagePaths = files.images?.map(file => `/uploads/${file.filename}`) || [];
    return this.productService.create({ ...product, images: imagePaths });
  }

  // Update Product Route (with image upload)
  @Put(':id')
  @UseInterceptors(
    FileFieldsInterceptor(
      [{ name: 'images', maxCount: 5 }],
      {
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname);
            cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
          },
        }),
      }
    )
  )
  update(@Param('id') id: string, @Body() product: Partial<Product>, @UploadedFiles() files: { images?: Express.Multer.File[] }) {
    const imagePaths = files.images?.map(file => `/uploads/${file.filename}`) || [];
    return this.productService.update(+id, { ...product, images: imagePaths });
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}

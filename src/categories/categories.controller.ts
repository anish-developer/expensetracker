import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/createCategory.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  createCategories(@Body() body: CreateCategoryDto) {
    try {
      const category = this.categoriesService.createCategory(body);
      return {
        statusCode: 201,
        message: 'Category created successfully',
        data: category,
      };
    } catch (error) {
      return {
        statusCode: 400,
        message: 'Category creation failed',
        error: error?.message,
      };
    }
  }

  @Get()
  async findAllCategories() {
    try {
      const categories = await this.categoriesService.findAll();
      return {
        statusCode: 200,
        message: 'Categories retrieved successfully',
        data: categories,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Failed to retrieve categories',
        error: error?.message,
      };
    }
  }
}

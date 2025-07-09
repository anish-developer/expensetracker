import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/createExpanse.dto';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly service: ExpensesService) {}

  @Post()
  createExpense(@Body() createExpenseDto: CreateExpenseDto) {
    try {
      const expense = this.service.createExpense(createExpenseDto);
      return {
        statusCode: 201,
        message: 'Expense created successfully',
        data: expense,
      };
    } catch (error) {
      return {
        statusCode: 400,
        message: 'Expense creation failed',
        error: error?.message,
      };
    }
  }

  @Get()
  async findAllExpenses() {
    try {
      const expenses = await this.service.findAllExpenses();
      return {
        statusCode: 200,
        message: 'Expenses retrieved successfully',
        data: expenses,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Failed to retrieve expenses',
        error: error?.message,
      };
    }
  }

  @Get(':id')
  async findOneExpense(@Param('id') id: string) {
    try {
      const expense = await this.service.findOne(id);
      if (!expense) {
        return {
          statusCode: 404,
          message: 'Expense not found',
        };
      }
      return {
        statusCode: 200,
        message: 'Expense retrieved successfully',
        data: expense,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Failed to retrieve expense',
        error: error?.message,
      };
    }
  }

  @Patch(':id')
  async updateExpense(
    @Param('id') id: string,
    @Body() updateExpenseDto: CreateExpenseDto,
  ) {
    try {
      const updatedExpense = await this.service.updateExpense(
        id,
        updateExpenseDto,
      );
      if (!updatedExpense) {
        return {
          statusCode: 404,
          message: 'Expense not found',
        };
      }
      return {
        statusCode: 200,
        message: 'Expense updated successfully',
        data: updatedExpense,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Failed to update expense',
        error: error?.message,
      };
    }
  }

  @Delete(':id')
  async deleteExpense(@Param('id') id: string) {
    try {
      const deletedExpense = await this.service.deleteExpense(id);
      if (!deletedExpense) {
        return {
          statusCode: 404,
          message: 'Expense not found',
        };
      }
      return {
        statusCode: 200,
        message: 'Expense deleted successfully',
        data: deletedExpense,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Failed to delete expense',
        error: error?.message,
      };
    }
  }

  @Get('statistic/top-three-days/:userId')
  async getTopThreeDays(@Param('userId') userId: string) {
    try {
      const topDays = await this.service.getTopGetTopThreeDays(userId);
      return {
        statusCode: 200,
        message: 'Top three days retrieved successfully',
        data: topDays,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Failed to retrieve top three days',
        error: error?.message,
      };
    }
  }

  @Get('statistic/monthly-change/:userId')
  async getMonthlyChange(@Param('userId') userId: string) {
    try {
      const monthlyChange = await this.service.getMonthlyChange(userId);
      return {
        statusCode: 200,
        message: 'Monthly change retrieved successfully',
        data: monthlyChange,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Failed to retrieve monthly change',
        error: error?.message,
      };
    }
  }

  @Get('statistic/predict-next/:userId')
  async getPredictNext(@Param('userId') userId: string) {
    try {
      const predictNext = await this.service.getPredictNext(userId);
      return {
        statusCode: 200,
        message: 'Predict next retrieved successfully',
        data: predictNext,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Failed to retrieve predict next',
        error: error?.message,
      };
    }
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { Expense } from 'src/schema/expenses.schema';
import { CreateExpenseDto } from './dto/createExpanse.dto';
import { addMonths, startOfMonth, subMonths } from 'date-fns';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectModel(Expense.name) private expenseModel: Model<Expense>,
  ) {}

  createExpense(createExpenseDto: CreateExpenseDto) {
    const newExpense = new this.expenseModel(createExpenseDto);
    return newExpense.save();
  }

  async findAllExpenses() {
    return this.expenseModel
      .find()
      .populate('user_id')
      .populate('category')
      .exec();
  }

  async findOne(id: string) {
    return this.expenseModel
      .findById(new mongoose.Types.ObjectId(id))
      .populate('user_id')
      .populate('category')
      .exec();
  }

  async updateExpense(id: string, updateExpenseDto: CreateExpenseDto) {
    return this.expenseModel
      .findByIdAndUpdate(new mongoose.Types.ObjectId(id), updateExpenseDto, {
        new: true,
      })
      .exec();
  }

  async deleteExpense(id: string) {
    return this.expenseModel.findByIdAndDelete(id).exec();
  }

  async getTopGetTopThreeDays(userId: string) {
    return this.expenseModel.aggregate([
      {
        $match: { user_id: new mongoose.Types.ObjectId(userId) },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
          totalAmount: { $sum: '$amount' },
        },
      },
      {
        $sort: { totalAmount: -1 },
      },
      {
        $limit: 3,
      },
    ]);
  }

  async getMonthlyChange(userId: string) {
    const now = new Date();

    const startOfThisMonth = startOfMonth(now);

    const startOfLastMonth = startOfMonth(subMonths(now, 1));

    const [lastMonth, currentMonth] = await Promise.all([
      this.expenseModel.aggregate([
        {
          $match: {
            user_id: new Types.ObjectId(userId),
            date: { $gte: startOfLastMonth, $lt: startOfThisMonth },
          },
        },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: '$amount' },
          },
        },
      ]),
      this.expenseModel.aggregate([
        {
          $match: {
            user_id: new Types.ObjectId(userId),
            date: { $gte: startOfThisMonth },
          },
        },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: '$amount' },
          },
        },
      ]),
    ]);

    const last = lastMonth[0]?.totalAmount || 0;
    const current = currentMonth[0]?.totalAmount || 0;
    const percentage = last === 0 ? 0 : ((current - last) / last) * 100;

    return { last, current, percentage };
  }

  async getPredictNext(userId: string) {
    const now = new Date();
    const startOfThisMonth = startOfMonth(now);
    const startOfThreeMonthsAgo = startOfMonth(subMonths(now, 3));

    const data = await this.expenseModel.aggregate([
      {
        $match: {
          user_id: new Types.ObjectId(userId),
          date: {
            $gte: startOfThreeMonthsAgo,
            $lt: startOfThisMonth,
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' },
          },
          totalAmount: { $sum: '$amount' },
        },
      },
      {
        $sort: {
          '_id.year': -1,
          '_id.month': -1,
        },
      },
      {
        $limit: 3,
      },
    ]);

    const average =
      data.reduce((acc, curr) => acc + curr.totalAmount, 0) / data.length || 0;

    return { PredictedNextMonthTotal: Math.round(average * 100) / 100 };
  }
}

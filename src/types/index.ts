import { Request } from 'express';
import { Prisma } from '@prisma/client';

export interface AuthRequest extends Request {
  user: Prisma.UserGetPayload<{
    include: {
      profiles: true;
    };
  }>;
}

// Auth Types
export interface RegisterInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

// Profile Types
export interface ProfileInput {
  name: string;
}

// Financial System Types
export interface FinancialSystemInput {
  name: string;
  color: string;
  currency: Prisma.Currency;
  periodType?: Prisma.PeriodType;
}

// Financial Rule Types
export interface FinancialRuleInput {
  name: string;
  percentage: number;
}

// Income Types
export interface IncomeInput {
  description: string;
  amount: number;
  date: Date;
}

// Expense Types
export interface ExpenseInput {
  description: string;
  amount: number;
  categoryTag: string;
  ruleId: string;
  date: Date;
}

// Collaborator Types
export interface CollaboratorInput {
  profileId: string;
  percentage: number;
}

export interface AccountInput {
  name: string;
  type: Prisma.AccountType;
  balance?: number;
}

export interface CategoryInput {
  name: string;
  type: Prisma.TransactionType;
}

export interface TransactionInput {
  amount: number;
  type: Prisma.TransactionType;
  description: string;
  date: Date;
  accountId: string;
  categoryId: string;
} 
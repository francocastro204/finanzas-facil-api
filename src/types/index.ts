import { Request } from 'express';
import { AccountType, TransactionType, Currency, PeriodType } from '@prisma/client';

export interface AuthRequest extends Request {
  user: {
    id: string;
    email: string;
  };
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
  currency: Currency;
  periodType?: PeriodType;
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
  type: AccountType;
  balance?: number;
}

export interface CategoryInput {
  name: string;
  type: TransactionType;
}

export interface TransactionInput {
  amount: number;
  type: TransactionType;
  description: string;
  date: Date;
  accountId: string;
  categoryId: string;
} 
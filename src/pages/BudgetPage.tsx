
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DollarSign, PieChart, TrendingUp, CreditCard, Save, Medal, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';
import { Progress } from '@/components/ui/progress';

const BudgetPage = () => {
  const isMobile = useIsMobile();
  const [currency, setCurrency] = useState(() => localStorage.getItem('currency') || 'USD');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem('expenses');
    return savedExpenses ? JSON.parse(savedExpenses) : [
      { id: 1, amount: 12.99, category: 'Food', date: '2023-04-01' },
      { id: 2, amount: 50.00, category: 'Transport', date: '2023-04-02' },
      { id: 3, amount: 30.50, category: 'Entertainment', date: '2023-04-03' },
    ];
  });
  
  const [monthlyBudget, setMonthlyBudget] = useState(() => {
    const savedBudget = localStorage.getItem('monthlyBudget');
    return savedBudget ? Number(savedBudget) : 1000;
  });
  
  const [showBudgetForm, setShowBudgetForm] = useState(false);
  const [newBudget, setNewBudget] = useState(String(monthlyBudget));
  
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);
  
  useEffect(() => {
    localStorage.setItem('currency', currency);
  }, [currency]);
  
  useEffect(() => {
    localStorage.setItem('monthlyBudget', String(monthlyBudget));
  }, [monthlyBudget]);
  
  const currencySymbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    INR: '₹',
    JPY: '¥'
  };

  const handleAddExpense = () => {
    if (!amount || !category) {
      toast.error('Please enter both amount and category');
      return;
    }
    
    const newExpense = {
      id: Date.now(),
      amount: parseFloat(amount),
      category,
      date: new Date().toISOString().split('T')[0]
    };
    
    setExpenses([...expenses, newExpense]);
    setAmount('');
    setCategory('');
    
    // Gamify the experience
    if (expenses.length % 5 === 0) {
      toast.success(`🏆 Achievement unlocked: Tracked ${expenses.length + 1} expenses!`, {
        icon: <Medal className="h-5 w-5 text-yellow-500" />
      });
    } else {
      toast.success('Expense added successfully');
    }
  };
  
  const handleUpdateBudget = () => {
    const budget = parseFloat(newBudget);
    if (isNaN(budget) || budget <= 0) {
      toast.error('Please enter a valid budget amount');
      return;
    }
    
    setMonthlyBudget(budget);
    setShowBudgetForm(false);
    toast.success('Monthly budget updated successfully');
  };
  
  const handleDeleteExpense = (id: number) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
    toast.success('Expense deleted successfully');
  };

  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
  const budgetUsedPercentage = (totalExpenses / monthlyBudget) * 100;
  const budgetStatus = budgetUsedPercentage > 85 ? 'danger' : budgetUsedPercentage > 70 ? 'warning' : 'success';

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <DollarSign className="h-6 w-6 text-green-500" />
            Budget Tracker
          </h1>
          <Select value={currency} onValueChange={setCurrency}>
            <SelectTrigger className={`w-[180px] ${isMobile ? "w-full" : ""}`}>
              <SelectValue placeholder="Select Currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">US Dollar ($)</SelectItem>
              <SelectItem value="EUR">Euro (€)</SelectItem>
              <SelectItem value="GBP">British Pound (£)</SelectItem>
              <SelectItem value="INR">Indian Rupee (₹)</SelectItem>
              <SelectItem value="JPY">Japanese Yen (¥)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Expenses
              </CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {currencySymbols[currency]}{totalExpenses.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">
                This month's spending
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Monthly Budget
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex justify-between items-center">
                <span>{currencySymbols[currency]}{monthlyBudget.toFixed(2)}</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowBudgetForm(true)}
                  className="text-xs h-7"
                >
                  Edit
                </Button>
              </div>
              <div className="mt-2">
                <Progress 
                  value={budgetUsedPercentage} 
                  className={`h-2 ${
                    budgetStatus === 'danger' ? 'bg-red-200' : 
                    budgetStatus === 'warning' ? 'bg-yellow-200' : 'bg-green-200'
                  }`} 
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {budgetUsedPercentage.toFixed(0)}% of budget used
                </p>
              </div>
              
              {showBudgetForm && (
                <div className="mt-4 flex flex-col gap-2">
                  <Input
                    type="number"
                    min="0"
                    placeholder="Enter new budget"
                    value={newBudget}
                    onChange={(e) => setNewBudget(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="flex-1" 
                      onClick={handleUpdateBudget}
                    >
                      <Save className="h-4 w-4 mr-1" /> Save
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1" 
                      onClick={() => setShowBudgetForm(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Remaining
              </CardTitle>
              <CreditCard className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${monthlyBudget - totalExpenses < 0 ? 'text-red-500' : ''}`}>
                {currencySymbols[currency]}{(monthlyBudget - totalExpenses).toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">
                Available to spend
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200">
          <CardHeader>
            <CardTitle>Add Expense</CardTitle>
            <CardDescription>
              Track your daily expenses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className={`${isMobile ? 'flex flex-col' : 'flex flex-row'} gap-4`}>
              <div className="flex-1">
                <Input
                  type="number"
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex-1">
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Food">🍽️ Food</SelectItem>
                    <SelectItem value="Transport">🚌 Transport</SelectItem>
                    <SelectItem value="Entertainment">🎭 Entertainment</SelectItem>
                    <SelectItem value="Utilities">💡 Utilities</SelectItem>
                    <SelectItem value="Health">🏥 Health</SelectItem>
                    <SelectItem value="Shopping">🛍️ Shopping</SelectItem>
                    <SelectItem value="Other">📦 Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAddExpense}>Add Expense</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200">
          <CardHeader>
            <CardTitle>Recent Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {expenses.length > 0 ? (
                <div className="divide-y">
                  {expenses.slice().reverse().map((expense) => (
                    <div key={expense.id} className="py-3 flex justify-between items-center">
                      <div>
                        <p className="font-medium">{expense.category}</p>
                        <p className="text-sm text-muted-foreground">{expense.date}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <p className="font-bold">
                          {currencySymbols[currency]}{expense.amount.toFixed(2)}
                        </p>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDeleteExpense(expense.id)}
                          className="h-8 w-8 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  No expenses recorded yet.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default BudgetPage;

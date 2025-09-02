
import React from 'react';
import { Flame } from 'lucide-react';
import CalorieTracker from '@/components/ui/calorie-tracker';
import MainLayout from '@/components/layout/MainLayout';

const NutritionPage = () => {
  return (
    <MainLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <Flame className="h-6 w-6 text-calories" />
          Nutrition Tracker
        </h2>
        <p className="text-muted-foreground">Monitor your calorie intake and nutrition balance.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CalorieTracker className="h-auto" />
        
        <div className="glass-card p-5">
          <h3 className="text-lg font-medium mb-4">Macronutrient Breakdown</h3>
          <div className="bg-secondary/50 rounded-xl p-4">
            <div className="flex justify-between mb-4">
              <div className="text-center">
                <div className="text-lg font-bold">45%</div>
                <div className="text-sm text-muted-foreground">Carbs</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold">30%</div>
                <div className="text-sm text-muted-foreground">Protein</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold">25%</div>
                <div className="text-sm text-muted-foreground">Fats</div>
              </div>
            </div>
            <div className="w-full h-2.5 bg-background rounded-full overflow-hidden">
              <div className="flex h-full">
                <div className="bg-blue-400 h-full" style={{ width: '45%' }}></div>
                <div className="bg-green-400 h-full" style={{ width: '30%' }}></div>
                <div className="bg-yellow-400 h-full" style={{ width: '25%' }}></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="glass-card p-5 md:col-span-2">
          <h3 className="text-lg font-medium mb-4">Recent Meals</h3>
          <div className="space-y-3">
            {[
              { time: 'Breakfast', name: 'Oatmeal with Berries', calories: 320 },
              { time: 'Lunch', name: 'Grilled Chicken Salad', calories: 450 },
              { time: 'Snack', name: 'Greek Yogurt with Honey', calories: 180 },
              { time: 'Dinner', name: 'Salmon with Roasted Vegetables', calories: 520 }
            ].map((meal, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-secondary/50 rounded-xl">
                <div>
                  <div className="font-medium">{meal.time}</div>
                  <div className="text-sm text-muted-foreground">{meal.name}</div>
                </div>
                <div className="text-calories font-medium">{meal.calories} cal</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default NutritionPage;

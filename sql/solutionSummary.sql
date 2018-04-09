SELECT CostElement.Category, SUM(Solution_Cost.Amount) as Amount
FROM Solution_Cost LEFT JOIN CostElement ON Solution_Cost.CostElement = CostElement.ID
WHERE Solution_Cost.Solution =? AND (CostElement.Category = 'Salaries' OR CostElement.Category = 'Non-Salary')
GROUP BY CostElement.Category

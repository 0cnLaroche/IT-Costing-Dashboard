SELECT CostElement.Category, SUM(Solution_Cost.Amount) as Amount
FROM Solution_Cost LEFT JOIN CostElement ON Solution_Cost.CostElement = CostElement.ID
WHERE Solution_Cost.Solution =?
GROUP BY CostElement.Category

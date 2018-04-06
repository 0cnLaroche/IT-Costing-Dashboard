SELECT CostElement.Category, SUM(Direct.Amount) As Amount
FROM Direct
	INNER JOIN CostElement ON Direct.CostElement = CostElement.ID
	INNER JOIN Network n ON Direct.Object = n.ID
	INNER JOIN WBS w on w.ID = n.WBS
	INNER JOIN ProjectDefinition p ON w.ProjectDefinition = p.ID
WHERE p.ID=? AND Direct.FiscalYear=? AND (CostElement.Category = 'Salaries' OR CostElement.Category = 'Non-Salary')
GROUP BY Category

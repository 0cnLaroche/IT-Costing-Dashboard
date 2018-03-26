SELECT Solution.Name, CostElement.`Group` As Label, Solution_Cost.FiscalYear as Period, Sum(Solution_Cost.Amount) As Amount
FROM Solution_Cost LEFT JOIN (CostElement, Solution) ON (Solution_Cost.CostElement = CostElement.ID AND Solution_Cost.Solution = Solution.ID)
WHERE Solution_Cost.Solution = ?
GROUP BY Solution.Name, CostElement.`Group`, Solution_Cost.FiscalYear
ORDER BY CostElement.`Group`;

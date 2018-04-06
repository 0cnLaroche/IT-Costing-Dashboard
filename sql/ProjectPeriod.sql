SELECT p.Name As Context, Activity.Name, Direct.Period, SUM(Direct.Amount) AS Amount
FROM Direct
	INNER JOIN Network n ON Direct.Object = n.ID
	INNER JOIN WBS w on w.ID = n.WBS
	INNER JOIN ProjectDefinition p ON w.ProjectDefinition = p.ID
	INNER JOIN Activity ON Activity.ID = Direct.NetworkActivity
WHERE p.ID=? AND Direct.FiscalYear=?
GROUP BY Activity.Name, Direct.Period
ORDER BY FIELD (Activity.Name, 'Project Management','Analyse','Plan','Design','Build','Test','Deploy','Stabilize/Close');

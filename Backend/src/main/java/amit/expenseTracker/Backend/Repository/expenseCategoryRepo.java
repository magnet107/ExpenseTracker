package amit.expenseTracker.Backend.Repository;

import amit.expenseTracker.Backend.Model.ExpenseCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface expenseCategoryRepo extends JpaRepository<ExpenseCategory,Integer> {
}

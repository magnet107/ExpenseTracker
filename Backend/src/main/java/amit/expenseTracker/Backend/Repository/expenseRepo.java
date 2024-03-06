package amit.expenseTracker.Backend.Repository;

import amit.expenseTracker.Backend.Model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

public interface expenseRepo extends JpaRepository<Expense,Integer> {
}

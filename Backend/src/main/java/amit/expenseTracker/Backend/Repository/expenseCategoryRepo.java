package amit.expenseTracker.Backend.Repository;

import amit.expenseTracker.Backend.Model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface expenseCategoryRepo extends JpaRepository<Category,Long> {
}

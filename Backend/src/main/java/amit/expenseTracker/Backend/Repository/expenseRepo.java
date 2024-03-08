package amit.expenseTracker.Backend.Repository;

import amit.expenseTracker.Backend.Model.Category;
import amit.expenseTracker.Backend.Model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;


@Repository
public interface expenseRepo extends JpaRepository<Expense,Long> {

    public List<Expense> findBycategory(Category category);

}

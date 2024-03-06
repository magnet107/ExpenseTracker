package amit.expenseTracker.Backend.Repository;

import amit.expenseTracker.Backend.Model.Expense;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface expenseRepo extends JpaRepository<Expense,Integer> {

    Page<Expense> findByDateBetweenOrderByCreationDateDesc(LocalDate startDate, LocalDate endDate, Pageable page);


    Page<Expense> findByExpenseTypeOrderByCreationDateDesc(String expenseType, Pageable page);


    Page<Expense> findByDateBetweenAndExpenseTypeOrderByCreationDateDesc(LocalDate startDate, LocalDate endDate, String expenseType, Pageable page);
}

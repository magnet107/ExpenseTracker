package amit.expenseTracker.Backend.Service;

import amit.expenseTracker.Backend.Model.Expense;
import amit.expenseTracker.Backend.Repository.expenseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.Month;
import java.util.List;
import java.util.stream.StreamSupport;

@Service
public class expenseService {

    @Autowired
    private expenseRepo expenseRepo;



    public Expense save(Expense entity) {
        return expenseRepo.save(entity);
    }

    public List<Expense> findAll() {
        return expenseRepo.findAll();
    }

    public void deleteById(Integer id) {
        expenseRepo.deleteById(id);
    }

    public BigDecimal getTotalAmount(Iterable<Expense> expenses) {
        return StreamSupport.
                stream(expenses.spliterator(), false)
                .toList()
                .stream()
                .map(Expense::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

    }

    public Page<Expense> getExpensesByYearMonthAndType(int year, Month month, String expenseType, Pageable page) {
        LocalDate startDate = LocalDate.of(year, month, 1);
        LocalDate endDate = startDate.withDayOfMonth(startDate.lengthOfMonth());
        return expenseRepo.findByDateBetweenAndExpenseTypeOrderByCreationDateDesc(startDate, endDate, expenseType, page);
    }

    public Page<Expense> getExpensesByYearMonth(int year, Month month, Pageable page) {
        LocalDate startDate = LocalDate.of(year, month, 1);
        LocalDate endDate = startDate.withDayOfMonth(startDate.lengthOfMonth());
        return expenseRepo.findByDateBetweenOrderByCreationDateDesc(startDate, endDate, page);
    }


    public Page<Expense> getExpensesByType(String expenseType, Pageable page) {
        return expenseRepo.findByExpenseTypeOrderByCreationDateDesc(expenseType, page);
    }
}

package amit.expenseTracker.Backend.Service;

import amit.expenseTracker.Backend.Model.Category;
import amit.expenseTracker.Backend.Model.Expense;
import amit.expenseTracker.Backend.Repository.expenseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
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

    public void deleteById(Long id) {
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

    public List<Expense> findExpensesByCategory(Category category){
        return this.expenseRepo.findBycategory(category);
    }

    public Expense update(Long id, Expense updatedExpense) {
        Optional<Expense> optionalExpense = this.expenseRepo.findById(id);
        if (optionalExpense.isPresent()) {
            Expense existingExpense=optionalExpense.get();
            existingExpense.setName(updatedExpense.getName());
            existingExpense.setAmount(updatedExpense.getAmount());
            existingExpense.setDate(updatedExpense.getDate());
            existingExpense.setCategory(updatedExpense.getCategory());
            return this.expenseRepo.save(existingExpense);
        }
        else {
            return null;
        }
    }


    public Expense findById(Long id) {
        Optional<Expense> expense = expenseRepo.findById(id);
        return expense.orElse(null);
    }
}

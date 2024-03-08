package amit.expenseTracker.Backend.Controller;

import amit.expenseTracker.Backend.Model.Category;
import amit.expenseTracker.Backend.Model.Expense;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import amit.expenseTracker.Backend.Service.expenseService;

import java.math.BigDecimal;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/expenses")
public class expenseController {

    @Autowired
    private expenseService expenseService;

    @PostMapping("/")
    public Expense saveExpense(@RequestBody Expense expense) {
        return this.expenseService.save(expense);
    }

    @GetMapping("/")
    public List<Expense> getAllExpenses() {
        return this.expenseService.findAll();
    }

    @DeleteMapping("/{id}")
    public void deleteExpense(@PathVariable("id") Long id) {
        this.expenseService.deleteById(id);
    }

    @GetMapping("/totalAmount")
    public BigDecimal getTotalAmount() {
        return this.expenseService.getTotalAmount(expenseService.findAll());
    }

    @GetMapping("/filter/{id}")
    public List<Expense> getExpensesOfCategory(@PathVariable Long id){
        Category category=new Category();
        category.setCid(id);
        return this.expenseService.findExpensesByCategory(category);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Expense> getExpenseById(@PathVariable Long id) {
        Expense expense = expenseService.findById(id);
        if (expense != null) {
            return new ResponseEntity<>(expense, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Expense> updateCategory(@PathVariable Long id, @RequestBody Expense expense) {
        Expense updatedExpense = expenseService.update(id, expense);
        if (updatedExpense != null) {
            return new ResponseEntity<>(updatedExpense, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}

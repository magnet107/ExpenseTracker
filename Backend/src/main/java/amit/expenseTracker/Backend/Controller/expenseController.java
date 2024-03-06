package amit.expenseTracker.Backend.Controller;

import amit.expenseTracker.Backend.Model.Expense;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import amit.expenseTracker.Backend.Service.expenseService;

import java.math.BigDecimal;
import java.time.Month;
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
    public void deleteExpense(@PathVariable("id") Integer id) {
        this.expenseService.deleteById(id);
    }

    @GetMapping("/totalAmount")
    public BigDecimal getTotalAmount() {
        return this.expenseService.getTotalAmount(expenseService.findAll());
    }

    @GetMapping("/filter/year/{year}/month/{month}/type/{expenseType}")
    public Page<Expense> getExpensesByYearMonthAndType(@PathVariable int year, @PathVariable Month month, @PathVariable String expenseType, Pageable page) {
        return this.expenseService.getExpensesByYearMonthAndType(year, month, expenseType, page);
    }

    @GetMapping("/filter/year/{year}/month/{month}")
    public Page<Expense> getExpensesByYearMonth(@PathVariable int year, @PathVariable Month month, Pageable page) {
        return this.expenseService.getExpensesByYearMonth(year, month, page);
    }

    @GetMapping("/filter/type/{expenseType}")
    public Page<Expense> getExpensesByType(@PathVariable String expenseType, Pageable page) {
        return this.expenseService.getExpensesByType(expenseType, page);
    }
}

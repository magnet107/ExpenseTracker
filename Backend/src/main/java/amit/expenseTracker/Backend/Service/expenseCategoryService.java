package amit.expenseTracker.Backend.Service;


import amit.expenseTracker.Backend.Model.ExpenseCategory;
import amit.expenseTracker.Backend.Repository.expenseCategoryRepo;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class expenseCategoryService {

    @Autowired
    private expenseCategoryRepo expenseCategoryRepo;

    public ExpenseCategory findById(Integer id) {
        return expenseCategoryRepo.findById(id).get();

    }


    public ExpenseCategory Add(ExpenseCategory entity)  {

        return expenseCategoryRepo.save(entity);

    }

    @PostConstruct
    public void init() {
        Iterable<ExpenseCategory> allExpenses = expenseCategoryRepo.findAll();
        if (((Collection<?>) allExpenses).isEmpty()) {
            ExpenseCategory defaultExpenseType = new ExpenseCategory(1, "Home");
            expenseCategoryRepo.save(defaultExpenseType);
        }
    }


    public Iterable<ExpenseCategory> findAll() {
        return expenseCategoryRepo.findAll();
    }

    public void deleteById(Integer id) {
        ExpenseCategory expenseTypeToBeDeleted = findById(id);
        expenseCategoryRepo.delete(expenseTypeToBeDeleted);
    }




}
package amit.expenseTracker.Backend.Service;


import amit.expenseTracker.Backend.Model.Category;
import amit.expenseTracker.Backend.Repository.expenseCategoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class expenseCategoryService {

    @Autowired
    private expenseCategoryRepo expenseCategoryRepo;

    public Category findById(Long id) {
        Optional<Category> expenseCategoryOptional = expenseCategoryRepo.findById(id);
        return expenseCategoryOptional.orElse(null);
    }

    public Category add(Category category) {
        return expenseCategoryRepo.save(category);
    }

    public Iterable<Category> findAll() {
        return expenseCategoryRepo.findAll();
    }

    public void deleteById(Long id) {
        expenseCategoryRepo.deleteById(id);
    }

    public Category update(Long id, Category updatedCategory) {
        Optional<Category> optionalExpenseCategory = expenseCategoryRepo.findById(id);
        if (optionalExpenseCategory.isPresent()) {
            Category existingCategory = optionalExpenseCategory.get();
            existingCategory.setName(updatedCategory.getName());
            return expenseCategoryRepo.save(existingCategory);
        }
        return null;

    }

}
package amit.expenseTracker.Backend.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDate;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Table(name = "expense")
public class Expense {


    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;
    private String name;
    private BigDecimal amount;
    private LocalDate date;
    @CreationTimestamp
    private Timestamp creationDate;

    @ManyToOne(fetch = FetchType.EAGER)
    private Category category;

}

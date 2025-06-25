package buy_beta.data.models;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class Commitment {
    private User userId;
    private GroupDeal dealId;
    private int amount;
    private String status;
}

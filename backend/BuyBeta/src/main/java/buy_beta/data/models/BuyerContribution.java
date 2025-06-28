package buy_beta.data.models;

import buy_beta.enums.DealStatus;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document
@Builder
public class BuyerContribution {
    private String userId;
    private String dealId;
    private double amount;
    private DealStatus status;
    private LocalDateTime contributedAt;
}

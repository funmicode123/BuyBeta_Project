package buy_beta.data.models;

import buy_beta.enums.DealStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GroupDeal {
    @Id
    private String dealId;

    private User vendor;
    private String walletAddress;
    private String productName;
    private String productDescription;
    private double unitPrice;
    private double totalPrice;
    private int maxParticipants;
    private int minParticipants = 2;
    private LocalDateTime deadLines;
    private int currentBuyers;
    private DealStatus status;
}

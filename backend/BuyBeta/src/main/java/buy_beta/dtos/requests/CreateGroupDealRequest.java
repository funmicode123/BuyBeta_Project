package buy_beta.dtos.requests;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CreateGroupDealRequest {
    private String productName;
    private String productDescription;
    private double unitPrice;
    private int maxParticipants;
    private LocalDateTime deadLine;
}

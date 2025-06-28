package buy_beta.dtos.requests;

import lombok.Data;

@Data
public class JoinGroupDealRequest {
    private String userId;
    private String groupDealId;
    private int quantity;
    private double amount;
}

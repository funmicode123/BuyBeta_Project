package buy_beta.dtos.response;

import buy_beta.enums.DealStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class JoinGroupDealResponse {
    private String contributionId;
    private String dealId;
    private String userId;
    private String buyerId;
    private double amount;
    private DealStatus status;
    private LocalDateTime contributedAt;
}

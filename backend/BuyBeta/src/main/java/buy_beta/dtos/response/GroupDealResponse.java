package buy_beta.dtos.response;

import buy_beta.enums.DealStatus;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@Getter
public class GroupDealResponse {
    private String vendorId;
    private String productName;
    private double unitPrice;
    private int maxParticipants;
    private String walletAddress;
    private DealStatus status;
    private LocalDateTime deadLine;
}

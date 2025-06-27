package buy_beta.dtos.response;

import lombok.Data;

@Data
public class EnokiVerificationResponse {
    private String did;
    private String address;
    private String walletType;
    private String appId;
}

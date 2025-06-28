package buy_beta.services.contract;

import buy_beta.dtos.response.EnokiVerificationResponse;

public interface EnokiAuthService {
        EnokiVerificationResponse verifyToken(String token);
}

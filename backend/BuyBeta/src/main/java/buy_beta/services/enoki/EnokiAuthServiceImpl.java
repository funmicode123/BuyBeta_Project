package buy_beta.services.enoki;

import buy_beta.dtos.response.EnokiVerificationResponse;
import buy_beta.services.contract.EnokiAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import org.springframework.http.HttpHeaders;

@Service
@RequiredArgsConstructor
public class EnokiAuthServiceImpl implements EnokiAuthService {
    private final RestTemplate restTemplate = new RestTemplate();
    private final String ENOKI_VERIFY_URL = "https://api.enoki.world/auth/verify";

    public EnokiVerificationResponse verifyToken(String authToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + authToken);
        HttpEntity<Void> request = new HttpEntity<>(headers);

        ResponseEntity<EnokiVerificationResponse> response = restTemplate.exchange(
                ENOKI_VERIFY_URL,
                HttpMethod.POST,
                request,
                EnokiVerificationResponse.class
        );
        return response.getBody();
    }
}

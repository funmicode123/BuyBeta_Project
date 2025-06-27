package buy_beta.services.enoki;

import buy_beta.dtos.response.EnokiVerificationResponse;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import org.springframework.http.HttpHeaders;


public class EnokiAuthService {
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

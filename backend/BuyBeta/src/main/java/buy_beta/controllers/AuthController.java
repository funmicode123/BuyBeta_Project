package buy_beta.controllers;

import buy_beta.data.models.User;
import buy_beta.data.repositories.UserRepo;
import buy_beta.dtos.response.EnokiVerificationResponse;
import buy_beta.dtos.response.UserResponse;
import buy_beta.enums.UserRole;
import buy_beta.services.enoki.EnokiAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping
@RequiredArgsConstructor
public class AuthController {
    
    private final UserRepo userRepo;
    private final EnokiAuthService enokiAuthService;
    @PostMapping("/auth/enoki")
    public ResponseEntity<UserResponse> authWithEnoki(@RequestHeader("Authorization") String bearerToken) {
        String token = bearerToken.replace("Bearer ", "");
        EnokiVerificationResponse enokiUser = enokiAuthService.verifyToken(token);

        User user = userRepo.findByWalletAddress(enokiUser.getAddress())
                .orElseGet(() -> userRepo.save(User.builder()
                        .walletAddress(enokiUser.getAddress())
                        .did(enokiUser.getDid())
                        .userRole(UserRole.BUYER)
                        .build()));

        return ResponseEntity.ok(toUserResponse(user));
    }

    private UserResponse toUserResponse(User user) {

        return UserResponse.builder()
                .userId(user.getUserId())
                .walletAddress(user.getWalletAddress())
                .name(user.getName())
                .did(user.getDid())
                .userRole(user.getUserRole())
                .build();
    }

}

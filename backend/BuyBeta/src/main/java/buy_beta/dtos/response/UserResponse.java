package buy_beta.dtos.response;

import buy_beta.enums.UserRole;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserResponse {
    private String userId;
    private String name;
    private String email;
    private UserRole userRole;
}

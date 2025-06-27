package buy_beta.data.models;

import buy_beta.enums.UserRole;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
@Setter
@Getter
@Builder
public class User {
    @Id
    private String userId;
    private String did;
    private String name;
    @Indexed(unique = true)
    private String email;
    private String password;
    private String walletAddress;
    private UserRole userRole;
}

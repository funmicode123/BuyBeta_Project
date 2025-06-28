package buy_beta.data.repositories;

import buy_beta.data.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email);
}

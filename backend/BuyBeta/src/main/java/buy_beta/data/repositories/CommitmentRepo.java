package buy_beta.data.repositories;

import buy_beta.data.models.Commitment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommitmentRepo extends MongoRepository<Commitment, String> {
}

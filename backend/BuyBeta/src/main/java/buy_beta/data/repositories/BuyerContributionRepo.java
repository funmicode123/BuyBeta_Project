package buy_beta.data.repositories;

import buy_beta.data.models.BuyerContribution;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BuyerContributionRepo extends MongoRepository<BuyerContribution, String> {
    List<BuyerContribution> findByDealId(String dealId);
    boolean existsByUserIdAndDealId(String userId, String dealId);
}

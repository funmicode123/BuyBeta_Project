package buy_beta.data.repositories;

import buy_beta.data.models.GroupDeal;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupDealRepo extends MongoRepository<GroupDeal, String> {
}

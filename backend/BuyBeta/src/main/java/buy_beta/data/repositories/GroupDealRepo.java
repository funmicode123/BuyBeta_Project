package buy_beta.data.repositories;

import buy_beta.data.models.GroupDeal;
import buy_beta.enums.DealStatus;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GroupDealRepo extends MongoRepository<GroupDeal, String> {
    List<GroupDeal> findByStatusIn(List<DealStatus> statuses);

}

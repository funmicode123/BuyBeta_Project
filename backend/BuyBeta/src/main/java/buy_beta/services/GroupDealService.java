package buy_beta.services;

import buy_beta.dtos.requests.CreateGroupDealRequest;
import buy_beta.dtos.response.GroupDealResponse;

import java.util.List;

public interface GroupDealService {
    GroupDealResponse createDeal(CreateGroupDealRequest Request, String vendorId);
    GroupDealResponse getGroupDeal(String groupId, String vendorId);
    List<GroupDealResponse> getActiveDeals();
    List<GroupDealResponse> getAllGroupDeals();
}

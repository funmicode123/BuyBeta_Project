package buy_beta.services;

import buy_beta.dtos.requests.JoinGroupDealRequest;
import buy_beta.dtos.response.JoinGroupDealResponse;

public interface BuyerContributionService {
    JoinGroupDealResponse joinGroupDeal(JoinGroupDealRequest request);
}

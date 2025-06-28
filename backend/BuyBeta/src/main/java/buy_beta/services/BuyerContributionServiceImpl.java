package buy_beta.services;

import buy_beta.data.models.BuyerContribution;
import buy_beta.data.models.GroupDeal;
import buy_beta.data.models.User;
import buy_beta.data.repositories.BuyerContributionRepo;
import buy_beta.data.repositories.GroupDealRepo;
import buy_beta.data.repositories.UserRepo;
import buy_beta.dtos.requests.JoinGroupDealRequest;
import buy_beta.dtos.response.JoinGroupDealResponse;
import buy_beta.enums.DealStatus;
import buy_beta.enums.UserRole;
import buy_beta.exceptions.DealAlreadyExistsException;
import buy_beta.exceptions.GroupDealNotFoundException;
import buy_beta.exceptions.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class BuyerContributionServiceImpl implements BuyerContributionService {

    private final BuyerContributionRepo buyerContributionRepo;
    private final UserRepo userRepo;
    private GroupDealRepo groupDealRepo;
    @Override
    public JoinGroupDealResponse joinGroupDeal(JoinGroupDealRequest request) {
        User user = userRepo.findById(request.getUserId())
                .orElseThrow(()-> new UserNotFoundException("User not found!"));

        if (user.getUserRole() != UserRole.BUYER) {
            throw new RuntimeException("Only buyers can join deals");
        }

        GroupDeal groupDeal = groupDealRepo.findById(request.getGroupDealId())
                .orElseThrow(()-> new GroupDealNotFoundException("Group deal not found!"));

        if(buyerContributionRepo.existsByUserIdAndDealId(user.getUserId(), groupDeal.getDealId())){
            throw new DealAlreadyExistsException("User has already joined this deal!");
        }

        BuyerContribution contribution = BuyerContribution.builder()
                .userId(user.getUserId())
                .dealId(groupDeal.getDealId())
                .amount(request.getAmount())
                .status(DealStatus.PENDING)
                .contributedAt(LocalDateTime.now())
                .build();

        buyerContributionRepo.save(contribution);

        return JoinGroupDealResponse.builder()
                .contributionId(contribution.getDealId())
                .userId(user.getUserId())
                .dealId(groupDeal.getDealId())
                .amount(contribution.getAmount())
                .status(contribution.getStatus())
                .contributedAt(contribution.getContributedAt())
                .build();
        }

}

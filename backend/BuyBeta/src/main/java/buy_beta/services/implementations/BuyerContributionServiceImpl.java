package buy_beta.services.implementations;

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
import buy_beta.exceptions.InvalidRoleException;
import buy_beta.exceptions.UserNotFoundException;
import buy_beta.services.contract.BlockChainService;
import buy_beta.services.interfaces.BuyerContributionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class BuyerContributionServiceImpl implements BuyerContributionService {

    private final BuyerContributionRepo buyerContributionRepo;
    private final UserRepo userRepo;
    private final GroupDealRepo groupDealRepo;
    private final BlockChainService blockChainService;
    @Override
    public JoinGroupDealResponse joinGroupDeal(JoinGroupDealRequest request) {
        User user = userRepo.findById(request.getUserId())
                .orElseThrow(()-> new UserNotFoundException("User not found!"));

        if (user.getUserRole() != UserRole.BUYER) {
            throw new InvalidRoleException("Only buyers can join deals");
        }

        GroupDeal groupDeal = groupDealRepo.findById(request.getGroupDealId())
                .orElseThrow(()-> new GroupDealNotFoundException("Group deal not found!"));

        if(buyerContributionRepo.existsByUserIdAndDealId(user.getUserId(), groupDeal.getDealId())){
            throw new DealAlreadyExistsException("User has already joined this deal!");
        }

        int quantity = request.getQuantity();
        double unitPrice = groupDeal.getUnitPrice();
        double totalAmount = unitPrice * quantity;

        BuyerContribution contribution = BuyerContribution.builder()
                .userId(user.getUserId())
                .dealId(groupDeal.getDealId())
                .amount(totalAmount)
                .status(DealStatus.ACTIVE)
                .contributedAt(LocalDateTime.now())
                .build();
        boolean locked = blockChainService.lockFunds(user.getWalletAddress(), groupDeal.getWalletAddress(), totalAmount);
        if (!locked) {
            throw new RuntimeException("Failed to lock funds");
        }
        buyerContributionRepo.save(contribution);




        return JoinGroupDealResponse.builder()
                .contributionId(contribution.getContributionId())
                .userId(user.getUserId())
                .dealId(groupDeal.getDealId())
                .amount(contribution.getAmount())
                .status(contribution.getStatus())
                .contributedAt(contribution.getContributedAt())
                .build();
        }

}

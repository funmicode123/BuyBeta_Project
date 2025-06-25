package buy_beta.services;

import buy_beta.data.models.GroupDeal;
import buy_beta.data.models.User;
import buy_beta.data.repositories.GroupDealRepo;
import buy_beta.data.repositories.UserRepo;
import buy_beta.dtos.requests.CreateGroupDealRequest;
import buy_beta.dtos.response.GroupDealResponse;
import buy_beta.enums.DealStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GroupDealServiceImpl implements GroupDealService {

    private final GroupDealRepo groupDealRepo;
    private final UserRepo userRepo;

    @Override
    public GroupDealResponse createDeal(CreateGroupDealRequest request, String vendorId) {
        User vendor = userRepo.findById(vendorId)
                .orElseThrow(() -> new UserNotFoundException("Vendor not found!"));

        GroupDeal deal = GroupDeal.builder()
                .productName(request.getProductName())
                .unitPrice(request.getUnitPrice())
                .productDescription(request.getProductDescription())
                .maxParticipants(String.valueOf(request.getMaxParticipants()))
                .deadLines(request.getDeadLine())
                .vendor(vendor)
                .status(DealStatus.PENDING)
                .walletAddress(generateWallet())
                .build();

        groupDealRepo.save(deal);
        return toResponse(deal);
    }

    @Override
    public GroupDealResponse getGroupDeal(String groupId, String vendorId) {
        return null;
    }

    @Override
    public List<GroupDealResponse> getActiveDeals() {
        return List.of();
    }

    @Override
    public List<GroupDealResponse> getAllGroupDeals() {
        return List.of();
    }

    private GroupDealResponse toResponse(GroupDeal deal) {
        return GroupDealResponse.builder()
                .productName(deal.getProductName())
                .unitPrice(deal.getUnitPrice())
                .maxParticipants(Integer.parseInt(deal.getMaxParticipants()))
                .deadLine(deal.getDeadLines())
                .vendorId(deal.getVendor().getUserId())
                .status(deal.getStatus())
                .walletAddress(deal.getWalletAddress())
                .build();
    }

    private String generateWallet() {
        return UUID.randomUUID().toString();
    }

}

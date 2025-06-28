package buy_beta.services.implementations;

import buy_beta.data.models.GroupDeal;
import buy_beta.data.models.User;
import buy_beta.data.repositories.GroupDealRepo;
import buy_beta.data.repositories.UserRepo;
import buy_beta.dtos.requests.CreateGroupDealRequest;
import buy_beta.dtos.response.GroupDealResponse;
import buy_beta.enums.DealStatus;
import buy_beta.exceptions.UserNotFoundException;
import buy_beta.services.contract.BlockChainService;
import buy_beta.services.interfaces.GroupDealService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GroupDealServiceImpl implements GroupDealService {

    private final GroupDealRepo groupDealRepo;
    private final UserRepo userRepo;
    private final BlockChainService blockChainService;

    @Override
    public GroupDealResponse createDeal(CreateGroupDealRequest request, String vendorId) {
        User vendor = userRepo.findById(vendorId)
                .orElseThrow(() -> new UserNotFoundException("Vendor not found!"));

        String walletAddress = blockChainService.generateWallet(UUID.randomUUID().toString());

        GroupDeal deal = GroupDeal.builder()
                .productName(request.getProductName())
                .unitPrice(request.getUnitPrice())
                .productDescription(request.getProductDescription())
                .minParticipants(request.getMinParticipants())
                .maxParticipants(request.getMaxParticipants())
                .deadLines(request.getDeadLine())
                .vendor(vendor)
                .status(DealStatus.PENDING)
                .walletAddress(walletAddress)
                .build();

        groupDealRepo.save(deal);
        return toResponse(deal);
    }

    @Override
    public GroupDealResponse getGroupDeal(String groupId, String vendorId) {
        GroupDeal deal = groupDealRepo.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Group deal not found"));

        if (!deal.getVendor().getUserId().equals(vendorId)) {
            throw new RuntimeException("Vendor does not own this deal");
        }

        return toResponse(deal);
    }

    @Override
    public List<GroupDealResponse> getActiveDeals() {
        List<GroupDeal> deals = groupDealRepo.findByStatusIn(List.of(DealStatus.PENDING, DealStatus.ACTIVE));
        return deals.stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    public List<GroupDealResponse> getAllGroupDeals() {
        return groupDealRepo.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    private GroupDealResponse toResponse(GroupDeal deal) {
        return GroupDealResponse.builder()
                .productName(deal.getProductName())
                .unitPrice(deal.getUnitPrice())
                .maxParticipants(deal.getMaxParticipants())
                .deadLine(deal.getDeadLines())
                .vendorId(deal.getVendor().getUserId())
                .status(deal.getStatus())
                .walletAddress(deal.getWalletAddress())
                .build();
    }



}

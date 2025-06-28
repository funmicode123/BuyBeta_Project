package buy_beta.services;

import buy_beta.data.models.GroupDeal;
import buy_beta.data.models.User;
import buy_beta.data.repositories.GroupDealRepo;
import buy_beta.data.repositories.UserRepo;
import buy_beta.dtos.requests.CreateGroupDealRequest;
import buy_beta.dtos.response.GroupDealResponse;
import buy_beta.enums.DealStatus;
import buy_beta.exceptions.UserNotFoundException;
import buy_beta.services.contract.BlockChainService;
import buy_beta.services.implementations.GroupDealServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class GroupDealServiceImplTest {

    private GroupDealRepo groupDealRepo;
    private UserRepo userRepo;
    private BlockChainService blockChainService;

    private GroupDealServiceImpl groupDealService;

    @BeforeEach
    void setUp() {
        groupDealRepo = mock(GroupDealRepo.class);
        userRepo = mock(UserRepo.class);
        blockChainService = mock(BlockChainService.class);
        groupDealService = new GroupDealServiceImpl(groupDealRepo, userRepo, blockChainService);
    }

    @Test
    void testCreateDealSuccess() {
        String vendorId = "vendor123";
        User vendor = new User();
        vendor.setUserId(vendorId);

        CreateGroupDealRequest request = new CreateGroupDealRequest();
        request.setProductName("Phone");
        request.setUnitPrice(500.0);
        request.setProductDescription("A smart phone");
        request.setMaxParticipants(5);
        request.setDeadLine(LocalDateTime.now().plusDays(2));

        when(userRepo.findById(vendorId)).thenReturn(Optional.of(vendor));
        when(blockChainService.generateWallet(anyString())).thenReturn("wallet123");

        GroupDeal savedDeal = GroupDeal.builder()
                .productName("Phone")
                .unitPrice(500.0)
                .productDescription("A smart phone")
                .maxParticipants(5)
                .deadLines(request.getDeadLine())
                .vendor(vendor)
                .status(DealStatus.PENDING)
                .walletAddress("wallet123")
                .build();

        when(groupDealRepo.save(ArgumentMatchers.any(GroupDeal.class))).thenReturn(savedDeal);

        GroupDealResponse response = groupDealService.createDeal(request, vendorId);

        assertThat(response).isNotNull();
        assertThat(response.getProductName()).isEqualTo("Phone");
        assertThat(response.getUnitPrice()).isEqualTo(500.0);
        assertThat(response.getVendorId()).isEqualTo(vendorId);
    }

    @Test
    void testCreateDealThrowsWhenVendorNotFound() {
        when(userRepo.findById("nonexistent")).thenReturn(Optional.empty());

        CreateGroupDealRequest request = new CreateGroupDealRequest();

        assertThatThrownBy(() -> groupDealService.createDeal(request, "nonexistent"))
                .isInstanceOf(UserNotFoundException.class)
                .hasMessageContaining("Vendor not found");
    }

    @Test
    void testGetActiveDealsReturnsFilteredDeals() {
        User vendor = new User(); vendor.setUserId("vendor1");

        GroupDeal pendingDeal = GroupDeal.builder().productName("Shoes").status(DealStatus.PENDING).vendor(vendor).unitPrice(12000.00).build();
        GroupDeal activeDeal = GroupDeal.builder().productName("Watch").status(DealStatus.ACTIVE).vendor(vendor).unitPrice(4500.00).build();

        when(groupDealRepo.findByStatusIn(List.of(DealStatus.PENDING, DealStatus.ACTIVE)))
                .thenReturn(List.of(pendingDeal, activeDeal));

        List<GroupDealResponse> responses = groupDealService.getActiveDeals();

        assertThat(responses).hasSize(2);
        assertThat(responses.get(0).getProductName()).isEqualTo("Shoes");
        assertThat(responses.get(1).getProductName()).isEqualTo("Watch");
    }

    @Test
    void testGetGroupDealThrowsWhenNotOwnedByVendor() {
        User vendor = new User(); vendor.setUserId("v1");
        GroupDeal deal = GroupDeal.builder().vendor(vendor).build();

        when(groupDealRepo.findById("d1")).thenReturn(Optional.of(deal));

        assertThatThrownBy(() -> groupDealService.getGroupDeal("d1", "wrongVendor"))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Vendor does not own this deal");
    }

    @Test
    void testGetAllDealsReturnsMappedResponses() {
        GroupDeal deal1 = GroupDeal.builder().productName("TV").unitPrice(1000.0).vendor(new User()).status(DealStatus.PENDING).walletAddress("w1").build();
        GroupDeal deal2 = GroupDeal.builder().productName("Radio").unitPrice(300.0).vendor(new User()).status(DealStatus.PENDING).walletAddress("w2").build();

        when(groupDealRepo.findAll()).thenReturn(List.of(deal1, deal2));

        List<GroupDealResponse> result = groupDealService.getAllGroupDeals();

        assertThat(result).hasSize(2);
        assertThat(result.get(0).getProductName()).isEqualTo("TV");
        assertThat(result.get(1).getProductName()).isEqualTo("Radio");
    }
}
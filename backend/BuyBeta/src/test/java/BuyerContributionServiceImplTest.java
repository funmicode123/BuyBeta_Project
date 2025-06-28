
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
import buy_beta.services.implementations.BuyerContributionServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

class BuyerContributionServiceImplTest {

    private BuyerContributionRepo buyerContributionRepo;
    private UserRepo userRepo;
    private GroupDealRepo groupDealRepo;
    private BlockChainService blockChainService;
    private BuyerContributionServiceImpl service;

    @BeforeEach
    void setUp() {
        buyerContributionRepo = mock(BuyerContributionRepo.class);
        userRepo = mock(UserRepo.class);
        groupDealRepo = mock(GroupDealRepo.class);
        blockChainService = mock(BlockChainService.class);
        service = new BuyerContributionServiceImpl(
                buyerContributionRepo, userRepo, groupDealRepo, blockChainService
        );
    }

    @Test
    void joinGroupDeal_successWithQuantity() {
        String userId = "user123";
        String dealId = "deal123";
        int quantity = 3;
        double unitPrice = 50.0;
        double expectedAmount = unitPrice * quantity;

        User user = new User();
        user.setUserId(userId);
        user.setUserRole(UserRole.BUYER);
        user.setWalletAddress("sui1-buyer");

        GroupDeal deal = new GroupDeal();
        deal.setDealId(dealId);
        deal.setUnitPrice(unitPrice);
        deal.setWalletAddress("sui1-deal");

        JoinGroupDealRequest request = new JoinGroupDealRequest();
        request.setUserId(userId);
        request.setGroupDealId(dealId);
        request.setQuantity(quantity);

        when(userRepo.findById(userId)).thenReturn(Optional.of(user));
        when(groupDealRepo.findById(dealId)).thenReturn(Optional.of(deal));
        when(buyerContributionRepo.existsByUserIdAndDealId(userId, dealId)).thenReturn(false);
        when(blockChainService.lockFunds("sui1-buyer", "sui1-deal", expectedAmount)).thenReturn(true);

        JoinGroupDealResponse response = service.joinGroupDeal(request);

        assertThat(response).isNotNull();
        assertThat(response.getAmount()).isEqualTo(expectedAmount);
        assertThat(response.getUserId()).isEqualTo(userId);
        assertThat(response.getDealId()).isEqualTo(dealId);
        assertThat(response.getStatus()).isEqualTo(DealStatus.ACTIVE);
        verify(buyerContributionRepo).save(any(BuyerContribution.class));
    }

    @Test
    void joinGroupDeal_failsWhenUserNotFound() {
        when(userRepo.findById("missing")).thenReturn(Optional.empty());

        JoinGroupDealRequest request = new JoinGroupDealRequest();
        request.setUserId("missing");

        assertThatThrownBy(() -> service.joinGroupDeal(request))
                .isInstanceOf(UserNotFoundException.class)
                .hasMessageContaining("User not found");
    }

    @Test
    void joinGroupDeal_failsWhenUserIsNotBuyer() {
        User user = new User();
        user.setUserId("userX");
        user.setUserRole(UserRole.VENDOR);

        when(userRepo.findById("userX")).thenReturn(Optional.of(user));

        JoinGroupDealRequest request = new JoinGroupDealRequest();
        request.setUserId("userX");

        assertThatThrownBy(() -> service.joinGroupDeal(request))
                .isInstanceOf(InvalidRoleException.class)
                .hasMessageContaining("Only buyers can join deals");
    }

    @Test
    void joinGroupDeal_failsWhenGroupDealNotFound() {
        User user = new User();
        user.setUserId("buyer");
        user.setUserRole(UserRole.BUYER);

        when(userRepo.findById("buyer")).thenReturn(Optional.of(user));
        when(groupDealRepo.findById("invalid")).thenReturn(Optional.empty());

        JoinGroupDealRequest request = new JoinGroupDealRequest();
        request.setUserId("buyer");
        request.setGroupDealId("invalid");

        assertThatThrownBy(() -> service.joinGroupDeal(request))
                .isInstanceOf(GroupDealNotFoundException.class);
    }

    @Test
    void joinGroupDeal_failsWhenAlreadyJoined() {
        User user = new User();
        user.setUserId("buyer");
        user.setUserRole(UserRole.BUYER);

        GroupDeal deal = new GroupDeal();
        deal.setDealId("deal1");

        when(userRepo.findById("buyer")).thenReturn(Optional.of(user));
        when(groupDealRepo.findById("deal1")).thenReturn(Optional.of(deal));
        when(buyerContributionRepo.existsByUserIdAndDealId("buyer", "deal1")).thenReturn(true);

        JoinGroupDealRequest request = new JoinGroupDealRequest();
        request.setUserId("buyer");
        request.setGroupDealId("deal1");

        assertThatThrownBy(() -> service.joinGroupDeal(request))
                .isInstanceOf(DealAlreadyExistsException.class);
    }

    @Test
    void joinGroupDeal_failsWhenLockFundsFails() {
        User user = new User();
        user.setUserId("buyer");
        user.setWalletAddress("wallet1");
        user.setUserRole(UserRole.BUYER);

        GroupDeal deal = new GroupDeal();
        deal.setDealId("dealX");
        deal.setWalletAddress("wallet2");
        deal.setUnitPrice(100.0);

        JoinGroupDealRequest request = new JoinGroupDealRequest();
        request.setUserId("buyer");
        request.setGroupDealId("dealX");
        request.setQuantity(2); // total = 200.0

        when(userRepo.findById("buyer")).thenReturn(Optional.of(user));
        when(groupDealRepo.findById("dealX")).thenReturn(Optional.of(deal));
        when(buyerContributionRepo.existsByUserIdAndDealId("buyer", "dealX")).thenReturn(false);
        when(blockChainService.lockFunds("wallet1", "wallet2", 200.0)).thenReturn(false);

        assertThatThrownBy(() -> service.joinGroupDeal(request))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Failed to lock funds");
    }
}

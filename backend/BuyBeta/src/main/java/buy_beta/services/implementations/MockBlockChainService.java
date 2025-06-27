package buy_beta.services.implementations;

import buy_beta.services.contract.BlockChainService;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class MockBlockChainService implements BlockChainService {

    private final Map<String, List<String>> fakeWalletTransactions = new HashMap<>();

    @Override
    public String generateWallet(String groupDealId) {
        String walletAddress = "sui-wallet-" + UUID.randomUUID();
        fakeWalletTransactions.put(walletAddress, new ArrayList<>());
        System.out.println("[Blockchain] Generated wallet: " + walletAddress + " for deal: " + groupDealId);
        return walletAddress;
    }

    @Override
    public boolean lockFunds(String userWallet, String groupDealWallet, double amount) {
        if (!fakeWalletTransactions.containsKey(groupDealWallet)) return false;
        fakeWalletTransactions.get(groupDealWallet).add(userWallet + ":" + amount);
        System.out.println("[Blockchain] Locked " + amount + " from " + userWallet + " into " + groupDealWallet);
        return true;
    }

    @Override
    public boolean releaseFunds(String groupDealWallet, String vendorWallet) {
        System.out.println("[Blockchain] Releasing funds from " + groupDealWallet + " to vendor wallet: " + vendorWallet);
        return true;
    }

    @Override
    public boolean refundBuyers(String groupDealWallet, List<String> userWallets) {
        System.out.println("[Blockchain] Refunding users from wallet: " + groupDealWallet);
        for (String wallet : userWallets) {
            System.out.println("→ Refunded to " + wallet);
        }
        return true;
    }
}

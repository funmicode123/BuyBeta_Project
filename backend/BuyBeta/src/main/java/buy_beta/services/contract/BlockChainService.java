package buy_beta.services.contract;

import java.util.List;

public interface BlockChainService {
    String generateWallet(String groupDealId);
    boolean lockFunds(String userWallet, String groupDealWallet, double amount);
    boolean releaseFunds(String groupDealWallet, String vendorWallet);
    boolean refundBuyers(String groupDealWallet, List<String> userWallet);
}

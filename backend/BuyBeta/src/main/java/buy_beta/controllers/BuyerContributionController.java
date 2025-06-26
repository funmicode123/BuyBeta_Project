package buy_beta.controllers;

import buy_beta.dtos.requests.JoinGroupDealRequest;
import buy_beta.dtos.response.JoinGroupDealResponse;
import buy_beta.services.BuyerContributionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class BuyerContributionController {

    private final BuyerContributionService contributionService;

    @PostMapping("/join")
    public ResponseEntity<JoinGroupDealResponse> joinDeal(@RequestBody JoinGroupDealRequest request) {
        JoinGroupDealResponse response = contributionService.joinGroupDeal(request);
        return ResponseEntity.ok(response);
    }
}

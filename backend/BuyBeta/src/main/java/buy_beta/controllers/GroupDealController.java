package buy_beta.controllers;

import buy_beta.dtos.requests.CreateGroupDealRequest;
import buy_beta.dtos.response.GroupDealResponse;
import buy_beta.services.GroupDealService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class GroupDealController {

    private final GroupDealService groupDealService;

    @PostMapping
    public ResponseEntity<GroupDealResponse> createDeal(@RequestBody CreateGroupDealRequest request, @RequestParam String vendorId){
        GroupDealResponse response = groupDealService.createDeal(request, vendorId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/active")
    public List<GroupDealResponse> getActiveDeals() {
        return groupDealService.getActiveDeals();
    }
}

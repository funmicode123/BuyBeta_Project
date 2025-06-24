#[test_only]
module contract::contract_tests {
    use sui::test_scenario;
    use std::string;
    use contract::contract;

    const VENDOR: address = @0x1;
    const BUYER1: address = @0x2;
    const BUYER2: address = @0x3;

    fun shipping_info(): string::String {
        string::utf8(b"123 Road")
    }

    #[test]
    fun test_create_offer_and_add_commitment() {
        let mut scenario = test_scenario::begin(VENDOR);
        let ctx = test_scenario::ctx(&mut scenario);


        let mut offer = contract::new_group_buy_offer(
            string::utf8(b"Laptop Bundle"),
            100,
            2,
            10,
            999_999,
            ctx
        );

        contract::add_commitment(&mut offer, 1, 100, shipping_info(), BUYER1);
        contract::add_commitment(&mut offer, 1, 100, shipping_info(), BUYER2);

        assert!(contract::get_commitments_len(&offer) == 2, 100);

        let _ = offer;
        test_scenario::end(scenario);

    }

    #[test]
    fun test_finalize_successful_offer() {
        let mut scenario = test_scenario::begin(VENDOR);
        let ctx = test_scenario::ctx(&mut scenario);
        
        let mut offer = contract::new_group_buy_offer(
            string::utf8(b"Camera"),
            50,
            2,
            10,
            999_999,
            ctx
        );

        contract::add_commitment(&mut offer, 1, 50, shipping_info(), BUYER1);
        contract::add_commitment(&mut offer, 1, 50, shipping_info(), BUYER2);
        contract::finalize_offer(&mut offer);

        assert!(contract::get_is_successful(&offer), 101);
        assert!(contract::get_finalized(&offer), 102);

        let _ = offer;
        test_scenario::end(scenario);
    }

    #[test]
    fun test_finalize_unsuccessful_offer_and_refund() {
        let mut scenario = test_scenario::begin(VENDOR);
        let ctx = test_scenario::ctx(&mut scenario);

        let mut offer = contract::new_group_buy_offer(
            string::utf8(b"Phone"),
            80,
            2,
            10,
            999_999,
            ctx
        );

        contract::add_commitment(&mut offer, 1, 80, shipping_info(), BUYER1);
        contract::finalize_offer(&mut offer);
        assert!(!contract::get_is_successful(&offer), 201);

        contract::refund_all(&mut offer);
        assert!(contract::get_refunded_status(&offer, 0), 202);

        let _ = offer;
        test_scenario::end(scenario);
    }

    #[test, expected_failure(abort_code = 3)]
    fun test_duplicate_commitment_fails() {
        let mut scenario = test_scenario::begin(VENDOR);
        let ctx = test_scenario::ctx(&mut scenario);

        let mut offer = contract::new_group_buy_offer(
            string::utf8(b"Monitor"),
            90,
            2,
            10,
            999_999,
            ctx
        );

        contract::add_commitment(&mut offer, 1, 90, shipping_info(), BUYER1);
        // This second call with same buyer should fail
        contract::add_commitment(&mut offer, 1, 90, shipping_info(), BUYER1);

        let _ = offer;
        test_scenario::end(scenario);
    }
}

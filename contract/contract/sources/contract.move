module contract::contract {
    use std::string::String;
    // use sui::coin::Coin;
    use sui::coin::{Coin, join, zero, value, split};

    const E_ALREADY_FINALIZED: u64 = 0;
    const E_NOT_ENOUGH_COMMITMENTS: u64 = 1;
    const E_INVALID_CALLER: u64 = 2;
    const E_ALREADY_COMMITTED: u64 = 3;

    public struct Commitment has store, drop {
        buyer: address,
        units: u64,
        amount_paid: u64,
        shipping_info: String,
        status: bool
    }

    public struct GroupBuyOffer has key, store {
        id: UID,
        vendor: address,
        product: String,
        unit_price: u64,
        min_buyers: u64,
        max_units: u64,
        deadline: u64,
        is_successful: bool,
        finalized: bool,
        commitments: vector<Commitment>,
        fund; Coin<u64>
    }

    public fun new_group_buy_offer(
        product: String,
        unit_price: u64,
        min_buyers: u64,
        max_units: u64,
        deadline: u64,
        ctx: &mut TxContext
    ): GroupBuyOffer {
        GroupBuyOffer {
            id: object::new(ctx),
            vendor: tx_context::sender(ctx),
            product,
            unit_price,
            min_buyers,
            max_units,
            deadline,
            is_successful: false,
            finalized: false,
            commitments: vector::empty(),
            balance: zero()
        }
    }

    public fun add_commitment(
        offer: &mut GroupBuyOffer,
        units: u64,
        amount: u64,
        shipping_info: String,
        buyer: address
    ) {
        let total_commitments = vector::length(&offer.commitments);
        let mut i = 0;

        while (i < total_commitments) {
            let existing_commitment = vector::borrow(&offer.commitments, i);
            assert!(existing_commitment.buyer != buyer, E_ALREADY_COMMITTED);
            i = i + 1;
        };

        let new_commitment = Commitment {
            buyer,
            units: units,
            amount_paid: amount,
            shipping_info: shipping_info,
            status: false
        };
        offer.balance = join(offer.balance, payment);

        vector::push_back(&mut offer.commitments, new_commitment);
    }



    public fun finalize_offer(offer: &mut GroupBuyOffer) {
        assert!(!offer.finalized, E_ALREADY_FINALIZED);
        let total_buyers = vector::length(&offer.commitments);
        offer.is_successful = total_buyers >= offer.min_buyers;
        offer.finalized = true;
    }

    public fun refund_all(offer: &mut GroupBuyOffer) {
        assert!(offer.finalized, E_ALREADY_FINALIZED);
        assert!(!offer.is_successful, E_NOT_ENOUGH_COMMITMENTS);

        let mut i = 0;
        let len = vector::length(&offer.commitments);

        while (i < len) {
            let commitment = vector::borrow_mut(&mut offer.commitments, i);

            if (!commitment.refunded) {
                let refund_amount = commitment.amount_paid;

                let refund_coin = coin::split(&mut offer.balance, refund_amount);
                transfer::public_transfer(refund_coin, commitment.buyer);

                commitment.status = true;
            };

            i = i + 1;
        };
    }


    public fun payout_to_vendor(offer: GroupBuyOffer, ctx: &mut TxContext) {
        assert!(offer.finalized, E_ALREADY_FINALIZED);
        assert!(offer.is_successful, E_NOT_ENOUGH_COMMITMENTS);
        assert!(tx_context::sender(ctx) == offer.vendor, E_INVALID_CALLER);

        transfer::public_transfer(offer.balance, offer.vendor);
        object::delete(offer.id);
    }


    public(package) fun get_commitments_len(offer: &GroupBuyOffer): u64 {
        vector::length(&offer.commitments)
    }

    public(package) fun get_is_successful(offer: &GroupBuyOffer): bool {
        offer.is_successful
    }

    public(package) fun get_finalized(offer: &GroupBuyOffer): bool {
        offer.finalized
    }

    public(package) fun get_refunded_status(offer: &GroupBuyOffer, index: u64): bool {
    vector::borrow(&offer.commitments, index).refunded
}

}

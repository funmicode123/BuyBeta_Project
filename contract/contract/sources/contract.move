module contract::contract {
    use std::string::String;
    use sui::coin::{Coin, value, split, join, zero};
    use sui::object::{new};
    use sui::tx_context::{ sender};
    use contract::platform_config;

    const PLATFORM_FEE_BPS: u64 = 200; 
    const BPS_DIVISOR: u64 = 10_000;   

    const E_ALREADY_FINALIZED: u64 = 0;
    const E_NOT_ENOUGH_COMMITMENTS: u64 = 1;
    const E_ALREADY_COMMITTED: u64 = 2;

    public struct Commitment has store, drop {
        buyer: address,
        units: u64,
        amount_paid: u64,
        shipping_info: String,
        refunded: bool,
        delivery_confirmed: bool,
    }

    public struct CommitmentChunk has store, drop {
        commitments: vector<Commitment>,
    }

    public struct CommitmentSummary has copy, drop, store {
        buyer: address,
        units: u64,
        amount_paid: u64,
        refunded: bool,
        delivery_confirmed: bool,
    }

    #[allow(lint(coin_field))]
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
        commitment_chunks: vector<CommitmentChunk>,
        funds: Coin<u64>,
    } 

    public struct VendorOffers has key, store {
        id: UID,
        vendor: address,
        offers: vector<UID>,
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
            id: new(ctx),
            vendor: sender(ctx),
            product,
            unit_price,
            min_buyers,
            max_units,
            deadline,
            is_successful: false,
            finalized: false,
            commitment_chunks: vector::empty(),
            funds: zero(ctx),
        }
    }

    public entry fun add_commitment(
        offer: &mut GroupBuyOffer,
        units: u64,
        payment: Coin<u64>,
        shipping_info: String,
        buyer: address
    ) {
        let amount = value(&payment);
        let mut i = 0;
        let total_chunks = vector::length(&offer.commitment_chunks);
        while (i < total_chunks) {
            let chunk = vector::borrow(&offer.commitment_chunks, i);
            let chunk_len = vector::length(&chunk.commitments);
            let mut j = 0;
            while (j < chunk_len) {
                let c = vector::borrow(&chunk.commitments, j);
                assert!(c.buyer != buyer, E_ALREADY_COMMITTED);
                j = j + 1;
            };
            i = i + 1;
        };

        let commitment = Commitment {
            buyer,
            units,
            amount_paid: amount,
            shipping_info,
            refunded: false,
            delivery_confirmed: false,
        };

        let chunks = &mut offer.commitment_chunks;
        let last_chunk_index = vector::length(chunks);
        if (last_chunk_index == 0 || vector::length(&vector::borrow(chunks, last_chunk_index - 1).commitments) >= 10) {
            let mut new_chunk = CommitmentChunk { commitments: vector::empty() };
            vector::push_back(&mut new_chunk.commitments, commitment);
            vector::push_back(chunks, new_chunk);
        } else {
            let chunk = vector::borrow_mut(chunks, last_chunk_index - 1);
            vector::push_back(&mut chunk.commitments, commitment);
        };

        join(&mut offer.funds, payment);
    }

    public fun finalize_offer(offer: &mut GroupBuyOffer) {
        assert!(!offer.finalized, E_ALREADY_FINALIZED);
        let mut total = 0;
        let chunk_len = vector::length(&offer.commitment_chunks);
        let mut i = 0;
        while (i < chunk_len) {
            total = total + vector::length(&vector::borrow(&offer.commitment_chunks, i).commitments);
            i = i + 1;
        };
        {
            offer.is_successful = total >= offer.min_buyers;
            offer.finalized = true;
        };
    }

    public entry fun refund_all(offer: &mut GroupBuyOffer, ctx: &mut TxContext) {
        assert!(offer.finalized, E_ALREADY_FINALIZED);
        assert!(!offer.is_successful, E_NOT_ENOUGH_COMMITMENTS);

        let mut i = 0;
        let chunk_len = vector::length(&offer.commitment_chunks);
        while (i < chunk_len) {
            let chunk = vector::borrow_mut(&mut offer.commitment_chunks, i);
            let mut j = 0;
            let inner_len = vector::length(&chunk.commitments);
            while (j < inner_len) {
                let commitment = vector::borrow_mut(&mut chunk.commitments, j);
                if (!commitment.refunded) {
                    let refund_coin = split(&mut offer.funds, commitment.amount_paid, ctx);
                    transfer::public_transfer(refund_coin, commitment.buyer);
                    commitment.refunded = true;
                };
                j = j + 1;
            };
            {
                i = i + 1;
            };
        }
    }

    public entry fun payout_to_vendor(offer: GroupBuyOffer, config: &platform_config::PlatformConfig, ctx: &mut TxContext) {
        let GroupBuyOffer {
            id,
            vendor,
            mut funds,
            product: _,
            unit_price: _,
            min_buyers: _,
            max_units: _,
            deadline: _,
            is_successful: _,
            finalized: _,
            commitment_chunks: _
        } = offer;

        let total_amount = value(&funds);
        let fee_amount = total_amount * PLATFORM_FEE_BPS / BPS_DIVISOR;
        
        let fee_coin = split(&mut funds, fee_amount, ctx);
        transfer::public_transfer(fee_coin, platform_config::get_fee_recipient(config));

        transfer::public_transfer(funds, vendor);
        object::delete(id);
    }

    public entry fun release_payment_for(
        offer: &mut GroupBuyOffer,
        buyer: address,
        ctx: &mut TxContext
    ) {
        let chunk_len = vector::length(&offer.commitment_chunks);
        let mut i = 0;
        while (i < chunk_len) {
            let chunk = vector::borrow_mut(&mut offer.commitment_chunks, i);
            let inner_len = vector::length(&chunk.commitments);
            let mut j = 0;
            while (j < inner_len) {
                let c = vector::borrow_mut(&mut chunk.commitments, j);
                if (c.buyer == buyer && c.delivery_confirmed && !c.refunded) {
                    let coin = split(&mut offer.funds, c.amount_paid, ctx);
                    transfer::public_transfer(coin, offer.vendor);
                    c.refunded = true;
                    return
                };
                j = j + 1;
            };
            {
                i = i + 1;
            };
        }
    }

    public fun new_vendor(ctx: &mut TxContext): VendorOffers {
        VendorOffers {
            id: new(ctx),
            vendor: sender(ctx),
            offers: vector::empty(),
        }
    }

    public fun register_offer(vendor_offers: &mut VendorOffers, offer_id: UID) {
        vector::push_back(&mut vendor_offers.offers, offer_id);
    }

    public fun get_offer_ids(vendor_offers: &VendorOffers): &vector<UID> {
        &vendor_offers.offers
    }

    public fun get_is_successful(offer: &GroupBuyOffer): bool {
        offer.is_successful
    }

    public fun get_finalized(offer: &GroupBuyOffer): bool {
        offer.finalized
    }

    public fun get_commitment_by_index(
        offer: &GroupBuyOffer,
        chunk_index: u64,
        inner_index: u64
    ): Commitment {
        let chunk = vector::borrow(&offer.commitment_chunks, chunk_index);
        let commitment = vector::borrow(&chunk.commitments, inner_index);
        Commitment {
        buyer: commitment.buyer,
        units: commitment.units,
        amount_paid: commitment.amount_paid,
        shipping_info: commitment.shipping_info,
        refunded: commitment.refunded,
        delivery_confirmed: commitment.delivery_confirmed,
    }
    }

    public fun get_total_commitment_count(offer: &GroupBuyOffer): u64 {
        let mut total = 0;
        let chunks_len = vector::length(&offer.commitment_chunks);
        let mut i = 0;
        while (i < chunks_len) {
            let chunk = vector::borrow(&offer.commitment_chunks, i);
            total = total + vector::length(&chunk.commitments);
            i = i + 1;
        };
        total
    }

    public fun get_commitment_summary_by_index(
        offer: &GroupBuyOffer,
        index: u64
    ): Option<CommitmentSummary> {
        let mut remaining = index;
        let mut i = 0;
        while (i < vector::length(&offer.commitment_chunks)) {
            let chunk = vector::borrow(&offer.commitment_chunks, i);
            let chunk_len = vector::length(&chunk.commitments);
            if (remaining < chunk_len) {
                let c = vector::borrow(&chunk.commitments, remaining);
                let summary = CommitmentSummary {
                    buyer: c.buyer,
                    units: c.units,
                    amount_paid: c.amount_paid,
                    refunded: c.refunded,
                    delivery_confirmed: c.delivery_confirmed,
                };
                return option::some(summary)
            };
            {
                remaining = remaining - chunk_len;
                i = i + 1;
            };
        };
        option::none()
    }


    public fun total_commitments(offer: &GroupBuyOffer): u64 {
        let mut total = 0;
        let chunk_len = vector::length(&offer.commitment_chunks);
        let mut i = 0;
        while (i < chunk_len) {
            let chunk = vector::borrow(&offer.commitment_chunks, i);
            total = total + vector::length(&chunk.commitments);
            i = i + 1;
        };
        total
    }

    public fun get_escrowed_amount(offer: &GroupBuyOffer): u64 {
        value(&offer.funds)
    }


}

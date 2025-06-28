module contract::platform_config {

    const PLATFORM_FEE_BPS: u64 = 200; 
    const BPS_DIVISOR: u64 = 10_000; 

    public struct PlatformConfig has key {
        id: UID,
        fee_recipient: address,
    }

    public entry fun new(fee_recipient: address, ctx: &mut TxContext) {
        let platformconfig = PlatformConfig {
            id: object::new(ctx),
            fee_recipient,
        };
        transfer::transfer(platformconfig, fee_recipient);
    }

    public fun get_fee_recipient(config: &PlatformConfig): address {
        config.fee_recipient
    }

    public fun get_fee_bps(): u64 {
        PLATFORM_FEE_BPS
    }

    public fun get_bps_divisor(): u64 {
        BPS_DIVISOR
    }
}

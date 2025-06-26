module contract::platform_config {

    public struct PlatformConfig has key {
        id: UID,
        fee_recipient: address,
    }

    public fun new(fee_recipient: address, ctx: &mut TxContext): PlatformConfig {
        PlatformConfig {
            id: object::new(ctx),
            fee_recipient,
        }
    }

    public fun get_fee_recipient(config: &PlatformConfig): address {
        config.fee_recipient
    }
}

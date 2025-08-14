module CentralizedReward::RewardSystem {

    use aptos_framework::signer;
    use aptos_framework::coin;
    use aptos_framework::aptos_coin::AptosCoin;

    /// Struct to store user's total reward points
    struct RewardWallet has key, store {
        total_points: u64,
    }

    /// Function to initialize a reward wallet for the user
    public fun create_wallet(user: &signer) {
        move_to(user, RewardWallet {
            total_points: 0
        });
    }

    /// Function to deposit rewards (simulating gathering from multiple apps)
    /// In real implementation, this can be replaced with partner integrations
    public fun deposit_rewards(user: &signer, points: u64) acquires RewardWallet {
        let wallet = borrow_global_mut<RewardWallet>(signer::address_of(user));
        wallet.total_points = wallet.total_points + points;
    }
}

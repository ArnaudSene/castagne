use anchor_lang::prelude::*;

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum GameState {
    Initialized,
    Active,
    Finished,
    Won { winner: Pubkey },
}

#[account]
pub struct Fight {
    pub counter: u64,
}

#[account]
pub struct FightPlayer {
    pub status: GameState,
}
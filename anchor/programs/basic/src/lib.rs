use anchor_lang::prelude::*;
pub mod constants;
pub mod errors;
pub mod helpers;
pub mod instructions;
pub mod state;
use instructions::*;

// Run command to get the program_id
// anchor keys list
declare_id!("3A6NgTtDuFqgxLPWbo1mEuQwVyuFQHDGhdb1Vu14FiLT");

#[program]
pub mod castagne {
    use super::*;

    pub fn initialize_config(ctx: Context<InitializeConfig>) -> Result<()> {
        initialize_config::initialize_config(ctx)
    }

    pub fn create_player(ctx: Context<CreatePlayer>, username: String) -> Result<()> {
        create_player::create_player(ctx, username)
    }

    pub fn update_player(ctx: Context<UpdatePlayer>, attributes: [u32; 3]) -> Result<()> {
        update_player::update_player(ctx, attributes)
    }

    pub fn update_player_xp(ctx: Context<UpdatePlayerXP>, xp: u32) -> Result<()> {
        update_player_xp::update_player_xp(ctx, xp)
    }

    pub fn init_fight_config(ctx: Context<InitFightConfig>) -> Result<()> {
        init_fight::init_fight_config(ctx)
    }

    pub fn init_fight(ctx: Context<InitFight>) -> Result<()> {
        init_fight::init_fight(ctx)
    }

    pub fn start_fight(ctx: Context<StartFight>, counter: u64) -> Result<()> {
        start_fight::start_fight(ctx, counter)
    }
}

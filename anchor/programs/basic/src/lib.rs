use anchor_lang::prelude::*;

declare_id!("3A6NgTtDuFqgxLPWbo1mEuQwVyuFQHDGhdb1Vu14FiLT");

#[program]
pub mod basic {
    use super::*;

    pub fn greet(_ctx: Context<Initialize>) -> Result<()> {
        msg!("GM!");
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}

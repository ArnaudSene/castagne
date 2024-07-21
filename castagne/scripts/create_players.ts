import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Castagne } from "../target/types/castagne";
import { clusterApiUrl, Connection } from '@solana/web3.js';
const fs = require('fs');

// set this variable to disable warnings
// export NODE_NO_WARNINGS=1
const program = anchor.workspace.Castagne as Program<Castagne>;

const setConfig = async (adminWallet: anchor.Wallet) => {
  // Define config PDA
  let [configPda, _] = anchor.web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from("config"),
        adminWallet.publicKey.toBuffer()
      ],
      program.programId
  );

  console.log("\n▸ Set adminWallet:", adminWallet.publicKey.toString());
  console.log("▸ Set configPda  :", configPda.toString());

  // Set config
  try {
    console.log("👉Setting Config ...");
    const tx = await program.methods
    .initializeConfig()
    .accounts(
      {
        owner: adminWallet.publicKey,
        config: configPda,
        systemProgram: anchor.web3.SystemProgram.programId,
      } as any
    )
    .rpc();

    await anchor.getProvider().connection.confirmTransaction(tx, "confirmed");
    console.log("🟢Config set Tx  :", tx);
  } catch (err) {
    const errMsg = (err as anchor.web3.SendTransactionError).message;
    if (errMsg.includes("already in use")) {
      console.log("🔵Config already set!");
    } else {
      console.log("🔴Config unknown error!", err);
    }
  }
}

const getConfig = async (adminWallet: anchor.Wallet) => {
  // Define config PDA
  let [configPda, _] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("config"), adminWallet.publicKey.toBuffer()],
    program.programId
  );

  console.log("\n▸ Get adminWallet:", adminWallet.publicKey.toString());
  console.log("▸ Get configPda  :", configPda.toString());

  try {
    let resultConfig = await program.account.config.fetch(configPda);
    console.log("🟢Config Owner   :", resultConfig.owner.toString());
  } catch (err) {
    console.log("🔴Error getting config owner !", err);
  }
}

const create_players = async (): Promise<anchor.web3.Keypair[]> => {
  console.log('\n👉Creating players ...');
  const usernames = ['bob', 'alice', 'lol', 'La Brute', 'Crados'];
  const players: anchor.web3.Keypair[] = [];

  for (const username of usernames) {
    console.log('▸ username', username);
    
    const player: anchor.web3.Keypair = anchor.web3.Keypair.generate();
    let tx = await program.provider.connection.requestAirdrop(player.publicKey, 10_000_000_000);
    await program.provider.connection.confirmTransaction(tx);

    const [playerPda] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("player"), player.publicKey.toBuffer()],
      program.programId
    );

    players.push(player);

    await program.methods
      .createPlayer(username)
      .accounts({
        user: player.publicKey,
        player: playerPda,
        systemProgram: anchor.web3.SystemProgram.programId,
      } as any)
      .signers([player])
      .rpc();

      let _player = await program.account.player.fetch(playerPda);
      console.table({
        username: _player.username,
        user: _player.user.toString(),
        xp: _player.xp,
        attributes: _player.attributes.toString(),
      });
  }

  let _players = await program.account.player.all();
  console.log('Total players:', _players.length);
  return players;
}

const update_players = async (players: anchor.web3.Keypair[]) => {
  console.log('\n👉Updating players ...');
  for (const player of players) {
    const [playerPda] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("player"), player.publicKey.toBuffer()],
      program.programId
    );

    let playerData = await program.account.player.fetch(playerPda);
    console.log('▸ username', playerData.username);

    let attributes = [];
    let xp = playerData.xp;

    for (let i = 0; i < playerData.attributes.length; i++) {
      const number = Math.floor(Math.random() * xp);
      attributes.push(number);
      xp -= number;
    }
    attributes[playerData.attributes.length -1] += xp;

    await program.methods
      .updatePlayer(attributes)
      .accounts({
        user: player.publicKey,
        player: playerPda,
        systemProgram: anchor.web3.SystemProgram.programId,
      } as any)
      .signers([player])
      .rpc();

      console.log('▸ Player updated:');
      let _player = await program.account.player.fetch(playerPda);
      console.table({
        username: _player.username,
        user: _player.user.toString(),
        xp: _player.xp,
        attributes: _player.attributes.toString(),
      });
  }
}

const action = async (provider: anchor.AnchorProvider) => {
  // Admin account
  const adminWallet = provider.wallet as anchor.Wallet
  const balance = await anchor.getProvider().connection.getBalance(adminWallet.publicKey);

  // fund account if needed
  if (balance < 1e8) {
    console.log("▸ Fund account :", adminWallet.publicKey.toString());
    let txairdropAdminWallet = await program.provider.connection.requestAirdrop(
      adminWallet.publicKey, 10_000_000_000);
    await program.provider.connection.confirmTransaction(txairdropAdminWallet);
  }

  console.log("▸ admin     :", adminWallet.publicKey.toString());
  console.log("▸ balance   :", balance);
  console.log("▸ program id:", program.idl.address);

  await setConfig(adminWallet);
  await getConfig(adminWallet);
  const players: anchor.web3.Keypair[] = await create_players();
  await update_players(players);
}

const main = async () => {

  let provider: anchor.AnchorProvider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const envProvider = process.env.ANCHOR_PROVIDER || "devnet"; // Default to devnet

  if (envProvider === 'devnet') {
    const clusterUrl = clusterApiUrl('devnet')
    const connection = new Connection(clusterUrl, 'confirmed');
    const rawdata = fs.readFileSync(process.env.ANCHOR_WALLET);
    const privKey = Uint8Array.from(JSON.parse(rawdata));
    const wallet = anchor.web3.Keypair.fromSecretKey(privKey)
    provider = new anchor.AnchorProvider(
      connection, new anchor.Wallet(wallet), {
        preflightCommitment: 'confirmed',
      });

    anchor.setProvider(provider);
  }

  try {
    const version = await program.provider.connection.getVersion();
    console.log("🟢Node is running with version");
    console.table(version);
    console.log("\n▸ Provider  :", provider.connection.rpcEndpoint)

    await action(provider);

  } catch (err) {
      console.log("🔴Node not running!");
  }
}

main()

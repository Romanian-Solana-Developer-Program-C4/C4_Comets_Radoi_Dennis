import "dotenv/config";
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  clusterApiUrl,
} from "@solana/web3.js";
import {
  getKeypairFromEnvironment,
  airdropIfRequired,
} from "@solana-developers/helpers";

const connection = new Connection(clusterApiUrl("devnet"));
console.log("⚡ Connected to devnet");


const keypair = getKeypairFromEnvironment("SECRET_KEY");
const publicKey = keypair.publicKey;



const balanceInLamports = await connection.getBalance(publicKey);
const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

console.log(`💰 Current balance: ${balanceInSOL} SOL`);

await airdropIfRequired(
  connection,
  publicKey,
  1 * LAMPORTS_PER_SOL,  
  0.5 * LAMPORTS_PER_SOL  
);


const updatedBalanceInLamports = await connection.getBalance(publicKey);
const updatedBalanceInSOL = updatedBalanceInLamports / LAMPORTS_PER_SOL;

console.log(`✅ Finished! The balance for the wallet at address ${publicKey} is ${updatedBalanceInSOL} SOL!`);
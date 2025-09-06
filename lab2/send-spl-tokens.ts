import "dotenv/config";
import {
  getExplorerLink,
  getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

const user = getKeypairFromEnvironment("SECRET_KEY");

console.log(
  `🔑 Loaded our keypair securely, using an env file! Our public key is: ${user.publicKey.toBase58()}`
);


const recipient = new PublicKey("D2TGc9e5iUpBCvVbxuLW2aFSa9uJd1vKsdTYpEDAL7oZ");

const tokenMintAccount = new PublicKey("GV96phrk756ZV3kLXhXRf5DksAexoRcNzp5HRUnx7AN8");


const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);

console.log(`⚡ Attempting to send 1 token to ${recipient.toBase58()}...`);


const sourceTokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  user,
  tokenMintAccount,
  user.publicKey
);


const destinationTokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  user,
  tokenMintAccount,
  recipient
);


const signature = await transfer(
  connection,
  user,
  sourceTokenAccount.address,
  destinationTokenAccount.address,
  user,
  1 * MINOR_UNITS_PER_MAJOR_UNITS
);

const explorerLink = getExplorerLink("transaction", signature, "devnet");
console.log(`✅ Transaction confirmed, explorer link is: ${explorerLink}`);
